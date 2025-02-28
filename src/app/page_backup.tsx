'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Simple auth functions
const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isLoggedIn') === 'true';
};

const getUserEmail = (): string | null => {
  return localStorage.getItem('userEmail');
};

const logout = (): void => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('loginTime');
};

const Page: React.FC = () => {
  const router = useRouter();
  
  // State for auth and user
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Check auth on component mount
  useEffect(() => {
    const checkAuth = (): void => {
      const authStatus = isAuthenticated();
      setIsLoggedIn(authStatus);
      
      if (authStatus) {
        setUserEmail(getUserEmail());
      }
    };
    
    checkAuth();
    // Re-check auth when window gets focus
    window.addEventListener('focus', checkAuth);
    return () => window.removeEventListener('focus', checkAuth);
  }, []);

  // Handle login button click
  const handleLogin = (): void => {
    router.push('/login');
  };

  // Handle logout button click
  const handleLogout = (): void => {
    logout();
    setIsLoggedIn(false);
    setUserEmail(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Auth Buttons */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Video Processing App</h1>
          
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <span className="text-sm">Welcome, {userEmail?.split('@')[0] || 'User'}</span>
                <button 
                  onClick={handleLogout}
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium transition-colors"
              >
                Login
              </button>
            )}
          </div>
        </div>
        
        {isLoggedIn ? (
          <div className="p-10 bg-slate-800 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Welcome to the Video Processing App</h2>
            <p className="text-gray-300 mb-4">
              You are now logged in. This is where the video processing functionality would be displayed.
            </p>
            <p className="text-gray-300">
              The video processing components will be implemented in the next phase.
            </p>
          </div>
        ) : (
          // Show login message when not authenticated
          <div className="flex flex-col items-center justify-center p-10 bg-slate-800 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Please Login</h2>
            <p className="text-gray-300 mb-6">You need to be logged in to access the video processing tools.</p>
            <button
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium transition-colors"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

