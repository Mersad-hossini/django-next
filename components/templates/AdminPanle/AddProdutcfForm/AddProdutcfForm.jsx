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

function AddProductForm({ onProductAdded }) {
  const [productName, setProductName] = useState("");
  const [urlName, setUrlName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const addNewProductHandler = async (e) => {
    e.preventDefault();
    const productInfos = {
      productname: productName,
      url: `/${urlName}`,
      price: price,
      image: `/images/${image}`,
      category,
      description,
    };

    const res = await fetch("/api/product/product-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productInfos),
    });
    const data = await res.json();
    if (res.status === 201) {
      setProductName("");
      setUrlName("");
      setPrice("");
      setImage("");
      setCategory("");
      setDescription("");

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
      <form action="#" onSubmit={addNewProductHandler}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 md:pr-5 mt-5">
          <PanelInput
            name="Product name"
            type="text"
            icon={ClipboardIcon}
            value={productName}
            onChangeHandler={(e) => setProductName(e.target.value)}
          />
          <PanelInput
            name="Url"
            type="text"
            icon={GlobeAsiaAustraliaIcon}
            value={urlName}
            onChangeHandler={(e) => setUrlName(e.target.value)}
          />
          <PanelInput
            name="Price"
            type="text"
            icon={PrinterIcon}
            value={price}
            onChangeHandler={(e) => setPrice(e.target.value)}
          />
          <PanelInput
            name="Image"
            type="text"
            icon={InformationCircleIcon}
            value={image}
            onChangeHandler={(e) => setImage(e.target.value)}
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="-1">-- Select a Category --</option>
                <option value="clothe">clothe</option>
                <option value="digital">digital</option>
                <option value="food">food</option>
              </select>
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="8"
                cols="8"
                className="w-full placeholder:text-gray-400 outline-0 text-gray-900 dark:text-white bg-darker text-sm py-3.5 pr-3.5 pl-3 rounded opacity-60"
              ></textarea>
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