// pages/index.js
import Head from "next/head";
import ProductCard from "../../ui/ProductCard";
import Navbar from "../../ui/Navbar";

const products = [
  {
    id: "1",
    name: "Refreshing Lemonade",
    category: "Beverage",
    price: 3.99,
    imageUrl: "/images/lemonade.jpg",
  },
  {
    id: "2",
    name: "Lemonade Stand T-Shirt",
    category: "Clothing",
    price: 15.99,
    imageUrl: "/images/tshirt.jpg",
  },
  // Add more lemonade-related products as needed
];

const Home = () => {
  return (
    <div className="container mx-auto p-4 bg-white">
      <Head>
        <title>Lemonade</title>
        <meta name="description" content="Lemonade E-Commerce Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-black flex flex-col  min-h-screen">
        {/* Lemonade Heading */}
        <h1 className="text-4xl font-cursive mb-4">Lemonade</h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <Navbar />
    </div>
  );
};

export default Home;
