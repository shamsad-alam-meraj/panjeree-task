import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', size = 'md', className = '' }) => {
  const variantStyles = {
    primary: 'bg-indigo-100 text-primary border border-indigo-200',
    secondary: 'bg-violet-100 text-secondary border border-violet-200',
    success: 'bg-emerald-100 text-success border border-emerald-200',
    danger: 'bg-red-100 text-danger border border-red-200',
    warning: 'bg-amber-100 text-warning border border-amber-200',
    info: 'bg-sky-100 text-sky-600 border border-sky-200',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span className={`inline-flex items-center gap-1 font-medium rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};
