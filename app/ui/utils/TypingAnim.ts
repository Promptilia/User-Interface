import React, { Dispatch, SetStateAction } from "react";

export const showTypingEffect = async (
  text: string,
  setter: React.Dispatch<React.SetStateAction<string>>,
  interval: number
) => {
  let typedText = "";
  for (let i = 0; i < text.length; i++) {
    await new Promise((resolve) => setTimeout(resolve, interval));
    typedText += text[i];
    setter(typedText);
  }
};
