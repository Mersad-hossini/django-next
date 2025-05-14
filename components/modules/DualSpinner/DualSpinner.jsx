import React from "react";

function DualSpinner() {
  return (
    <div className="flex items-center justify-center h-screen transition-opacity duration-500 opacity-100">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-t-green-500 border-r-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-b-green-500 border-l-transparent rounded-full animate-spin [animation-duration:1.5s]"></div>
      </div>
    </div>
  );
}

export default DualSpinner;