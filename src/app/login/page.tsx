'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/organisms';
import { AuthTemplate } from '@/components/templates';

export default function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push('/exam-list');
  };

  return (
    <AuthTemplate>
      <LoginForm onSuccess={handleLoginSuccess} />
      <p className="text-white mt-6">
        Don't have an account?{' '}
        <button
          onClick={() => router.push('/register')}
          className="font-bold underline hover:text-gray-200"
        >
          Register here
        </button>
      </p>
    </AuthTemplate>
  );
}
