import { Dispatch, SetStateAction } from "react";
import { Message } from "../Interfaces";

export const StartPrompt =
  "Start the conversation by telling your name and welcoming the user to our site and asking for what do you want to buy today. keep it simple and short.";

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
      if (!response.filters.status) {
        setMessages((prev) => [
          ...prev,
          {
            isBotResponse: true,
            message: String(response.botMessage).slice(
              response.botMessage.indexOf(": ") + 1
            ),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            isBotResponse: true,
            message:
              "We have large variety of products, Choose your preferences to get best out of it.",
            filters: response.filters.allFilters,
          },
        ]);
      }
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
