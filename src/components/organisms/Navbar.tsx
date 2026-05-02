'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { logout } from '@/store/authSlice';
import { Button } from '@/components/atoms';
import { RootState } from '@/types';
import { cn } from '@/utils/cn';

const navLinks = [
  { href: '/exam-list', label: 'Exams', icon: '📋' },
];

export const Navbar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { results } = useSelector((state: RootState) => state.results);
  const [showResults, setShowResults] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <>
      <nav className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-md shadow-primary/25">
              <span className="text-xs font-black text-white tracking-tight">P</span>
            </div>
            <span className="hidden text-base font-bold text-slate-900 sm:block">
              Panjeree<span className="text-primary"> Exam</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 sm:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => router.push(link.href)}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                )}
              >
                <span>{link.icon}</span> {link.label}
              </button>
            ))}

            {results.length > 0 && (
              <button
                onClick={() => setShowResults(true)}
                className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                📊 Results
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                  {results.length}
                </span>
              </button>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* User chip */}
            <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-1.5 sm:flex">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-[10px] font-black text-white shadow-sm">
                {initials}
              </div>
              <span className="text-sm font-semibold text-slate-800 max-w-[120px] truncate">{user?.name}</span>
            </div>

            <Button onClick={handleLogout} variant="ghost" size="sm" className="hidden text-slate-600 hover:text-danger sm:inline-flex">
              Logout
            </Button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 sm:hidden transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="animate-slideDown border-t border-slate-100 bg-white px-4 pb-4 pt-3 sm:hidden">
            <div className="mb-3 flex items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50 p-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-black text-white">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="truncate font-bold text-slate-900">{user?.name}</p>
                <p className="truncate text-xs text-slate-500">{user?.email}</p>
              </div>
            </div>

            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => { router.push(link.href); setMobileOpen(false); }}
                className="mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {link.icon} {link.label}
              </button>
            ))}

            {results.length > 0 && (
              <button
                onClick={() => { setShowResults(true); setMobileOpen(false); }}
                className="mb-1 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                📊 My Results ({results.length})
              </button>
            )}

            <Button onClick={handleLogout} variant="danger" size="sm" fullWidth className="mt-2">
              Logout
            </Button>
          </div>
        )}
      </nav>

      {/* Results History Modal */}
      {showResults && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 backdrop-blur-sm sm:items-center"
          onClick={(e) => { if (e.target === e.currentTarget) setShowResults(false); }}
        >
          <div className="animate-scaleIn w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-gradient-to-r from-primary to-secondary px-5 py-4">
              <div>
                <h2 className="text-lg font-bold text-white">Results History</h2>
                <p className="text-xs text-indigo-200">{results.length} exam{results.length !== 1 ? 's' : ''} completed</p>
              </div>
              <button
                onClick={() => setShowResults(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-sm text-white hover:bg-white/30 transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
              {[...results].reverse().map((result, idx) => (
                <div key={result.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-bold text-slate-500">
                    {results.length - idx}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">{result.examTitle}</p>
                    <p className="text-xs text-slate-500">
                      {result.score}/{result.totalScore} · {new Date(result.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className={cn(
                      'text-base font-bold tabular-nums',
                      result.percentage >= 80 ? 'text-emerald-600' : result.percentage >= 60 ? 'text-amber-600' : 'text-red-500',
                    )}
                  >
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
