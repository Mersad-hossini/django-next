function PanelInput({ icon: Icon, placeholder, type, error, ...reset }) {
  return (
    <div className="mb-5">
      <label className="inline-block text-sm text-white font-semibold mb-2">
        {placeholder}
      </label>

      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          {...reset}
          className={`w-full placeholder:text-gray-400 outline-0 text-gray-900 dark:text-white bg-darker text-sm py-3.5 pr-3.5 pl-13 rounded opacity-60 ${
            error ? "border border-red-500" : ""
          }`}
        />
        {Icon && (
          <Icon className="absolute left-3.5 top-0 bottom-0 my-auto size-6 text-slate-500 dark:text-gray-400" />
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default PanelInput;