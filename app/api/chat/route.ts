import { NextRequest, NextResponse } from "next/server";
import {
  Gemini_Model,
  generationConfig,
  safetySettings,
} from "@/app/lib/config/gemini";
import fs from "fs";

export const POST = async (req: NextRequest) => {
  try {
    const { userMessage } = await req.json();
    if (!userMessage)
      throw new Error(`Invalid user message | user message is required`);

    // check for if asking for particular item/goods
    let _prompt = `Is the user asking for any products/goods which are sold in malls, stores, e-commerce sites and many more\nif asking then return [true, item requested] else [false, \"\"]\n{user: \"${userMessage}"}`;
    const _prompt_result = await Gemini_Model.generateContent(_prompt);
    const _prompt_response = await _prompt_result.response;
    const isAskingForProduct = JSON.parse(_prompt_response.text());

    let filters = {
      status: false,
      allFilters: [],
    };

    if (isAskingForProduct[0]) {
      let product = isAskingForProduct[1];

      // get the filter route
      const res = await fetch(
        new URL(`/api/filters?product=${product}`, req.url),
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      const data = await res.json();
      if (data.success) {
        filters.status = true;
        filters.allFilters = data.filters;
      }
    }

    let prevConversation = "";
    try {
      prevConversation = fs.readFileSync("conversation.txt", "utf-8");
    } catch (error: any) {
      if (error.code === "ENOENT") {
        console.log("File does not exist. Creating a new one.");
      } else {
        throw error;
      }
    }

    let dataToAppend = `{user: ${userMessage}}\n`;

    fs.appendFileSync("conversation.txt", dataToAppend);

    const result = await Gemini_Model.generateContent({
      contents: [
        { role: "user", parts: [{ text: prevConversation + dataToAppend }] },
      ],
      generationConfig,
      safetySettings,
    });

    const response = result.response;
    if (!response) throw new Error(`Internal error`);

    fs.appendFileSync("conversation.txt", response.text());

    return NextResponse.json({
      success: true,
      message: "user's message responded successfully",
      botMessage: response.text(),
      filters,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
};
