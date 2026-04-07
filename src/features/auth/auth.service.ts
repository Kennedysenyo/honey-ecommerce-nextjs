"use server";

import z from "zod";
import {
  userSignInSchema,
  userSignUpSchema,
  verifyOTPSchema,
} from "./auth.schema";
import {
  sendOTPDataType,
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
import { cookies } from "next/headers";

export const sendOTP = async ({ email, isReset }: sendOTPDataType) => {
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
  console.log(hasAgreed);

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
      body: {
        email,
        password,
      },
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

  if (errorMessage) {
    return { errors: {}, success: false, errorMessage };
  }

  return { errors: {}, success: true, errorMessage: null };
};

// Verify OTP

const verifyOTP = async ({
  otp,
  email,
}: VerifyOTPDataType): Promise<string | null> => {
  try {
    const data = await auth.api.verifyEmailOTP({
      body: { email, otp },
    });

    if (!data.status) {
      throw new Error("Invalid or expired verification code");
    }

    return null;
  } catch (error) {
    return handleErrors(error);
  }
};

export const validateOTPForm = async (
  email: string,
  _prevState: VerifyEmailFormReturnType,
  formData: FormData,
): Promise<VerifyEmailFormReturnType> => {
  const otp = (formData.get("otp") as string).trim();
  const rawInput = { otp, email };

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
