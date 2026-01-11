import React from "react";
import clsx from "clsx";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export function Input({ label, error, hint, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label ? (
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </label>
      ) : null}
      <input
        className={clsx(
          "bg-slate-950 border rounded-lg px-4 py-2.5 text-slate-200 placeholder:text-slate-700 outline-none transition-all w-full",
          error
            ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
            : "border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20",
          className
        )}
        {...props}
      />
      {error ? (
        <p className="text-xs text-red-400 mt-1 font-medium">{error}</p>
      ) : hint ? (
        <p className="text-xs text-slate-500 mt-1">{hint}</p>
      ) : null}
    </div>
  );
}
