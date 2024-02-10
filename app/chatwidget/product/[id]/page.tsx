import React from "react";
import Link from "next/link";

type Props = {
  params: { id: string };
};

const Product = ({ params }: Props) => {
  return (
    <>
      <section className="w-full h-full bg-zinc-950 text-white overflow-auto">
        <div className="w-full bg-zinc-800">
          <h1 className="w-full p-5 bg-gradient-to-b from-pink-600 via-white to-blue-600 text-transparent bg-clip-text font-black text-5xl capitalize">
            Promptilia
          </h1>
        </div>
        <div className="w-full flex items-center flex-col mt-5">
          <div className="flex flex-row items-start gap-3">
            <img
              src={
                "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/71a00703e8c14c76aa8471445a9eaf40_9366/Ultrabounce_Shoes_Blue_HP5783_HM1.jpg"
              }
              alt="image"
              className="w-96 aspect-square border-2 border-solid border-orange-400 rounded-lg"
            />
            <div className="p-1 font-mono flex flex-col items-start">
              <span>Name: Adidas Ultra-Bounce Blue Shoes</span>
              <span>Brand: Adidas</span>
              <span className="text-blue-500">
                <Link href={""} target="_blank">
                  👍 Buy the product here
                </Link>
              </span>
            </div>
          </div>
          <h3 className="text-white text-5xl font-black p-1 my-2">
            What our Bot says about the product?
          </h3>
          <p className="text-lg font-light text-zinc-200 p-5">
            <span className="text-xl font-semibold text-orange-600">Karky</span>
            : I must say, it exceeded the expectations of many users. From its
            sleek design to its impressive performance, this product truly
            stands out. First and foremost, the build quality is top-notch. It
            feels sturdy and well-made, giving me confidence in its durability.
            The sleek design adds a touch of elegance to my workspace, making it
            a welcome addition to my setup. In terms of performance, Product
            truly shines. It delivers on its promises with lightning-fast speeds
            and smooth operation. Overall, I can confidently say that Product is
            a standout product in its category. It combines exceptional build
            quality, impressive performance, and a user-friendly experience into
            a package that's truly hard to beat. Whether you're a professional
            looking for a reliable workhorse or a casual user in need of a
            versatile companion, Product is definitely worth considering.
          </p>
        </div>
      </section>
    </>
  );
};

export default Product;
