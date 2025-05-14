import { useEffect } from "react";
import PanelInput from "../PanelForm/PanelInput";
import { useForm } from "react-hook-form";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function Modal({
  onClose,
  onSubmit,
  initialData,
  fields,
  allCategories,
}) {
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      if (initialData?.categories && initialData.categories.length > 0) {
        setValue("category_ids", initialData.categories[0].id);
      }
    }
  }, [initialData, reset, setValue]);

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-400 rounded-2xl shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">
          {initialData ? "Edit Product" : "Add Product"}
        </h2>
        <form
          className="space-y-4 flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          {fields.map((field, index) => {
            if (field.type === "select" && field.name === "categories") {
              return (
                <div key={index}>
                  <label className="inline-block text-sm text-white font-semibold mb-3">
                    {field.label}
                  </label>
                  <select
                    {...register("category_ids")}
                    className="w-full placeholder:text-gray-400 outline-0 text-white bg-darker text-sm py-3.5 pr-3.5 pl-13 rounded opacity-60"
                  >
                    {allCategories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            if (field.type === "checkbox") {
              return (
                <PanelInput
                  key={index}
                  type="checkbox"
                  name={field.name}
                  placeholder={field.label}
                  {...register(field.name)}
                />
              );
            }

            return (
              <PanelInput
                key={index}
                type={field.type}
                name={field.name}
                placeholder={field.label}
                icon={InformationCircleIcon}
                {...register(field.name)}
              />
            );
          })}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}