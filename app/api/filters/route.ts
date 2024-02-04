import { generateAiResponse } from "@/app/utils/generateAiResponse";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const product = req.nextUrl.searchParams.get('product');
        const prompt =
            `I have a product ${product} which a user wants to buy online, generate all possible filters that a user can put on the product to get his desiered product
            Give response in form of an array of objects so that i can populate the filters on my frontend
            `;
        const filter = generateAiResponse(prompt);
        return NextResponse.json({
            success: true,
            data: filter
        });
    } catch (error) {
        console.log(error);
    }
}
