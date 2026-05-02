'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';
import { FormField } from '@/components/molecules';
import { Button } from '@/components/atoms';
import { User } from '@/types';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const validate = () => {
    const e = { name: '', email: '' };
    if (!formData.name.trim())          e.name  = 'Name is required';
    else if (formData.name.trim().length < 2) e.name = 'At least 2 characters';

    if (!formData.email.trim())          e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = 'Enter a valid email address';

    setErrors(e);
    return !e.name && !e.email;
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
      dispatch(login(user));
      onSuccess?.();
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-md animate-scaleIn">
      {/* Glass card on dark background */}
      <div className="glass rounded-2xl p-8">
        {/* Icon */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-glow-primary text-2xl">
          👤
        </div>
        <h2 className="mb-1 text-center text-2xl font-extrabold text-white">Welcome Back</h2>
        <p className="mb-7 text-center text-sm text-slate-400">Sign in to continue to your exams</p>

        <form onSubmit={handleSubmit} noValidate className="space-y-0">
          <div className="mb-4">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">
              Full Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-400">⚠ {errors.name}</p>}
          </div>

          <div className="mb-6">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-slate-400">
              Email Address <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-400">⚠ {errors.email}</p>}
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isLoading}>
            {isLoading ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
};
