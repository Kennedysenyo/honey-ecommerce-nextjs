import z from "zod";
import {
  forgotPasswordSchema,
  sendOTPSchema,
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

export type VerifyEmailFormReturnType = {
  errors: VerifyOTPFormErrors;
  success: boolean;
  errorMessage: string | null;
};

// ResendOtp

export type SendOTPDataType = z.infer<typeof sendOTPSchema>;

// Forgot password

export type ForgotPasswordDataType = z.infer<typeof forgotPasswordSchema>;

export interface ForgotPasswordFormErrors extends Partial<ForgotPasswordDataType> {}

export type ForgotPasswordFormReturnType = {
  errors: ForgotPasswordFormErrors;
  success: boolean;
  errorMessage: string | null;
};
