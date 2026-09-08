import React from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function InputField({
  label,
  id,
  type = "text",
  value,
  onChange,
  status, // "success" | "error" | undefined
  message,
  required = false,
  disabled = false,
  ...props
}) {
  const s = status || "default";

  // Aligned with the HRMS Slate + Indigo palette
  const stateStyles = {
    default:
      "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10",
    success:
      "border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 bg-emerald-50/10",
    error:
      "border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 bg-rose-50/10",
  };

  const labelColor = {
    default: "text-slate-400 peer-focus:text-indigo-600",
    success: "text-emerald-600",
    error: "text-rose-600",
  };

  return (
    <div className="w-full mb-3.5">
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder=" "
          required={required}
          className={`peer w-full rounded-xl border bg-white px-3.5 pt-4 pb-2 text-xs font-semibold text-slate-800
            placeholder-transparent transition-all outline-none disabled:bg-slate-50 disabled:cursor-not-allowed
            ${status ? "pr-10" : "pr-3.5"} ${stateStyles[s]}`}
          {...props}
        />

        {/* Floating Label */}
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-3 top-1 text-[10px] font-bold tracking-wide uppercase px-1 bg-white transition-all
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-placeholder-shown:text-slate-400
            peer-focus:top-1 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase ${labelColor[s]}`}
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>

        {/* Right Status Feedback Icons */}
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
          {status === "success" && (
            <CheckCircle2 size={16} className="text-emerald-500" />
          )}
          {status === "error" && (
            <AlertCircle size={16} className="text-rose-500" />
          )}
        </div>
      </div>

      {/* Dynamic Feedback Messaging */}
      {message && (
        <p
          className={`mt-1.5 px-1 text-[11px] font-medium flex items-center gap-1 ${
            status === "error"
              ? "text-rose-600"
              : status === "success"
              ? "text-emerald-600"
              : "text-slate-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
