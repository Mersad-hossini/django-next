import useAddToCart from "@/hocks/useAddToCart/useAddToCart";
import Link from "next/link";
import React from "react";
import swal from "sweetalert";

function ProductBox({ id, title, image, description, price }) {
  const { addToCart, loading } = useAddToCart();

  const isValidProduct = id && title && price;

  const handleAddToCart = async () => {
    try {
      await addToCart(id);
      swal.fire({
        title: "Added to cart!",
        icon: "success",
        timer: 1500,
      });
    } catch (error) {
      swal.fire({
        title: "Failed to add to cart",
        text: error.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <div className="border-white shadow bg-white rounded-xl">
      <Link
        href={isValidProduct ? `/product/${id}` : "#"}
        className={`block h-42 ${
          !isValidProduct ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <img
          src={image || "/images/default-Image.png"}
          className="size-full object-contain rounded-xl"
          alt={title ? `${title} image` : "Product image"}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/default-Image.png";
          }}
        />
      </Link>

      <div className="flex-grow px-4 pt-4 pb-3">
        <h3 className="line-clamp-2 mb-3">
          <Link href={isValidProduct ? `/product/${id}` : "#"}>
            {title || "No title"}
          </Link>
        </h3>
        <p className="text-sm line-clamp-2 text-gray-700 dark:text-gray-400">
          {description
            ? `${description.substring(0, 100)}...`
            : "No description"}
        </p>
      </div>

      <div className="px-4 pb-3">
        <div className="flex items-end justify-between mt-4 pt-4 border-t border-t-neutral-200/70">
          <div className="flex items-center gap-x-2 w-full">
            <div className="flex justify-between items-center flex-row w-full">
              <span className="text-2xl">
                {price ? Number(price).toLocaleString() : "N/A"}
                <span className="font-danaMedium text-base">$</span>
              </span>
              {isValidProduct && (
                <button
                  className="bg-blue-400 text-white p-1 rounded-sm cursor-pointer disabled:opacity-50"
                  onClick={handleAddToCart}
                  disabled={loading || !id}
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
