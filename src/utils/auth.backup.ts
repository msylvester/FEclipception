// src/utils/auth.ts
// Simple utilities for managing authentication state

/**
 * Saves authentication state to localStorage and sets a cookie
 */
export function login(email: string): void {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('userEmail', email);
  
  // Set a cookie for middleware usage
  document.cookie = 'auth=true; path=/; max-age=86400'; // 24 hours
}

/**
 * Clears authentication state
 */
export function logout(): void {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userEmail');
  
  // Clear the auth cookie
  document.cookie = 'auth=; path=/; max-age=0';
}

/**
 * Checks if user is logged in (client-side)
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') {
    return false; // When running on server
  }
  
  return localStorage.getItem('isLoggedIn') === 'true';
}

/**
 * Gets the current user's email
 */
export function getCurrentUser(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  return localStorage.getItem('userEmail');
}
