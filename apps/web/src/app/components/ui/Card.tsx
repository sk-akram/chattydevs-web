import React from "react";
import clsx from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => (
  <div
    className={clsx(
      "bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 md:p-8 transition",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
