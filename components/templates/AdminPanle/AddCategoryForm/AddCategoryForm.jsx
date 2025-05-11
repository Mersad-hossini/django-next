import PanelInput from "@/components/modules/PanelForm/PanelInput";
import React from "react";

import {
  ClipboardIcon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/outline";
import swal from "sweetalert";
import categorySchema from "@/validations/category";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

function AddCategoryForm({ onCategoryAdded }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      is_active: false
    },
    resolver: yupResolver(categorySchema),
  });

  const addNewCategoryHandler = async (categoryInfos) => {
    const res = await fetch("https://api.mander.ir/admin-panel/products-category/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryInfos),
    });
    const data = await res.json();
    if (res.status === 201) {
      swal({
        title: "Category Successfully Created",
        icon: "success",
        button: "Ok",
      });
      onCategoryAdded();
      reset();
    } else {
      swal({
        title: data.message,
        icon: "warning",
        button: "Ok",
      });
    }
  };

  return (
    <div className="max-w-[1332px] w-full px-4 md:px-8 pb-5 md:pb-8 mx-auto">
      <form onSubmit={handleSubmit(addNewCategoryHandler)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 md:pr-5 mt-5">
          <PanelInput
            type="text"
            placeholder="title"
            icon={ClipboardIcon}
            error={errors.title?.message}
            {...register("title")}
          />
          <PanelInput
            placeholder="Url"
            type="text"
            icon={GlobeAsiaAustraliaIcon}
            error={errors.slug?.message}
            {...register("slug")}
          />
          <PanelInput
            placeholder="Active category to show"
            type="checkbox"
            error={errors.is_active?.message}
            {...register("is_active")}
          />
        </div>
        <div className="flex-center flex-wrap mt-8 md:pr-5">
          <button className="w-full sm:w-62 bg-green-600 hover:bg-green-700 transition-colors cursor-pointer py-3 rounded-md text-white">
            Add New Category
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCategoryForm;