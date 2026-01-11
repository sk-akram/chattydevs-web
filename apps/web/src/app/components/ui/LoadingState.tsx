import React from "react";

export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-20 w-full min-h-[400px]">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-slate-800 rounded-full" />
        <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
      <p className="mt-6 text-slate-500 font-medium">{message}</p>
    </div>
  );
}
