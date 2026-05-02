import React from 'react';

interface QuestionNavProps {
  totalQuestions: number;
  currentIndex: number;
  answeredQuestions: Set<string>;
  questionIds: string[];
  onNavigate: (index: number) => void;
}

export const QuestionNav: React.FC<QuestionNavProps> = ({
  totalQuestions,
  currentIndex,
  answeredQuestions,
  questionIds,
  onNavigate,
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Questions</p>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const isAnswered = answeredQuestions.has(questionIds[i]);
          const isCurrent = i === currentIndex;

          return (
            <button
              key={i}
              onClick={() => onNavigate(i)}
              aria-label={`Question ${i + 1}${isAnswered ? ' (answered)' : ''}`}
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                isCurrent
                  ? 'bg-primary text-white shadow-md shadow-primary/30 scale-110'
                  : isAnswered
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200'
                  : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-primary" />
          Current
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-emerald-200" />
          Answered
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-slate-200" />
          Unanswered
        </span>
      </div>
    </div>
  );
};
