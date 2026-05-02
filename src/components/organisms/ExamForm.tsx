'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveAnswer, clearCurrentExam } from '@/store/examsSlice';
import { saveResult } from '@/store/resultsSlice';
import { Button } from '@/components/atoms';
import { ExamQuestionCard } from './ExamQuestionCard';
import { RootState, ExamResult } from '@/types';

interface ExamFormProps {
  onComplete?: () => void;
}

export const ExamForm: React.FC<ExamFormProps> = ({ onComplete }) => {
  const dispatch = useDispatch();
  const { currentExam, userAnswers } = useSelector((state: RootState) => state.exams);
  const { user } = useSelector((state: RootState) => state.auth);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

  if (!currentExam || !user) {
    return <div className="text-center text-slate-600">No exam selected</div>;
  }

  const currentQuestion = currentExam.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === currentExam.questions.length - 1;

  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitExam = () => {
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
      score,
      totalScore: currentExam.questions.length,
      percentage: Math.round((score / currentExam.questions.length) * 100),
      answers: userAnswers,
      completedAt: new Date().toISOString(),
    };

    dispatch(saveResult(result));
    dispatch(clearCurrentExam());
    onComplete?.();
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="mb-8 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">{currentExam.title}</h1>
            <p className="mt-2 text-sm text-slate-500">{currentExam.description}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 px-4 py-3 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Duration</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{currentExam.duration} min</p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-4 py-3 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Questions</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{currentExam.totalQuestions}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 px-4 py-3 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Progress</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{currentQuestionIndex + 1}/{currentExam.questions.length}</p>
            </div>
          </div>
        </div>
        <div className="mt-6 rounded-full bg-slate-100 h-2 overflow-hidden">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: `${((currentQuestionIndex + 1) / currentExam.questions.length) * 100}%` }}
          />
        </div>
      </div>

      <ExamQuestionCard
        question={currentQuestion}
        currentAnswer={userAnswers[currentQuestion.id] || ''}
        onAnswerChange={(answer) => dispatch(saveAnswer({ questionId: currentQuestion.id, answer }))}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={currentExam.questions.length}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between mt-8">
        <Button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          variant="secondary"
          size="md"
          className="w-full sm:w-auto"
        >
          Previous
        </Button>

        {isLastQuestion ? (
          <Button onClick={handleSubmitExam} variant="success" size="md" className="w-full sm:w-auto">
            Submit Exam
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} variant="primary" size="md" className="w-full sm:w-auto">
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
