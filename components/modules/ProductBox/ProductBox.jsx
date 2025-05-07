import useAddToCart from "@/hocks/useAddToCart/useAddToCart";
import Link from "next/link";
import React from "react";

function ProductBox({ _id, productname, image, description, price }) {
  const { addToCart, loading, error } = useAddToCart();

  return (
    <div className="border-white shadow bg-white rounded-xl">
      {/* Top */}
      <Link href={`/product/${_id}`} className="block h-42">
        <img
          src={image || "/images/default-Image.png"}
          className="size-full object-contain rounded-xl"
          alt="Product"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/default-Image.png";
          }}
        />
      </Link>
      {/* Middle */}
      <div className="flex-grow px-4.5 pt-4 pb-3">
        <h3 className="line-clamp-2 mb-3">
          <Link href={`/product/${_id}`}>{productname}</Link>
        </h3>
        <p className="text-sm line-clamp-2 text-gray-700 dark:text-gray-400">
          {`${description.substring(0, 100)}...`}
        </p>
      </div>
      <div className="px-4.5 pb-3">
        <div className="flex items-end justify-between mt-4 pt-4 border-t border-t-neutral-200/70">
          <div className="flex items-center gap-x-2.5 w-full">
            <div className="flex justify-between items-center flex-row w-full">
              <span className="text-2xl">
                {Number(price).toLocaleString()}
                <span className="font-danaMedium text-base">$</span>
              </span>
              {_id && (
                <button
                  className="bg-blue-400 text-white p-1 rounded-sm cursor-pointer"
                  onClick={() => addToCart(_id)}
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add to cart"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductBox;