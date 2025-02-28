'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear all authentication data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('loginTime');
    
    // Redirect to home page
    router.push('/');
    
    // Force a page refresh to ensure all state is reset
    window.location.reload();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white font-medium transition-colors"
    >
      Logout
    </button>
  );
}