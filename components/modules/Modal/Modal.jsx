import { useEffect, useState } from "react";
import PanelInput from "../PanelForm/PanelInput";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function Modal({ show, onClose, onSubmit, initialData }) {
  const [productname, setProductname] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // 🔁 When modal opens with data, prefill all fields
  useEffect(() => {
    if (initialData) {
      setProductname(initialData.productname || "");
      setUrl(initialData.url || "");
      setPrice(initialData.price || "");
      setCategory(initialData.category || "");
      setDescription(initialData.description || "");
      setImage(initialData.image || "");
    } else {
      // if there's no initialData, reset all inputs (optional)
      setProductname("");
      setUrl("");
      setPrice("");
      setCategory("");
      setDescription("");
      setImage("");
    }
  }, [initialData, show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      productname,
      url,
      price,
      category,
      description,
      image,
      _id: initialData?._id, // if present, used to update product
    };

    onSubmit(productData);
    onClose();
  };

  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-400 rounded-2xl shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Update Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          <PanelInput
            type="text"
            icon={InformationCircleIcon}
            value={productname}
            onChangeHandler={(e) => setProductname(e.target.value)}
          />
          <PanelInput
            name="Url"
            type="text"
            icon={InformationCircleIcon}
            value={url}
            onChangeHandler={(e) => setUrl(e.target.value)}
          />
          <PanelInput
            name="Price"
            type="text"
            icon={InformationCircleIcon}
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

          <label className="inline-block text-sm text-white font-semibold mb-3">
            Category
          </label>
          <select
            className="w-full placeholder:text-gray-400 outline-0 text-gray-900 dark:text-white bg-darker text-sm py-3.5 pr-3.5 pl-13 rounded opacity-60"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- Select a Category --</option>
            <option value="clothe">clothe</option>
            <option value="digital">digital</option>
            <option value="food">food</option>
          </select>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            placeholder="Description"
            className="w-full placeholder:text-gray-400 outline-0 text-gray-900 dark:text-white bg-darker text-sm py-3.5 pr-3.5 pl-13 rounded opacity-60"
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}