import { sendOTPSchema } from "@/features/auth/auth.schema";
import { sendOTP } from "@/features/auth/auth.service";
import { SendOTPDataType } from "@/features/auth/auth.types";
import { aj } from "@/lib/arcjet/arcjet";
import { tokenBucket } from "@arcjet/next";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { email, isReset }: SendOTPDataType = await request.json();

    const result = sendOTPSchema.safeParse({ email, isReset });
    if (!result.success) {
      return NextResponse.json(
        { message: "Email and isReset are required!" },
        { status: 400 },
      );
    }

    const decision = await aj.protect(request, { requested: 1 });
    if (decision.isDenied()) {
      if (decision.reason.isBot()) {
        return NextResponse.json(
          { message: "Bot automations not allowed!" },
          { status: 403 },
        );
      } else if (decision.reason.isRateLimit()) {
        return NextResponse.json(
          {
            message: "Too many requests. Try again later",
          },
          { status: 403 },
        );
      }
    }

    const emailRateLimiter = aj.withRule(
      tokenBucket({
        mode: "LIVE",
        characteristics: ["email"],
        capacity: 3,
        refillRate: 3,
        interval: "60m",
      }),
    );

    const emailDecision = await emailRateLimiter.protect(request, {
      email: email.toLowerCase().trim(),
      requested: 1,
    });

    if (emailDecision.isDenied()) {
      if (emailDecision.reason.isRateLimit()) {
        return NextResponse.json(
          { message: "Too many requests from this email. Try again later!" },
          { status: 403 },
        );
      }
    }

    await sendOTP(result.data);

    return NextResponse.json(
      { message: "Another code sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    const isError = error instanceof Error;
    return NextResponse.json(
      { message: isError ? error.message : (error as string) },
      { status: isError ? 500 : 400 },
    );
  }
};
