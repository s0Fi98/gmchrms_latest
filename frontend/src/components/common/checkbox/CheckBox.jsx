import React from "react";

const checkbox = ({ label, id, checked, onChange, status, message }) => {
  const s = status || "default";

  const ringColor = {
    default:
      "border-gray-300 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500",
    success:
      "border-gray-300 has-[:checked]:border-green-500 has-[:checked]:ring-1 has-[:checked]:ring-green-500",
    error: "border-red-300",
  };

  const boxColor = {
    default: "text-blue-600",
    success: "text-green-600",
    error: "text-red-600",
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-center gap-3 rounded-md border bg-white px-3 py-2.5 text-sm
          transition-colors hover:border-gray-400 ${ringColor[s]}`}
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className={`h-4 w-4 rounded border-gray-300 focus:ring-0 focus:ring-offset-0 ${boxColor[s]}`}
        />
        <span className="text-gray-900">{label}</span>
      </label>

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

export default checkbox;
