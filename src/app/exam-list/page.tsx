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
  const { results } = useSelector((state: RootState) => state.results);
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

  const totalAttempts = results.length;
  const avgScore = totalAttempts > 0
    ? Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / totalAttempts)
    : null;
  const bestScore = totalAttempts > 0
    ? Math.max(...results.map((r) => r.percentage))
    : null;

  return (
    <MainTemplate>
      {/* Page Header */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-md sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">পরীক্ষা তালিকা</p>
            <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Available Exams</h1>
            <p className="mt-2 max-w-lg text-slate-500">
              Choose a quiz and test your knowledge. Get instant results and detailed feedback after submission.
            </p>
          </div>

          {/* Stats pills */}
          {totalAttempts > 0 && (
            <div className="flex flex-wrap gap-3 sm:flex-nowrap sm:shrink-0">
              <div className="rounded-xl bg-indigo-50 border border-indigo-100 px-4 py-3 text-center">
                <p className="text-xl font-bold text-primary">{totalAttempts}</p>
                <p className="text-xs text-indigo-400 uppercase tracking-wider">Attempts</p>
              </div>
              {avgScore !== null && (
                <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-center">
                  <p className="text-xl font-bold text-amber-600">{avgScore}%</p>
                  <p className="text-xs text-amber-400 uppercase tracking-wider">Avg Score</p>
                </div>
              )}
              {bestScore !== null && (
                <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-center">
                  <p className="text-xl font-bold text-emerald-600">{bestScore}%</p>
                  <p className="text-xs text-emerald-400 uppercase tracking-wider">Best</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Exam Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} onStart={() => handleStartExam(exam.id)} />
        ))}
      </div>
    </MainTemplate>
  );
}
