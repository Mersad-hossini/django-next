import ProductLayOut from "@/components/templates/ProductLayOut/ProductLayOut";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const { id } = router.query;

    if (!id) {
      setIsLoading(false);
      setError("No product ID provided");
      return;
    }

    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.mander.ir/product/products/${id}/`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch product: ${res.status}`);
        }
        const data = await res.json();

        if (!data || Object.keys(data).length === 0) {
          throw new Error("No product data found");
        }

        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err.message);
        setError(err.message);
        setTimeout(() => {
          router.replace("/NotFound");
        }, 100);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [router.isReady, router.query]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div
        className="bg-red-100 border text-center border-orange-400 mt-10 text-orange-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <span className="block sm:inline">No product found!</span>
      </div>
    );
  }

  return <ProductLayOut product={product} />;
}

export default ProductDetails;