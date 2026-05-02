'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { RegisterForm } from '@/components/organisms';
import { AuthTemplate } from '@/components/templates';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegisterSuccess = () => {
    router.push('/exam-list');
  };

  return (
    <AuthTemplate>
      <RegisterForm onSuccess={handleRegisterSuccess} />
      <p className="text-white mt-6">
        Already have an account?{' '}
        <button
          onClick={() => router.push('/login')}
          className="font-bold underline hover:text-gray-200"
        >
          Login here
        </button>
      </p>
    </AuthTemplate>
  );
}
