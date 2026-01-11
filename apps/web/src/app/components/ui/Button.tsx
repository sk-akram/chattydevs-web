import React from "react";
import clsx from "clsx";

/**
 * Button component props
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "md" | "lg";
  fullWidth?: boolean;
}

/**
 * Button component
 */
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
          "bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-500 hover:to-blue-400 focus:ring-indigo-400",
        variant === "secondary" &&
          "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 hover:from-blue-100 hover:to-indigo-100 focus:ring-indigo-200 border border-indigo-100",
        variant === "ghost" &&
          "bg-transparent text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-300",
        variant === "danger" &&
          "bg-red-600 text-white hover:bg-red-500 focus:ring-red-400",
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
