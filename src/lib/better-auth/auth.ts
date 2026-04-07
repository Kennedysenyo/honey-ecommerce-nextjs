import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/db";
import { authSchema } from "../db/schema";
import { emailOTP } from "better-auth/plugins";

const codeExpiresIn = Number(process.env.CODE_EXPIRES_IN);

if (!codeExpiresIn || isNaN(codeExpiresIn)) {
  throw new Error("CODE_EXPIRES_IN must be a valid number.");
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema: authSchema,
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: Number(codeExpiresIn),
    revokeSessionsOnPasswordReset: true,
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        {
          if (type === "email-verification") {
            console.log(otp);
          } else if (type === "forget-password") {
            console.log(otp);
          }
        }
      },
    }),
  ],
});
