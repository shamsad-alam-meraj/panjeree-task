'use client';

import React from 'react';
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
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Panjeree Exam</h1>
          <div className="flex items-center gap-4">
            <p className="text-gray-700">
              Welcome, <span className="font-semibold">{user?.name}</span>
            </p>
            <Button onClick={handleLogout} variant="danger" size="sm">
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
};
