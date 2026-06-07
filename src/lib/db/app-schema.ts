import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  pgEnum,
  check,
  uuid,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./auth-schema";

export const honeyTypeEnum = pgEnum("honey_type", [
  "forest",
  "wild",
  "acacia",
  "clover",
  "manuka",
]);

export const productStatusEnum = pgEnum("product_status", [
  "draft",
  "active",
  "archived",
  "out_of_stock",
]);

export const productCategory = pgTable("product_category", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
});

export const products = pgTable(
  "products",
  {
    id: uuid().primaryKey().defaultRandom().notNull(),
    name: text().notNull(),
    slug: text().notNull().unique(),
    description: text().notNull(),
    honeyType: text("honeyType").notNull(),
    ingredients: text("ingredients").array().default([]),
    benefits: text("benefits").array().default([]),
    categoryId: uuid("categoryId")
      .notNull()
      .references(() => productCategory.id, { onDelete: "set null" }),
    status: text("status").notNull().default("draft"),
    featured: boolean("featured").notNull().default(false),
    price: numeric("price", {
      precision: 10,
      scale: 2,
    }).notNull(),
    tags: text("tags").array().notNull().default([]),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => [check("product_price_check", sql`${table.price} >= 0`)],
);

export const productInventory = pgTable("product_inventory", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  productId: uuid("productId")
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
    }),
  sku: text("sku").notNull().unique(),
  stockQuantity: integer("stockQuantity").notNull().default(0),
  reorderPoint: integer("reorderPoint").notNull().default(5),
  trackInventory: boolean("trackInventory").notNull().default(true),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const productSpecifications = pgTable("product_specifications", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  productId: uuid("productId")
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
    }),
  weight: numeric("weight", {
    precision: 10,
    scale: 2,
  }),
  volume: numeric("volume", {
    precision: 10,
    scale: 2,
  }),
});

// export const tags = pgTable("tags", {
//   id: uuid().primaryKey().defaultRandom(),
//   name: text().notNull().unique(),
// });

// export const productTags = pgTable(
//   "product_tags",
//   {
//     productId: uuid("productId")
//       .notNull()
//       .references(() => products.id, {
//         onDelete: "cascade",
//       }),
//     tagId: uuid("tagId")
//       .notNull()
//       .references(() => tags.id, {
//         onDelete: "cascade",
//       }),
//   },
//   (table) => [primaryKey({ columns: [table.productId, table.tagId] })],
// );

export const productSeo = pgTable("product_seo", {
  id: uuid().primaryKey().defaultRandom(),
  productId: uuid("productId")
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
    }),
  metaTitle: text("metaTitle"),
  metaDescription: text("metaDescription"),
  keywords: text("keywords").array().default([]),
});

export const productsImages = pgTable("product_images", {
  id: uuid().primaryKey(),
  productId: uuid("productId")
    .notNull()
    .references(() => products.id, {
      onDelete: "cascade",
    }),
  imageURL: text("imageURL").notNull(),
  isPrimary: boolean("isPrimary").notNull().default(false),
  sortOrder: integer("sortOrder").default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

// export const productIngredients = pgTable("product_ingredients", {
//   id: uuid().primaryKey(),
//   productId: uuid("productId")
//     .notNull()
//     .references(() => products.id, { onDelete: "cascade" }),
//   ingredientName: text("ingredientName").notNull(),
// });

// export const productBenefits = pgTable("product_benefits", {
//   id: uuid().primaryKey(),
//   productId: uuid("productId")
//     .notNull()
//     .references(() => products.id, { onDelete: "cascade" }),
//   benefit: text().notNull(),
// });

export const cartItems = pgTable(
  "cart_items",
  {
    id: uuid().primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    productId: uuid("productId")
      .notNull()
      .references(() => products.id),
    quantity: integer().notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => [
    index("cart_user_idx").on(table.userId),
    index("cart_product_idx").on(table.productId),
    check("quantity_positive", sql`${table.quantity} > 0`),
  ],
);

export const orderStatusEnum = pgEnum("orderStatusEnum", [
  "pending",
  "confirmed",
  "processing",
  "delivered",
  "cancelled",
]);

export const paymentStatusEnum = pgEnum("paymentStatusEnum", [
  "pending",
  "paid",
  "failed",
  "refunded",
]);

export const orders = pgTable(
  "orders",
  {
    id: uuid().primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => user.id),
    customerName: text("customerName").notNull(),
    customerEmail: text("customerEmail").notNull(),
    customerPhone: text("customerPhone").notNull(),
    deliveryAddress: text("deliveryAddress").notNull(),
    subtotal: numeric({ precision: 10, scale: 2 }).notNull(),
    shippingFee: numeric("shippingFee", { precision: 10, scale: 2 }).notNull(),
    totalAmount: numeric("totalAmount", { precision: 10, scale: 2 }).notNull(),
    orderStatus: orderStatusEnum("orderStatus").notNull().default("pending"),
    paymentStatus: paymentStatusEnum("paymentStatus")
      .notNull()
      .default("pending"),
    notes: text(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => [
    check("subtotal", sql`${table.subtotal} >= 0`),
    check("shipping_fee_check", sql`${table.shippingFee} >= 0`),
    check("total_amount_check", sql`${table.totalAmount} >= 0`),
  ],
);

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid().primaryKey(),
    orderId: uuid("orderId")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: uuid("productId")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    productName: text("productName").notNull(),
    unitPrice: numeric("unitPrice", { precision: 10, scale: 2 }).notNull(),
    quantity: integer().notNull(),
    lineTotal: numeric("lineTotal", { precision: 10, scale: 2 }).notNull(),
  },
  (table) => [
    check("unit_price_check", sql`${table.unitPrice} >= 0`),
    check("line_total_check", sql`${table.lineTotal} >= 0`),
    check("quantity_check", sql`${table.quantity} > 0`),
  ],
);
