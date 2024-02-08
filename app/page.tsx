import React from "react";
import Navbar from "./ui/Navbar/Navbar";
import Model from "./ui/Home/Model";
import Link from "next/link";

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
        <Link href={"/chatwidget"}>
          <button
            type="button"
            className="flex flex-col items-center justify-center px-5 py-4 rounded-full bg-blue-600 shadow-sm shadow-blue-600 border-4 border-solid border-black mt-5 capitalize"
          >
            <span className="font-semibold text-white text-6xl my-4 mx-2">
              Get Started
            </span>
          </button>
        </Link>
        <Model />
      </section>
    </>
  );
};

export default Home;
