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
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = { name: '', email: '', confirmEmail: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
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

    if (!validateForm()) {
      return;
    }

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      email: formData.email,
    };

    dispatch(register(user));
    onSuccess?.();
  };

  return (
    <Card className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Register</h2>
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
        <FormField
          label="Confirm Email"
          id="confirmEmail"
          type="email"
          placeholder="Confirm your email"
          value={formData.confirmEmail}
          onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })}
          error={errors.confirmEmail}
          required
        />
        <Button type="submit" variant="primary" size="md" className="w-full">
          Register
        </Button>
      </form>
    </Card>
  );
};
