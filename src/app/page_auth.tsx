'use client'

import React from 'react';
//import VidClipOG from '@/components/VidClipOG';
import Login from '../login/page'; // Updated import path

const Page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Video Processing App</h1>
        
        {/* Only showing Login component */}
        <div className="mt-8">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Page;
