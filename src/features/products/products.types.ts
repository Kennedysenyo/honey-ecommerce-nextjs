import z from "zod";
import { createProductSchema } from "./products.schema";

export type CreateProductDataType = z.infer<typeof createProductSchema>;

export type CreateProductFormFieldsErrors = Partial<CreateProductDataType>;

export type CreateProductFormResponseType = {
  errors: CreateProductFormFieldsErrors;
  success: boolean;
  errorMessage: string | null;
};
