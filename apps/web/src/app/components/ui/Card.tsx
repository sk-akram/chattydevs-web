import React from "react";
import clsx from "clsx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className, children, ...props }) => (
  <div
    className={clsx(
      "bg-white rounded-2xl shadow-md border border-gray-200 p-6 md:p-8",
      "dark:bg-gray-900 dark:border-gray-800",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
