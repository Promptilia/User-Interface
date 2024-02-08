"use client";

import React, { useEffect, useRef, useState } from "react";
import FemaleModel from "./Model/FemaleModel";
import UserInput from "./Messages/UserInput";
import Messages from "./Messages/Messages";
import { Filter, Message } from "./Interfaces";
import { showTypingEffect } from "../utils/TypingAnim";

type Props = {};

const BRAND_NAME = "Promptilia";

const ChatWidget = (props: Props) => {
  const TypingRef = useRef<HTMLDivElement>(null);

  const [brandName, setBrandName] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    showTypingEffect(BRAND_NAME, setBrandName, 150);

    setMessages((prev) => [
      {
        ...prev,
        isBotResponse: true,
        message: "Hello User, I am Karky welcome to promptilia",
      },
    ]);
  }, []);

  return (
    <>
      <div
        className="px-3 py-2 rounded-b-md fixed top-0 left-1/2 z-50 bg-amber-600 font-mono text-sm transition-all hidden text-center"
        ref={TypingRef}
      >
        <span>Typing...</span>
      </div>
      <div className="flex flex-col items-center justify-between w-[30%] h-full">
        <h1 className="text-white text-2xl w-full bg-slate-900 p-2 font-bold flex items-center justify-center leading-snug tracking-normal">
          🤖 How can I help you Today
          <span className="mx-2 text-6xl text-blue-900 font-black leading-tight tracking-tight">
            ?
          </span>
        </h1>
        <div className="h-full w-full bg-blue-100">
          <FemaleModel />
        </div>
      </div>
      <div className="w-[70%] h-full relative bg-slate-900 text-white">
        <div className="w-full h-full max-h-screen bg-slate-900 flex items-center justify-center">
          <h1 className="font-black text-zinc-500 text-9xl">{brandName}</h1>
        </div>
        <Messages messages={messages} setMessages={setMessages} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-3 w-full bg-slate-900">
        <UserInput setMessages={setMessages} TypingRef={TypingRef} />
      </div>
    </>
  );
};

export default ChatWidget;
