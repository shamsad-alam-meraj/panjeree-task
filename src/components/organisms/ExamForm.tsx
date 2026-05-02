'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveAnswer, clearCurrentExam } from '@/store/examsSlice';
import { saveResult } from '@/store/resultsSlice';
import { Button, ProgressBar, Badge } from '@/components/atoms';
import { QuestionNav } from '@/components/molecules';
import { ExamQuestionCard } from './ExamQuestionCard';
import { RootState, ExamResult } from '@/types';

interface ExamFormProps {
  onComplete?: () => void;
}

export const ExamForm: React.FC<ExamFormProps> = ({ onComplete }) => {
  const dispatch = useDispatch();
  const { currentExam, userAnswers } = useSelector((state: RootState) => state.exams);
  const { user } = useSelector((state: RootState) => state.auth);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [timerStarted, setTimerStarted] = useState(false);

  // Initialize timer from exam duration (minutes → seconds)
  useEffect(() => {
    if (currentExam) {
      setTimeLeft(currentExam.duration * 60);
      setTimerStarted(true);
    }
  }, [currentExam]);

  const handleSubmitExam = useCallback(() => {
    if (!currentExam || !user) return;

    let score = 0;
    currentExam.questions.forEach((question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        score += 1;
      }
    });

    const result: ExamResult = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      examId: currentExam.id,
      examTitle: currentExam.title,
      score,
      totalScore: currentExam.questions.length,
      percentage: Math.round((score / currentExam.questions.length) * 100),
      answers: userAnswers,
      completedAt: new Date().toISOString(),
    };

    dispatch(saveResult(result));
    dispatch(clearCurrentExam());
    onComplete?.();
  }, [currentExam, user, userAnswers, dispatch, onComplete]);

  // Countdown timer
  useEffect(() => {
    if (!timerStarted || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStarted, handleSubmitExam, timeLeft]);

  if (!currentExam || !user) {
    return <div className="text-center text-slate-600">No exam selected</div>;
  }

  const currentQuestion = currentExam.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentExam.questions.length - 1;
  const answeredCount = Object.keys(userAnswers).length;
  const totalQuestions = currentExam.questions.length;
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Format timer
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerLabel = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isTimerLow = timeLeft <= 60 && timeLeft > 0;
  const unansweredCount = totalQuestions - answeredCount;

  const answeredSet = new Set(
    currentExam.questions
      .filter((q) => userAnswers[q.id])
      .map((q) => q.id)
  );
  const questionIds = currentExam.questions.map((q) => q.id);

  return (
    <>
      <div className="w-full">
        {/* Exam Header */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">{currentExam.category}</p>
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">{currentExam.title}</h1>
              <p className="mt-1 text-sm text-slate-500 truncate">{currentExam.description}</p>
            </div>

            {/* Timer */}
            <div className={`flex flex-col items-center justify-center rounded-2xl px-5 py-3 shrink-0 border-2 transition-colors ${
              isTimerLow
                ? 'bg-red-50 border-red-200 animate-pulse'
                : 'bg-slate-50 border-slate-200'
            }`}>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-0.5">Time Left</p>
              <p className={`text-3xl font-bold tabular-nums ${isTimerLow ? 'text-red-500' : 'text-slate-900'}`}>
                {timerLabel}
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-4 flex flex-wrap gap-3">
            <Badge variant="primary" size="sm">⏱ {currentExam.duration} min</Badge>
            <Badge variant="info" size="sm">📝 {totalQuestions} Questions</Badge>
            <Badge variant="success" size="sm">✅ {answeredCount} Answered</Badge>
            {unansweredCount > 0 && (
              <Badge variant="warning" size="sm">⚠ {unansweredCount} Remaining</Badge>
            )}
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs text-slate-500">
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              <span>{Math.round(progressPercent)}% through</span>
            </div>
            <ProgressBar value={progressPercent} animated height="md" />
          </div>
        </div>

        {/* Main Content: Question + Nav Panel */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
          {/* Question Card */}
          <div className="flex-1 min-w-0">
            <ExamQuestionCard
              question={currentQuestion}
              currentAnswer={userAnswers[currentQuestion.id] || ''}
              onAnswerChange={(answer) =>
                dispatch(saveAnswer({ questionId: currentQuestion.id, answer }))
              }
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
            />

            {/* Navigation Buttons */}
            <div className="mt-4 flex gap-3">
              <Button
                onClick={() => setCurrentQuestionIndex((i) => Math.max(0, i - 1))}
                disabled={currentQuestionIndex === 0}
                variant="secondary"
                size="md"
                className="flex-1 sm:flex-none"
              >
                ← Previous
              </Button>

              <div className="flex-1" />

              {isLastQuestion ? (
                <Button
                  onClick={() => setShowConfirm(true)}
                  variant="success"
                  size="md"
                  className="flex-1 sm:flex-none"
                >
                  Submit Exam ✓
                </Button>
              ) : (
                <Button
                  onClick={() => setCurrentQuestionIndex((i) => Math.min(totalQuestions - 1, i + 1))}
                  variant="primary"
                  size="md"
                  className="flex-1 sm:flex-none"
                >
                  Next →
                </Button>
              )}
            </div>

            {/* Submit CTA when on any question */}
            {answeredCount === totalQuestions && !isLastQuestion && (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-emerald-700">🎉 All questions answered!</p>
                <Button onClick={() => setShowConfirm(true)} variant="success" size="sm">
                  Submit Now
                </Button>
              </div>
            )}
          </div>

          {/* Question Nav Panel */}
          <div className="lg:w-56 shrink-0">
            <QuestionNav
              totalQuestions={totalQuestions}
              currentIndex={currentQuestionIndex}
              answeredQuestions={answeredSet}
              questionIds={questionIds}
              onNavigate={setCurrentQuestionIndex}
            />
          </div>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setShowConfirm(false); }}
        >
          <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-secondary p-5">
              <h3 className="text-xl font-bold text-white">Submit Exam?</h3>
              <p className="text-indigo-200 text-sm mt-1">You are about to submit your answers.</p>
            </div>
            <div className="p-6 space-y-4">
              {unansweredCount > 0 ? (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 flex gap-2">
                  <span className="text-amber-500 shrink-0">⚠️</span>
                  <p className="text-sm text-amber-700">
                    You have <strong>{unansweredCount}</strong> unanswered question{unansweredCount !== 1 ? 's' : ''}.
                    These will be counted as incorrect.
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 flex gap-2">
                  <span className="text-emerald-500 shrink-0">✅</span>
                  <p className="text-sm text-emerald-700">All {totalQuestions} questions answered!</p>
                </div>
              )}

              <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                <div className="flex justify-between mb-1">
                  <span>Answered</span>
                  <span className="font-semibold text-slate-900">{answeredCount}/{totalQuestions}</span>
                </div>
                <ProgressBar value={(answeredCount / totalQuestions) * 100} height="sm" />
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setShowConfirm(false)} variant="secondary" size="md" className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSubmitExam} variant="success" size="md" className="flex-1">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
