import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-power-dark/90 backdrop-blur-md border-b border-power-gray shadow-lg shadow-red-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-power-red rounded-lg flex items-center justify-center transform -skew-x-12 shadow-md shadow-red-600/50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-6 h-6 skew-x-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            TUBE<span className="text-power-red">THUMB</span>.AI
          </span>
        </div>
        <div className="text-xs font-medium text-gray-400 border border-power-gray px-3 py-1 rounded-full">
          Powered by Gemini 2.5 Flash
        </div>
      </div>
    </header>
  );
};