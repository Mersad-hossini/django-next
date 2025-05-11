import React from "react";
import { ShoppingBagIcon, TrashIcon } from "@heroicons/react/24/outline";

function CartBox({ product, quantity, onRemove = () => {} }) {
  const totalPrice = product.price * quantity;

  const removeProductFromCart = async () => {
    const res = await fetch("/api/cart/remove", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: product._id }),
    });

    if (res.ok) {
      const data = await res.json();
      swal({
        title: data.message || "Product Deleted Successfully",
        icon: "success",
        buttons: "Ok",
      });
      if (typeof onRemove === "function") {
        onRemove(product._id);
      }
    } else {
      const err = await res.json();
      swal({
        title: err.message || "Something went wrong!!!",
        icon: "error",
        buttons: "Ok",
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-green-500 text-white">
        <div className="flex items-center gap-2">
          <ShoppingBagIcon className="w-6 h-6" />
          <span className="font-semibold">Cart</span>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-around gap-4">
          <img
            src={product.image}
            alt={product.productname}
            className="w-full sm:w-48 rounded aspect-video object-contain"
          />
          <div className="flex-1 space-y-1">
            <h3 className="font-medium text-sm line-clamp-2 text-white">
              {product.productname}
            </h3>
          </div>

          <div className="flex flex-col justify-end items-end">
            <span className="text-sm border border-green-600 bg-green-600 rounded-sm py-0.5 px-1.5 text-white">
              {quantity}
            </span>
            <div className="text-green-600 font-semibold mt-1">
              Per: {product.price} $
            </div>
            <div className="text-green-600 font-semibold mt-1">
              Total: {totalPrice} $
            </div>
            <div
              className="text-red-600 font-semibold mt-3 cursor-pointer"
              onClick={removeProductFromCart}
            >
              <TrashIcon className="size-7" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartBox;