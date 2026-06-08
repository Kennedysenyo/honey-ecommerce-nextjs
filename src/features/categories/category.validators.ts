"use server";

import z from "zod";
import {
  CreateCategoryFormFieldErrors,
  CreateCategoryFormResponseType,
} from "./category.types";
import { createCategorySchema } from "./category.schema";
import { createCategory } from "./category.service";

export const validateCreateCategoryForm = async (
  _prevState: CreateCategoryFormResponseType,
  formData: FormData,
): Promise<CreateCategoryFormResponseType> => {
  const rawInput = Object.fromEntries(formData);

  const results = createCategorySchema.safeParse(rawInput);
  if (!results.success) {
    let errors: CreateCategoryFormFieldErrors = {};

    const flattenedErrors = z.flattenError(results.error).fieldErrors;
    for (const [k, v] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [k]: v[0] };
    }

    return {
      success: false,
      errors,
      errorMessage: null,
    };
  }

  const errorMessage = await createCategory(results.data);
  if (errorMessage) {
    return {
      success: false,
      errors: {},
      errorMessage,
    };
  }

  return {
    success: true,
    errors: {},
    errorMessage: null,
  };
};
