"use client";

import React, { useState } from 'react';
import { MapPin, Loader2, CheckCircle2, Truck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InteractiveMap from '@/components/ui/InteractiveMap';

interface SosLocationIntakeProps {
  onNext: () => void;
}

export default function SosLocationIntake({ onNext }: SosLocationIntakeProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number]>([33.7188, -84.3985]);

  const handleSendHelp = () => {
    if (!coordinates) return;
    setIsLoading(true);
    // Simulate network request to lock coordinates
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      console.log("Coordinates locked:", coordinates);
      
      // Mock transition to next step after a moment
      setTimeout(() => {
        setIsSuccess(false);
        onNext();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-zinc-950 overflow-hidden text-zinc-50 dark">
      {/* Real Map Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
        <InteractiveMap 
          center={[-84.3985, 33.7188]}
          zoom={15}
          onCenterChange={(lng, lat) => setCoordinates([lat, lng])}
        />
      </div>

      {/* Success Toast (Bottom Placement) */}
      <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-green-500/20 text-green-400 border border-green-500/30 px-6 py-4 rounded-full backdrop-blur-md shadow-2xl shadow-green-500/20 transition-all duration-500 delay-150 whitespace-nowrap ${isSuccess ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}>
        <CheckCircle2 className="w-6 h-6" />
        <span className="font-bold text-base tracking-wide">Location Confirmed</span>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-6 pb-24 pointer-events-none">
        
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
        <div className="relative flex items-center justify-center mt-12 pointer-events-auto">
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
          
          {/* Mock Address Label */}
          <div className={`absolute -top-14 whitespace-nowrap bg-zinc-900/90 backdrop-blur-sm text-zinc-100 text-sm font-semibold px-4 py-2 rounded-xl border border-zinc-700/50 shadow-xl transition-opacity duration-300 ${coordinates ? 'opacity-100' : 'opacity-0'}`}>
            {coordinates ? '123 Peachtree St NE' : 'Locating...'}
          </div>

          {/* Simulated Coordinates read-out */}
          <div className={`absolute -bottom-12 whitespace-nowrap bg-zinc-900/60 backdrop-blur-sm text-zinc-400 text-xs px-2 py-1 rounded-md font-mono border border-zinc-800/50 shadow-sm transition-opacity duration-300 ${coordinates ? 'opacity-100' : 'opacity-0'}`}>
            {coordinates ? `${coordinates[0].toFixed(4)}, ${coordinates[1].toFixed(4)}` : ''}
          </div>
        </div>
      </div>

      {/* Proximity Info Callouts */}
      <div className="absolute bottom-36 left-0 right-0 flex justify-center gap-3 z-20 pointer-events-none px-6">
        <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-full px-4 py-2 flex items-center gap-2 shadow-xl">
          <Truck className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold text-zinc-200">3 Nearby</span>
        </div>
        <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-full px-4 py-2 flex items-center gap-2 shadow-xl">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold text-zinc-200">~15 Min ETA</span>
        </div>
      </div>

      {/* Bottom Action Area (Anchored) */}
      <div className={`absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent pt-12 pb-8 px-6 transition-all duration-500 ${isSuccess ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0 pointer-events-auto'}`}>
        <Button
          onClick={handleSendHelp}
          disabled={isLoading || isSuccess}
          size="lg"
          className="w-full h-20 text-lg font-extrabold rounded-2xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] transition-all active:scale-[0.97] whitespace-nowrap"
        >
          {isLoading || isSuccess ? (
            <>
              <Loader2 className="mr-3 h-7 w-7 animate-spin opacity-80" />
              <span className="tracking-wide">Locating...</span>
            </>
          ) : (
            <span className="tracking-wide">SET PICK-UP LOCATION</span>
          )}
        </Button>
      </div>
    </div>
  );
}
