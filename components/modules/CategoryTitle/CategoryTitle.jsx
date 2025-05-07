import React from "react";

function CategoryTitle({title}) {
  return (
    <div className="flex items-center mx-5 mt-4">
      <p className="text-gray-700 text-lg whitespace-nowrap">{title}</p>
      <div className="flex-1 h-[2px] bg-gray-700 ml-4"></div>
    </div>
  );
}

export default CategoryTitle;
