import React from "react";

function PanelInput({ icon: Icon, name, type, value, onChangeHandler }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="inline-block text-sm text-white font-semibold mb-3"
      >
        {name}
      </label>
      <div id={name} className="relative">
        <input
          name={name}
          type={type}
          value={value}
          placeholder={value ? value : "Please Enter your phone number" }
          onChange={onChangeHandler}
          className={`w-full placeholder:text-gray-400 outline-0 text-gray-900 dark:text-white bg-darker text-sm py-3.5 pr-3.5 pl-13 rounded opacity-60 ${
            !value ? "border border-red-500" : null
          }`}
        />
        {Icon && (
          <Icon className="absolute left-3.5 top-0 bottom-0 my-auto size-6 text-slate-500 dark:text-gray-400" />
        )}
      </div>
    </div>
  );
}

export default PanelInput;
