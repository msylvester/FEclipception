// app/page.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState } from 'react';
import VideoClipGenerator from '@/components/VideoClipGenerator';
import VideoPlayer from '@/components/VideoPlayer';
import VidClipOG from '@/components/VidClipOG';

const Page = () => {
  const FLASK_SERVER = 'http://localhost:5001';
  const [currentView, setCurrentView] = useState<string>('player'); // Default view
  const initialVideoPath = null;

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex justify-center my-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button 
            type="button" 
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${currentView === 'player' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setCurrentView('player')}
          >
            Video Player
          </button>
          <button 
            type="button" 
            className={`px-4 py-2 text-sm font-medium ${currentView === 'generator' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setCurrentView('generator')}
          >
            Video Generator
          </button>
          <button 
            type="button" 
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${currentView === 'legacy' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            onClick={() => setCurrentView('legacy')}
          >
            Legacy Generator
          </button>
        </div>
      </div>
      
      {/* Content Based on Current View */}
      <div className="mt-4">
        {currentView === 'player' && (
          <VideoPlayer 
            videoPath={initialVideoPath}
            title="Simulating the Human Race"
          />
        )}
        
        {currentView === 'generator' && (
          <div className="bg-white rounded-lg shadow-lg p-4">
            <VideoClipGenerator />
          </div>
        )}
        
        {currentView === 'legacy' && (
          <div className="mt-8">
            <VidClipOG />
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
