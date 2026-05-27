"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, CarFront, ShieldAlert, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SwipeToConfirm from '@/components/ui/SwipeToConfirm';

interface JobOfferPingProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function JobOfferPing({ onAccept, onDecline }: JobOfferPingProps) {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft <= 0) {
      onDecline();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onDecline]);

  return (
    <div className="relative flex flex-col h-[100dvh] w-full bg-zinc-950 text-zinc-50 overflow-hidden dark">
      {/* Pulsing Alert Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[150vw] h-[150vw] bg-amber-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '2s' }} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col p-6">
        
        {/* Header / Countdown */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 text-amber-500 animate-pulse" style={{ animationDuration: '1s' }}>
            <AlertTriangle className="w-6 h-6" />
            <span className="font-bold uppercase tracking-widest text-sm">Incoming Dispatch</span>
          </div>
          <div className={`font-mono text-xl font-bold ${timeLeft <= 10 ? 'text-red-500 animate-bounce' : 'text-zinc-400'}`}>
            0:{timeLeft.toString().padStart(2, '0')}
          </div>
        </div>

        {/* Core Decision Data */}
        <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8 mb-8">
          
          <div className="space-y-2">
            <div className="text-zinc-400 font-bold tracking-wider uppercase text-sm">Estimated Payout</div>
            <div className="text-7xl font-extrabold text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
              $145<span className="text-4xl text-zinc-500">.00</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center">
              <Navigation className="w-8 h-8 text-amber-500 mb-2" />
              <div className="text-2xl font-bold text-white">4.2 <span className="text-sm text-zinc-400">mi</span></div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">12 min Away</div>
            </div>
            
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 flex flex-col items-center justify-center">
              <MapPin className="w-8 h-8 text-amber-500 mb-2" />
              <div className="text-2xl font-bold text-white">8.5 <span className="text-sm text-zinc-400">mi</span></div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Tow Dist.</div>
            </div>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4 w-full max-w-sm flex items-center gap-4 text-left">
            <div className="p-3 bg-zinc-800 rounded-xl">
              <CarFront className="w-8 h-8 text-zinc-300" />
            </div>
            <div>
              <div className="text-lg font-bold text-white">2019 Ford F-150</div>
              <div className="text-sm font-bold text-red-400 flex items-center gap-1">
                <ShieldAlert className="w-4 h-4" /> Accident (Drivetrain locked)
              </div>
            </div>
          </div>

        </div>

        {/* Action Area */}
        <div className="space-y-4 mt-auto">
          <SwipeToConfirm 
            onConfirm={onAccept} 
            text="Swipe to Accept" 
            className="w-full"
          />
          
          <Button 
            variant="outline" 
            onClick={onDecline}
            className="w-full h-16 border-2 border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:bg-zinc-900 hover:text-white rounded-2xl text-lg font-bold uppercase tracking-wider"
          >
            <X className="w-6 h-6 mr-2" />
            Decline
          </Button>
        </div>

      </div>
    </div>
  );
}
