"use client";

import React, { useState } from 'react';
import { Camera, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ANGLES = [
  "Front Left Quarter",
  "Rear License Plate",
  "Right Side",
  "Interior Damage"
];

interface LiabilityCameraProps {
  onComplete: () => void;
}

type CaptureState = 'idle' | 'uploading' | 'review';

export default function LiabilityCamera({ onComplete }: LiabilityCameraProps) {
  const [currentAngleIndex, setCurrentAngleIndex] = useState(0);
  const [captureState, setCaptureState] = useState<CaptureState>('idle');

  const currentAngle = ANGLES[currentAngleIndex];
  const isComplete = currentAngleIndex >= ANGLES.length;

  const handleCapture = () => {
    if (captureState !== 'idle') return;
    
    setCaptureState('uploading');
    
    // Simulate exactly 1.5s upload pacing
    setTimeout(() => {
      setCaptureState('review');
    }, 1500);
  };

  const handleNext = () => {
    if (currentAngleIndex === ANGLES.length - 1) {
      onComplete();
    } else {
      setCurrentAngleIndex(prev => prev + 1);
      setCaptureState('idle');
    }
  };

  if (isComplete) return null;

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-zinc-950 text-zinc-50 overflow-y-auto dark">
      {/* Header */}
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1">Pre-Tow Photos</h1>
        <p className="text-zinc-400 font-medium text-sm">
          Required for liability protection.
        </p>
        <div className="flex gap-1 mt-4">
          {ANGLES.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full ${
                i < currentAngleIndex ? 'bg-green-500' : 
                i === currentAngleIndex ? 'bg-amber-500' : 'bg-zinc-800'
              }`} 
            />
          ))}
        </div>
      </div>

      {/* Viewfinder Area */}
      <div className="flex-1 p-6 flex flex-col items-center justify-center relative min-h-[400px]">
        <div className="w-full max-w-sm aspect-[3/4] bg-zinc-900 rounded-3xl border-4 border-zinc-800 overflow-hidden relative shadow-2xl flex items-center justify-center">
          
          {/* Overlay Text */}
          <div className="absolute top-4 left-0 right-0 text-center z-20">
            <div className="inline-block bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <span className="font-bold text-amber-500 uppercase tracking-widest text-sm">Capture:</span>
              <span className="font-extrabold text-white ml-2 text-sm">{currentAngle}</span>
            </div>
          </div>

          {/* Camera State UI */}
          {captureState === 'idle' && (
            <div className="flex flex-col items-center text-zinc-700">
              <Camera className="w-24 h-24 mb-4 opacity-50" />
              <p className="font-bold uppercase tracking-widest text-sm">Camera Offline</p>
            </div>
          )}

          {captureState === 'uploading' && (
            <div className="absolute inset-0 bg-zinc-900/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center">
              <Loader2 className="w-16 h-16 text-amber-500 animate-spin mb-4" />
              <p className="font-bold uppercase tracking-widest text-amber-500 text-sm">Uploading to Bucket...</p>
            </div>
          )}

          {captureState === 'review' && (
            <div className="absolute inset-0 z-10 bg-zinc-800 flex items-center justify-center">
              {/* Mock captured photo pattern */}
              <div className="absolute inset-0 opacity-20" style={{ 
                backgroundImage: 'radial-gradient(#3f3f46 2px, transparent 2px)',
                backgroundSize: '20px 20px' 
              }} />
              <ImageIcon className="w-24 h-24 text-zinc-600 drop-shadow-xl" />
              <div className="absolute bottom-4 right-4 bg-green-500 text-green-950 p-2 rounded-full shadow-lg">
                <Check className="w-6 h-6" />
              </div>
            </div>
          )}
          
          {/* Viewfinder crosshairs */}
          {captureState === 'idle' && (
            <>
              <div className="absolute top-[20%] left-[10%] w-8 h-8 border-t-4 border-l-4 border-zinc-700/50 rounded-tl-lg" />
              <div className="absolute top-[20%] right-[10%] w-8 h-8 border-t-4 border-r-4 border-zinc-700/50 rounded-tr-lg" />
              <div className="absolute bottom-[20%] left-[10%] w-8 h-8 border-b-4 border-l-4 border-zinc-700/50 rounded-bl-lg" />
              <div className="absolute bottom-[20%] right-[10%] w-8 h-8 border-b-4 border-r-4 border-zinc-700/50 rounded-br-lg" />
            </>
          )}

        </div>
      </div>

      {/* Action Area */}
      <div className="h-40 flex items-center justify-center px-6 pb-8 bg-zinc-950">
        {captureState === 'idle' || captureState === 'uploading' ? (
          <button
            onClick={handleCapture}
            disabled={captureState === 'uploading'}
            className="relative flex items-center justify-center w-24 h-24 rounded-full border-4 border-zinc-800 bg-zinc-900 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
          >
            <div className="w-20 h-20 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-transform" />
          </button>
        ) : (
          <Button
            onClick={handleNext}
            size="lg"
            className="w-full h-20 bg-green-600 hover:bg-green-500 text-white rounded-2xl text-2xl font-extrabold tracking-tight uppercase shadow-[0_0_30px_-5px_rgba(22,163,74,0.4)] transition-all active:scale-95"
          >
            {currentAngleIndex === ANGLES.length - 1 ? 'Complete Photos' : 'Next Angle'}
          </Button>
        )}
      </div>
    </div>
  );
}
