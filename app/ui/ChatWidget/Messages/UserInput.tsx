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
} from "react";
import { fakeFiltersData } from "../../fakedata";
import { Message } from "../Interfaces";

type Props = {
  setMessages: Dispatch<SetStateAction<Message[]>>;
};

const UserInput = ({ setMessages }: Props) => {
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

    if (key === "Enter") {
      handleSubmit();
    }
  };

  const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
    console.log("focused");
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
        onFocus={handleInputFocus}
        autoComplete="off"
        className="w-full rounded-full border-2 border-solid border-blue-900 p-4 outline-none disabled:cursor-not-allowed"
      />
    </>
  );
};

export default UserInput;
