CREATE TABLE "product_category" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "category" TO "categoryId";--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_product_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."product_category"("id") ON DELETE set null ON UPDATE no action;