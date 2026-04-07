import { VerifyEmail } from "@/components/verify-email/VerifyEmail";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function VerifyEmailPage() {
  const codeExpiresIn = Number(process.env.CODE_EXPIRES_IN);

  if (!codeExpiresIn || isNaN(codeExpiresIn)) {
    throw new Error("CODE_EXPIRES_IN must be a valid number.");
  }

  const cookiesStore = await cookies();
  const email = cookiesStore.get("email")?.value;

  if (!email) {
    redirect("/sign-up");
  }

  return <VerifyEmail email={email} codeExpiresIn={codeExpiresIn} />;
}
