import React, { useEffect, useState } from "react";
import AddProductForm from "../AddProdutcfForm/AddProdutcfForm";
import ProductTable from "../ProductTable/ProductTable";

function ProductPanel() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await fetch("/api/product/product-data");
    const productData = await res.json();

    setProducts(productData.data);
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