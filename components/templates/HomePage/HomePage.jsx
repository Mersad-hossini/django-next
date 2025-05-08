import ProductBox from "@/components/modules/ProductBox/ProductBox";
import PublicNavbar from "@/components/modules/PublicNavbar/PublicNavbar";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import ProductSection from "@/components/modules/ProductSection/ProductSection";
import { useRouter } from "next/router";
import Footer from "@/components/modules/Footer/Footer";

function HomePage() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getAllProducts();
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    router.push(`/search?query=${encodeURIComponent(searchValue)}`);
  };

  const getAllProducts = async () => {
    try {
      const res = await fetch("https://api.mander.ir/product/products/");
      const productsData = await res.json();
      if (res.ok) {
        setProducts(productsData.results);
      } else {
        console.error("Server error:", productsData.message);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="grow">
        <div className="relative w-full ">
          <img
            src="/images/test2.png"
            className="w-full h-auto object-cover max-h-96"
            alt="Background"
          />
          <div className="absolute hidden inset-0 sm:flex items-center flex-col justify-center">
            <h1 className="text-white text-lg sm:text-2xl md:text-3xl font-bold">
              Welcome to Our Store
            </h1>
            <form className="mt-10 text-center bg-white w-[60%] sm:w-[50%] lg:w-[36%] rounded-3xl py-2 px-3 relative">
              <input
                type="text"
                className="w-full outline-0 pr-10"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                className="absolute top-0 right-0 size-10 text-green-600 rounded-3xl cursor-pointer"
                type="submit"
                onClick={searchHandler}
              >
                <MagnifyingGlassCircleIcon />
              </button>
            </form>
          </div>
        </div>

        {products.length > 0 ? (
          <>
            {categories.map((category) => (
              <ProductSection
                key={category}
                title={category}
                category={category}
                products={products} 
              />
            ))}
          </>
        ) : (
          <div className="grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mx-3 mt-2">
            {Array(4)
              .fill()
              .map((_, index) => (
                <ProductBox
                  key={index}
                  description=""
                  price=""
                  image="/images/default-Image.png"
                />
              ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
