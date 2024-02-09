"use client";

import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  RefObject,
} from "react";
import { Message } from "../Interfaces";
import { Converse } from "../Conversation/Conversation";

type Props = {
  setMessages: Dispatch<SetStateAction<Message[]>>;
  TypingRef: RefObject<HTMLDivElement>;
};

const UserInput = ({ setMessages, TypingRef }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    userInput: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    if (formData.userInput.length > 0) {
      if (TypingRef.current?.classList.contains("hidden")) {
        TypingRef.current.classList.remove("hidden");
        TypingRef.current.classList.add("block");
      }
    }

    if (key === "Enter") {
      handleSubmit();
      handleInputBlur();
    }
  };

  const handleInputBlur = () => {
    if (TypingRef.current) {
      if (!TypingRef.current.classList.contains("hidden")) {
        TypingRef.current.classList.remove("block");
        TypingRef.current.classList.add("hidden");
      }
    }
  };

  const handleSubmit = async () => {
    if (!formData.userInput) return;

    // start the loading effect
    setLoading(true);

    // show the user message
    setMessages((prev) => [
      ...prev,
      { isBotResponse: false, message: formData.userInput },
    ]);

    // set the bot response
    await Converse(
      setMessages,
      formData.userInput,
      "Oops! There is something wrong, I'll come back."
    );

    setLoading(false);
    setFormData((prev) => ({ ...prev, userInput: "" }));
  };

  return (
    <>
      <input
        type="text"
        ref={inputRef}
        autoFocus={true}
        name="userInput"
        id="userInput"
        placeholder="Type here..."
        disabled={loading}
        required
        value={formData.userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleInputBlur}
        autoComplete="off"
        className="w-full rounded-full border-2 border-solid border-blue-900 p-4 outline-none disabled:cursor-not-allowed"
      />
    </>
  );
};

export default UserInput;
