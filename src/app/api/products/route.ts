import { products } from "@/lib/utils/dummy-data/products";

import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve(NextResponse.json({ products }, { status: 200 }));
      }, 3000),
    );
    // return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Unable to fetch products",
      },
      { status: 400 },
    );
  }
};
