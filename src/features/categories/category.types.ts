import z from "zod";
import { createCategorySchema } from "./category.schema";
import { fetchAllCategories } from "./category.queries";

export type CreateCategoryType = z.infer<typeof createCategorySchema>;

export type CreateCategoryFormFieldErrors = Partial<CreateCategoryType>;

export type CreateCategoryFormResponseType = {
  success: boolean;
  errors: CreateCategoryFormFieldErrors;
  errorMessage: string | null;
};

export type SelectCategoryType = Awaited<ReturnType<typeof fetchAllCategories>>;
