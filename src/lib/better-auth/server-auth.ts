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
  const sessionData = process.env.BETTER_AUTH_SESSION_DATA_KEY;
  const sessionToken = process.env.BETTER_AUTH_SESSION_DATA_TOKEN;

  if (!sessionData || !sessionToken) {
    throw new Error(
      "BETTER_AUTH_SESSION_DATA_KEY and BETTER_AUTH_SESSION_DATA_TOKEN are required",
    );
  }

  const cookiesStore = await cookies();
  const data = cookiesStore.get(sessionData)?.value;
  const token = cookiesStore.get(sessionToken)?.value;
  return !!data && !!token;
};
