import React from "react";
import clsx from "clsx";

export type BadgeProps = {
  children: React.ReactNode;
  color?: "indigo" | "slate" | "green" | "red" | "yellow";
  className?: string;
};

export function Badge({ children, color = "slate", className }: BadgeProps) {
  const colors: Record<NonNullable<BadgeProps["color"]>, string> = {
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    slate: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    yellow: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  return (
    <span
      className={clsx(
        "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border",
        colors[color],
        className
      )}
    >
      {children}
    </span>
  );
}
