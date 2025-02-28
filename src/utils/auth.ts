'use client';

// User interface
export interface User {
  email: string | null;
  name: string;
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isLoggedIn') === 'true';
};

// Login function
export const login = (email: string): void => {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userEmail', email);
  localStorage.setItem('loginTime', Date.now().toString());
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('loginTime');
  
  // Force reload to ensure clean state
  window.location.href = '/';
};

// Get user info
export const getUserInfo = (): User | null => {
  if (!isAuthenticated()) return null;
  
  const email = localStorage.getItem('userEmail');
  return {
    email,
    name: email ? email.split('@')[0] : 'User'
  };
};
