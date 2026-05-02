import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: string;
  colorClass?: string;
  bgClass?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  colorClass = 'text-slate-900',
  bgClass = 'bg-slate-50',
}) => {
  return (
    <div className={`rounded-2xl ${bgClass} p-4 text-center`}>
      {icon && <div className="mb-1 text-2xl">{icon}</div>}
      <p className={`text-2xl font-bold ${colorClass}`}>{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-widest text-slate-500">{label}</p>
    </div>
  );
};
