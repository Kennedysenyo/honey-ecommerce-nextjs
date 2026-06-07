import z from "zod";
import { createCategorySchema } from "./category.schema";

export type CreateCategoryType = z.infer<typeof createCategorySchema>;

export type CreateCategoryFormFieldErrors = Partial<CreateCategoryType>;

export type CreateCategoryFormResponseType = {
  success: boolean;
  errors: CreateCategoryFormFieldErrors;
  errorMessage: string | null;
};
