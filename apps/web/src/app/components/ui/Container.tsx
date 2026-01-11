import React from "react";
import clsx from "clsx";

export type ContainerProps = React.HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={clsx("max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full", className)}
      {...props}
    />
  );
}
