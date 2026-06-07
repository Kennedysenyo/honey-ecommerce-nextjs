import { products } from "@/lib/db/app-schema";
import { createSelectSchema } from "drizzle-zod";
import z from "zod";

const dbCreateProductSchema = createSelectSchema(products);

export const createProductSchema = dbCreateProductSchema
  .pick({
    name: true,
    slug: true,
    description: true,
    honeyType: true,
    categoryId: true,
    status: true,
    featured: true,
    price: true,
  })
  .extend({
    name: z.string().min(3, {
      error: (iss) =>
        iss.input?.length === 0
          ? "Enter product name"
          : "Product name must >= 3 chars",
    }),
    slug: z.string().min(3, {
      error: (iss) =>
        iss.input?.length === 0
          ? "Slug is required"
          : "Slug must be atleast 3 characters",
    }),
    description: z.string().min(30, {
      error: (iss) =>
        iss.input?.length === 0
          ? "Enter product description"
          : "Description must be >= 30 characters",
    }),
    honeyType: z.enum(["forest", "wild", "acacia", "clover", "manuka"]),
    categoryId: z.uuid(),
    status: z.enum(["draft", "active", "archived", "out_of_stock"]),
    featured: z.coerce.boolean(),
    price: z.number().positive(),

    tags: z.string().array().default([]),
    images: z.string().array().default([]),
    ingredients: z.string().array().default([]),
    benefits: z.string().array().default([]),
    sku: z
      .string()
      .min(3, "SKU must be at least 3 characters")
      .max(50, "SKU must not exceed 50 characters"),
    stockQuantity: z.number(),
    reorderPoint: z.number(),
    trackInventory: z.coerce.boolean(),
    weight: z.number(),
    volume: z.number(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    keywords: z.string().array().default([]),
  });
