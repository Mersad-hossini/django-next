import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import swal from "sweetalert";
import Modal from "@/components/modules/Modal/Modal";

function CategoryTable({ categories, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleEditClick = (categories) => {
    setSelectedCategory(categories);
    setShowModal(true);
  };

  const handleModalSubmit = async (updatedCategoty) => {
    try {
      const res = await fetch(
        `https://api.mander.ir/product/product-category/${id}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCategoty),
        }
      );

      const result = await res.json();

      if (res.ok) {
        swal("Updated!", result.message || "Product updated.", "success");
        setShowModal(false);
        setSelectedCategory(null);
        onDelete?.(); // You might rename this to `onUpdate` for clarity
      } else {
        swal("Error", result.message, "error");
      }
    } catch (err) {
      console.error(err);
      swal("Error", "Something went wrong!", "error");
    }
  };

  const removeCategoryHandler = async (id) => {
    const confirm = await swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    });

    if (confirm) {
      try {
        const res = await fetch(
          `https://api.mander.ir/product/product-category/${id}/`,
          {
            method: "DELETE",
          }
        );

        let result = null;
        let message = "Category deleted successfully";

        if (res.status !== 204) {
          result = await res.json();
          message = result.message || message;
        }

        if (res.ok) {
          swal("Deleted!", message, "success");
          onDelete?.();
        } else {
          swal("Error", message, "error");
        }
      } catch (err) {
        console.error("Caught error in fetch:", err);
        swal("Error", "Something went wrong!", "error");
      }
    }
  };

  return (
    <div className="overflow-x-auto m-3">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 whitespace-nowrap">
          <tr>
            <th className="p-4 text-left text-sm font-medium text-white">Id</th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Title
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Url
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Account verification
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {categories?.map((category, index) => (
            <tr key={category.id} className="even:bg-blue-50">
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {index + 1}
              </td>
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {category.title}
              </td>
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {category.slug}
              </td>
              <td className="p-4 text-sm text-slate-600 font-medium">
                {category.is_active ? (
                  <>
                    <span className="p-1 text-white text-xl rounded-sm">
                      ✅
                    </span>
                  </>
                ) : (
                  <>
                    <span className="p-1 text-white text-xl rounded-sm">
                      ❌
                    </span>
                  </>
                )}
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <PencilSquareIcon
                    className="size-6 text-blue-500 cursor-pointer"
                    onClick={() => handleEditClick(categories)}
                  />
                  <TrashIcon
                    className="size-6 text-red-500 cursor-pointer"
                    onClick={() => removeCategoryHandler(category.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal
          show={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedCategory(null);
          }}
          onSubmit={handleModalSubmit}
          initialData={selectedCategory}
        />
      )}
    </div>
  );
}

export default CategoryTable;
