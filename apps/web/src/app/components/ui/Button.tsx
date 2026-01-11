import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "white";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700",
    outline:
      "border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white bg-transparent",
    ghost: "bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-white",
    danger: "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20",
    white: "bg-white hover:bg-slate-100 text-slate-950 shadow-lg",
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-3",
    icon: "p-2 w-10 h-10",
  };

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
}
