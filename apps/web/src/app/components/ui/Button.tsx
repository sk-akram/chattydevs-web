import React from "react";
import clsx from "clsx";


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "md" | "lg";
  fullWidth?: boolean;
}


export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "font-semibold rounded-xl transition focus:outline-none focus:ring-2 focus:ring-offset-2",
        variant === "primary" &&
          "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        variant === "secondary" &&
          "bg-blue-50 text-blue-700 hover:bg-blue-100 focus:ring-blue-300 border border-blue-200",
        variant === "ghost" &&
          "bg-transparent text-blue-700 hover:bg-blue-50 focus:ring-blue-300",
        variant === "danger" &&
          "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
        size === "md" && "px-5 py-2 text-base",
        size === "lg" && "px-6 py-3 text-lg",
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
