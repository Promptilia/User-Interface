import React from "react";

type Props = {
  params: { id: string };
};

const Product = ({ params }: Props) => {
  return (
    <>
      <section className="w-full h-full bg-zinc-950 text-white">
        <div className="w-full bg-zinc-800">
          <h1 className="w-full p-5 bg-gradient-to-b from-pink-600 via-white to-blue-600 text-transparent bg-clip-text font-black text-5xl capitalize">
            Promptilia
          </h1>
        </div>
        <p>Product Id: {params.id}</p>
      </section>
    </>
  );
};

export default Product;
