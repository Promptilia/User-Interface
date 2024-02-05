import React from "react";
import Navbar from "./ui/Navbar";
import Model from "./ui/components/Model";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <Navbar />
      <section className="w-full h-full flex flex-col items-center">
        <h1 className="text-white font-black text-9xl p-10 my-5 flex flex-col items-center justify-between leading-tight tracking-tight uppercase">
          Promptilia
          <span className="text-zinc-500 text-5xl font-normal m-2 capitalize leading-3 -tracking-normal">
            An AI-Powered Shopping Store.
          </span>
        </h1>
        <button
          type="button"
          className="flex flex-col items-center justify-center px-5 py-4 rounded-full bg-blue-600 mt-5"
        >
          <span className="font-semibold text-white text-6xl my-4 mx-2">
            Get Started
          </span>
        </button>
        <Model />
      </section>
    </>
  );
};

export default Home;
