import React from "react";

function ProductCardLoader() {
  return (
    <div className="text-center text-lg text-gray-600">
      <div className="border-white shadow bg-neutral-900 rounded-xl animate-pulse">
        <div className="block h-42 w-full bg-neutral-700 rounded-xl"></div>
        <div className="flex-grow px-4 pt-4 pb-3">
          <div className="h-4 bg-neutral-600 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-neutral-600 rounded w-full mb-1"></div>
          <div className="h-3 bg-neutral-600 rounded w-5/6"></div>
        </div>
        <div className="px-4 pb-3">
          <div className="flex items-end justify-between mt-4 pt-4 border-t border-t-neutral-200/70 border-t-neutral-700">
            <div className="flex items-center justify-between w-full">
              <div className="h-6 w-20 bg-neutral-600 rounded"></div>
              <div className="h-8 w-20 bg-neutral-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCardLoader;