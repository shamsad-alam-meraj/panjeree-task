'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '@/store/authSlice';
import { Card, FormField } from '@/components/molecules';
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

  const validateForm = () => {
    const newErrors = { name: '', email: '', confirmEmail: '' };

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

    if (!formData.confirmEmail.trim()) {
      newErrors.confirmEmail = 'Please confirm your email';
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Emails do not match';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name.trim(),
        email: formData.email.trim(),
      };
      dispatch(register(user));
      onSuccess?.();
      setIsLoading(false);
    }, 400);
  };

  return (
    <Card className="w-full max-w-md">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30">
          <span className="text-2xl">🚀</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
        <p className="mt-1.5 text-sm text-slate-500">Join and start testing your knowledge</p>
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
        <FormField
          label="Confirm Email"
          id="confirmEmail"
          type="email"
          placeholder="Confirm your email address"
          value={formData.confirmEmail}
          onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })}
          error={errors.confirmEmail}
          required
        />
        <Button type="submit" variant="primary" size="md" className="w-full mt-4" disabled={isLoading}>
          {isLoading ? 'Creating account…' : 'Create Account →'}
        </Button>
      </form>
    </Card>
  );
};
