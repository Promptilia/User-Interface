import { model } from "@/app/lib/config/gemini";
import { removeBackTicks } from "./removeBackticks";

export const generateAiResponse = async (prompt: string) => {
    const { response } = await model.generateContent(prompt);
    const modifiedRes = removeBackTicks(response.candidates[0].content.parts[0].text);
    return modifiedRes;
}