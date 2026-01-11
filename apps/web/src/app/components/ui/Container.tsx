import React from "react";
import clsx from "clsx";


export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ className, children, ...props }) => (
  <div
    className={clsx(
      "w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 transition",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
