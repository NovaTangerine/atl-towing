"use client";

import React, { useState } from 'react';
import { CornerUpRight, Phone, Navigation2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SwipeToConfirm from '@/components/ui/SwipeToConfirm';
import InteractiveMap from '@/components/ui/InteractiveMap';

interface ActiveRouteMockProps {
  onArrive?: () => void;
  primaryInstruction?: string;
  secondaryInstruction?: string;
}

export default function ActiveRouteMock({ 
  onArrive, 
  primaryInstruction = "Turn Right", 
  secondaryInstruction = "on Elm St in 500ft"
}: ActiveRouteMockProps) {
  const [isCalling, setIsCalling] = useState(false);

  const handleContact = () => {
    setIsCalling(true);
    setTimeout(() => setIsCalling(false), 3000);
  };

  return (
    <div className="relative flex flex-col h-[100dvh] w-full bg-[#0a0a0c] text-zinc-50 overflow-hidden dark">
      {/* --- Z-INDEX 0: Real Mapbox Background --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-zinc-950/20 z-10 pointer-events-none" />
        <InteractiveMap
          center={[-84.3830, 33.7090]} // Driver's current position
          zoom={16}
          interactive={true}
          routePath={[
            [-84.3830, 33.7090], // Current
            [-84.3850, 33.7120], // Waypoint
            [-84.3881, 33.7150]  // Customer
          ]}
          markers={[
            {
              id: 'navigation-arrow',
              lng: -84.3830,
              lat: 33.7090,
              element: (
                <div className="relative z-10 w-20 h-20 -mt-10">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-50 animate-pulse" />
                  <Navigation2 className="w-full h-full text-white drop-shadow-2xl filter" style={{ transform: 'rotate(25deg)' }} />
                </div>
              )
            }
          ]}
        />
      </div>

      {/* --- Z-INDEX 10: Turn-by-Turn Header --- */}
      <div className="relative z-10 w-full bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800 p-6 flex items-center gap-6 shadow-2xl pointer-events-none">
        <div className="flex-shrink-0 p-4 bg-zinc-800 rounded-2xl">
          <CornerUpRight className="w-12 h-12 text-white" strokeWidth={3} />
        </div>
        <div>
          <div className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            {primaryInstruction}
          </div>
          <div className="text-xl font-bold text-zinc-400">
            {secondaryInstruction}
          </div>
        </div>
      </div>

      {/* --- Z-INDEX 10: Floating Metrics Bar --- */}
      <div className="relative z-10 w-full px-4 pt-4 pointer-events-none">
        <div className="flex items-center justify-between bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-4 shadow-lg">
          <div className="text-center flex-1 border-r border-zinc-800">
            <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">ETA</div>
            <div className="text-2xl font-extrabold text-white">12:45 <span className="text-sm text-zinc-400">PM</span></div>
          </div>
          <div className="text-center flex-1 border-r border-zinc-800">
            <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Time</div>
            <div className="text-2xl font-extrabold text-green-400">12 <span className="text-sm text-green-600">min</span></div>
          </div>
          <div className="text-center flex-1">
            <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Dist</div>
            <div className="text-2xl font-extrabold text-white">4.2 <span className="text-sm text-zinc-400">mi</span></div>
          </div>
        </div>
      </div>

      {/* --- Z-INDEX 10: Sticky Quick-Action Footer --- */}
      <div className="relative z-10 mt-auto w-full bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c] to-transparent pt-12 pb-8 px-6 pointer-events-auto">
        
        {/* Mock Notification Toast */}
        {isCalling && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-xl animate-in fade-in slide-in-from-bottom-4">
            Calling Sarah...
          </div>
        )}

        <div className="flex gap-4">
          <Button 
            onClick={handleContact}
            className="h-20 w-20 rounded-2xl bg-zinc-800 hover:bg-zinc-700 border-2 border-zinc-700 shrink-0 shadow-lg"
            aria-label="Contact Customer"
          >
            <Phone className="w-8 h-8 text-white" />
          </Button>

          <div className="flex-1 drop-shadow-xl">
            {onArrive ? (
              <SwipeToConfirm 
                onConfirm={onArrive} 
                text="Slide to Arrive"
                className="w-full h-20"
              />
            ) : (
              <Button disabled className="w-full h-20 rounded-2xl text-xl font-bold uppercase tracking-wider bg-zinc-800 text-zinc-500">
                Preview Mode
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
