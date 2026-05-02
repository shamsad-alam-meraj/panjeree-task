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
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Question {questionNumber}</h3>
        <Badge variant="primary" size="sm">
          {questionNumber} of {totalQuestions}
        </Badge>
      </div>

      <p className="text-gray-700 text-base mb-6 font-medium">{question.question}</p>

      <div className="space-y-3">
        {question.options.map((option) => (
          <label key={option} className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: currentAnswer === option ? '#4F46E5' : '#D1D5DB' }}>
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option}
              checked={currentAnswer === option}
              onChange={(e) => onAnswerChange(e.target.value)}
              className="w-4 h-4 text-primary"
            />
            <span className="ml-3 text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </Card>
  );
};
