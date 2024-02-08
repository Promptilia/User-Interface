import { constructTbs } from '@/app/lib/utils/constructTbs';
import { NextRequest, NextResponse } from 'next/server'
import serapi from 'serpapi'
const { getJson } = require("serpapi");

export const HEAD = async (req: NextRequest) => {
    try {
        const { productName, filters } = await req.json();

        const tbs = constructTbs(filters);

        const json = await getJson({
            engine: "google_shopping",
            q: productName,
            tbs,
            api_key: "secret_api_key"
        });

        return NextResponse.json({
            success: true,
            message: "data fetch success",
            data: json
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}