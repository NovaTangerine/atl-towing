"use client";

import React, { useState } from 'react';
import { Camera, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SwipeToConfirm from '@/components/ui/SwipeToConfirm';

interface QuickDropSignoffProps {
  onComplete: () => void;
}

type DropMode = 'signature' | 'unattended';
type PhotoState = 'idle' | 'uploading' | 'review';

export default function QuickDropSignoff({ onComplete }: QuickDropSignoffProps) {
  const [dropMode, setDropMode] = useState<DropMode>('signature');
  const [photoState, setPhotoState] = useState<PhotoState>('idle');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCapture = () => {
    if (photoState !== 'idle') return;
    setPhotoState('uploading');
    setTimeout(() => {
      setPhotoState('review');
    }, 1500);
  };

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  return (
    <div className="relative flex flex-col h-[100dvh] w-full bg-zinc-950 text-zinc-50 overflow-y-auto dark">
      {/* Success Overlay */}
      {isCompleted && (
        <div className="absolute inset-0 z-50 bg-green-500 flex flex-col items-center justify-center animate-in fade-in duration-300">
          <Check className="w-32 h-32 text-green-950 mb-6 drop-shadow-lg" strokeWidth={3} />
          <h1 className="text-4xl font-extrabold text-green-950 tracking-tight text-center px-4">Job Closed!</h1>
          <p className="text-xl font-bold text-green-900 mt-2">$145.00 Earned</p>
        </div>
      )}

      {/* Header & Job Summary */}
      <div className="p-6 bg-zinc-900/40 border-b border-zinc-800">
        <h1 className="text-2xl font-extrabold tracking-tight text-white mb-4">Quick-Drop Sign-off</h1>
        
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 shadow-lg flex justify-between items-center">
          <div>
            <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Payout</div>
            <div className="text-3xl font-extrabold text-green-500">$145.00</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Vehicle</div>
            <div className="font-bold text-white">2019 Ford F-150</div>
            <div className="text-sm text-zinc-400 mt-1 truncate max-w-[150px]">City Impound Lot</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8 flex-1">
        {/* Toggle Mode */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Drop-off Mode</label>
          <div className="flex bg-zinc-900 rounded-xl p-1 border border-zinc-800 shadow-inner">
            <button 
              onClick={() => setDropMode('signature')}
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${dropMode === 'signature' ? 'bg-zinc-800 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Signature
            </button>
            <button 
              onClick={() => setDropMode('unattended')}
              className={`flex-1 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-all ${dropMode === 'unattended' ? 'bg-amber-600 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Unattended
            </button>
          </div>
        </div>

        {/* Drop-off Photo */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex justify-between">
            <span>Drop Condition Photo</span>
            {photoState === 'review' && <span className="text-green-500">Required 1/1</span>}
          </label>
          
          <button 
            onClick={handleCapture}
            disabled={photoState === 'uploading' || photoState === 'review'}
            className="w-full h-40 bg-zinc-900 rounded-2xl border-2 border-dashed border-zinc-700 flex flex-col items-center justify-center text-zinc-500 hover:bg-zinc-800 transition-colors relative overflow-hidden"
          >
            {photoState === 'idle' && (
              <>
                <Camera className="w-10 h-10 mb-2" />
                <span className="font-bold uppercase tracking-wider text-sm">Tap to Capture</span>
              </>
            )}
            
            {photoState === 'uploading' && (
              <>
                <Loader2 className="w-10 h-10 mb-2 text-amber-500 animate-spin" />
                <span className="font-bold uppercase tracking-wider text-sm text-amber-500">Uploading...</span>
              </>
            )}

            {photoState === 'review' && (
              <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#3f3f46 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
                <ImageIcon className="w-12 h-12 text-zinc-600" />
                <div className="absolute top-3 right-3 bg-green-500 rounded-full p-1"><Check className="w-4 h-4 text-green-950" /></div>
              </div>
            )}
          </button>
        </div>

        {/* Signature Pad */}
        {dropMode === 'signature' && (
          <div className="space-y-3 animate-in fade-in slide-in-from-top-4">
            <div className="flex justify-between items-end">
              <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Sign Below</label>
              <button className="text-sm font-bold text-blue-500 uppercase tracking-widest hover:text-blue-400">Clear</button>
            </div>
            <div className="w-full h-40 bg-zinc-100 rounded-2xl relative overflow-hidden flex items-center justify-center border-4 border-zinc-800 shadow-inner">
              <span className="text-zinc-300 font-bold uppercase tracking-widest opacity-50">Sign Here</span>
              <div className="absolute bottom-4 left-4 right-4 border-b-2 border-zinc-300 border-dashed" />
            </div>
          </div>
        )}
      </div>

      {/* Completion Footer */}
      <div className="p-6 bg-zinc-950 border-t border-zinc-900 sticky bottom-0 mt-auto">
        <SwipeToConfirm 
          onConfirm={handleComplete} 
          text="Complete & Go Available"
          className="w-full h-20"
        />
      </div>
    </div>
  );
}
