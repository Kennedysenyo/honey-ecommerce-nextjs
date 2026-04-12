import { Resend } from "resend";

const resendAPIKey = process.env.RESEND_API_KEY;

if (!resendAPIKey) {
  throw new Error("RESEND_API_KEY is required for resend configuration");
}

export const resend = new Resend(resendAPIKey);
