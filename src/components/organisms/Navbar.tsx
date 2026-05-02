'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import { Button, Badge } from '@/components/atoms';
import { useRouter } from 'next/navigation';
import { RootState } from '@/types';

export const Navbar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { results } = useSelector((state: RootState) => state.results);
  const [showResults, setShowResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-md shadow-primary/30">
                <span className="text-sm font-extrabold text-white">P</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Panjeree Exam
                </span>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => router.push('/exam-list')}
                className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                📋 Exams
              </button>

              {results.length > 0 && (
                <button
                  onClick={() => setShowResults(true)}
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                >
                  📊 Results
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    {results.length}
                  </span>
                </button>
              )}

              {/* User avatar */}
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 bg-slate-50">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
                  {initials}
                </div>
                <span className="text-sm font-semibold text-slate-700">{user?.name}</span>
              </div>

              <Button onClick={handleLogout} variant="danger" size="sm">
                Logout
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
                {initials}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => { router.push('/exam-list'); setMobileMenuOpen(false); }}
              className="block w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              📋 All Exams
            </button>
            {results.length > 0 && (
              <button
                onClick={() => { setShowResults(true); setMobileMenuOpen(false); }}
                className="block w-full text-left rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                📊 My Results ({results.length})
              </button>
            )}
            <Button onClick={handleLogout} variant="danger" size="sm" className="w-full mt-2">
              Logout
            </Button>
          </div>
        )}
      </nav>

      {/* Results History Modal */}
      {showResults && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setShowResults(false); }}
        >
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">My Results</h2>
                <p className="text-indigo-200 text-sm">{results.length} exam{results.length !== 1 ? 's' : ''} completed</p>
              </div>
              <button
                onClick={() => setShowResults(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
              {[...results].reverse().map((result, idx) => (
                <div key={result.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-500">
                    {results.length - idx}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 text-sm truncate">{result.examTitle}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {result.score}/{result.totalScore} correct · {new Date(result.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`text-lg font-bold ${
                    result.percentage >= 80
                      ? 'text-emerald-600'
                      : result.percentage >= 60
                      ? 'text-amber-600'
                      : 'text-red-500'
                  }`}>
                    {result.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
