'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button, Badge } from '@/components/atoms';
import { AuthTemplate, MainTemplate } from '@/components/templates';
import { RootState } from '@/types';

const features = [
  { icon: '📝', title: 'Multiple Exams', desc: 'Choose from a curated collection of quizzes across different subjects' },
  { icon: '⚡', title: 'Instant Results', desc: 'Get your score and detailed answer review immediately after submission' },
  { icon: '⏱', title: 'Timed Exams', desc: 'Practice under real exam conditions with countdown timers' },
  { icon: '📊', title: 'Track Progress', desc: 'Review your history and see how you improve over time' },
];

export default function HomePage() {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { results } = useSelector((state: RootState) => state.results);
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <AuthTemplate>
        <div className="flex flex-col items-center gap-10">
          {/* Hero */}
          <div className="text-center max-w-2xl">
            <Badge variant="info" size="sm" className="mb-4">🎓 Smart Exam Preparation Platform</Badge>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl leading-tight mb-4">
              Panjeree{' '}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Exam
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Test your knowledge with our comprehensive exam platform. Get instant feedback, review your answers, and track your progress.
            </p>
          </div>

          {/* Feature pills */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 w-full max-w-3xl">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center hover:bg-white/10 transition-colors">
                <div className="text-3xl mb-2">{f.icon}</div>
                <p className="text-sm font-semibold text-white mb-1">{f.title}</p>
                <p className="text-xs text-slate-400 leading-snug">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row w-full max-w-md">
            <Button onClick={() => router.push('/login')} variant="secondary" size="lg" className="flex-1">
              Sign In →
            </Button>
            <Button onClick={() => router.push('/register')} variant="success" size="lg" className="flex-1">
              Get Started Free
            </Button>
          </div>
        </div>
      </AuthTemplate>
    );
  }

  const totalAttempts = results.length;
  const avgScore = totalAttempts > 0
    ? Math.round(results.reduce((sum, r) => sum + r.percentage, 0) / totalAttempts)
    : null;
  const bestScore = totalAttempts > 0
    ? Math.max(...results.map((r) => r.percentage))
    : null;

  return (
    <MainTemplate>
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-secondary p-8 text-white shadow-xl shadow-primary/20">
          <div className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="relative">
            <p className="text-indigo-200 text-sm font-semibold uppercase tracking-widest mb-2">স্বাগতম!</p>
            <h1 className="text-3xl font-extrabold sm:text-4xl mb-2">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-indigo-200 max-w-lg">
              Ready to test your knowledge? Choose an exam from the list and begin your journey.
            </p>
            <div className="mt-6">
              <Button
                onClick={() => router.push('/exam-list')}
                variant="secondary"
                size="md"
              >
                পরীক্ষা দাও →
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Row (only shown if any attempts) */}
        {totalAttempts > 0 && (
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5 text-center">
              <p className="text-3xl font-extrabold text-primary">{totalAttempts}</p>
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mt-1">Exams Taken</p>
            </div>
            {avgScore !== null && (
              <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 text-center">
                <p className="text-3xl font-extrabold text-amber-600">{avgScore}%</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-400 mt-1">Avg Score</p>
              </div>
            )}
            {bestScore !== null && (
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-center">
                <p className="text-3xl font-extrabold text-emerald-600">{bestScore}%</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400 mt-1">Best Score</p>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Browse Exams</h3>
            <p className="text-slate-500 text-sm mb-5 leading-relaxed">Select from 4 different exam categories</p>
            <Button onClick={() => router.push('/exam-list')} variant="primary" size="md" className="w-full">
              View All Exams
            </Button>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Quick Tips</h3>
            <p className="text-slate-500 text-sm mb-5 leading-relaxed">Read all questions carefully before answering</p>
            <ul className="text-sm text-slate-600 space-y-1.5">
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Manage your time wisely</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Answer all questions</li>
              <li className="flex items-center gap-2"><span className="text-primary">✓</span> Review before submitting</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all sm:col-span-2 lg:col-span-1">
            <div className="text-4xl mb-3">ℹ️</div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">How It Works</h3>
            <p className="text-slate-500 text-sm mb-4 leading-relaxed">Simple 3-step process</p>
            <ol className="text-sm text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">1</span>
                Choose an exam from the list
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">2</span>
                Answer all questions within the time limit
              </li>
              <li className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">3</span>
                Submit and get your score instantly
              </li>
            </ol>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
