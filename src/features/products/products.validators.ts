"use server";

import z from "zod";
import { createProductSchema } from "./products.schema";
import {
  CreateProductFormFieldsErrors,
  CreateProductFormResponseType,
} from "./products.types";
import { createProduct } from "./products.services";

export const createProductFormValidator = async (
  _prevState: CreateProductFormResponseType,
  formData: FormData,
): Promise<CreateProductFormResponseType> => {
  const rawInput = Object.fromEntries(formData);

  const result = createProductSchema.safeParse({
    ...rawInput,
    tags: JSON.parse(rawInput.tags as string),
    images: JSON.parse(rawInput.images as string),
    ingredients: JSON.parse(rawInput.ingredients as string),
    benefits: JSON.parse(rawInput.benefits as string),
    keywords: JSON.parse(rawInput.keywords as string),
  });

  if (!result.success) {
    let errors: CreateProductFormFieldsErrors = {};

    const flattenedErrors = z.flattenError(result.error).fieldErrors;

    for (const [key, value] of Object.entries(flattenedErrors)) {
      errors = { ...errors, [key]: value };
    }

    return {
      success: false,
      errors,
      errorMessage: null,
      uniqueMarker: new Date(),
    };
  }

  const errorMessage = await createProduct(result.data);
  if (errorMessage) {
    return {
      success: false,
      errors: {},
      errorMessage,
      uniqueMarker: new Date(),
    };
  }

  return {
    success: true,
    errors: {},
    errorMessage: null,
    uniqueMarker: new Date(),
  };
};
