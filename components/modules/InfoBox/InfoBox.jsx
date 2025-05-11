import React from "react";

function InfoBox({ title, count, icon: Icon }) {
  return (
    <div className="w-80 h-25 bg-blue-400 m-5 text-white">
      {Icon && <Icon className="size-12 text-center w-full" />}
      <div className="flex-center mt-2">
        <h2>{title}:</h2>
        <span>{count}</span>
      </div>
    </div>
  );
}

export default InfoBox;