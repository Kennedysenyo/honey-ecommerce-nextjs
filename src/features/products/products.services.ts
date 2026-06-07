"use server";

import { handleErrors } from "@/lib/utils/handleErrors";
import { CreateProductDataType } from "./products.types";
import { db } from "@/lib/db/db";
import {
  productInventory,
  products,
  productSeo,
  productsImages,
  productSpecifications,
} from "@/lib/db/schema";

export const createProduct = async (
  data: CreateProductDataType,
): Promise<string | null> => {
  try {
    await db.transaction(async (tx) => {
      const [{ id }] = await tx
        .insert(products)
        .values({
          name: data.name,
          slug: data.slug,
          description: data.description,
          honeyType: data.honeyType,
          categoryId: data.categoryId,
          status: data.status,
          featured: data.featured,
          price: data.price.toString(),
          tags: data.tags,
        })
        .returning({ id: products.id });

      await tx.insert(productInventory).values({
        productId: id,
        sku: data.sku,
        stockQuantity: data.stockQuantity,
        reorderPoint: data.reorderPoint,
        trackInventory: data.trackInventory,
      });

      await tx.insert(productSpecifications).values({
        productId: id,
        weight: data.weight.toString(),
        volume: data.volume.toString(),
      });

      await tx.insert(productSeo).values({
        productId: id,
        metaTitle: data.name,
        metaDescription: data.description,
        keywords: data.tags,
      });

      // await tx.insert(productsImages).values({});
    });

    return null;
  } catch (error) {
    return handleErrors(error);
  }
};
