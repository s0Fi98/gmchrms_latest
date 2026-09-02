import React from "react";

const SelectField = ({
  label,
  id,
  value,
  onChange,
  options,
  status,
  message,
  placeholder = "Select an option",
}) => {
  const stateStyles = {
    default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    success: "border-green-500 focus:border-green-500 focus:ring-green-500",
    error: "border-red-500 focus:border-red-500 focus:ring-red-500",
  };

  const labelColor = {
    default: "text-gray-500 peer-focus:text-blue-600",
    success: "text-green-600",
    error: "text-red-600",
  };

  const s = status || "default";
  const hasValue = value !== "" && value !== undefined;

  return (
    <div className="mb-4">
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={`peer w-full appearance-none rounded-md border bg-white px-3 pt-4 pb-1.5 pr-9 text-sm text-gray-900
            focus:outline-none focus:ring-1 transition-colors ${stateStyles[s]}`}
        >
          <option value="" disabled hidden></option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <label
          htmlFor={id}
          className={`absolute left-3 bg-white px-1 transition-all pointer-events-none
            ${hasValue ? "top-1.5 text-[10px]" : "top-3 text-sm text-gray-400"}
            peer-focus:top-1.5 peer-focus:text-[10px] ${labelColor[s]}`}
        >
          {label}
        </label>

        {/* chevron icon */}
        <svg
          className="pointer-events-none absolute right-3 top-3.5 h-4 w-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>

        {status === "success" && (
          <svg
            className="absolute right-9 top-3.5 h-4 w-4 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>

      {message && (
        <p
          className={`mt-1 text-xs ${status === "error" ? "text-red-600" : "text-gray-500"}`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default SelectField;
