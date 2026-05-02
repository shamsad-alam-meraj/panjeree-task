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
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = { name: '', email: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
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

    if (!validateForm()) {
      return;
    }

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
    };

    dispatch(login(user));
    onSuccess?.();
  };

  return (
    <Card className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
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
        <Button type="submit" variant="primary" size="md" className="w-full">
          Login
        </Button>
      </form>
    </Card>
  );
};
