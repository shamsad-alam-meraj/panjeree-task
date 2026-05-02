import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExamState, Exam, Question } from '@/types';

const generalKnowledgeQuestions: Question[] = [
  {
    id: 'gk-1',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris',
  },
  {
    id: 'gk-2',
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
  },
  {
    id: 'gk-3',
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
    correctAnswer: 'Pacific Ocean',
  },
  {
    id: 'gk-4',
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Jane Austen', 'Charles Dickens', 'William Shakespeare', 'Mark Twain'],
    correctAnswer: 'William Shakespeare',
  },
  {
    id: 'gk-5',
    question: 'What is the smallest prime number?',
    options: ['1', '2', '3', '5'],
    correctAnswer: '2',
  },
  {
    id: 'gk-6',
    question: 'Which country has the largest population in the world?',
    options: ['United States', 'India', 'China', 'Brazil'],
    correctAnswer: 'India',
  },
  {
    id: 'gk-7',
    question: 'What is the currency of Japan?',
    options: ['Yuan', 'Won', 'Yen', 'Ringgit'],
    correctAnswer: 'Yen',
  },
  {
    id: 'gk-8',
    question: 'How many continents are there on Earth?',
    options: ['5', '6', '7', '8'],
    correctAnswer: '7',
  },
];

const scienceQuestions: Question[] = [
  {
    id: 'sc-1',
    question: 'What is the chemical symbol for water?',
    options: ['HO', 'H2O', 'OH2', 'WTR'],
    correctAnswer: 'H2O',
  },
  {
    id: 'sc-2',
    question: 'What is the speed of light in vacuum (approximately)?',
    options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '200,000 km/s'],
    correctAnswer: '300,000 km/s',
  },
  {
    id: 'sc-3',
    question: 'What is the powerhouse of the cell?',
    options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi Apparatus'],
    correctAnswer: 'Mitochondria',
  },
  {
    id: 'sc-4',
    question: 'What is the atomic number of Carbon?',
    options: ['6', '12', '8', '14'],
    correctAnswer: '6',
  },
  {
    id: 'sc-5',
    question: 'Which gas makes up most of Earth\'s atmosphere?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Argon'],
    correctAnswer: 'Nitrogen',
  },
  {
    id: 'sc-6',
    question: 'What is the unit of electrical resistance?',
    options: ['Volt', 'Ampere', 'Watt', 'Ohm'],
    correctAnswer: 'Ohm',
  },
  {
    id: 'sc-7',
    question: 'Which planet has the most moons?',
    options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    correctAnswer: 'Saturn',
  },
  {
    id: 'sc-8',
    question: 'What is the process by which plants make food?',
    options: ['Respiration', 'Fermentation', 'Photosynthesis', 'Digestion'],
    correctAnswer: 'Photosynthesis',
  },
];

const historyQuestions: Question[] = [
  {
    id: 'ht-1',
    question: 'In which year did World War II end?',
    options: ['1943', '1944', '1945', '1946'],
    correctAnswer: '1945',
  },
  {
    id: 'ht-2',
    question: 'Who was the first President of the United States?',
    options: ['Abraham Lincoln', 'Thomas Jefferson', 'George Washington', 'John Adams'],
    correctAnswer: 'George Washington',
  },
  {
    id: 'ht-3',
    question: 'The Great Wall of China was primarily built during which dynasty?',
    options: ['Tang Dynasty', 'Ming Dynasty', 'Han Dynasty', 'Qin Dynasty'],
    correctAnswer: 'Ming Dynasty',
  },
  {
    id: 'ht-4',
    question: 'Who discovered America in 1492?',
    options: ['Vasco da Gama', 'Ferdinand Magellan', 'Christopher Columbus', 'Amerigo Vespucci'],
    correctAnswer: 'Christopher Columbus',
  },
  {
    id: 'ht-5',
    question: 'Which empire was ruled by Julius Caesar?',
    options: ['Greek Empire', 'Ottoman Empire', 'Roman Empire', 'Byzantine Empire'],
    correctAnswer: 'Roman Empire',
  },
  {
    id: 'ht-6',
    question: 'The French Revolution began in which year?',
    options: ['1776', '1783', '1789', '1799'],
    correctAnswer: '1789',
  },
  {
    id: 'ht-7',
    question: 'Who was the first person to walk on the Moon?',
    options: ['Buzz Aldrin', 'Neil Armstrong', 'Yuri Gagarin', 'John Glenn'],
    correctAnswer: 'Neil Armstrong',
  },
  {
    id: 'ht-8',
    question: 'In which city was the Titanic built?',
    options: ['London', 'Liverpool', 'Glasgow', 'Belfast'],
    correctAnswer: 'Belfast',
  },
];

const mathQuestions: Question[] = [
  {
    id: 'mt-1',
    question: 'What is the value of π (pi) to two decimal places?',
    options: ['3.12', '3.14', '3.16', '3.18'],
    correctAnswer: '3.14',
  },
  {
    id: 'mt-2',
    question: 'What is 12 × 12?',
    options: ['132', '140', '144', '148'],
    correctAnswer: '144',
  },
  {
    id: 'mt-3',
    question: 'What is the square root of 144?',
    options: ['11', '12', '13', '14'],
    correctAnswer: '12',
  },
  {
    id: 'mt-4',
    question: 'What is 25% of 200?',
    options: ['25', '40', '50', '75'],
    correctAnswer: '50',
  },
  {
    id: 'mt-5',
    question: 'How many degrees are in a right angle?',
    options: ['45°', '90°', '180°', '360°'],
    correctAnswer: '90°',
  },
  {
    id: 'mt-6',
    question: 'What is the next prime number after 11?',
    options: ['12', '13', '14', '15'],
    correctAnswer: '13',
  },
];

const dummyExams: Exam[] = [
  {
    id: 'exam-1',
    title: 'General Knowledge Quiz',
    description: 'Test your general knowledge across various topics including geography, literature, and more.',
    duration: 10,
    totalQuestions: 8,
    questions: generalKnowledgeQuestions,
    category: 'General Knowledge',
    difficulty: 'Easy',
  },
  {
    id: 'exam-2',
    title: 'Science Fundamentals',
    description: 'Basic science questions covering physics, chemistry, biology, and space exploration.',
    duration: 12,
    totalQuestions: 8,
    questions: scienceQuestions,
    category: 'Science',
    difficulty: 'Medium',
  },
  {
    id: 'exam-3',
    title: 'World History',
    description: 'Explore key events, civilizations, and milestones that shaped our world throughout history.',
    duration: 12,
    totalQuestions: 8,
    questions: historyQuestions,
    category: 'History',
    difficulty: 'Medium',
  },
  {
    id: 'exam-4',
    title: 'Mathematics Challenge',
    description: 'Test your mathematical skills with arithmetic, geometry, and number theory questions.',
    duration: 15,
    totalQuestions: 6,
    questions: mathQuestions,
    category: 'Mathematics',
    difficulty: 'Hard',
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
