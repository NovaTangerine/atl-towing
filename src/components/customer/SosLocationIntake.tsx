"use client";

import React, { useState } from 'react';
import { MapPin, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SosLocationIntake() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  const handleSendHelp = () => {
    setIsLoading(true);
    // Simulate network request to lock coordinates
    setTimeout(() => {
      setCoordinates([33.7490, -84.3880]); // Mock Atlanta coordinates
      setIsLoading(false);
      setIsSuccess(true);
      console.log("Coordinates locked:", [33.7490, -84.3880]);
      
      // Mock transition to next step after a moment
      setTimeout(() => {
        setIsSuccess(false);
        // Prepare to transition here
      }, 3000);
    }, 1000);
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-zinc-950 overflow-hidden text-zinc-50 dark">
      {/* Mock Map Background - High contrast dark map placeholder */}
      <div 
        className="absolute inset-0 z-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234b5563' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Subtle Map Lines (Roads) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 200 Q 200 150 400 300 T 800 200" stroke="#374151" strokeWidth="6" fill="none" />
          <path d="M 100 0 C 150 200 250 400 300 800" stroke="#1f2937" strokeWidth="8" fill="none" />
          <path d="M 0 500 Q 300 450 600 600" stroke="#4b5563" strokeWidth="4" fill="none" strokeDasharray="8 8" />
        </svg>
      </div>

      {/* Success Toast */}
      <div className={`absolute top-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-green-500/20 text-green-400 border border-green-500/30 px-5 py-3 rounded-full backdrop-blur-md shadow-lg shadow-green-500/20 transition-all duration-300 ${isSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-semibold text-sm">Location Locked</span>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-6 pb-24">
        
        {/* Instruction Header */}
        <div className="absolute top-24 text-center space-y-1.5 max-w-[85vw]">
          <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-xl">
            Confirm Location
          </h1>
          <p className="text-zinc-400 text-base font-medium drop-shadow-md">
            Drag map to set pickup spot
          </p>
        </div>

        {/* Pulsating Pin */}
        <div className="relative flex items-center justify-center mt-12">
          {/* Pulse Rings */}
          <div className="absolute w-32 h-32 bg-primary/20 rounded-full animate-ping" style={{ animationDuration: '2.5s' }} />
          <div className="absolute w-48 h-48 bg-primary/10 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.8s' }} />
          <div className="absolute w-12 h-12 bg-primary/40 rounded-full blur-md" />
          
          {/* Pin Shadow */}
          <div className="absolute -bottom-3 w-6 h-2 bg-black/60 blur-[3px] rounded-[100%]" />
          
          {/* The Pin Icon */}
          <div className="relative z-20 text-primary drop-shadow-[0_10px_20px_rgba(255,255,255,0.3)] animate-bounce" style={{ animationDuration: '1.5s' }}>
            <MapPin className="w-20 h-20 fill-primary/10 stroke-[1.5]" />
          </div>
          
          {/* Simulated Coordinates read-out */}
          <div className={`absolute -top-12 whitespace-nowrap bg-zinc-900/90 backdrop-blur-sm text-zinc-300 text-sm px-3 py-1.5 rounded-lg font-mono border border-zinc-700/50 shadow-xl transition-opacity duration-300 ${coordinates ? 'opacity-100' : 'opacity-0'}`}>
            {coordinates ? `${coordinates[0].toFixed(4)}, ${coordinates[1].toFixed(4)}` : ''}
          </div>
        </div>

      </div>

      {/* Bottom Action Area (Anchored) */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent pt-12 pb-8 px-6">
        <Button
          onClick={handleSendHelp}
          disabled={isLoading || isSuccess}
          size="lg"
          className="w-full h-20 text-xl font-extrabold rounded-2xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] transition-all active:scale-[0.97]"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-3 h-8 w-8 animate-spin opacity-80" />
              <span className="tracking-wide">Locating...</span>
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle2 className="mr-3 h-8 w-8 text-green-400" />
              <span className="tracking-wide text-green-50">Help Confirmed</span>
            </>
          ) : (
            <span className="tracking-wide">SEND HELP HERE</span>
          )}
        </Button>
      </div>
    </div>
  );
}
