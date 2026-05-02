export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  totalQuestions: number;
  questions: Question[];
  category: string;
  difficulty: Difficulty;
}

export interface ExamResult {
  id: string;
  userId: string;
  examId: string;
  examTitle: string;
  score: number;
  totalScore: number;
  percentage: number;
  answers: Record<string, string>; // questionId -> answer
  completedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface ExamState {
  exams: Exam[];
  currentExam: Exam | null;
  userAnswers: Record<string, string>;
}

export interface ResultState {
  results: ExamResult[];
  currentResult: ExamResult | null;
}

export interface RootState {
  auth: AuthState;
  exams: ExamState;
  results: ResultState;
}
