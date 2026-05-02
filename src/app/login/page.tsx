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
      <div className="flex flex-col items-center">
        <LoginForm onSuccess={handleLoginSuccess} />
        <p className="mt-5 text-sm text-slate-400">
          Don&apos;t have an account?{' '}
          <button
            onClick={() => router.push('/register')}
            className="font-semibold text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
          >
            Register here
          </button>
        </p>
      </div>
    </AuthTemplate>
  );
}
