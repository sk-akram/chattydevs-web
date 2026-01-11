import React from "react";

export type EmptyStateProps = {
  title: string;
  description: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
};

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
      <div className="w-16 h-16 bg-slate-800/40 rounded-2xl flex items-center justify-center text-slate-500 mb-6">
        {icon || (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        )}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-500 mb-8 max-w-sm text-sm">{description}</p>
      {action}
    </div>
  );
}
