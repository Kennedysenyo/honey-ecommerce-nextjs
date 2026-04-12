"use server";

import { auth } from "@/lib/better-auth/auth";
import { cookies, headers } from "next/headers";

export async function requireSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  return session;
}

export const isSignedIn = async () => {
  const cookiesStore = await cookies();
  const data = cookiesStore.get("better-auth.session_data")?.value;
  const token = cookiesStore.get("better-auth.session_token")?.value;
  return !!data && !!token;
};
