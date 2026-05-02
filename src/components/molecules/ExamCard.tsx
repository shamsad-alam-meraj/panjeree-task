import React from 'react';
import { Card } from './Card';
import { Badge, Button } from '@/components/atoms';
import { Exam } from '@/types';

interface ExamCardProps {
  exam: Exam;
  onStart: () => void;
}

export const ExamCard: React.FC<ExamCardProps> = ({ exam, onStart }) => {
  return (
    <Card className="flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{exam.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{exam.description}</p>
        <div className="flex gap-2 mb-4 flex-wrap">
          <Badge variant="primary" size="sm">
            {exam.totalQuestions} Questions
          </Badge>
          <Badge variant="secondary" size="sm">
            {exam.duration} min
          </Badge>
        </div>
      </div>
      <Button onClick={onStart} variant="primary" size="md" className="w-full">
        Start Exam
      </Button>
    </Card>
  );
};
