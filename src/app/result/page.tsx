'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button, Badge, ProgressBar } from '@/components/atoms';
import { Card } from '@/components/molecules';
import { MainTemplate } from '@/components/templates';
import { RootState } from '@/types';

type ResultTier = 'excellent' | 'good' | 'average' | 'poor';

function getResultTier(percentage: number): ResultTier {
  if (percentage >= 80) return 'excellent';
  if (percentage >= 60) return 'good';
  if (percentage >= 40) return 'average';
  return 'poor';
}

const tierConfig: Record<ResultTier, {
  badgeVariant: 'success' | 'warning' | 'danger';
  label: string;
  emoji: string;
  message: string;
  ringColor: string;
  textColor: string;
  bgColor: string;
}> = {
  excellent: {
    badgeVariant: 'success',
    label: 'Excellent!',
    emoji: '🏆',
    message: 'Outstanding performance! You have a strong grasp of this subject.',
    ringColor: 'border-emerald-400',
    textColor: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  good: {
    badgeVariant: 'warning',
    label: 'Good Job!',
    emoji: '👍',
    message: 'Good effort! A little more practice and you will ace it.',
    ringColor: 'border-amber-400',
    textColor: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  average: {
    badgeVariant: 'warning',
    label: 'Keep Trying!',
    emoji: '📖',
    message: 'You are on the right track. Review the material and try again.',
    ringColor: 'border-orange-400',
    textColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  poor: {
    badgeVariant: 'danger',
    label: 'Needs Practice',
    emoji: '💪',
    message: 'Don\'t give up! Study the topics and attempt again to improve.',
    ringColor: 'border-red-400',
    textColor: 'text-red-500',
    bgColor: 'bg-red-50',
  },
};

export default function ResultPage() {
  const { currentResult } = useSelector((state: RootState) => state.results);
  const { exams } = useSelector((state: RootState) => state.exams);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) router.push('/');
    else if (!currentResult) router.push('/exam-list');
  }, [isAuthenticated, currentResult, router]);

  if (!currentResult) return null;

  const exam = exams.find((e) => e.id === currentResult.examId);
  const tier = getResultTier(currentResult.percentage);
  const config = tierConfig[tier];

  const correctCount = currentResult.score;
  const incorrectCount = currentResult.totalScore - correctCount;
  const skippedCount = exam
    ? exam.questions.filter((q) => !currentResult.answers[q.id]).length
    : 0;

  return (
    <MainTemplate>
      <div className="mx-auto max-w-3xl">
        {/* Score Card */}
        <Card className="mb-6 text-center overflow-hidden">
          {/* Top gradient banner */}
          <div className="relative -mx-6 -mt-6 mb-8 bg-gradient-to-br from-primary to-secondary px-6 py-10">
            <div className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <p className="text-indigo-200 text-sm font-medium uppercase tracking-widest mb-1">পরীক্ষার ফলাফল</p>
            <h1 className="text-3xl font-bold text-white">Exam Complete!</h1>
            {exam && <p className="mt-2 text-indigo-200 text-sm">{exam.title}</p>}
          </div>

          {/* Score circle */}
          <div className={`mx-auto mb-6 flex h-36 w-36 flex-col items-center justify-center rounded-full border-4 ${config.ringColor} ${config.bgColor} shadow-lg`}>
            <p className={`text-5xl font-extrabold ${config.textColor}`}>{currentResult.percentage}</p>
            <p className={`text-sm font-semibold ${config.textColor}`}>%</p>
          </div>

          <div className="mb-6">
            <p className="text-2xl font-bold text-slate-900 mb-1">{config.emoji} {config.label}</p>
            <p className="text-slate-500 text-sm max-w-md mx-auto">{config.message}</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3">
              <p className="text-2xl font-bold text-emerald-600">{correctCount}</p>
              <p className="text-xs text-emerald-500 font-medium uppercase tracking-wider">Correct</p>
            </div>
            <div className="rounded-xl bg-red-50 border border-red-100 p-3">
              <p className="text-2xl font-bold text-red-500">{incorrectCount}</p>
              <p className="text-xs text-red-400 font-medium uppercase tracking-wider">Incorrect</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
              <p className="text-2xl font-bold text-slate-500">{skippedCount}</p>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Skipped</p>
            </div>
          </div>

          {/* Score bar */}
          <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
            <span>Score: <strong className="text-slate-900">{currentResult.score}/{currentResult.totalScore}</strong></span>
            <span>{currentResult.percentage}%</span>
          </div>
          <ProgressBar
            value={currentResult.percentage}
            colorClass={
              tier === 'excellent'
                ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                : tier === 'good'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500'
                : 'bg-gradient-to-r from-red-400 to-red-500'
            }
            animated
            height="lg"
          />
        </Card>

        {/* Answer Review */}
        {exam && (
          <Card className="mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
              📋 Answer Review
            </h2>
            <div className="space-y-4">
              {exam.questions.map((question, index) => {
                const userAnswer = currentResult.answers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;
                const isSkipped = !userAnswer;

                return (
                  <div
                    key={question.id}
                    className={`rounded-xl border-l-4 p-4 ${
                      isSkipped
                        ? 'border-l-slate-300 bg-slate-50'
                        : isCorrect
                        ? 'border-l-emerald-400 bg-emerald-50/50'
                        : 'border-l-red-400 bg-red-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="font-semibold text-slate-900 text-sm leading-snug">
                        Q{index + 1}. {question.question}
                      </p>
                      <Badge
                        variant={isSkipped ? 'secondary' : isCorrect ? 'success' : 'danger'}
                        size="sm"
                        className="shrink-0"
                      >
                        {isSkipped ? 'Skipped' : isCorrect ? '✓ Correct' : '✗ Wrong'}
                      </Badge>
                    </div>

                    <div className="space-y-1 text-sm">
                      {!isSkipped && (
                        <p className="text-slate-600">
                          Your answer:{' '}
                          <span className={`font-semibold ${isCorrect ? 'text-emerald-700' : 'text-red-600'}`}>
                            {userAnswer}
                          </span>
                        </p>
                      )}
                      {(!isCorrect) && (
                        <p className="text-emerald-700">
                          Correct answer:{' '}
                          <span className="font-semibold">{question.correctAnswer}</span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => router.push('/exam-list')} variant="primary" size="md" className="flex-1 sm:flex-none">
            🔄 Take Another Exam
          </Button>
          <Button onClick={() => router.push('/')} variant="secondary" size="md" className="flex-1 sm:flex-none">
            🏠 Home
          </Button>
        </div>
      </div>
    </MainTemplate>
  );
}
