"use client";

import React from 'react';
import { Truck, AlertTriangle } from 'lucide-react';

export default function FleetMapMock() {
  return (
    <div className="relative flex-1 h-full bg-[#0a0a0c] overflow-hidden">
      {/* Top-Down Grid Map Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }} />
        {/* Subtle radial gradient to focus center */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-900/5 to-transparent" />
      </div>

      {/* Simulated Map Elements */}
      <div className="absolute inset-0 z-10">
        
        {/* Highway 85 Mock Line */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path d="M 0,200 C 400,250 600,600 1200,800" stroke="#3f3f46" strokeWidth="12" fill="none" opacity="0.3" />
          <path d="M 0,200 C 400,250 600,600 1200,800" stroke="#fbbf24" strokeWidth="2" strokeDasharray="10 10" fill="none" opacity="0.2" />
        </svg>

        {/* 285 Loop Mock Line */}
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
          <path d="M 400,0 C 350,400 800,700 900,1000" stroke="#3f3f46" strokeWidth="12" fill="none" opacity="0.3" />
        </svg>

        {/* Active Truck 1 (Frank T. - En Route) */}
        <div className="absolute top-[28%] left-[32%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
          <div className="relative">
            {/* Passive Telemetry Pulse */}
            <div className="absolute -inset-4 border-2 border-blue-500 rounded-full animate-ping opacity-20" />
            <div className="w-8 h-8 bg-blue-600 rounded-full border-2 border-zinc-950 flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform">
              <Truck className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="mt-2 bg-zinc-900/80 backdrop-blur border border-zinc-700 px-2 py-1 rounded text-[10px] font-bold text-white shadow-xl whitespace-nowrap">
            Frank T. <span className="text-blue-400">65 mph</span>
          </div>
        </div>

        {/* Active Truck 2 (Oscar O. - On Scene) */}
        <div className="absolute top-[65%] left-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
          <div className="relative">
            <div className="absolute -inset-4 border-2 border-purple-500 rounded-full animate-ping opacity-20" style={{ animationDelay: '1s' }} />
            <div className="w-8 h-8 bg-purple-600 rounded-full border-2 border-zinc-950 flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform">
              <Truck className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="mt-2 bg-zinc-900/80 backdrop-blur border border-zinc-700 px-2 py-1 rounded text-[10px] font-bold text-white shadow-xl whitespace-nowrap">
            Oscar O. <span className="text-purple-400">Stopped</span>
          </div>
        </div>

        {/* Pending Job (Unassigned) */}
        <div className="absolute top-[45%] left-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
          <div className="relative">
            <div className="absolute -inset-3 bg-amber-500 rounded-full animate-pulse opacity-20" />
            <div className="w-8 h-8 bg-zinc-800 rounded-full border-2 border-amber-500 flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
          </div>
          <div className="mt-2 bg-amber-500/10 backdrop-blur border border-amber-500/30 px-2 py-1 rounded text-[10px] font-bold text-amber-500 shadow-xl whitespace-nowrap">
            Pending: APD Impound
          </div>
        </div>

      </div>

      {/* Map UI Overlay (Zoom controls, etc) */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20">
        <button className="w-10 h-10 bg-zinc-900 border border-zinc-700 rounded shadow-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 font-bold text-lg">+</button>
        <button className="w-10 h-10 bg-zinc-900 border border-zinc-700 rounded shadow-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 font-bold text-lg">-</button>
      </div>

    </div>
  );
}
