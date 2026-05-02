'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ExamForm } from '@/components/organisms';
import { MainTemplate } from '@/components/templates';
import { RootState } from '@/types';

export default function ExamPage() {
  const { currentExam } = useSelector((state: RootState) => state.exams);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
    if (!currentExam) {
      router.push('/exam-list');
    }
  }, [isAuthenticated, currentExam, router]);

  const handleExamComplete = () => {
    router.push('/result');
  };

  if (!currentExam) {
    return null;
  }

  return (
    <MainTemplate>
      <div className="flex justify-center">
        <ExamForm onComplete={handleExamComplete} />
      </div>
    </MainTemplate>
  );
}
