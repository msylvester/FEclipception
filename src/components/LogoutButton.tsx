'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('loginTime');
      router.push('/login');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded border border-slate-600 transition-colors"
    >
      Logout
    </button>
  );
}