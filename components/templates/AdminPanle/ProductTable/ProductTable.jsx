import React, { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import swal from "sweetalert";
import Modal from "@/components/modules/Modal/Modal";

function ProductTable({ products, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleModalSubmit = async (updatedProduct) => {
    try {
      const res = await fetch(`/api/product/${selectedProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const result = await res.json();

      if (res.ok) {
        swal("Updated!", result.message || "Product updated.", "success");
        setShowModal(false);
        setSelectedProduct(null);
        onDelete?.(); // You might rename this to `onUpdate` for clarity
      } else {
        swal("Error", result.message, "error");
      }
    } catch (err) {
      console.error(err);
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
        const res = await fetch(`https://api.mander.ir/product/products/${id}/`, {
          method: "DELETE",
        });

        const result = await res.json();

        if (res.ok) {
          swal("Deleted!", result.message, "success");
          onDelete?.();
        } else {
          swal("Error", result.message, "error");
        }
      } catch (err) {
        console.error(err);
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
              Category
            </th>
            <th className="p-4 text-left text-sm font-medium text-white">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {products?.map((product, index) => (
            <tr key={product.id} className="even:bg-blue-50">
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {index + 1}
              </td>
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {product.productname}
              </td>
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {product.url}
              </td>
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {Number(product.price).toLocaleString()}
              </td>
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {product.image}
              </td>
              <td className="p-4 text-[15px] text-slate-600 font-medium">
                {product.category}
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
        />
      )}
    </div>
  );
}

export default ProductTable;