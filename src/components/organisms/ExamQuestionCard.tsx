import React from 'react';
import { Card } from '@/components/molecules';
import { Badge } from '@/components/atoms';
import { Question } from '@/types';

interface ExamQuestionCardProps {
  question: Question;
  currentAnswer?: string;
  onAnswerChange: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

export const ExamQuestionCard: React.FC<ExamQuestionCardProps> = ({
  question,
  currentAnswer,
  onAnswerChange,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <Card className="mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Question {questionNumber}</h3>
          <p className="mt-1 text-sm text-slate-500">{questionNumber} of {totalQuestions}</p>
        </div>
        <Badge variant="primary" size="sm">
          {questionNumber} / {totalQuestions}
        </Badge>
      </div>

      <p className="text-slate-700 text-lg font-medium mb-6">{question.question}</p>

      <div className="grid gap-4">
        {question.options.map((option) => {
          const active = currentAnswer === option;
          return (
            <label
              key={option}
              className={`group block rounded-[1.5rem] border p-5 transition duration-200 ${
                active
                  ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                  : 'border-slate-200 bg-white hover:border-primary/70'
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={active}
                onChange={(e) => onAnswerChange(e.target.value)}
                className="sr-only"
              />
              <div className="flex items-center gap-4">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border transition duration-200 ${
                    active ? 'border-primary bg-primary text-white' : 'border-slate-300 bg-white text-transparent group-hover:border-primary'
                  }`}
                >
                  ✓
                </span>
                <span className="text-slate-700">{option}</span>
              </div>
            </label>
          );
        })}
      </div>
    </Card>
  );
};
