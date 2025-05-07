import React from "react";

function FormTitle({title, desc}) {
  return (
    <div className="text-center mb-5">
      <h1 className="text-3xl mb-3 font-bold select-none">{title}</h1>
      <p className="select-none">{desc}</p>
    </div>
  );
}

export default FormTitle;
