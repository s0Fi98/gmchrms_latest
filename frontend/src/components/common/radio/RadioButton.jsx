import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function RadioButton({
  label,
  name,
  options = [],
  value,
  onChange,
  status, // "success" | "error" | undefined
  message,
  direction = "col", // "col" | "row"
  disabled = false,
  className = "",
}) {
  const s = status || "default";

  // Card wrapper states matching Sleek Tech palette
  const wrapperStyles = {
    default:
      "border-slate-200 hover:border-slate-300 has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50/20 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-indigo-500/10",
    success:
      "border-emerald-200 bg-emerald-50/10 has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50/20 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-emerald-500/10",
    error:
      "border-rose-300 bg-rose-50/10 has-[:checked]:border-rose-600 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-rose-500/10",
  };

  // Radio input accents
  const dotStyles = {
    default: "text-indigo-600 focus:ring-indigo-500/20 accent-indigo-600",
    success: "text-emerald-600 focus:ring-emerald-500/20 accent-emerald-600",
    error: "text-rose-600 focus:ring-rose-500/20 accent-rose-600",
  };

  return (
    <fieldset className={`w-full mb-3 select-none ${className}`}>
      {label && (
        <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-700">
          {label}
        </legend>
      )}

      <div
        className={
          direction === "row"
            ? "grid grid-cols-1 sm:grid-flow-col sm:auto-cols-fr gap-2.5"
            : "flex flex-col gap-2"
        }
      >
        {options.map((opt) => {
          const isSelected = value === opt.value;
          const optDisabled = disabled || opt.disabled;

          return (
            <label
              key={opt.value}
              htmlFor={`${name}-${opt.value}`}
              className={`flex items-start gap-3 rounded-xl border bg-white p-3 cursor-pointer transition-all duration-150 ${
                optDisabled
                  ? "opacity-50 cursor-not-allowed bg-slate-50"
                  : ""
              } ${wrapperStyles[s]}`}
            >
              <input
                type="radio"
                id={`${name}-${opt.value}`}
                name={name}
                value={opt.value}
                checked={isSelected}
                disabled={optDisabled}
                onChange={onChange}
                className={`h-4 w-4 mt-0.5 border-slate-300 transition-colors cursor-pointer disabled:cursor-not-allowed ${dotStyles[s]}`}
              />

              <div className="flex-1 text-xs">
                <span className="font-semibold text-slate-800 leading-tight block">
                  {opt.label}
                </span>
                {opt.description && (
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5 leading-normal">
                    {opt.description}
                  </p>
                )}
              </div>

              {/* Status Icons on selected item */}
              {isSelected && status === "success" && (
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              )}
              {isSelected && status === "error" && (
                <AlertCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />
              )}
            </label>
          );
        })}
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
    </fieldset>
  );
}
