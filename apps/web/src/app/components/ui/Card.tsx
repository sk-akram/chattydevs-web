import React from "react";
import clsx from "clsx";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  onClick?: () => void;
};

export function Card({ className, onClick, ...props }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "bg-slate-900/40 border border-slate-800/60 rounded-xl p-6",
        "transition-all duration-300",
        onClick && "cursor-pointer hover:bg-slate-900/60 hover:border-slate-700",
        className
      )}
      {...props}
    />
  );
}
