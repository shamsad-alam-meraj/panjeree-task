'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '@/store/authSlice';
import { Button } from '@/components/atoms';
import { User } from '@/types';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '', confirmEmail: '' });
  const [errors, setErrors] = useState({ name: '', email: '', confirmEmail: '' });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const validate = () => {
    const e = { name: '', email: '', confirmEmail: '' };
    if (!formData.name.trim())          e.name  = 'Name is required';
    else if (formData.name.trim().length < 2) e.name = 'At least 2 characters';

    if (!formData.email.trim())          e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = 'Enter a valid email address';

    if (!formData.confirmEmail.trim())   e.confirmEmail = 'Please confirm your email';
    else if (formData.email !== formData.confirmEmail) e.confirmEmail = 'Emails do not match';

    setErrors(e);
    return !e.name && !e.email && !e.confirmEmail;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      const user: User = {
        id: Math.random().toString(36).slice(2, 11),
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
      };
      dispatch(register(user));
      onSuccess?.();
      setIsLoading(false);
    }, 500);
  };

  const field = (
    key: keyof typeof formData,
    label: string,
    type: string,
    placeholder: string,
  ) => (
    <div className="mb-4">
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label} <span className="text-danger">*</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={formData[key]}
        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
        className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
      />
      {errors[key] && <p className="mt-1.5 text-xs text-red-400">⚠ {errors[key]}</p>}
    </div>
  );

  return (
    <div className="w-full max-w-md animate-scaleIn">
      <div className="glass rounded-2xl p-8">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-success to-emerald-400 shadow-glow-success text-2xl">
          🚀
        </div>
        <h2 className="mb-1 text-center text-2xl font-extrabold text-white">Create Account</h2>
        <p className="mb-7 text-center text-sm text-slate-400">Join and start testing your knowledge</p>

        <form onSubmit={handleSubmit} noValidate>
          {field('name',         'Full Name',     'text',  'Enter your full name')}
          {field('email',        'Email Address', 'email', 'Enter your email')}
          {field('confirmEmail', 'Confirm Email', 'email', 'Confirm your email address')}

          <Button type="submit" variant="success" size="lg" fullWidth isLoading={isLoading} className="mt-2">
            {isLoading ? 'Creating account…' : 'Create Account'}
          </Button>
        </form>
      </div>
    </div>
  );
};
