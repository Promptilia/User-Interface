import { Dispatch, SetStateAction } from "react";
import { Message } from "../Interfaces";

export const StartPrompt =
  "Start the conversation by telling you name and welcoming user and asking for what do you want to buy today or any related question which salesperson usually asks. keep it simple and to the point.";

export const Converse = async (
  setMessages: Dispatch<SetStateAction<Message[]>>,
  text: string,
  errText: string
) => {
  try {
    // send the request to the server
    const res = await fetch(`/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userMessage: text,
      }),
    });

    // get the response
    const response = await res.json();

    // show the bot response
    if (response.success) {
      setMessages((prev) => [
        ...prev,
        {
          isBotResponse: true,
          message: response.botMessage.slice(
            response.botMessage.indexOf(": ") + 1
          ),
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          isBotResponse: true,
          message: errText,
        },
      ]);
    }
  } catch (e) {
    console.error(e);
  }
};
