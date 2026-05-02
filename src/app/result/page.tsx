'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button, Badge } from '@/components/atoms';
import { Card } from '@/components/molecules';
import { MainTemplate } from '@/components/templates';
import { RootState } from '@/types';

export default function ResultPage() {
  const { currentResult } = useSelector((state: RootState) => state.results);
  const { exams } = useSelector((state: RootState) => state.exams);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
    if (!currentResult) {
      router.push('/exam-list');
    }
  }, [isAuthenticated, currentResult, router]);

  if (!currentResult) {
    return null;
  }

  const exam = exams.find((e) => e.id === currentResult.examId);
  const getResultColor = (percentage: number) => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'danger';
  };

  return (
    <MainTemplate>
      <div className="max-w-2xl mx-auto">
        <Card className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Exam Complete!</h1>
          <p className="text-gray-600 mb-6">{exam?.title}</p>

          <div className="mb-6">
            <div className="text-5xl font-bold mb-2">
              <span style={{ color: getResultColor(currentResult.percentage) === 'success' ? '#10B981' : getResultColor(currentResult.percentage) === 'warning' ? '#F59E0B' : '#EF4444' }}>
                {currentResult.percentage}%
              </span>
            </div>
            <p className="text-gray-600 text-lg">
              Score: <span className="font-bold">{currentResult.score}</span> out of{' '}
              <span className="font-bold">{currentResult.totalScore}</span>
            </p>
          </div>

          <Badge variant={getResultColor(currentResult.percentage)} size="lg">
            {getResultColor(currentResult.percentage) === 'success'
              ? 'Excellent!'
              : getResultColor(currentResult.percentage) === 'warning'
              ? 'Good!'
              : 'Keep Practicing!'}
          </Badge>
        </Card>

        {/* Answer Review */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Answer Review</h2>
          <div className="space-y-4">
            {exam?.questions.map((question, index) => {
              const userAnswer = currentResult.answers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div key={question.id} className="border-l-4 pl-4" style={{ borderColor: isCorrect ? '#10B981' : '#EF4444' }}>
                  <p className="font-semibold text-gray-800 mb-2">
                    Q{index + 1}: {question.question}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    Your answer: <span className="font-semibold">{userAnswer || 'Not answered'}</span>
                  </p>
                  {!isCorrect && (
                    <p className="text-sm text-success">
                      Correct answer: <span className="font-semibold">{question.correctAnswer}</span>
                    </p>
                  )}
                  <Badge variant={isCorrect ? 'success' : 'danger'} size="sm" className="mt-2">
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </Badge>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.push('/exam-list')} variant="primary" size="md">
            Take Another Exam
          </Button>
          <Button onClick={() => router.push('/')} variant="secondary" size="md">
            Home
          </Button>
        </div>
      </div>
    </MainTemplate>
  );
}
