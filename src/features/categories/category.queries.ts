"use server";

import { productCategory } from "@/lib/db/app-schema";
import { db } from "@/lib/db/db";

export const fetchAllCategories = async () => {
  try {
    const categories = await db
      .select({
        id: productCategory.id,
        name: productCategory.name,
        slug: productCategory.slug,
      })
      .from(productCategory);

    return categories;
  } catch (error) {
    console.error(error);
    throw new Error("An Error Occured!");
  }
};
