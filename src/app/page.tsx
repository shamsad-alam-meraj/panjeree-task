'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms';
import { AuthTemplate, MainTemplate } from '@/components/templates';
import { RootState } from '@/types';

export default function HomePage() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <AuthTemplate>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-[1.5rem] bg-slate-900/70 p-10 shadow-2xl shadow-slate-950/20 sm:p-14">
          <div className="space-y-4 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">🎓 Smart exam preparation</p>
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">Panjeree Exam</h1>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-200">
              Test your knowledge with our comprehensive exam platform. Get instant feedback and track your progress.
            </p>
          </div>

          {/* Features */}
          <div className="grid gap-4 sm:grid-cols-3 my-4">
            <div className="rounded-lg bg-white/5 p-4 text-center">
              <div className="text-3xl mb-2">📝</div>
              <p className="text-sm text-slate-300">Multiple Exams</p>
            </div>
            <div className="rounded-lg bg-white/5 p-4 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-sm text-slate-300">Instant Results</p>
            </div>
            <div className="rounded-lg bg-white/5 p-4 text-center">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-sm text-slate-300">Track Progress</p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Button onClick={() => router.push('/login')} variant="secondary" size="lg" className="w-full">
              ✨ Login
            </Button>
            <Button onClick={() => router.push('/register')} variant="success" size="lg" className="w-full">
              🚀 Register
            </Button>
          </div>
        </div>
      </AuthTemplate>
    );
  }

  return (
    <MainTemplate>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-primary/5 to-secondary/5 p-10 shadow-lg">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-primary font-bold">Welcome back</p>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Ready to Test Your Knowledge?</h1>
            <p className="max-w-2xl text-lg leading-7 text-slate-600">
              Choose from our collection of carefully designed exams. Get instant feedback, track your progress, and improve your skills.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Start Exam</h3>
            <p className="text-slate-600 text-sm mb-4">Choose from available exams and begin</p>
            <Button onClick={() => router.push('/exam-list')} variant="primary" size="md" className="w-full">
              Browse Exams
            </Button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">View Results</h3>
            <p className="text-slate-600 text-sm mb-4">Check your exam results and progress</p>
            <Button onClick={() => router.push('/exam-list')} variant="secondary" size="md" className="w-full">
              View All Results
            </Button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Quick Tips</h3>
            <p className="text-slate-600 text-sm mb-4">Read before starting your exams</p>
            <Button onClick={() => router.push('/exam-list')} variant="success" size="md" className="w-full">
              Get Started
            </Button>
          </div>
        </div>

        {/* Main CTA */}
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-r from-primary to-secondary p-10 text-white text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Start Your Exam Journey Today</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Challenge yourself with comprehensive exams designed to test your knowledge and skills
          </p>
          <Button onClick={() => router.push('/exam-list')} variant="primary" size="lg" className="w-full sm:w-auto">
            View Exams
          </Button>
          <div className="rounded-3xl bg-slate-50 p-5 shadow-sm">
            <p className="text-sm text-slate-500">Need help?</p>
            <p className="font-semibold text-slate-900">Contact support for quick guidance.</p>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
