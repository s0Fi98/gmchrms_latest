import React from "react";

const RadioButton = ({
  label,
  name,
  options,
  value,
  onChange,
  status,
  message,
}) => {
  const s = status || "default";

  const ringColor = {
    default:
      "border-gray-300 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500",
    success:
      "border-gray-300 has-[:checked]:border-green-500 has-[:checked]:ring-1 has-[:checked]:ring-green-500",
    error: "border-red-300",
  };

  const dotColor = {
    default: "text-blue-600",
    success: "text-green-600",
    error: "text-red-600",
  };

  return (
    <fieldset className="mb-4">
      {label && (
        <legend className="mb-2 text-sm font-medium text-gray-700">
          {label}
        </legend>
      )}

      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            htmlFor={`${name}-${opt.value}`}
            className={`flex cursor-pointer items-center gap-3 rounded-md border bg-white px-3 py-2.5 text-sm
              transition-colors hover:border-gray-400 ${ringColor[s]}`}
          >
            <input
              type="radio"
              id={`${name}-${opt.value}`}
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
              className={`h-4 w-4 border-gray-300 focus:ring-0 focus:ring-offset-0 ${dotColor[s]}`}
            />
            <span className="text-gray-900">{opt.label}</span>
          </label>
        ))}
      </div>

      {message && (
        <p
          className={`mt-1 text-xs ${status === "error" ? "text-red-600" : "text-gray-500"}`}
        >
          {message}
        </p>
      )}
    </fieldset>
  );
};

export default RadioButton;
