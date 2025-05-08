import PanelInput from "@/components/modules/PanelForm/PanelInput";
import React, { useState } from "react";

import {
  ClipboardIcon,
  GlobeAsiaAustraliaIcon,
  PrinterIcon,
  TagIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import swal from "sweetalert";
import productSchema from "@/validations/product";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

function AddProductForm({ onProductAdded }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productName: "",
      urlName: "",
      price: "",
      image: "",
      category: "",
      description: "",
    },
    resolver: yupResolver(productSchema),
  });

  const addNewProductHandler = async (productInfos) => {    
    const res = await fetch("https://api.mander.ir/product/products/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productInfos),
    });
    const data = await res.json();
    if (res.status === 201) {
      swal({
        title: "Product Successfully Created",
        icon: "success",
        button: "Ok",
      });
      onProductAdded();
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
      <form onSubmit={handleSubmit(addNewProductHandler)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 md:pr-5 mt-5">
          <PanelInput
            type="text"
            placeholder="title"
            icon={ClipboardIcon}
            error={errors.productName?.message}
            {...register("productName")}
          />
          <PanelInput
            placeholder="Url"
            type="text"
            icon={GlobeAsiaAustraliaIcon}
            error={errors.urlName?.message}
            {...register("urlName")}
          />
          <PanelInput
            placeholder="price"
            type="text"
            error={errors.price?.message}
            icon={PrinterIcon}
            {...register("price")}
          />
          <PanelInput
            type="text"
            icon={InformationCircleIcon}
            placeholder="image"
            error={errors.image?.message}
            {...register("image")}
          />
          <div>
            <label
              htmlFor="category"
              className="inline-block text-sm text-white font-semibold mb-3"
            >
              Category
            </label>
            <div id="category" className="relative">
              <select
                className="w-full placeholder:text-gray-400 outline-0 text-gray-900 dark:text-white bg-darker text-sm py-3.5 pr-3.5 pl-13 rounded opacity-60"
                {...register("category")}
              >
                <option value="-1">-- Select a Category --</option>
                <option value="clothe">clothe</option>
                <option value="digital">digital</option>
                <option value="food">food</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category?.message}
                </p>
              )}
              <TagIcon className="absolute left-3.5 top-0 bottom-0 my-auto size-6 text-slate-500 dark:text-gray-400" />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="inline-block text-sm text-white font-semibold mb-3"
            >
              Description
            </label>
            <div id="description" className="relative">
              <textarea
                placeholder="description"
                {...register("description")}
                rows="8"
                cols="8"
                className="w-full placeholder:text-gray-400 outline-0 text-gray-900 dark:text-white bg-darker text-sm py-3.5 pr-3.5 pl-3 rounded opacity-60"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-center flex-wrap mt-8 md:pr-5">
          <button className="w-full sm:w-62 bg-green-600 hover:bg-green-700 transition-colors cursor-pointer py-3 rounded-md text-white">
            Add New Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;