import React from 'react';

const TextArea = ({ label, id, value, onChange, status, message, rows = 4 }) => {
  const stateStyles = {
    default: "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10",
    success: "border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 bg-emerald-50/10",
    error: "border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 bg-rose-50/10",
  };

  const labelColor = {
    default: "text-slate-400 peer-focus:text-indigo-600",
    success: "text-emerald-600",
    error: "text-rose-600",
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
          className={`peer w-full resize-y rounded-xl border bg-white px-3.5 pt-5 pb-2 text-xs font-semibold text-slate-800
            focus:outline-none transition-all ${stateStyles[s]}`}
        />
        <label
          htmlFor={id}
          className={`absolute left-3 top-1.5 text-[10px] font-bold uppercase tracking-wider bg-white px-1 transition-all pointer-events-none select-none
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-placeholder-shown:text-slate-400
            peer-focus:top-1.5 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase ${labelColor[s]}`}
        >
          {label}
        </label>

        {status === "success" && (
          <svg className="absolute right-3.5 top-3.5 h-4 w-4 text-emerald-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}

        {status === "error" && (
          <svg className="absolute right-3.5 top-3.5 h-4 w-4 text-rose-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )}
      </div>

      <div className="mt-1.5 flex items-center justify-between px-1">
        {message ? (
          <p className={`text-[11px] font-medium ${status === "error" ? "text-rose-600" : status === "success" ? "text-emerald-600" : "text-slate-500"}`}>
            {message}
          </p>
        ) : <span />}
        {typeof value === "string" && (
          <span className="text-[11px] font-mono text-slate-400">{value.length} chars</span>
        )}
      </div>
    </div>
  );
};

export default TextArea;