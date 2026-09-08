import React from "react";

const Checkbox = ({ label, id, checked, onChange, status, message }) => {
  const s = status || "default";

  const ringColor = {
    default:
      "border-slate-200 has-[:checked]:border-indigo-600 has-[:checked]:ring-4 has-[:checked]:ring-indigo-500/10 has-[:checked]:bg-indigo-50/20",
    success:
      "border-emerald-200 has-[:checked]:border-emerald-600 has-[:checked]:ring-4 has-[:checked]:ring-emerald-500/10 has-[:checked]:bg-emerald-50/20",
    error: "border-rose-300 has-[:checked]:border-rose-600",
  };

  const boxColor = {
    default: "text-indigo-600 focus:ring-0 focus:ring-offset-0 accent-indigo-600",
    success: "text-emerald-600 focus:ring-0 focus:ring-offset-0 accent-emerald-600",
    error: "text-rose-600 focus:ring-0 focus:ring-offset-0 accent-rose-600",
  };

  return (
    <div className="mb-4 select-none">
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-center gap-3 rounded-xl border bg-white px-3.5 py-3 text-xs font-semibold
          transition-all hover:border-slate-300 ${ringColor[s]}`}
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className={`h-4 w-4 rounded border-slate-300 cursor-pointer ${boxColor[s]}`}
        />
        <span className="text-slate-800">{label}</span>
      </label>

      {message && (
        <p
          className={`mt-1.5 px-1 text-[11px] font-medium ${
            status === "error" ? "text-rose-600" : "text-slate-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Checkbox;
