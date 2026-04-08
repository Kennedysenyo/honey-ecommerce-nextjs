import { SetNewPassword } from "@/components/set-new-password/SetNewPassword";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SetNewPasswordPage() {
  //TODO: Don't store email in cookies directly

  const cookiesStore = await cookies();
  const email = cookiesStore.get("email")?.value;
  const otp = cookiesStore.get("otp")?.value;

  if (!email || !otp) {
    redirect("/sign-in");
  }

  return <SetNewPassword email={email} otp={otp} />;
}
