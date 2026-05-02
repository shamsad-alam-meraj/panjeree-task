import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ placeholder, error, className = '', ...props }) => {
  const baseStyles =
    'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all';
  const errorStyles = error ? 'border-danger focus:ring-danger' : 'border-gray-300';

  return (
    <>
      <input
        className={`${baseStyles} ${errorStyles} ${className}`}
        placeholder={placeholder}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </>
  );
};
