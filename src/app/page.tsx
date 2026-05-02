'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms';
import { AuthTemplate, MainTemplate } from '@/components/templates';
import { RootState } from '@/types';

export default function HomePage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <AuthTemplate>
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">Panjeree Exam</h1>
          <p className="text-lg">Test Your Knowledge</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => router.push('/login')} variant="secondary" size="lg">
            Login
          </Button>
          <Button onClick={() => router.push('/register')} variant="success" size="lg">
            Register
          </Button>
        </div>
      </AuthTemplate>
    );
  }

  return (
    <MainTemplate>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Panjeree Exam!</h1>
        <p className="text-gray-600 mb-8">Ready to test your knowledge? Start an exam now.</p>
        <Button onClick={() => router.push('/exam-list')} variant="primary" size="lg">
          View Exams
        </Button>
      </div>
    </MainTemplate>
  );
}
