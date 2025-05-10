import React, { useEffect, useState } from "react";
import AddProductForm from "../AddProdutcfForm/AddProdutcfForm";
import ProductTable from "../ProductTable/ProductTable";

function ProductPanel() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("https://api.mander.ir/admin-panel/products/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const productData = await res.json();        

    setProducts(productData);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <AddProductForm onProductAdded={fetchProducts} />
      <ProductTable products={products} onDelete={fetchProducts} />
    </>
  );
}

export default ProductPanel;