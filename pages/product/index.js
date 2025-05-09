import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Product() {
  const router = useRouter();

  useEffect(() => {
    router.push("/products");
  }, [router]);

  return (
    <div className="flex justify-center items-center h-32">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default Product;