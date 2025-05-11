import React, { useEffect, useState } from "react";
import AddProductForm from "../AddProdutcfForm/AddProdutcfForm";
import ProductTable from "../ProductTable/ProductTable";

function ProductPanel() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true); // ⬅️ فعال کردن حالت لودینگ
      const res = await fetch("https://api.mander.ir/admin-panel/products/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const productData = await res.json();
      if (res.ok) {
        setProducts(productData);
      } else {
        console.error("خطا در دریافت محصولات:", productData);
      }
    } catch (err) {
      console.error("خطای شبکه:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <AddProductForm onProductAdded={fetchProducts} />
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <ProductTable products={products} fetchProducts={fetchProducts} onDelete={fetchProducts} />
      )}
    </>
  );
}

export default ProductPanel;
