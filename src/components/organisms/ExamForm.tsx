'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveAnswer, clearCurrentExam } from '@/store/examsSlice';
import { saveResult } from '@/store/resultsSlice';
import { Button, Badge, ProgressBar } from '@/components/atoms';
import { QuestionNav } from '@/components/molecules';
import { ExamQuestionCard } from './ExamQuestionCard';
import { RootState, ExamResult } from '@/types';
import { cn } from '@/utils/cn';

interface ExamFormProps {
  onComplete?: () => void;
}

export const ExamForm: React.FC<ExamFormProps> = ({ onComplete }) => {
  const dispatch = useDispatch();
  const { currentExam, userAnswers } = useSelector((state: RootState) => state.exams);
  const { user } = useSelector((state: RootState) => state.auth);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Stable ref for submit so the timer interval never goes stale
  const submitRef = useRef<() => void>(() => {});

  const handleSubmitExam = useCallback(() => {
    if (!currentExam || !user) return;

    let score = 0;
    currentExam.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) score += 1;
    });

    const result: ExamResult = {
      id: Math.random().toString(36).slice(2, 11),
      userId: user.id,
      examId: currentExam.id,
      examTitle: currentExam.title,
      score,
      totalScore: currentExam.questions.length,
      percentage: Math.round((score / currentExam.questions.length) * 100),
      answers: { ...userAnswers },
      completedAt: new Date().toISOString(),
    };

    dispatch(saveResult(result));
    dispatch(clearCurrentExam());
    onComplete?.();
  }, [currentExam, user, userAnswers, dispatch, onComplete]);

  // Keep ref in sync with latest handler
  useEffect(() => {
    submitRef.current = handleSubmitExam;
  });

  // Initialize timer
  useEffect(() => {
    if (currentExam) {
      setTimeLeft(currentExam.duration * 60);
      setCurrentIndex(0);
    }
  }, [currentExam]);

  // Countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const id = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          // defer submit to avoid state-update-in-render
          setTimeout(() => submitRef.current(), 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [timeLeft]);

  if (!currentExam || !user) {
    return <div className="text-center text-slate-500">No exam selected.</div>;
  }

  const totalQ       = currentExam.questions.length;
  const currentQ     = currentExam.questions[currentIndex];
  const isLast       = currentIndex === totalQ - 1;
  const answeredSet  = new Set(currentExam.questions.filter((q) => userAnswers[q.id]).map((q) => q.id));
  const answeredCount = answeredSet.size;
  const unanswered   = totalQ - answeredCount;

  // Timer formatting
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timerStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const isTimerLow = timeLeft > 0 && timeLeft <= 60;
  const timerPercent = currentExam.duration > 0 ? (timeLeft / (currentExam.duration * 60)) * 100 : 100;

  return (
    <>
      <div className="w-full animate-fadeIn">
        {/* ── Exam Header Card ── */}
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            {/* Title */}
            <div className="flex-1 min-w-0">
              <p className="mb-0.5 text-xs font-bold uppercase tracking-widest text-primary">{currentExam.category}</p>
              <h1 className="text-xl font-extrabold text-slate-900 leading-tight sm:text-2xl">{currentExam.title}</h1>
            </div>

            {/* Timer */}
            <div
              className={cn(
                'flex shrink-0 flex-col items-center rounded-2xl border-2 px-5 py-2.5 transition-all duration-500',
                isTimerLow
                  ? 'animate-pulseRing border-red-300 bg-red-50'
                  : timerPercent < 50
                  ? 'border-amber-200 bg-amber-50'
                  : 'border-slate-200 bg-slate-50',
              )}
            >
              <p className="mb-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Time Left</p>
              <p
                className={cn(
                  'tabular-nums text-2xl font-black sm:text-3xl',
                  isTimerLow ? 'text-red-500' : timerPercent < 50 ? 'text-amber-600' : 'text-slate-900',
                )}
              >
                {timerStr}
              </p>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="info" size="sm">⏱ {currentExam.duration} min</Badge>
            <Badge variant="primary" size="sm">📝 {totalQ} Questions</Badge>
            <Badge variant="success" size="sm">✅ {answeredCount} Answered</Badge>
            {unanswered > 0 && <Badge variant="warning" size="sm">⏳ {unanswered} Remaining</Badge>}
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-slate-500">
              <span>Question {currentIndex + 1} of {totalQ}</span>
              <span>{Math.round(((currentIndex + 1) / totalQ) * 100)}%</span>
            </div>
            <ProgressBar value={((currentIndex + 1) / totalQ) * 100} animated height="md" />
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
          {/* Question (key causes re-mount → triggers scaleIn animation on change) */}
          <div className="flex-1 min-w-0">
            <div key={`${currentExam.id}-${currentIndex}`}>
              <ExamQuestionCard
                question={currentQ}
                currentAnswer={userAnswers[currentQ.id] || ''}
                onAnswerChange={(answer) =>
                  dispatch(saveAnswer({ questionId: currentQ.id, answer }))
                }
                questionNumber={currentIndex + 1}
                totalQuestions={totalQ}
              />
            </div>

            {/* Navigation buttons */}
            <div className="mt-4 flex items-center gap-3">
              <Button
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                variant="outline"
                size="md"
              >
                ← Prev
              </Button>
              <div className="flex-1" />
              {answeredCount === totalQ && (
                <Button onClick={() => setShowConfirm(true)} variant="success" size="md">
                  Submit ✓
                </Button>
              )}
              {isLast && answeredCount < totalQ && (
                <Button onClick={() => setShowConfirm(true)} variant="success" size="md">
                  Submit Exam
                </Button>
              )}
              {!isLast && (
                <Button
                  onClick={() => setCurrentIndex((i) => Math.min(totalQ - 1, i + 1))}
                  variant="primary"
                  size="md"
                >
                  Next →
                </Button>
              )}
            </div>

            {/* All answered banner */}
            {answeredCount === totalQ && (
              <div className="mt-4 animate-slideUp flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                <p className="text-sm font-semibold text-emerald-700">🎉 All {totalQ} questions answered!</p>
                <Button onClick={() => setShowConfirm(true)} variant="success" size="sm">
                  Submit Now
                </Button>
              </div>
            )}
          </div>

          {/* Question navigation panel */}
          <div className="lg:w-52 shrink-0">
            <QuestionNav
              totalQuestions={totalQ}
              currentIndex={currentIndex}
              answeredQuestions={answeredSet}
              questionIds={currentExam.questions.map((q) => q.id)}
              onNavigate={setCurrentIndex}
            />
          </div>
        </div>
      </div>

      {/* ── Submit Confirm Dialog ── */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setShowConfirm(false); }}
        >
          <div className="animate-scaleIn w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="bg-gradient-to-r from-primary to-secondary px-5 py-4">
              <h3 className="text-lg font-bold text-white">Submit Exam?</h3>
              <p className="text-sm text-indigo-200">Review your progress before submitting.</p>
            </div>

            <div className="space-y-4 p-5">
              {unanswered > 0 ? (
                <div className="flex gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
                  <span className="shrink-0">⚠️</span>
                  <p>
                    <strong>{unanswered}</strong> question{unanswered !== 1 ? 's' : ''} unanswered — will be marked incorrect.
                  </p>
                </div>
              ) : (
                <div className="flex gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                  <span>✅</span>
                  <p>All {totalQ} questions answered!</p>
                </div>
              )}

              <div className="rounded-xl bg-slate-50 p-3">
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="text-slate-600">Progress</span>
                  <span className="font-semibold text-slate-900">{answeredCount}/{totalQ}</span>
                </div>
                <ProgressBar value={(answeredCount / totalQ) * 100} height="sm" />
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setShowConfirm(false)} variant="outline" size="md" fullWidth>
                  Cancel
                </Button>
                <Button onClick={handleSubmitExam} variant="success" size="md" fullWidth>
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