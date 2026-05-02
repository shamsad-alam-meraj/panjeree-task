import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExamState, Exam, Question } from '@/types';

const dummyQuestions: Question[] = [
  {
    id: '1',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris',
  },
  {
    id: '2',
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
  },
  {
    id: '3',
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswer: 'Pacific Ocean',
  },
  {
    id: '4',
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Jane Austen', 'Charles Dickens', 'William Shakespeare', 'Mark Twain'],
    correctAnswer: 'William Shakespeare',
  },
  {
    id: '5',
    question: 'What is the smallest prime number?',
    options: ['1', '2', '3', '5'],
    correctAnswer: '2',
  },
];

const dummyExams: Exam[] = [
  {
    id: 'exam-1',
    title: 'General Knowledge Quiz',
    description: 'Test your general knowledge across various topics',
    duration: 30,
    totalQuestions: 5,
    questions: dummyQuestions,
  },
  {
    id: 'exam-2',
    title: 'Science Fundamentals',
    description: 'Basic science questions covering physics, chemistry, and biology',
    duration: 45,
    totalQuestions: 5,
    questions: dummyQuestions,
  },
  {
    id: 'exam-3',
    title: 'History and Culture',
    description: 'Questions about world history and cultural knowledge',
    duration: 40,
    totalQuestions: 5,
    questions: dummyQuestions,
  },
];

const initialState: ExamState = {
  exams: dummyExams,
  currentExam: null,
  userAnswers: {},
};

const examsSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    setCurrentExam: (state, action: PayloadAction<Exam>) => {
      state.currentExam = action.payload;
      state.userAnswers = {};
    },
    saveAnswer: (state, action: PayloadAction<{ questionId: string; answer: string }>) => {
      state.userAnswers[action.payload.questionId] = action.payload.answer;
    },
    clearCurrentExam: (state) => {
      state.currentExam = null;
      state.userAnswers = {};
    },
  },
});

export const { setCurrentExam, saveAnswer, clearCurrentExam } = examsSlice.actions;
export default examsSlice.reducer;
