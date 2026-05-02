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
  const baseStyles = 'font-semibold rounded-lg transition-colors duration-200 cursor-pointer';

  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-indigo-700 disabled:bg-gray-300',
    secondary: 'bg-secondary text-white hover:bg-violet-700 disabled:bg-gray-300',
    danger: 'bg-danger text-white hover:bg-red-700 disabled:bg-gray-300',
    success: 'bg-success text-white hover:bg-green-700 disabled:bg-gray-300',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const finalClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={finalClassName} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
