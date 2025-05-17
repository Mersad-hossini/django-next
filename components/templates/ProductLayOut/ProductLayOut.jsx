import Footer from "@/components/modules/Footer/Footer";
import HomeSidebar from "@/components/modules/HomeSidebar/HomeSidebar";
import PublicNavbar from "@/components/modules/PublicNavbar/PublicNavbar";
import useAddToCart from "@/hocks/useAddToCart/useAddToCart";
import Head from "next/head";
import React, { useState } from "react";

function ProductLayOut({ product }) {
  const { addToCart, loading } = useAddToCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <div className="flex flex-col min-h-screen">
        <PublicNavbar setIsOpen={setIsSidebarOpen} />
        <HomeSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main className="grow">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4">
            {/* Image and title section */}
            <div className="w-full md:w-1/2 text-center">
              <h1 className="pb-2 text-2xl md:text-3xl">
                {product.title || ""}
              </h1>
              <div className="border-t border-gray-100 pt-5">
                <img
                  src={product.image}
                  alt={product.image}
                  className="w-3/4 md:w-2/3 mx-auto"
                />
              </div>
            </div>

            {/* Description and price section */}
            <div className="w-full md:w-1/2">
              <p className="leading-7 text-justify text-sm md:text-base">
                {product.description}
              </p>
              <div className="flex flex-col sm:flex-row justify-between items-center mt-5 gap-3">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition  cursor-pointer"
                  onClick={() => addToCart(product.id)}
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add to cart"}{" "}
                </button>
                <span className="text-xl sm:text-2xl font-semibold">
                  {product.price}$
                </span>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default ProductLayOut;
