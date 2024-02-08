import React from "react";
import ChatWidget from "../ui/ChatWidget/ChatWidget";

type Props = {};

const Chat = (props: Props) => {
  return (
    <>
      <section className="w-full h-full flex flex-row items-start justify-center">
        <ChatWidget />
      </section>
    </>
  );
};

export default Chat;
