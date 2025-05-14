import React, { useEffect, useState } from "react";
import AddCategoryForm from "../AddCategoryForm/AddCategoryForm";
import CategoryTable from "../CategoryTable/CategoryTable";
import DualSpinner from "@/components/modules/DualSpinner/DualSpinner";

function categoryPanel() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://api.mander.ir/product/product-category/",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const categoryData = await res.json();
      setCategories(categoryData);
    } catch (error) {
      console.error("Something went wrong:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <AddCategoryForm onCategoryAdded={fetchCategories} />
      {isLoading ? (
        <DualSpinner />
      ) : (
        <CategoryTable categories={categories} onDelete={fetchCategories} />
      )}
    </>
  );
}

export default categoryPanel;