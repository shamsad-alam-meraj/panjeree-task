import React from 'react';

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  /** Color of the spinning arc. Defaults to current text color. */
  colorClass?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  className = '',
  colorClass = 'border-current',
}) => {
  const sizeMap = {
    xs: 'h-3 w-3 border',
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-10 w-10 border-[3px]',
  };

  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full border-transparent border-t-current ${sizeMap[size]} ${colorClass} ${className}`}
      style={{ borderTopColor: 'currentColor' }}
    />
  );
};
