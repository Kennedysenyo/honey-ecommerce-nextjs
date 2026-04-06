import { user } from "@/lib/db/schema";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

const dbUserSchema = createInsertSchema(user);

export const userSignUpSchema = dbUserSchema
  .pick({
    name: true,
    email: true,
  })
  .extend({
    name: z.string().min(3, {
      error: (iss) =>
        iss.input === undefined || iss.input.length === 0
          ? "Name is requied!"
          : "Name must be >= 3 characters",
    }),

    email: z.email(),
    password: z.string().min(8, {
      error: (iss) =>
        iss.input?.length === 0
          ? "Password is required!"
          : "Password must be >= 8 characters",
    }),

    cnfrmPassword: z.string().min(8, {
      error: (iss) =>
        iss.input?.length === 0
          ? "Enter password"
          : "Password must be >= 8 characters",
    }),

    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms",
    }),
  })
  .refine((data) => data.password === data.cnfrmPassword, {
    message: "Passwords do not match",
    path: ["cnfrmPassword"],
  });
