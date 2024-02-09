import { generateAiResponse } from "@/app/lib/utils/generateAiResponse";
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    try {
        const { product, categories } = await req.json();

        const prompt = `We generate filters for our clients who wish to buy ${product} online. Generate 
        single line questions for each filter in the array ${categories} and return an array of questions
        so that we can asks questions via chatbot`

        const res = await generateAiResponse(prompt) as string;

        const quesArray = res.split('\n');

        return NextResponse.json({
            success: true,
            message: 'Questions generated successfully',
            data: quesArray
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        });
    }
}