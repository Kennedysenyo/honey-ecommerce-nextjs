import z from "zod";
import { userSignInSchema, userSignUpSchema } from "./auth.schema";

// Sign UP

export type UserSignUpDataType = z.infer<typeof userSignUpSchema>;

export interface SignUpFormErrorsType extends Partial<UserSignUpDataType> {}

export type SignUpFormReturnType = {
  errors: SignUpFormErrorsType;
  success: boolean;
  errorMessage: string | null;
};

// Sign IN
export type UserSignInDataType = z.infer<typeof userSignInSchema>;

export interface SignInFormErrorsType extends Partial<UserSignInDataType> {}

export type SignInFormReturnType = {
  errors: SignInFormErrorsType;
  success: boolean;
  errorMessage: string | null;
};
