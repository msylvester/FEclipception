'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
import { isAuthenticated, getUserInfo } from '@/utils/auth';

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string | null; name: string } | null>(null);

  // Check auth on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkAuth = () => {
        const authStatus = isAuthenticated();
        setIsLoggedIn(authStatus);
        
        if (authStatus) {
          setUser(getUserInfo());
        }
      };
      
      checkAuth();
      window.addEventListener('focus', checkAuth);
      return () => window.removeEventListener('focus', checkAuth);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-6">
          <h1 className="text-2xl font-bold text-white">Video Processing App</h1>
          <h1 className="text-2xl font-bold text-white">TESTER FEB</h1>
          {isLoggedIn && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">
                Welcome, {user?.name || 'User'}
              </span>
              <LogoutButton />
            </div>
          )}
        </div>
        
        {isLoggedIn ? (
          <div className="w-full max-w-4xl mx-auto bg-slate-800 rounded-lg p-8 shadow-lg text-white">
            <h2 className="text-2xl font-semibold mb-4">Welcome to the Video Processing App</h2>
            <p className="text-gray-300 mb-4">
              You are now logged in. This is where the video processing functionality would be displayed.
            </p>
            <p className="text-gray-300">
              The video processing components will be implemented in the next phase.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-md mx-auto bg-slate-800 rounded-lg p-8 shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">Please Login</h2>
            <p className="text-gray-300 mb-6">You need to be logged in to access the video processing tools.</p>
            <Link href="/login">
              <button className="px-4 py-3 rounded font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}