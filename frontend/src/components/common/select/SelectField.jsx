import React from "react";
import { ChevronDown, CheckCircle2, AlertCircle } from "lucide-react";

export default function SelectField({
  label,
  id,
  value,
  onChange,
  options = [],
  status, // "success" | "error" | undefined
  message,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  className = "",
  ...props
}) {
  const s = status || "default";
  const hasValue = value !== "" && value !== undefined && value !== null;

  // Design system borders & glow states
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
    <div className={`w-full mb-3.5 ${className}`}>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={`peer w-full appearance-none rounded-xl border bg-white px-3.5 pt-4 pb-2 text-xs font-semibold text-slate-800
            transition-all outline-none disabled:bg-slate-50 disabled:cursor-not-allowed cursor-pointer
            ${status ? "pr-16" : "pr-10"} ${stateStyles[s]}`}
          {...props}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option 
              key={opt.value} 
              value={opt.value} 
              disabled={opt.disabled}
              className="py-1 text-slate-700 bg-white"
            >
              {opt.label}
            </option>
          ))}
        </select>

        {/* Floating Label */}
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-3 bg-white px-1 transition-all duration-150 select-none
            ${
              hasValue
                ? "top-1 text-[10px] font-bold uppercase tracking-wide"
                : "top-3 text-xs font-medium text-slate-400"
            }
            peer-focus:top-1 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase ${labelColor[s]}`}
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>

        {/* Right Status Feedback & Dropdown Chevron */}
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-1.5">
          {status === "success" && (
            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
          )}
          {status === "error" && (
            <AlertCircle size={16} className="text-rose-500 shrink-0" />
          )}
          <ChevronDown
            size={16}
            className="text-slate-400 peer-focus:text-indigo-600 transition-colors shrink-0"
          />
        </div>
      </div>

      {/* Validation Message */}
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
