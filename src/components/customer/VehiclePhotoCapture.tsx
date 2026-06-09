"use client";

import React, { useState } from 'react';
import { X, Aperture, Loader2 } from 'lucide-react';

interface VehiclePhotoCaptureProps {
  onCapture: (photoUrl: string) => void;
  onCancel: () => void;
}

export default function VehiclePhotoCapture({ onCapture, onCancel }: VehiclePhotoCaptureProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleCapture = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      // Pass a high-quality mock image of a car
      onCapture('https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=1000&auto=format&fit=crop');
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-between text-white">
      {/* Top Bar */}
      <div className="w-full flex justify-between items-center p-6">
        <button 
          onClick={onCancel}
          disabled={isAnalyzing}
          className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
        >
          <X className="w-6 h-6" />
        </button>
        {isAnalyzing && (
          <div className="bg-primary/20 text-primary border border-primary/30 px-4 py-1.5 rounded-full font-bold text-sm animate-pulse flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing...
          </div>
        )}
      </div>

      {/* Viewfinder UI */}
      <div className="relative w-full flex-1 flex items-center justify-center pointer-events-none">
        <div className="w-[85%] aspect-square border-2 border-white/30 rounded-[3rem] relative flex items-center justify-center">
          {/* Corner Guides */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-[3rem]" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-[3rem]" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-[3rem]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-[3rem]" />
          
          <div className="absolute inset-0 flex items-center justify-center text-white/50 font-bold tracking-widest text-sm uppercase">
            Fit Vehicle Here
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full pb-12 pt-6 flex justify-center items-center">
        <button
          onClick={handleCapture}
          disabled={isAnalyzing}
          className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1 active:scale-95 transition-transform disabled:opacity-50"
        >
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-black">
            {isAnalyzing ? (
              <Loader2 className="w-8 h-8 animate-spin" />
            ) : (
              <Aperture className="w-8 h-8" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
