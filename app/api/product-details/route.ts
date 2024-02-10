import { filterArraySchema } from "@/app/lib/schema/filterSchema";
import { constructTbs } from "@/app/lib/utils/constructTbs";
import { NextRequest, NextResponse } from "next/server";
import { getJson } from "serpapi";

export const POST = async (req: NextRequest) => {
  try {
    const { productName, filters } = await req.json();
    console.log(productName, filters);
    if (!productName || !filters)
      throw new Error(`Product name and filters both must be provided`);

    const parsedFilters = filterArraySchema.parse(filters);

    const tbs = constructTbs(parsedFilters);

    const json = await getJson({
      engine: "google_shopping",
      q: productName,
      tbs,
      api_key: process.env.SERP_API_KEY,
    });

    return NextResponse.json({
      success: true,
      message: "data fetch success",
      products: json,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
};
