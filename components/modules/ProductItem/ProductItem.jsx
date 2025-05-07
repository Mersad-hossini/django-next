import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import swal from "sweetalert";

function ProductItem({ product, quantity }) {
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
    <>
      <div className="cart-item flex items-center gap-x-3">
        <Link href={`/product/${product._id}`} className="shrink-0">
          <img
            className="h-15 aspect-video rounded-lg object-contain"
            src={product.image}
            alt={product.productname}
          />
        </Link>
        <div className="flex flex-col justify-between text-white">
          <Link href="#" className="line-clamp-2 font-danaMedium text-sm">
            {product.productname}
          </Link>
          <div className="flex items-center gap-x-2 text-slate-500 dark:text-gray-400">
            <span className="font-danaMedium text-sm">{product.price}$</span>
            <div className="flex items-center gap-x-1">
              <span className="font-danaMedium text-sm border border-green-600 bg-green-600 rounded-sm py-0.5 px-1.5 text-white">
                {quantity}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-x-2 text-slate-500 dark:text-gray-400">
            <span className="font-danaMedium text-sm">{totalPrice}$</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-red-500 ml-auto">
          <TrashIcon
            className="size-4 transition-colors cursor-pointer"
            onClick={removeProductFromCart}
          />
        </button>
      </div>
    </>
  );
}

export default ProductItem;