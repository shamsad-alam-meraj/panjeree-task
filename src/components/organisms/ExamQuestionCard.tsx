import React from 'react';
import { Card } from '@/components/molecules';
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
  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <Card>
      {/* Question number label */}
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">
          Question {questionNumber} <span className="text-slate-400">/ {totalQuestions}</span>
        </p>
        <p className="text-lg font-semibold text-slate-900 leading-relaxed">{question.question}</p>
      </div>

      {/* Options */}
      <div className="grid gap-3">
        {question.options.map((option, idx) => {
          const active = currentAnswer === option;
          const letter = optionLetters[idx] ?? String(idx + 1);

          return (
            <label
              key={option}
              className={`group flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200 ${
                active
                  ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                  : 'border-slate-200 bg-white hover:border-primary/50 hover:bg-slate-50'
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
              {/* Option letter bubble */}
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-all duration-200 ${
                  active
                    ? 'bg-primary text-white shadow-md shadow-primary/30'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary'
                }`}
              >
                {letter}
              </span>
              <span className={`text-base font-medium ${active ? 'text-slate-900' : 'text-slate-700'}`}>
                {option}
              </span>
              {active && (
                <span className="ml-auto text-primary text-lg shrink-0">✓</span>
              )}
            </label>
          );
        })}
      </div>
    </Card>
  );
};
