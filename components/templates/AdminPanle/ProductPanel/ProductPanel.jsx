import React, { useEffect, useState } from "react";
import AddProductForm from "../AddProdutcfForm/AddProdutcfForm";
import ProductTable from "../ProductTable/ProductTable";
import DualSpinner from "@/components/modules/DualSpinner/DualSpinner";

function ProductPanel() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
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
        console.error("Error in receiving products:", productData);
      }
    } catch (err) {
      console.error("Network error:", err);
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
        <DualSpinner />
      ) : (
        <ProductTable
          products={products}
          fetchProducts={fetchProducts}
          onDelete={fetchProducts}
        />
      )}
    </>
  );
}

export default ProductPanel;
