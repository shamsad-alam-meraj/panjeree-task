'use client';

import React, { useState, useEffect } from 'react';
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (!currentExam || !user) {
    return <div className="text-center text-gray-600">No exam selected</div>;
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
    // Calculate score
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
    <div className="w-full max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{currentExam.title}</h1>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestionIndex + 1) / currentExam.questions.length) * 100}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Question {currentQuestionIndex + 1} of {currentExam.questions.length}
        </p>
      </div>

      {/* Question */}
      <ExamQuestionCard
        question={currentQuestion}
        currentAnswer={userAnswers[currentQuestion.id] || ''}
        onAnswerChange={(answer) => dispatch(saveAnswer({ questionId: currentQuestion.id, answer }))}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={currentExam.questions.length}
      />

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-between mt-8">
        <Button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          variant="secondary"
          size="md"
        >
          Previous
        </Button>

        {isLastQuestion ? (
          <Button onClick={handleSubmitExam} variant="success" size="md">
            Submit Exam
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} variant="primary" size="md">
            Next
          </Button>
        )}
      </div>
    </div>
  );
};
