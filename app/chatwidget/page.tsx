import React from "react";
import FemaleModel from "../ui/FemaleModel";

type Props = {};

const Chat = (props: Props) => {
  return (
    <>
      <section className="w-full h-full flex flex-row items-start justify-center">
        <div className="flex flex-col items-center justify-between w-[30%] h-full">
          <h1 className="text-white text-2xl w-full bg-black p-2 font-bold flex items-center justify-center leading-snug tracking-normal">
            🤖 How can I help you Today
            <span className="mx-2 text-6xl text-blue-700 font-black leading-tight tracking-tight">
              ?
            </span>
          </h1>
          <div className="h-full w-full bg-blue-100">
            <FemaleModel />
          </div>
        </div>
        <div className="w-[70%] h-full max-h-screen bg-black p-2 text-white flex flex-col items-start justify-start overflow-auto pb-36">
          <div className="w-fit font-medium px-3 py-2 rounded-full border-2 border-solid border-white bg-blue-600 text-black m-1">
            Hello, User
          </div>
          <div className="self-end w-fit font-medium px-3 py-2 rounded-full border-2 border-solid border-white bg-blue-600 text-black m-1 my-2">
            Hi
          </div>
          <div className="w-fit font-medium px-3 py-2 rounded-full border-2 border-solid border-white bg-blue-600 text-black m-1 my-2">
            I am here to make you buy goods which are value for money
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-3 w-full bg-black">
          <input
            type="text"
            name="userinput"
            id="userinput"
            placeholder="Ask me anything..."
            required
            className="w-full rounded-full border-2 border-solid border-blue-900 p-4 outline-none"
          />
        </div>
      </section>
    </>
  );
};

export default Chat;
