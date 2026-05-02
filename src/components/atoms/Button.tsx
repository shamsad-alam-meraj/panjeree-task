import React from 'react';
import { Spinner } from './Spinner';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const base =
    'btn-ripple inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-[-0.01em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 select-none';

  const variants: Record<string, string> = {
    primary:
      'bg-primary text-white shadow-button-primary hover:bg-indigo-600 active:bg-indigo-700 active:scale-[0.98] focus-visible:ring-primary/50',
    secondary:
      'bg-slate-900 text-white shadow-sm hover:bg-slate-800 active:bg-slate-900 active:scale-[0.98] focus-visible:ring-slate-700/50',
    danger:
      'bg-danger text-white shadow-sm hover:bg-red-600 active:bg-red-700 active:scale-[0.98] focus-visible:ring-danger/50',
    success:
      'bg-success text-white shadow-button-success hover:bg-emerald-600 active:bg-emerald-700 active:scale-[0.98] focus-visible:ring-success/50',
    ghost:
      'bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 active:scale-[0.98] focus-visible:ring-slate-400/50',
    outline:
      'bg-transparent border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 active:scale-[0.98] focus-visible:ring-slate-400/50',
  };

  const sizes: Record<string, string> = {
    xs: 'px-3 py-1.5 text-xs h-7',
    sm: 'px-4 py-2 text-sm h-9',
    md: 'px-5 py-2.5 text-sm h-10',
    lg: 'px-7 py-3 text-base h-12',
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      disabled={isDisabled}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner size="xs" />
          <span>{children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
