import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/db";
import { authSchema } from "../db/schema";
import { emailOTP } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "../resend/send-email";

const codeExpiresIn = Number(process.env.CODE_EXPIRES_IN);

if (!codeExpiresIn || isNaN(codeExpiresIn)) {
  throw new Error("CODE_EXPIRES_IN must be a valid number.");
}

const baseURL = process.env.BETTER_AUTH_URL;
if (!baseURL) {
  throw new Error("BETTER_AUTH_URL is required to send email");
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema: authSchema,
    provider: "pg",
  }),
  emailAndPassword: {
    autoSignIn: true,
    enabled: true,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: Number(codeExpiresIn),
    revokeSessionsOnPasswordReset: true,
  },
  emailVerification: {
    autoSignInAfterVerification: true,
  },
  plugins: [
    nextCookies(),
    emailOTP({
      expiresIn: codeExpiresIn,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          // console.log("Verify OTP:", otp);
          await sendEmail({
            type: "OTP",
            details: {
              to: email,
              subject: "Your Email Verification Code",
              otp,
            },
            baseURL,
          });
        } else if (type === "forget-password") {
          // console.log("Reset OTP:", otp);
          await sendEmail({
            type: "OTP",
            details: {
              to: email,
              subject: "Your Password Reset Code",
              otp,
            },
            baseURL,
          });
        } else {
          console.log("Sign-in OTP:", otp);
        }
      },
    }),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 3,
    updateAge: 60 * 60 * 24,
    freshAge: 60 * 10,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
      strategy: "compact",
    },
    deferSessionRefresh: true,
  },
});
