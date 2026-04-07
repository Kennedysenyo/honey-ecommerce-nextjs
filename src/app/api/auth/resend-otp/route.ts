import { sendOTPSchema } from "@/features/auth/auth.schema";
import { sendOTP } from "@/features/auth/auth.service";
import { sendOTPDataType } from "@/features/auth/auth.types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { email, isReset }: sendOTPDataType = await request.json();

    const result = sendOTPSchema.safeParse({ email, isReset });
    if (!result.success) {
      return NextResponse.json(
        { message: "Email and isReset are required!" },
        { status: 400 },
      );
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
