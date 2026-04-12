import Welcome from "@/components/emails/Welcome";
import { resend } from "./resend";
import OTP from "@/components/emails/OTP";

type SendEmailTypes =
  | {
      type: "WELCOME";
      details: { to: string; subject: string; name: string };
      baseURL: string;
    }
  | {
      type: "OTP";
      details: { to: string; subject: string; otp: string };
      baseURL: string;
    }
  | {
      type: "ORDER";
      details: { to: string; subject: string; orderId: string };
      baseURL: string;
    };

export async function sendEmail({ type, details, baseURL }: SendEmailTypes) {
  switch (type) {
    case "WELCOME":
      await resend.emails.send({
        from: "Honey Man <welcome@kencoding.dev>",
        subject: details.subject,
        to: details.to,
        react: Welcome({ name: details.name, baseURL }),
      });
      break;
    case "OTP":
      await resend.emails.send({
        from: "Honey Man <noreply@kencoding.dev>",
        subject: details.subject,
        to: details.to,
        react: OTP({ otp: details.otp, baseURL }),
      });
      break;
    default:
      throw new Error("Unknown email type");
  }
}
