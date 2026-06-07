import { productCategory } from "@/lib/db/app-schema";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";

const dbCategories = createSelectSchema(productCategory);

export const createCategorySchema = dbCategories
  .pick({
    name: true,
    slug: true,
  })
  .extend({
    name: z.string().min(3, {
      error: (iss) =>
        iss.input?.length === 0
          ? "Enter category name"
          : "Category name must be at least 3 characters.",
    }),

    slug: z.string().min(3, {
      error: (iss) =>
        iss.input?.length === 0
          ? "Enter slug"
          : "Slug must be at least 3 characters.",
    }),
  });
