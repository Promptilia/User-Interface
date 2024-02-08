import { NextRequest, NextResponse } from "next/server";
const { getJson } = require("serpapi");

export const GET = async (req: NextRequest) => {
  try {
    const product = req.nextUrl.searchParams.get("product");
    if (!product) throw new Error("Product not found");

    const json = await getJson({
      engine: "google_shopping",
      q: product,
      api_key: process.env.SERP_API_KEY,
    });
    if (!json) throw new Error("Filters not found");

    return NextResponse.json({
      success: true,
      message: "filters fetch successfully",
      data: json["filters"],
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
};
