CREATE TYPE "public"."orderStatusEnum" AS ENUM('pending', 'confirmed', 'processing', 'delivered', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."paymentStatusEnum" AS ENUM('pending', 'paid', 'failed', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'customer');