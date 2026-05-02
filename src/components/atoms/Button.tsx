import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 shadow-md hover:shadow-lg active:scale-95';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-primary to-indigo-600 text-white hover:from-indigo-700 hover:to-indigo-800 focus-visible:ring-primary/50',
    secondary: 'bg-gradient-to-r from-slate-900 to-slate-800 text-white hover:from-slate-800 hover:to-slate-900 focus-visible:ring-slate-700/50',
    danger: 'bg-gradient-to-r from-danger to-red-600 text-white hover:from-red-700 hover:to-red-800 focus-visible:ring-danger/50',
    success: 'bg-gradient-to-r from-success to-emerald-600 text-white hover:from-emerald-700 hover:to-emerald-800 focus-visible:ring-success/50',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-3.5 text-lg',
  };

  const finalClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={finalClassName} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
