"use client";

import React from 'react';
import { PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LiabilityWaiverProps {
  onComplete: () => void;
}

export default function LiabilityWaiver({ onComplete }: LiabilityWaiverProps) {
  return (
    <div className="flex flex-col h-[100dvh] w-full bg-zinc-950 text-zinc-50 overflow-y-auto dark">
      {/* Header */}
      <div className="p-6 pb-2 border-b border-zinc-800 bg-zinc-900/50">
        <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1">Liability Waiver</h1>
        <p className="text-zinc-400 font-medium text-sm">
          Customer signature required before hook-up.
        </p>
      </div>

      {/* Waiver Text */}
      <div className="flex-1 p-6 text-sm text-zinc-300 space-y-4">
        <p className="font-bold text-white text-lg">Terms & Conditions</p>
        <p>I hereby authorize NovaTangerine Towing to hook up and transport the vehicle listed below to the specified destination.</p>
        <p>I understand that the towing company is not liable for damages that result from existing mechanical failures, prior collisions, or items left inside the vehicle.</p>
        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 mt-4">
          <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Vehicle</div>
          <div className="font-bold text-white text-lg">2019 Ford F-150</div>
          <div className="text-xs text-zinc-500 uppercase tracking-widest font-bold mt-2">Owner / Agent</div>
          <div className="font-bold text-white text-lg">Sarah Jenkins</div>
        </div>
      </div>

      {/* Signature Canvas Area */}
      <div className="px-6 pb-6 space-y-2">
        <div className="flex justify-between items-end">
          <label className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Sign Below</label>
          <button className="text-sm font-bold text-blue-500 uppercase tracking-widest hover:text-blue-400">Clear</button>
        </div>
        
        {/* Mock Canvas */}
        <div className="w-full h-48 bg-zinc-100 rounded-2xl relative overflow-hidden flex items-center justify-center border-4 border-zinc-800 shadow-inner">
          <PenTool className="absolute inset-0 m-auto w-12 h-12 text-zinc-300 opacity-50" />
          <div className="absolute bottom-4 left-4 right-4 border-b-2 border-zinc-300 border-dashed" />
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-6 bg-zinc-950 sticky bottom-0 border-t border-zinc-900">
        <Button 
          onClick={onComplete}
          className="w-full h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xl font-extrabold uppercase tracking-widest shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)]"
        >
          Agree & Sign
        </Button>
      </div>
    </div>
  );
}
