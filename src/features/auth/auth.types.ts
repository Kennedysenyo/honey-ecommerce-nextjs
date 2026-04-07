import z from "zod";
import {
  userSignInSchema,
  userSignUpSchema,
  verifyOTPSchema,
} from "./auth.schema";

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

// Verify OTP

export type VerifyOTPDataType = z.infer<typeof verifyOTPSchema>;

export interface VerifyOTPFormErrors extends Partial<VerifyOTPDataType> {}

// export interface VerifyOTPInsertType extends VerifyOTPDataType {
//   email: string;
// }

export type VerifyEmailFormReturnType = {
  errors: VerifyOTPFormErrors;
  success: boolean;
  errorMessage: string | null;
};
