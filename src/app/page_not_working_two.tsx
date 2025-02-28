'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageContent from './page_content';
import { isAuthenticated } from '@/utils/auth';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    if (!isAuthenticated()) {
      // Redirect to login if not logged in
      router.push('/login');
    }
  }, [router]);

  // Only render the page content if authenticated
  // This prevents momentary flashing of protected content
  return isAuthenticated() ? <PageContent /> : null;
}
