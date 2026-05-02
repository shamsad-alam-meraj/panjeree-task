import React from 'react';
import { Badge, Button } from '@/components/atoms';
import { cn } from '@/utils/cn';
import { Exam, Difficulty } from '@/types';

interface ExamCardProps {
  exam: Exam;
  onStart: () => void;
  style?: React.CSSProperties;
}

const difficultyConfig: Record<
  Difficulty,
  { badge: 'success' | 'warning' | 'danger'; dot: string; label: string }
> = {
  Easy:   { badge: 'success', dot: 'bg-emerald-400', label: 'Easy' },
  Medium: { badge: 'warning', dot: 'bg-amber-400',   label: 'Medium' },
  Hard:   { badge: 'danger',  dot: 'bg-red-400',     label: 'Hard' },
};

const categoryMeta: Record<string, { icon: string; accent: string; bg: string }> = {
  'General Knowledge': { icon: '🌍', accent: '#4F46E5', bg: 'from-indigo-500/10 to-violet-500/10' },
  'Science':           { icon: '🔬', accent: '#06B6D4', bg: 'from-cyan-500/10 to-sky-500/10' },
  'History':           { icon: '📜', accent: '#F59E0B', bg: 'from-amber-500/10 to-orange-500/10' },
  'Mathematics':       { icon: '📐', accent: '#10B981', bg: 'from-emerald-500/10 to-teal-500/10' },
  'Literature':        { icon: '📚', accent: '#8B5CF6', bg: 'from-violet-500/10 to-purple-500/10' },
};

export const ExamCard: React.FC<ExamCardProps> = ({ exam, onStart, style }) => {
  const diff = difficultyConfig[exam.difficulty] ?? { badge: 'primary' as const, dot: 'bg-primary', label: exam.difficulty };
  const meta = categoryMeta[exam.category] ?? { icon: '📝', accent: '#4F46E5', bg: 'from-slate-500/10 to-slate-400/10' };

  return (
    <div
      style={style}
      className="group animate-slideUp flex flex-col rounded-2xl border border-slate-200/80 bg-white shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${meta.accent}, ${meta.accent}99)` }} />

      <div className="flex flex-col flex-1 p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={cn('flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-2xl', meta.bg)}
          >
            {meta.icon}
          </div>
          <div className="flex items-center gap-1.5">
            <span className={cn('h-2 w-2 rounded-full', diff.dot)} />
            <Badge variant={diff.badge} size="sm">{diff.label}</Badge>
          </div>
        </div>

        {/* Title & description */}
        <h3 className="text-base font-bold text-slate-900 leading-snug mb-1.5 group-hover:text-primary transition-colors">
          {exam.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">{exam.description}</p>

        {/* Meta badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          <Badge variant="primary" size="sm">📝 {exam.totalQuestions} Questions</Badge>
          <Badge variant="info" size="sm">⏱ {exam.duration} min</Badge>
        </div>

        {/* CTA */}
        <Button onClick={onStart} variant="primary" size="md" fullWidth>
          পরীক্ষা দাও →
        </Button>
      </div>
    </div>
  );
};
