import { useEffect, useState } from "react";
import PanelInput from "../PanelForm/PanelInput";


export default function Modal({
  show,
  onClose,
  onSubmit,
  initialData,
  fields,
}) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      const emptyData = {};
      fields.forEach((field) => (emptyData[field.name] = ""));
      setFormData(emptyData);
    }
  }, [initialData, fields]);

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, _id: initialData?._id });
    onClose();
  };

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-400 rounded-2xl shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
          {fields.map((field) => {
            if (field.type === "textarea") {
              return (
                <textarea
                  key={field.name}
                  name={field.name}
                  placeholder={field.label}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(e, field.name)}
                  className="w-full placeholder:text-gray-400 outline-0 text-gray-900 dark:text-white bg-darker text-sm py-3.5 pr-3.5 pl-13 rounded opacity-60"
                />
              );
            }

            return (
              <PanelInput
                key={field.name}
                type={field.type}
                name={field.label}
                icon={InformationCircleIcon}
                value={formData[field.name] || ""}
                onChangeHandler={(e) => handleChange(e, field.name)}
              />
            );
          })}

          {/* Example of a fixed dropdown */}
          <label className="inline-block text-sm text-white font-semibold mb-3">
            Category
          </label>
          <select
            value={formData.category || ""}
            onChange={(e) => handleChange(e, "category")}
            className="w-full placeholder:text-gray-400 outline-0 text-gray-900 dark:text-white bg-darker text-sm py-3.5 pr-3.5 pl-13 rounded opacity-60"
          >
            <option value="">-- Select a Category --</option>
            <option value="clothe">clothe</option>
            <option value="digital">digital</option>
            <option value="food">food</option>
          </select>

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