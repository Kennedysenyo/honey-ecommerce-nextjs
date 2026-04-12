"use server";

import z from "zod";
import {
  forgotPasswordSchema,
  setNewPasswordSchema,
  userSignInSchema,
  userSignUpSchema,
  verifyOTPSchema,
} from "./auth.schema";
import {
  ForgotPasswordDataType,
  ForgotPasswordFormErrors,
  ForgotPasswordFormReturnType,
  SendOTPDataType,
  SetNewPasswordDataType,
  SetNewPasswordFormErrors,
  SetNewPasswordFormReturnType,
  SignInFormErrorsType,
  SignInFormReturnType,
  SignUpFormErrorsType,
  SignUpFormReturnType,
  UserSignInDataType,
  UserSignUpDataType,
  VerifyEmailFormReturnType,
  VerifyOTPDataType,
  VerifyOTPFormErrors,
} from "./auth.types";
import { handleErrors } from "@/lib/utils/handleErrors";
import { auth } from "@/lib/better-auth/auth";
import { cookies, headers } from "next/headers";
import { sendEmail } from "@/lib/resend/send-email";
import { requireSession } from "@/lib/better-auth/server-auth";

export const sendOTP = async ({ email, isReset }: SendOTPDataType) => {
  try {
    if (isReset) {
      await auth.api.requestPasswordResetEmailOTP({
        body: {
          email,
        },
      });
    } else {
      await auth.api.sendVerificationOTP({
        body: {
          email,
          type: "email-verification",
        },
      });
    }
    return null;
  } catch (error) {
    throw new Error(handleErrors(error));
  }
};

const signUp = async ({
  name,
  email,
  password,
}: Omit<UserSignUpDataType, "cnfrmPassword">): Promise<string | null> => {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: await headers(),
    });

    await sendOTP({ email, isReset: false });

    return null;
  } catch (error) {
    return handleErrors(error);
  }
};

export const validateSignUpForm = async (
  _prevState: SignUpFormReturnType,
  formData: FormData,
): Promise<SignUpFormReturnType> => {
  const rawInput = Object.fromEntries(formData);

  const hasAgreed = (formData.get("agreeToTerms") as string) === "true";

  const result = userSignUpSchema.safeParse({
    ...rawInput,
    agreeToTerms: hasAgreed,
  });

  if (!result.success) {
    let errors: SignUpFormErrorsType = {};

    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [key]: value[0] };
    }

    return { errors, success: false, errorMessage: null };
  }

  const { name, email, password, agreeToTerms } = result.data;

  const errorMessage = await signUp({ name, email, password, agreeToTerms });

  if (errorMessage) {
    return { errors: {}, success: false, errorMessage };
  }

  const cookiesStore = await cookies();
  cookiesStore.set("email", email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60,
    path: "/",
  });

  return { errors: {}, success: true, errorMessage: null };
};

const signIn = async ({
  email,
  password,
}: UserSignInDataType): Promise<string | null> => {
  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    });

    return null;
  } catch (error) {
    return handleErrors(error);
  }
};

export const validateSingInForm = async (
  _prevState: SignInFormReturnType,
  formData: FormData,
): Promise<SignInFormReturnType> => {
  const rawInput = Object.fromEntries(formData);

  const result = userSignInSchema.safeParse(rawInput);

  if (!result.success) {
    let errors: SignInFormErrorsType = {};

    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [key]: value[0] };
    }

    return { errors, success: false, errorMessage: null };
  }

  const errorMessage = await signIn(result.data);

  if (errorMessage !== null) {
    return { errors: {}, success: false, errorMessage };
  }

  return { errors: {}, success: true, errorMessage: null };
};

// Verify OTP

