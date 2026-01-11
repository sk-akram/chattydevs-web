import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'white';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { 
  variant?: ButtonVariant, 
  size?: ButtonSize,
  isLoading?: boolean 
}> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '', 
  isLoading,
  disabled,
  ...props 
}) => {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
  
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700",
    outline: "border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white bg-transparent",
    ghost: "bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-white",
    danger: "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20",
    white: "bg-white hover:bg-slate-100 text-slate-950 shadow-lg"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-3",
    icon: "p-2 w-10 h-10"
  };

  return (
    <button 
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} 
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!isLoading && children}
    </button>
  );
};

export const Card: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-slate-900/40 border border-slate-800/60 rounded-xl p-6 transition-all duration-300 ${onClick ? 'cursor-pointer hover:bg-slate-900/60 hover:border-slate-700 group' : ''} ${className}`}
  >
    {children}
  </div>
);

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label?: string, error?: string, hint?: string }> = ({ label, error, hint, className = '', ...props }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>}
    <input 
      className={`bg-slate-950 border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-indigo-500'} rounded-lg px-4 py-2.5 text-slate-200 placeholder:text-slate-700 outline-none transition-all w-full focus:ring-1 focus:ring-indigo-500/20 ${className}`}
      {...props}
    />
    {error ? (
      <p className="text-xs text-red-400 mt-1 font-medium">{error}</p>
    ) : hint ? (
      <p className="text-xs text-slate-500 mt-1">{hint}</p>
    ) : null}
  </div>
);

export const Container: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${className}`}>
    {children}
  </div>
);

export const Badge: React.FC<{ children: React.ReactNode, color?: 'indigo' | 'slate' | 'green' | 'red' | 'yellow' }> = ({ children, color = 'slate' }) => {
  const colors = {
    indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    slate: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
    yellow: "bg-amber-500/10 text-amber-400 border-amber-500/20"
  };
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border ${colors[color]}`}>
      {children}
    </span>
  );
};

export const Section: React.FC<{ title?: string, description?: string, children: React.ReactNode, className?: string, action?: React.ReactNode }> = ({ title, description, children, className = '', action }) => (
  <section className={`py-12 ${className}`}>
    {(title || description || action) && (
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          {title && <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>}
          {description && <p className="text-slate-400 text-sm max-w-2xl">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
    )}
    {children}
  </section>
);

export const LoadingState: React.FC<{ message?: string }> = ({ message = "Loading experience..." }) => (
  <div className="flex flex-col items-center justify-center p-20 w-full min-h-[400px]">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
      <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <p className="mt-6 text-slate-500 font-medium animate-pulse">{message}</p>
  </div>
);

export const EmptyState: React.FC<{ title: string, description: string, action?: React.ReactNode, icon?: React.ReactNode }> = ({ title, description, action, icon }) => (
  <div className="flex flex-col items-center justify-center py-24 px-6 text-center border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
    <div className="w-16 h-16 bg-slate-800/40 rounded-2xl flex items-center justify-center text-slate-500 mb-6">
      {icon || (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      )}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-slate-500 mb-8 max-w-sm text-sm">{description}</p>
    {action}
  </div>
);
