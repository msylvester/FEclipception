'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Check auth on component mount and when window gets focus
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(authStatus);
      
      if (authStatus) {
        setUserEmail(localStorage.getItem('userEmail'));
      }
    };
    
    // Check immediately
    if (typeof window !== 'undefined') {
      checkAuth();
      
      // Re-check when window gets focus (user may have logged in/out in another tab)
      window.addEventListener('focus', checkAuth);
      
      // Cleanup
      return () => window.removeEventListener('focus', checkAuth);
    }
  }, []);

  return (
    <header className="bg-slate-900 py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-bold text-white">Video Processing App</h1>
        </Link>
        
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <span className="text-sm text-gray-300">
                Logged in as: {userEmail?.split('@')[0] || 'User'}
              </span>
              <LogoutButton />
            </>
          ) : (
            <Link href="/login">
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium transition-colors">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
