import React from 'react';

interface ProgressBarProps {
  value: number; // 0–100
  className?: string;
  colorClass?: string;
  height?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  className = '',
  colorClass = 'bg-primary',
  height = 'md',
  animated = false,
}) => {
  const heightStyles = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`w-full rounded-full bg-slate-100 overflow-hidden ${heightStyles[height]} ${className}`}>
      <div
        className={`${heightStyles[height]} rounded-full ${colorClass} ${animated ? 'transition-all duration-700 ease-out' : 'transition-all duration-300'}`}
        style={{ width: `${clampedValue}%` }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
};
