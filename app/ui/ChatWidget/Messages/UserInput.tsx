"use client";

import React, {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  RefObject,
} from "react";
import { fakeFiltersData } from "../../fakedata";
import { Message } from "../Interfaces";

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

    setLoading(true);

    try {
      // Simulating adding messages
      setMessages((prev) => [
        ...prev,
        { isBotResponse: false, message: formData.userInput },
      ]);

      await new Promise((resolve) => {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { isBotResponse: true, filters: fakeFiltersData },
          ]);
          resolve("Loaded");
        }),
          1550;
      });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
      setFormData((prev) => ({ ...prev, userInput: "" }));
    }
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
