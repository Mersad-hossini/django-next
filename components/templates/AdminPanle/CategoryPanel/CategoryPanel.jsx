import React, { useEffect, useState } from "react";
import AddCategoryForm from "../AddCategoryForm/AddCategoryForm";
import CategoryTable from "../CategoryTable/CategoryTable";

function categoryPanel() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    setIsLoading(true); // فعال کردن لودینگ
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
        <div className="flex justify-center items-center h-32">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <CategoryTable categories={categories} onDelete={fetchCategories} />
      )}
    </>
  );
}

export default categoryPanel;
