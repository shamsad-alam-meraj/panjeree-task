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
}) => {
  return (
    <div className="mb-4">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        error={error}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
