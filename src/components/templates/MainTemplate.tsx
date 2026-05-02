'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/authSlice';
import { Button } from '@/components/atoms';
import { useRouter } from 'next/navigation';
import { RootState } from '@/types';

interface MainTemplateProps {
  children: React.ReactNode;
}

export const MainTemplate: React.FC<MainTemplateProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { results } = useSelector((state: RootState) => state.results);
  const [showResults, setShowResults] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Panjeree Exam</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-gray-600 text-sm">Welcome</p>
              <p className="text-gray-900 font-bold">{user?.name}</p>
            </div>
            {results.length > 0 && (
              <Button onClick={() => setShowResults(!showResults)} variant="secondary" size="sm">
                📊 Results ({results.length})
              </Button>
            )}
            <Button onClick={handleLogout} variant="danger" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Results Modal */}
      {showResults && results.length > 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Your Results</h2>
              <button onClick={() => setShowResults(false)} className="text-white text-2xl hover:opacity-80">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {results.map((result, idx) => (
                <div key={idx} className="p-4 border-2 border-slate-200 rounded-lg hover:border-primary transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">Result #{results.length - idx}</h3>
                    <span className={`font-bold text-lg ${result.percentage >= 80 ? 'text-success' : result.percentage >= 60 ? 'text-warning' : 'text-danger'}`}>
                      {result.percentage}%
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">Score: <span className="font-semibold">{result.score}/{result.totalScore}</span></p>
                  <p className="text-gray-500 text-xs">{new Date(result.completedAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
};
