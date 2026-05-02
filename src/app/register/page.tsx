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
      <div className="flex flex-col items-center">
        <RegisterForm onSuccess={handleRegisterSuccess} />
        <p className="mt-5 text-sm text-slate-400">
          Already have an account?{' '}
          <button
            onClick={() => router.push('/login')}
            className="font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
          >
            Login here
          </button>
        </p>
      </div>
    </AuthTemplate>
  );
}
