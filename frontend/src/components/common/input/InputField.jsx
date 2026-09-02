import React from "react";

const InputField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  status,
  message,
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

  return (
    <div className="mb-4">
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" "
          className={`peer w-full rounded-md border bg-white px-3 pt-4 pb-1.5 text-sm text-gray-900
            focus:outline-none focus:ring-1 transition-colors ${stateStyles[s]}`}
        />
        <label
          htmlFor={id}
          className={`absolute left-3 top-1.5 text-[10px] bg-white px-1 transition-all
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
            peer-focus:top-1.5 peer-focus:text-[10px] ${labelColor[s]}`}
        >
          {label}
        </label>

        {status === "success" && (
          <svg
            className="absolute right-3 top-3 h-4 w-4 text-green-500"
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

export default InputField;
