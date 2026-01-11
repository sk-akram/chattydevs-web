import React from "react";
import clsx from "clsx";


export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ className, children, ...props }) => (
  <div
    className={clsx(
      "w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
