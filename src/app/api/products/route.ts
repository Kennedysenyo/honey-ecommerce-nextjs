import { products } from "@/lib/utils/dummy-data/products";
import { NextResponse } from "next/server";

export async function GET(): Promise<Response> {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Unable to fetch products",
      },
      { status: 400 },
    );
  }
}
