"use client";

import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface StartTransportProps {
  onStart: () => void;
}

export default function StartTransport({ onStart }: StartTransportProps) {
  return (
    <div className="relative flex flex-col h-[100dvh] w-full bg-[#0a0a0c] text-zinc-50 overflow-hidden dark">
      {/* Map Background */}
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center">
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: `
            linear-gradient(to right, #3f3f46 1px, transparent 1px),
            linear-gradient(to bottom, #3f3f46 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg) scale(2)'
        }} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex-1 flex flex-col px-6 justify-center">
        
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 shadow-2xl text-center space-y-6 animate-in fade-in slide-in-from-bottom-8">
          
          <div className="mx-auto w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center border-4 border-blue-500/30">
            <MapPin className="w-10 h-10 text-blue-500" />
          </div>

          <div>
            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Drop-off Destination</h2>
            <h1 className="text-3xl font-extrabold text-white tracking-tight leading-tight">City Impound Lot</h1>
            <p className="text-zinc-500 mt-2 font-medium">123 Industrial Parkway, Atlanta</p>
          </div>

          <div className="bg-zinc-950/50 rounded-2xl p-4 border border-zinc-800/50 flex justify-between items-center text-left">
            <div>
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Est. Travel Time</div>
              <div className="text-xl font-bold text-green-400">14 mins</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Distance</div>
              <div className="text-xl font-bold text-white">4.2 mi</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="relative z-10 mt-auto p-6 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c] to-transparent pt-12">
        <Button 
          onClick={onStart}
          className="w-full h-20 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-2xl font-extrabold uppercase tracking-widest shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)] active:scale-95 transition-all"
        >
          Start Transport
        </Button>
      </div>
    </div>
  );
}
