"use client";

import React, { useState, useEffect } from 'react';
import { AlertOctagon, AlertTriangle, Phone, Send, UserX } from 'lucide-react';

const MOCK_EXCEPTIONS = [
  {
    id: 'EX-901',
    jobId: 'ATL-4093',
    driver: 'Oscar O.',
    type: 'critical',
    title: 'ETA Exceeded: +15 mins',
    details: 'Driver stuck in amphitheater traffic. Status un-updated.',
    duration: 900, // 15 mins in seconds
  }
];

export default function ExceptionTriageQueue() {
  const [timers, setTimers] = useState<{ [key: string]: number }>(() => {
    const initial: { [key: string]: number } = {};
    MOCK_EXCEPTIONS.forEach(ex => initial[ex.id] = ex.duration);
    return initial;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(k => next[k] += 1);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 border-l border-zinc-800 text-zinc-300 w-[350px] shrink-0 z-20 shadow-[-10px_0_30px_-10px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="p-3 border-b border-red-900/30 bg-red-950/20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-red-500 animate-pulse" />
          <h2 className="text-lg font-extrabold text-red-500 tracking-tight">Triage Queue</h2>
        </div>
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]">
          {MOCK_EXCEPTIONS.length} Active
        </span>
      </div>

      {/* Exception List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-zinc-950">
        {MOCK_EXCEPTIONS.map((ex) => (
          <div 
            key={ex.id}
            className={`rounded-lg border p-3 shadow-lg relative overflow-hidden transition-all ${
              ex.type === 'critical' 
                ? 'bg-red-950/10 border-red-500/50 shadow-[0_0_15px_-3px_rgba(239,68,68,0.15)]' 
                : 'bg-amber-950/10 border-amber-500/50'
            }`}
          >
            {/* Urgent Flashing Border Accent */}
            {ex.type === 'critical' && (
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-500 animate-pulse" />
            )}
            {ex.type === 'warning' && (
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-amber-500" />
            )}

            {/* Header */}
            <div className="flex justify-between items-start mb-2 pl-2">
              <div>
                <div className="flex items-center gap-1.5">
                  {ex.type === 'critical' ? (
                    <AlertOctagon className="w-3.5 h-3.5 text-red-500" />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  )}
                  <span className={`text-xs font-extrabold uppercase tracking-wider ${ex.type === 'critical' ? 'text-red-400' : 'text-amber-400'}`}>
                    {ex.title}
                  </span>
                </div>
                <div className="text-[11px] font-bold text-zinc-400 mt-1">
                  {ex.jobId} • {ex.driver}
                </div>
              </div>
              <div className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${ex.type === 'critical' ? 'bg-red-950/50 text-red-400 border border-red-500/30' : 'bg-amber-950/50 text-amber-400 border border-amber-500/30'}`}>
                {formatTime(timers[ex.id])}
              </div>
            </div>

            {/* Details */}
            <p className="text-xs text-zinc-300 leading-snug pl-2 mb-3">
              {ex.details}
            </p>

            {/* Action Buttons (Keyboard Mocked) */}
            <div className="flex flex-col gap-1.5 pl-2">
              <button className={`flex items-center justify-between px-2 py-1.5 rounded text-xs font-bold transition-colors ${
                ex.type === 'critical' ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-zinc-800 hover:bg-zinc-700 text-white'
              }`}>
                <div className="flex items-center gap-1.5"><Send className="w-3.5 h-3.5" /> Nudge Driver</div>
                <kbd className="text-[9px] font-mono px-1 py-0.5 bg-black/30 rounded border border-white/20">Cmd+1</kbd>
              </button>

              <div className="flex gap-1.5">
                <button className="flex-1 flex items-center justify-between px-2 py-1.5 rounded text-xs font-bold bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 transition-colors">
                  <div className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Call Cust</div>
                  <kbd className="text-[9px] font-mono px-1 py-0.5 bg-zinc-800 rounded border border-zinc-700">Cmd+2</kbd>
                </button>
                <button className="flex-1 flex items-center justify-between px-2 py-1.5 rounded text-xs font-bold bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 transition-colors">
                  <div className="flex items-center gap-1.5"><UserX className="w-3.5 h-3.5" /> Reassign</div>
                  <kbd className="text-[9px] font-mono px-1 py-0.5 bg-zinc-800 rounded border border-zinc-700">Cmd+3</kbd>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
