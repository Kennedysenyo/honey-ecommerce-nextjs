import { relations, sql } from "drizzle-orm";
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

export const roleEnum = pgEnum("role", ["admin", "customer"]);

export const user = pgTable(
  "user",
  {
    id: uuid("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("emailVerified").default(false).notNull(),
    image: text("image"),
    role: roleEnum().notNull().default("customer"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    check("user_role_check", sql`${table.role} IN ('admin', 'customer')`),
  ],
);

export const session = pgTable(
  "session",
  {
    id: uuid("id").primaryKey(),
    expiresAt: timestamp("expiresAt").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: uuid("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: uuid("id").primaryKey(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: uuid("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
    refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: uuid("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const products = pgTable(
  "products",
  {
    id: uuid().primaryKey(),
    name: text().notNull(),
    slug: text().notNull().unique(),
    description: text().notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    isActive: boolean("isActive").notNull().default(true),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  },
  (table) => [check("product_price_check", sql`${table.price} >= 0`)],
);

export const productsImages = pgTable("product_images", {
  id: uuid().primaryKey(),
  productId: uuid("productId")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  imageURL: text("imageURL").notNull(),
  isPrimary: boolean("isPrimary").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const productIngredients = pgTable("product_ingredients", {
  id: uuid().primaryKey(),
  productId: uuid("productId")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  ingredientName: text("ingredientName").notNull(),
});

export const productBenefits = pgTable("product_benefits", {
  id: uuid().primaryKey(),
  productId: uuid("productId")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  benefit: text().notNull(),
});

export const cartItems = pgTable(
  "cart_items",
  {
    id: uuid().primaryKey(),
    userId: uuid("userId")
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
    userId: uuid("userId")
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

export const authSchema = {
  user,
  session,
  account,
  verification,
};
