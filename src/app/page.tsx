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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Video Processing App</h1>
        
        {isLoggedIn && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {user?.name || 'User'}
            </span>
            <LogoutButton />
          </div>
        )}
      </div>
      
      {isLoggedIn ? (
        <div className="p-10 bg-slate-100 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Video Processing App</h2>
          <p className="text-gray-600 mb-4">
            You are now logged in. This is where the video processing functionality would be displayed.
          </p>
          <p className="text-gray-600">
            The video processing components will be implemented in the next phase.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-10 bg-slate-100 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-4">Please Login</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access the video processing tools.</p>
          <Link href="/login">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium transition-colors">
              Login
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}