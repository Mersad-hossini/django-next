import React, { useEffect, useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import swal from "sweetalert";
import Modal from "@/components/modules/Modal/Modal";

function ProductTable({ products, onDelete, fetchProducts }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [allCategories, setAllCategories] = useState([]);

  const formFields = [
    { name: "title", label: "Product Title", type: "text" },
    { name: "slug", label: "URL", type: "text" },
    { name: "price", label: "Price", type: "number" },
    { name: "image", label: "Image", type: "file" },
    { name: "categories", label: "categories", type: "select" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "is_active", label: "Is Active", type: "checkbox" },
  ];

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleModalSubmit = async (updatedProduct) => {
    const formData = new FormData();

    for (const key in updatedProduct) {
      if (key !== "image" && updatedProduct.hasOwnProperty(key)) {
        formData.append(key, updatedProduct[key]);
      }
    }

    if (updatedProduct.image && updatedProduct.image[0] instanceof File) {
      formData.append("image", updatedProduct.image[0]);
    }

    try {
      const res = await fetch(
        `https://api.mander.ir/admin-panel/products/${selectedProduct.id}/`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        }
      );

      const result = await res.json();

      if (res.ok) {
        swal("Updated!", result.message || "Product updated.", "success");
        setShowModal(false);
        fetchProducts();
      } else {
        swal(
          "Error",
          result.message || "Error while updating product",
          "error"
        );
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
      swal("Error", "Something went wrong!", "error");
    }
  };

  const removeProductHandler = async (id) => {
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
          `https://api.mander.ir/admin-panel/products/${id}/`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (res.ok) {
          const result = await res.json().catch(() => ({}));
          swal(
            "Deleted!",
            result.message || "Product deleted successfully",
            "success"
          );
          onDelete?.();
        } else {
          const result = await res.json().catch(() => ({}));
          swal(
            "Error",
            result.message || "Failed to delete the product",
            "error"
          );
        }
      } catch (err) {
        console.error(err);
        swal("Error", "Something went wrong!", "error");
      }
    }
  };

  const fetchCategories = async () => {
    const res = await fetch(
      "https://api.mander.ir/admin-panel/products-category/",
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const categoryData = await res.json();

    setAllCategories(categoryData);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="overflow-x-auto m-3">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 whitespace-nowrap">
          <tr>
            <th className="p-4 text-left text-sm font-medium text-white">Id</th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Product Name
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Url
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Price
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Image
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Product verification
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Category
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {products.map((product, index) => (
            <tr key={product.id} className="even:bg-blue-50">
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {index + 1}
              </td>
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {product.title}
              </td>
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {product.slug}
              </td>
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {Number(product.price).toLocaleString()}
              </td>
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {product.image.substring(42)}
              </td>
              <td className="p-4 text-sm text-slate-600 font-medium">
                {product.is_active ? (
                  <span className="p-1 text-white text-xl rounded-sm">✅</span>
                ) : (
                  <span className="p-1 text-white text-xl rounded-sm">❌</span>
                )}
              </td>
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {product.categories[0]?.title
                  ? product.categories[0].title
                  : "-"}
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <PencilSquareIcon
                    className="size-6 text-blue-500 cursor-pointer"
                    onClick={() => handleEditClick(product)}
                  />
                  <TrashIcon
                    className="size-6 text-red-500 cursor-pointer"
                    onClick={() => removeProductHandler(product.id)}
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
            setSelectedProduct(null);
          }}
          onSubmit={handleModalSubmit}
          initialData={selectedProduct}
          fields={formFields}
          allCategories={allCategories}
        />
      )}
    </div>
  );
}

export default ProductTable;