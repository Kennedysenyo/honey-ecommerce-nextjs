"use server";

import z from "zod";
import { userSignUpSchema } from "./auth.schema";
import {
  SignUpFormErrorsType,
  SignUpFormReturnType,
  UserSignUpDataType,
} from "./auth.types";
import { handleErrors } from "@/lib/utils/handleErrors";
import { auth } from "@/lib/better-auth/auth";

export const signUp = async ({
  name,
  email,
  password,
}: Omit<UserSignUpDataType, "cnfrmPassword">): Promise<string | null> => {
  try {
    const res = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

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

    console.log({ errors, success: false, errorMessage: null });

    return { errors, success: false, errorMessage: null };
  }

  const { name, email, password, agreeToTerms } = result.data;

  const errorMessage = await signUp({ name, email, password, agreeToTerms });

  if (errorMessage) {
    return { errors: {}, success: false, errorMessage };
  }

  return { errors: {}, success: true, errorMessage: null };
};
