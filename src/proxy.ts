import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/better-auth/auth";

const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/verify-email",
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isAuthed = !!session?.session;

  if (authRoutes.includes(pathname) && isAuthed) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isAuthed && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}
