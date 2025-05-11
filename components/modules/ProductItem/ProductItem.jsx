import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import swal from "sweetalert";

function ProductItem({
  final_price,
  quantity,
  total_item_price,
  id,
  product_info,
}) {
  const removeProductFromCart = async (orderId) => {
    try {
      const res = await fetch(
        `https://api.mander.ir/order/order-detail/${orderId}/`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }

      swal({
        title: "Product Deleted Successfully",
        icon: "success",
        buttons: "Ok",
      });

      window.dispatchEvent(new Event("cart-changed"));
    } catch (err) {
      console.error("Fetch failed:", err);
      swal({
        title: "Something went wrong!",
        text: err.message,
        icon: "error",
        buttons: "Ok",
      });
    }
  };

  return (
    <div className="cart-item flex items-center gap-x-3 mb-3">
      <Link href={`/product/${product_info.id}`} className="shrink-0">
        <img
          className="h-15 aspect-video rounded-lg object-contain"
          src={`https://api.mander.ir/${product_info.image}`}
          alt={product_info.title}
        />
      </Link>
      <div className="flex flex-col justify-between text-white">
        <Link
          href={`/product/${product_info.id}`}
          className="line-clamp-2 font-danaMedium text-sm"
        >
          {product_info.title}
        </Link>
        <div className="flex items-center gap-x-2 text-slate-500 dark:text-gray-400">
          <span className="font-danaMedium text-sm">{final_price}$</span>
          <span className="font-danaMedium text-sm border border-green-600 bg-green-600 rounded-sm py-0.5 px-1.5 text-white">
            {quantity}
          </span>
        </div>
        <div className="flex items-center gap-x-2 text-slate-500 dark:text-gray-400">
          <span className="font-danaMedium text-sm">{total_item_price}$</span>
        </div>
      </div>
      <button className="text-gray-400 hover:text-red-500 ml-auto">
        <TrashIcon
          className="size-4 transition-colors cursor-pointer"
          onClick={() => removeProductFromCart(id)}
        />
      </button>
    </div>
  );
}

export default ProductItem;