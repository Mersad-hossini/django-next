import React, { useEffect, useState } from "react";
import AddCategoryForm from "../AddCategoryForm/AddCategoryForm";
import CategoryTable from "../CategoryTable/CategoryTable";

function categoryPanel() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await fetch("https://api.mander.ir/product/product-category/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const categoryData = await res.json();    

    setCategories(categoryData);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <AddCategoryForm onCategoryAdded={fetchCategories} />
      <CategoryTable categories={categories} onDelete={fetchCategories} />
    </>
  );
}

export default categoryPanel;