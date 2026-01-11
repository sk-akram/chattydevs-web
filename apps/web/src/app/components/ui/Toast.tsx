import React from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastProps {
  message: string;
  type?: ToastType;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = "info", onClose }) => {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded shadow-lg text-white transition-all
        ${type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-gray-800"}`}
      role="alert"
    >
      <span>{message}</span>
      {onClose && (
        <button
          className="ml-4 text-white hover:text-gray-200 focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      )}
    </div>
  );
};
