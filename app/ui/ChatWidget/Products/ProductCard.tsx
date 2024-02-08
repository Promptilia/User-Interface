import React from "react";
import { Product } from "../Interfaces";

const ProductCard = ({ id, imageUrl, name, category, price }: Product) => {
  return (
    <>
      <div className="border p-4 m-2 w-60 rounded-md mb-4 bg-white border-slate-500 text-black cursor-pointer hover:bg-slate-400">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-40 object-cover mb-2 rounded-md"
        />
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-gray-500 mb-2">{category}</p>
        <p className="text-gray-700">${price}</p>
      </div>
    </>
  );
};

export default ProductCard;
