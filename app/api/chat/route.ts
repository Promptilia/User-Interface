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

    // TODO:
    // check for if asking for particular item then use the filters route

    // check for if asking for products then use the product route

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
      message: "filters fetch successfully",
      botMessage: response.text(),
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
};
