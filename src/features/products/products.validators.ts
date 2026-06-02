"use server";

import z from "zod";
import { createProductSchema } from "./products.schema";
import {
  CreateProductFormFieldsErrors,
  CreateProductFormResponseType,
} from "./products.types";

export const createProductFormValidator = async (
  prevState: CreateProductFormResponseType,
  formData: FormData,
): Promise<CreateProductFormResponseType> => {
  const rawInput = Object.fromEntries(formData);
  const result = createProductSchema.safeParse(rawInput);

  if (!result.success) {
    let errors: CreateProductFormFieldsErrors = {};

    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [key]: value };
    }
    return { success: false, errors, errorMessage: null };
  }
  return { success: true, errors: {}, errorMessage: null };
};
