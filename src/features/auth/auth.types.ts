import z from "zod";
import { userSignUpSchema } from "./auth.schema";

export type UserSignUpDataType = z.infer<typeof userSignUpSchema>;

export interface SignUpFormErrorsType extends Partial<UserSignUpDataType> {}

export type SignUpFormReturnType = {
  errors: SignUpFormErrorsType;
  success: boolean;
  errorMessage: string | null;
};
