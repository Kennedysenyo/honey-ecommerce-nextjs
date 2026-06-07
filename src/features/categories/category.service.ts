"use server";

import { db } from "@/lib/db/db";
import { CreateCategoryType } from "./category.types";
import { productCategory } from "@/lib/db/app-schema";
import { handleErrors } from "@/lib/utils/handleErrors";

export const createCategory = async ({
  name,
  slug,
}: CreateCategoryType): Promise<string | null> => {
  try {
    await db.insert(productCategory).values({
      name,
      slug,
    });
    return null;
  } catch (error) {
    return handleErrors(error);
  }
};
