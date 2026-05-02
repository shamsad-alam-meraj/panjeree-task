import React from 'react';
import { cn } from '@/utils/cn';
import { Question } from '@/types';

interface ExamQuestionCardProps {
  question: Question;
  currentAnswer?: string;
  onAnswerChange: (answer: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export const ExamQuestionCard: React.FC<ExamQuestionCardProps> = ({
  question,
  currentAnswer,
  onAnswerChange,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <div className="animate-scaleIn rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
      {/* Question label */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Question {questionNumber}
          </span>
          <span className="ml-1.5 text-xs text-slate-400">of {totalQuestions}</span>
        </div>
        {currentAnswer && (
          <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
            ✓ Answered
          </span>
        )}
      </div>

      {/* Question text */}
      <p className="mb-6 text-lg font-semibold leading-relaxed text-slate-900">
        {question.question}
      </p>

      {/* Options */}
      <div className="grid gap-2.5">
        {question.options.map((option, idx) => {
          const isSelected = currentAnswer === option;
          const letter = LETTERS[idx] ?? String(idx + 1);

          return (
            <label
              key={option}
              className={cn(
                'group flex cursor-pointer items-center gap-3.5 rounded-xl border-2 p-4 transition-all duration-200',
                isSelected
                  ? 'border-primary bg-primary/5 shadow-md shadow-primary/10'
                  : 'border-slate-100 bg-slate-50/50 hover:border-primary/40 hover:bg-white hover:shadow-sm',
              )}
            >
              <input
                type="radio"
                name={`q-${question.id}`}
                value={option}
                checked={isSelected}
                onChange={(e) => onAnswerChange(e.target.value)}
                className="sr-only"
              />
              {/* Letter chip */}
              <span
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-all duration-200',
                  isSelected
                    ? 'bg-primary text-white shadow-sm shadow-primary/30'
                    : 'bg-slate-200 text-slate-500 group-hover:bg-primary/15 group-hover:text-primary',
                )}
              >
                {letter}
              </span>
              <span
                className={cn(
                  'flex-1 text-sm font-medium transition-colors',
                  isSelected ? 'text-primary' : 'text-slate-700 group-hover:text-slate-900',
                )}
              >
                {option}
              </span>
              {isSelected && (
                <span className="shrink-0 text-primary text-base" aria-hidden>✓</span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
};
