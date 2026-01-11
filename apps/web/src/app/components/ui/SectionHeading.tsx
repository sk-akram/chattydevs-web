import React from "react";
import clsx from "clsx";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ children, className, ...props }) => (
  <h2
    className={clsx(
      "text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight",
      className
    )}
    {...props}
  >
    {children}
  </h2>
);
