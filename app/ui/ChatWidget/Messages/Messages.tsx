"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Message } from "../Interfaces";
import { fakeProductsData } from "../../fakedata";
import ProductCard from "../Products/ProductCard";

type Props = {
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  productName: string;
};

// CSS
const botMessageCss = `w-fit font-medium px-3 py-2 rounded-lg border-2 border-solid border-blue-600 shadow-md shadow-zinc-600 bg-blue-600 text-black m-1`;
const botAvatarCss = `font-bold px-2 flex items-center justify-center rounded-lg border-2 border-solid border-pink-600 shadow-md shadow-zinc-600 bg-pink-600 text-black m-1 uppercase text-2xl`;
const userMessageCss = `w-fit self-end font-medium px-3 py-2 rounded-lg border-2 border-solid border-white shadow-md shadow-zinc-600 bg-white text-black m-1`;
const userAvatarCss = `font-bold px-2 flex items-center justify-center self-end rounded-lg border-2 border-solid border-yellow-600 shadow-md shadow-zinc-600 bg-yellow-600 text-black m-1 uppercase text-2xl`;

const Messages = ({ messages, setMessages, productName }: Props) => {
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [endIndex, setEndIndex] = useState<number>(1);
  const [totalFilters, setTotalFilters] = useState<number>(0);

  const AddFilters = (key: string, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  const showNextFilters = () => {
    for (let i = 0; i < messages.length; i++) {
      const filters = messages[i].filters;
      if (filters && filters?.length && endIndex < filters.length) {
        setEndIndex((prev) => ++prev);
      }
    }
  };

  const handleFilterSubmit = async () => {
    setLoading(true);

    try {
      setMessages((prev) => [
        ...prev,
        {
          isBotResponse: false,
          message: "Bring me something based on above preferences.",
        },
      ]);

      const res = await fetch(`/api/product-details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: productName,
          filters: selectedFilters,
        }),
      });
      const data = await res.json();

      console.log(data);
      // if (data.success) {
      //   setMessages((prev) => [
      //     ...prev,
      //     {
      //       isBotResponse: true,
      //       message: "Here are the best products which you can buy",
      //       products: data.products,
      //     },
      //   ]);
      // }

      // fake data
      setMessages((prev) => [
        ...prev,
        {
          isBotResponse: true,
          message: "Here are the best products which you can buy",
          products: fakeProductsData,
        },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    for (let i = 0; i < messages.length; i++) {
      const filters = messages[i].filters;
      if (filters?.length) {
        setTotalFilters((prev) => filters?.length);
      }
    }
  }, [messages]);

  return (
    <>
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-transparent z-[1] flex flex-col items-start justify-start pb-3 max-h-[90vh] overflow-auto pt-3 px-3">
        {messages.map((message, index) => (
          <>
            <div
              className={message.isBotResponse ? botAvatarCss : userAvatarCss}
              key={index}
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
                <div className="w-fit font-medium px-3 py-2 my-2 mx-1 rounded-full border-2 border-solid border-green-600 bg-green-600 shadow-md shadow-zinc-600 text-black">
                  Answer the question to get the best
                </div>
                {message.filters?.slice(0, endIndex).map((filter, i) => (
                  <div className="w-full px-3 my-2 mx-1" key={i}>
                    <div className="w-full p-2 font-black rounded-lg border-2 border-solid bg-[#0f172a60] max-h-[350px] overflow-auto text-white">
                      {filter.type}
                      <hr className="w-full bg-slate-700 my-2" />
                      <div className="flex flex-row items-center justify-start overflow-auto w-full">
                        {filter.options.map((option, idx) => (
                          <div
                            key={idx}
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
                {endIndex == totalFilters ? (
                  <button
                    type="button"
                    disabled={loading}
                    className="px-3 py-2 disabled:cursor-not-allowed m-2 rounded-lg bg-green-700 text-white"
                    onClick={handleFilterSubmit}
                  >
                    {loading ? <>Loading...</> : <>Submit</>}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="px-3 py-2 disabled:cursor-not-allowed m-2 rounded-lg bg-yellow-500 text-white"
                    onClick={showNextFilters}
                  >
                    Next
                  </button>
                )}
              </>
            )}
            {message.products && message.products.length > 0 && (
              <>
                <div className="flex flex-row items-start justify-evenly w-full flex-shrink-0 flex-wrap gap-3">
                  {message.products.map((product, idx) => (
                    <ProductCard
                      key={idx}
                      id={product.id}
                      name={product.name}
                      category={product.category}
                      imageUrl={product.imageUrl}
                      price={product.price}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default Messages;
