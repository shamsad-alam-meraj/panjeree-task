# Panjeree Exam - Frontend Web Application

A modern, responsive frontend web application built with **Next.js 14**, **React**, **Redux**, and **TailwindCSS**, following **Atomic Design** principles. This application provides a complete exam management system with user authentication, exam taking, and results display.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Atomic Design Structure](#atomic-design-structure)
- [Redux Store](#redux-store)
- [Project Walkthrough](#project-walkthrough)
- [Key Pages](#key-pages)

## ✨ Features

### Authentication
- **Login**: Users can log in with name and email
- **Register**: Users can register with name and email and email confirmation
- Local Redux state management (no backend integration)

### Exam Management
- **Exam List**: Browse available exams with descriptions
- **Exam Taking**: Complete exam with multiple-choice questions
- **Navigation**: Move between questions using Previous/Next buttons
- **Progress Tracking**: Visual progress bar showing exam completion status

### Results & Scoring
- **Instant Results**: Score displayed immediately after exam submission
- **Percentage Calculation**: Automatic score calculation based on correct answers
- **Answer Review**: Complete review of all answers with correct/incorrect indicators
- **Result History**: Store results in Redux for future reference

## 🗂️ Project Structure

```
panjeree-exam-frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Root layout with Redux Provider
│   │   ├── page.tsx                 # Home page
│   │   ├── login/
│   │   │   └── page.tsx             # Login page
│   │   ├── register/
│   │   │   └── page.tsx             # Register page
│   │   ├── exam-list/
│   │   │   └── page.tsx             # Exam list page
│   │   ├── exam/
│   │   │   └── page.tsx             # Exam taking page
│   │   └── result/
│   │       └── page.tsx             # Result display page
│   │
│   ├── components/                  # Atomic Design Components
│   │   ├── atoms/                   # Smallest building blocks
│   │   │   ├── Button.tsx           # Reusable button component
│   │   │   ├── Input.tsx            # Reusable input component
│   │   │   ├── Label.tsx            # Reusable label component
│   │   │   ├── Badge.tsx            # Reusable badge component
│   │   │   └── index.ts             # Atoms export
│   │   │
│   │   ├── molecules/               # Combinations of atoms
│   │   │   ├── FormField.tsx        # Label + Input + Error
│   │   │   ├── Card.tsx             # Card wrapper component
│   │   │   ├── ExamCard.tsx         # Exam display card
│   │   │   └── index.ts             # Molecules export
│   │   │
│   │   ├── organisms/               # Complex UI sections
│   │   │   ├── LoginForm.tsx        # Complete login form
│   │   │   ├── RegisterForm.tsx     # Complete register form
│   │   │   ├── ExamQuestionCard.tsx # Question with options
│   │   │   ├── ExamForm.tsx         # Complete exam form
│   │   │   └── index.ts             # Organisms export
│   │   │
│   │   ├── templates/               # Page-level layouts
│   │   │   ├── AuthTemplate.tsx     # Authentication pages layout
│   │   │   ├── MainTemplate.tsx     # Main app pages layout with navbar
│   │   │   └── index.ts             # Templates export
│   │   └── index.ts                 # All components export
│   │
│   ├── store/                       # Redux Store
│   │   ├── authSlice.ts            # Authentication state management
│   │   ├── examsSlice.ts           # Exams & questions state
│   │   ├── resultsSlice.ts         # Results state management
│   │   └── index.ts                # Store configuration
│   │
│   ├── types/                       # TypeScript Types
│   │   └── index.ts                # All type definitions
│   │
│   ├── styles/                      # Global Styles
│   │   └── globals.css             # Tailwind CSS imports
│   │
│   └── utils/                       # Utility functions
│
├── public/                          # Static assets
├── package.json                     # Dependencies & scripts
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── postcss.config.mjs               # PostCSS configuration
├── next.config.js                   # Next.js configuration
├── .eslintrc.json                   # ESLint configuration
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14.0.0
- **UI Library**: React 18.2.0
- **State Management**: Redux Toolkit 1.9.7 & Redux 4.2.1
- **Styling**: TailwindCSS 3.3.6
- **Language**: TypeScript 5.3.3
- **Code Quality**: ESLint
- **Build Tool**: PostCSS

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Clone Repository

```bash
git clone https://github.com/yourusername/panjeree-exam-frontend.git
cd panjeree-exam-frontend
```

### Install Dependencies

```bash
npm install
```

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 🎨 Atomic Design Structure

### Atoms
Smallest, most reusable UI components:
- `Button` - Customizable button with variants and sizes
- `Input` - Text input with error handling
- `Label` - Form labels with required indicator
- `Badge` - Status badges with variants

### Molecules
Combinations of atoms forming functional units:
- `FormField` - Label + Input with error message
- `Card` - Container component with shadow and padding
- `ExamCard` - Exam display card with details and action button

### Organisms
Complex UI sections composed of molecules and atoms:
- `LoginForm` - Complete login form with validation
- `RegisterForm` - Complete registration form
- `ExamQuestionCard` - Question display with radio options
- `ExamForm` - Full exam taking interface

### Templates
Page-level layouts:
- `AuthTemplate` - Gradient background for auth pages
- `MainTemplate` - Main layout with navbar and user info

### Pages
Complete pages rendered by Next.js:
- Home page
- Login page
- Register page
- Exam list page
- Exam page
- Result page

## 🏪 Redux Store

### Store Structure

```typescript
RootState = {
  auth: {
    user: User | null
    isAuthenticated: boolean
  }
  exams: {
    exams: Exam[]
    currentExam: Exam | null
    userAnswers: Record<string, string>
  }
  results: {
    results: ExamResult[]
    currentResult: ExamResult | null
  }
}
```

### Slices

#### authSlice
- **Actions**: `register`, `login`, `logout`
- **State**: User info and authentication status
- **Usage**: Authentication flows

#### examsSlice
- **Actions**: `setCurrentExam`, `saveAnswer`, `clearCurrentExam`
- **State**: Exams list, current exam, user answers
- **Usage**: Exam management and question answering

#### resultsSlice
- **Actions**: `saveResult`, `setCurrentResult`, `clearCurrentResult`
- **State**: Results history and current result
- **Usage**: Result tracking and display

## 📄 Project Walkthrough

### 1. Home Page
- Landing page with login/register options (if not authenticated)
- Exam list navigation (if authenticated)

### 2. Authentication Flow
- **Login**: Enter name and email
- **Register**: Enter name, email, and confirm email
- Both options store user in Redux

### 3. Exam Flow
- **View Exams**: Browse available exams
- **Start Exam**: Select and begin an exam
- **Answer Questions**: Navigate through questions with Previous/Next
- **Submit**: Complete exam and view results
- **Results**: See score, percentage, and answer review

## 📑 Key Pages

### Home (`/`)
Entry point with authentication options or exam access

### Login (`/login`)
User authentication with name and email

### Register (`/register`)
New user registration with email confirmation

### Exam List (`/exam-list`)
Display all available exams with details

### Exam (`/exam`)
Interactive exam taking with questions and answers

### Result (`/result`)
Exam results with score, percentage, and answer review

## 🎯 Dummy Data

The application includes dummy data for:
- **5 Exams** with varying durations
- **5 Questions** per exam covering general knowledge
- **Multiple choice options** for each question

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Mobile-optimized components
- Works seamlessly on desktop and mobile devices

## 🔐 Data Management

- All data stored in Redux store
- No backend integration
- Data persists during user session
- Clear separation of concerns with Redux slices

## 🚀 Deployment

The application can be deployed to:
- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting platform

## 📝 Git Workflow

Repository includes regular commits with clear, descriptive messages:
- Initial setup
- Component creation
- Page implementation
- Redux store setup
- Styling and styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit with clear messages
4. Push to the branch
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning and development

## 💡 Tips for Development

1. **Component Reusability**: Leverage atomic design components
2. **State Management**: Use Redux for all global state
3. **Type Safety**: Utilize TypeScript types for better development experience
4. **Styling**: Use TailwindCSS utilities for consistent styling
5. **Navigation**: Use Next.js routing for smooth page transitions

---

**Built with ❤️ for the Panjeree Trainee Frontend Developer Program**
