import React from 'react';
import { cn } from '@/utils/cn';

type CardVariant = 'default' | 'elevated' | 'bordered' | 'ghost' | 'flat';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: CardVariant;
  hover?: boolean;
  onClick?: () => void;
  as?: React.ElementType;
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white border border-slate-200/80 shadow-card',
  elevated: 'bg-white border border-slate-200/60 shadow-card-hover',
  bordered: 'bg-white border-2 border-slate-200',
  ghost: 'bg-transparent border border-dashed border-slate-200',
  flat: 'bg-slate-50 border border-slate-100',
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = false,
  onClick,
  as: Tag = 'div',
}) => {
  return (
    <Tag
      onClick={onClick}
      className={cn(
        'rounded-2xl p-6',
        variantStyles[variant],
        hover && 'transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer',
        onClick && !hover && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </Tag>
  );
};
