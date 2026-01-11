import React from "react";
import clsx from "clsx";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ children, className, ...props }) => (
  <h2
    className={clsx(
      "text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </h2>
);
