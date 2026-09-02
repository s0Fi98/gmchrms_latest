import React from 'react'

const TextArea = ({ label, id, value, onChange, status, message, rows = 4 }) => {

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
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder=" "
          className={`peer w-full resize-y rounded-md border bg-white px-3 pt-5 pb-1.5 text-sm text-gray-900
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
          <svg className="absolute right-3 top-3 h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      <div className="mt-1 flex items-center justify-between">
        {message ? (
          <p className={`text-xs ${status === "error" ? "text-red-600" : "text-gray-500"}`}>
            {message}
          </p>
        ) : <span />}
        {typeof value === "string" && (
          <span className="text-xs text-gray-400">{value.length} chars</span>
        )}
      </div>
    </div>
  )
}

export default TextArea