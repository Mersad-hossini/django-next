import React from "react";

function UserState({ title, count, icon: Icon, iconeColor }) {
  return (
    <div className="flex justify-end gap-x-4 w-64 col-span-3">
      <div className="flex flex-col items-end">
        <span className="text-gray-400 font-bold">{title}</span>
        <span dir="rtl" className="font-bold text-white mt-1">
          {count}
        </span>
      </div>
      <div className="flex items-center justify-center">
        {Icon && <Icon className={`size-10 sm:size-12 ${iconeColor}`} />}
      </div>
    </div>
  );
}

export default UserState;