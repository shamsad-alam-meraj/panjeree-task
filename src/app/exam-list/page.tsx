'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setCurrentExam } from '@/store/examsSlice';
import { ExamCard } from '@/components/molecules';
import { MainTemplate } from '@/components/templates';
import { RootState } from '@/types';

export default function ExamListPage() {
  const { exams } = useSelector((state: RootState) => state.exams);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleStartExam = (examId: string) => {
    const exam = exams.find((e) => e.id === examId);
    if (exam) {
      dispatch(setCurrentExam(exam));
      router.push('/exam');
    }
  };

  return (
    <MainTemplate>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Available Exams</h1>
        <p className="text-gray-600">Choose an exam to test your knowledge</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <ExamCard
            key={exam.id}
            exam={exam}
            onStart={() => handleStartExam(exam.id)}
          />
        ))}
      </div>
    </MainTemplate>
  );
}
