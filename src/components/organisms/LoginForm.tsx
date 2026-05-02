'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '@/store/authSlice';
import { Card, FormField } from '@/components/molecules';
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

  const validateForm = () => {
    const newErrors = { name: '', email: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate brief async action
    setTimeout(() => {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name.trim(),
        email: formData.email.trim(),
      };
      dispatch(login(user));
      onSuccess?.();
      setIsLoading(false);
    }, 400);
  };

  return (
    <Card className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30">
          <span className="text-2xl">👤</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
        <p className="mt-1.5 text-sm text-slate-500">Sign in to continue to your exams</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <FormField
          label="Full Name"
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          required
        />
        <FormField
          label="Email Address"
          id="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          required
        />
        <Button type="submit" variant="primary" size="md" className="w-full mt-4" disabled={isLoading}>
          {isLoading ? 'Signing in…' : 'Sign In →'}
        </Button>
      </form>
    </Card>
  );
};
