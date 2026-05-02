import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', size = 'md' }) => {
  const variantStyles = {
    primary: 'bg-indigo-100 text-primary',
    secondary: 'bg-violet-100 text-secondary',
    success: 'bg-green-100 text-success',
    danger: 'bg-red-100 text-danger',
    warning: 'bg-yellow-100 text-warning',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={`inline-block font-semibold rounded-full ${variantStyles[variant]} ${sizeStyles[size]}`}>
      {children}
    </span>
  );
};
