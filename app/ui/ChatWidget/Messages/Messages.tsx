"use client";

import React, { useEffect, useState } from "react";
import { Message } from "../Interfaces";

type Props = {
  messages: Message[];
};

// CSS
const botMessageCss = `w-fit font-medium px-3 py-2 rounded-full border-2 border-solid border-blue-600 shadow-md shadow-zinc-600 bg-blue-600 text-black m-1`;
const botAvatarCss = `font-bold px-2 flex items-center justify-center rounded-full border-2 border-solid border-pink-600 shadow-md shadow-zinc-600 bg-pink-600 text-black m-1 uppercase text-2xl`;
const userMessageCss = `w-fit self-end font-medium px-3 py-2 rounded-full border-2 border-solid border-white shadow-md shadow-zinc-600 bg-white text-black m-1`;
const userAvatarCss = `font-bold px-2 flex items-center justify-center self-end rounded-full border-2 border-solid border-yellow-600 shadow-md shadow-zinc-600 bg-yellow-600 text-black m-1 uppercase text-2xl`;

const Messages = ({ messages }: Props) => {
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const AddFilters = (key: string, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilterSubmit = () => {
    setLoading(true);

    try {
    } catch (err) {
      console.log(selectedFilters);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-transparent z-[1] flex flex-col items-start justify-start pb-3 max-h-[90vh] overflow-auto pt-3 px-3">
        {messages.map((message, index) => (
          <>
            <div
              className={message.isBotResponse ? botAvatarCss : userAvatarCss}
            >
              {message.isBotResponse ? <>K</> : <>U</>}
            </div>
            {message.message && (
              <div
                className={
                  message.isBotResponse ? botMessageCss : userMessageCss
                }
              >
                {message.message}
              </div>
            )}
            {message.filters && message.filters?.length > 0 && (
              <>
                <div className="w-fit font-medium px-3 py-2 my-2 mx-1 rounded-full border-2 border-solid border-blue-600 bg-blue-600 shadow-md shadow-zinc-600 text-black">
                  Tell me what exactly you want then I will provide you the best
                </div>
                {message.filters?.map((filter, index) => (
                  <div className="w-full px-3 my-2 mx-1" key={index}>
                    <div className="w-full p-2 font-black rounded-lg border-2 border-solid bg-[#0f172a60] max-h-[350px] overflow-auto text-white">
                      {filter.type}
                      <hr className="w-full bg-slate-700 my-2" />
                      <div className="flex flex-row items-center justify-start overflow-auto w-full">
                        {filter.options.map((option, i) => (
                          <div
                            key={i}
                            className={`flex items-center flex-col justify-center cursor-pointer hover:bg-zinc-600 h-32 w-32 rounded-lg ${
                              filter.type in selectedFilters &&
                              selectedFilters[filter.type] == option.tbs
                                ? "bg-slate-500"
                                : "bg-slate-800"
                            } text-zinc-300 font-mono my-2 mx-2 p-2 flex-shrink-0 overflow-auto`}
                            onClick={() => {
                              AddFilters(filter.type, option.tbs);
                            }}
                          >
                            {option.text ? (
                              <>{option.text}</>
                            ) : (
                              <>{option.tbs.replace("mr:1,", "")}</>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  disabled={loading}
                  className="px-3 py-2 disabled:cursor-not-allowed m-2 rounded-lg bg-green-700 text-white"
                  onClick={handleFilterSubmit}
                >
                  {loading ? <>Loading...</> : <>Submit</>}
                </button>
              </>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default Messages;