const verifyOTP = async ({
  otp,
  email,
  isReset,
}: VerifyOTPDataType): Promise<string | null> => {
  try {
    if (isReset) {
      await auth.api.checkVerificationOTP({
        body: {
          email,
          type: "forget-password",
          otp,
        },
      });

      const cookiesStore = await cookies();
      cookiesStore.set("otp", otp, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 5 * 60,
        path: "/",
      });
      cookiesStore.set("email", email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 5 * 60,
        path: "/",
      });
    } else {
      await auth.api.verifyEmailOTP({
        body: { email, otp },
        headers: await headers(),
      });
      const baseURL = process.env.BETTER_AUTH_URL;
      if (!baseURL) {
        throw new Error("BETTER_AUTH_URL is required to send email");
      }
      // TODO: change the way the email is sent.
      // After otp verification, there's no session.
      // So the name is not available.
      const session = await requireSession();
      await sendEmail({
        type: "WELCOME",
        details: {
          to: email,
          subject: "Welcome to Honey Man",
          name: session?.user.name!,
        },
        baseURL,
      });
    }

    return null;
  } catch (error) {
    return handleErrors(error);
  }
};

export const validateOTPForm = async (
  { email, isReset }: SendOTPDataType,
  _prevState: VerifyEmailFormReturnType,
  formData: FormData,
): Promise<VerifyEmailFormReturnType> => {
  const otp = (formData.get("otp") as string).trim();
  const rawInput = { otp, email, isReset };

  const result = verifyOTPSchema.safeParse(rawInput);

  if (!result.success) {
    let errors: VerifyOTPFormErrors = {};

    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [key]: value };
    }

    return { errors, success: false, errorMessage: null };
  }

  const errorMessage = await verifyOTP(result.data);

  if (errorMessage) {
    return { errors: {}, success: false, errorMessage: errorMessage };
  }

  return { errors: {}, success: true, errorMessage: null };
};

// Forgot Password
const initiatePasswordReset = async ({
  email,
}: ForgotPasswordDataType): Promise<string | null> => {
  try {
    await sendOTP({ email, isReset: true });

    return null;
  } catch (error) {
    return handleErrors(error);
  }
};

export const validateForgotPasswordForm = async (
  _prevState: ForgotPasswordFormReturnType,
  formData: FormData,
): Promise<ForgotPasswordFormReturnType> => {
  const rawInput = Object.fromEntries(formData);

  const result = forgotPasswordSchema.safeParse(rawInput);

  if (!result.success) {
    let errors: ForgotPasswordFormErrors = {};

    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [key]: value[0] };
    }

    return { errors, success: false };
  }

  const errorMessage = await initiatePasswordReset(result.data);
  if (errorMessage) {
    // This is temporal.
    return { errors: {}, success: false };
  }

  // TODO: Clean up flow to avoid saving emails as cookies.

  const cookiesStore = await cookies();
  cookiesStore.set("reset", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60,
    path: "/",
  });
  cookiesStore.set("email", result.data.email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 15 * 60,
    path: "/",
  });

  return { errors: {}, success: true };
};

// Set new Password

const setNewPassword = async ({
  email,
  otp,
  password,
}: Omit<SetNewPasswordDataType, "cnfrmPassword">): Promise<string | null> => {
  try {
    await auth.api.resetPasswordEmailOTP({
      body: {
        email,
        otp,
        password,
      },
    });

    return null;
  } catch (error) {
    return handleErrors(error);
  }
};

export const validateSetNewPasswordForm = async (
  data: Pick<SetNewPasswordDataType, "email" | "otp">,
  _prevState: SetNewPasswordFormReturnType,
  formData: FormData,
): Promise<SetNewPasswordFormReturnType> => {
  const rawInput = Object.fromEntries(formData);

  const input = { ...rawInput, email: data.email, otp: data.otp };

  const result = setNewPasswordSchema.safeParse(input);

  if (!result.success) {
    let errors: SetNewPasswordFormErrors = {};

    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [key]: value };
    }

    return { errors, success: false, errorMessage: null };
  }
  const { email, otp, password } = result.data;

  const errorMessage = await setNewPassword({ email, otp, password });

  if (errorMessage) {
    return { errors: {}, success: false, errorMessage };
  }

  return { errors: {}, success: true, errorMessage: null };
};

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    throw new Error(handleErrors(error));
  }
};
