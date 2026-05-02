import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`rounded-[1.5rem] border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50 p-6 ${className}`}>
      {children}
    </div>
  );
};
