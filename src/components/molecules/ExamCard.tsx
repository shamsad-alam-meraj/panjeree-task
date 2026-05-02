import React from 'react';
import { Card } from './Card';
import { Badge, Button } from '@/components/atoms';
import { Exam, Difficulty } from '@/types';

interface ExamCardProps {
  exam: Exam;
  onStart: () => void;
}

const difficultyConfig: Record<Difficulty, { variant: 'success' | 'warning' | 'danger'; label: string }> = {
  Easy: { variant: 'success', label: 'Easy' },
  Medium: { variant: 'warning', label: 'Medium' },
  Hard: { variant: 'danger', label: 'Hard' },
};

const categoryIcons: Record<string, string> = {
  'General Knowledge': '🌍',
  'Science': '🔬',
  'History': '📜',
  'Mathematics': '📐',
  'Literature': '📚',
};

export const ExamCard: React.FC<ExamCardProps> = ({ exam, onStart }) => {
  const diffConfig = difficultyConfig[exam.difficulty] ?? { variant: 'primary' as const, label: exam.difficulty };
  const icon = categoryIcons[exam.category] ?? '📝';

  return (
    <Card className="flex flex-col justify-between h-full hover:shadow-2xl hover:shadow-slate-300/50 hover:-translate-y-0.5 transition-all duration-300">
      <div>
        {/* Category Icon */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 text-2xl">
            {icon}
          </div>
          <Badge variant={diffConfig.variant} size="sm">
            {diffConfig.label}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1.5 leading-snug">{exam.title}</h3>
        <p className="text-slate-500 text-sm mb-4 leading-relaxed">{exam.description}</p>

        {/* Meta badges */}
        <div className="flex gap-2 mb-5 flex-wrap">
          <Badge variant="primary" size="sm">
            📝 {exam.totalQuestions} Questions
          </Badge>
          <Badge variant="info" size="sm">
            ⏱ {exam.duration} min
          </Badge>
          <Badge variant="secondary" size="sm">
            {exam.category}
          </Badge>
        </div>
      </div>
      <Button onClick={onStart} variant="primary" size="md" className="w-full">
        পরীক্ষা দাও →
      </Button>
    </Card>
  );
};
