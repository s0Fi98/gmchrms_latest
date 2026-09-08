import React from "react";
import { Loader2 } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  icon: Icon,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 rounded-xl focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98] select-none";

  const variants = {
    // Brand action (matches login & add entry buttons)
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200 focus:ring-indigo-500/20 border border-transparent",
    
    // Clean secondary white card button (matches cadre export & audit buttons)
    secondary:
      "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm focus:ring-slate-200/50",

    // Disciplinary & alert actions
    danger:
      "bg-rose-600 text-white hover:bg-rose-700 shadow-sm shadow-rose-200 focus:ring-rose-500/20 border border-transparent",

    // Approvals & authorizations
    success:
      "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-200 focus:ring-emerald-500/20 border border-transparent",

    // Ghost / Navigation links
    ghost:
      "text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-200/50 border border-transparent",

    // Sub-tab / filter capsule
    subtle:
      "bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100/70 focus:ring-indigo-500/10",
  };

  const sizes = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-4 py-2 text-xs",
    lg: "px-5 py-2.5 text-sm",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin text-current" />
      ) : (
        Icon && (
          React.isValidElement(Icon) ? Icon : <Icon size={size === "sm" ? 14 : 16} />
        )
      )}
      {children}
    </button>
  );
}