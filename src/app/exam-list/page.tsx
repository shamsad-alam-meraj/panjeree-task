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
      <div className="mb-10 rounded-[2rem] border border-slate-200/90 bg-white p-8 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Available exams</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900">Choose the best quiz for your skills</h1>
          </div>
          <p className="max-w-md text-slate-600">
            Each exam is designed with engaging questions and instant scoring to help you learn quickly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} onStart={() => handleStartExam(exam.id)} />
        ))}
      </div>
    </MainTemplate>
  );
}
