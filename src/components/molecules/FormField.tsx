import React from 'react';
import { Label, Input } from '@/components/atoms';

interface FormFieldProps {
  label: string;
  id: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  error?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  hint?: string;
  leftIcon?: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type = 'text',
  placeholder,
  error,
  value,
  onChange,
  required = false,
  hint,
  leftIcon,
}) => {
  return (
    <div className="mb-5">
      <div className="mb-1.5 flex items-center justify-between">
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
        {hint && <span className="text-xs text-slate-400">{hint}</span>}
      </div>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        error={error}
        value={value}
        onChange={onChange}
        leftIcon={leftIcon}
      />
    </div>
  );
};
