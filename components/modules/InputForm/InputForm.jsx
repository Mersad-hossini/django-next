import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function InputForm({ type, placeholder, icon: Icon, ...rest }) {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle the password visibility
  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <div className="border border-gray-200 rounded-sm p-1 w-[80%] flex items-center mb-4">
      {Icon && <Icon className="w-6 h-6 text-gray-400" />}
      <input
        type={isVisible || type !== "password" ? "text" : "password"} // Conditionally toggle input type
        placeholder={placeholder}
        className="outline-0 w-full ml-2 select-none"
        {...rest}
      />
      {type === "password" && (
        <div className="cursor-pointer" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeIcon className="w-6 h-6 text-gray-400" />
          ) : (
            <EyeSlashIcon className="w-6 h-6 text-gray-400" />
          )}
        </div>
      )}
    </div>
  );
}

export default InputForm;