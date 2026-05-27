"use client";

import React from 'react';
import { Truck, AlertTriangle } from 'lucide-react';
import InteractiveMap from '@/components/ui/InteractiveMap';

export default function FleetMapMock() {
  return (
    <div className="relative flex-1 h-full bg-[#0a0a0c] overflow-hidden">
      {/* Real Mapbox Dispatcher Map */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-blue-900/5 z-10 pointer-events-none" />
        <InteractiveMap
          center={[-84.3800, 33.7089]} // South Atlanta 30315 footprint
          zoom={13}
          interactive={true}
          fitBounds={true}
          markers={[
            {
              id: 'frank-truck',
              lng: -84.3830,
              lat: 33.7090,
              element: (
                <div className="flex flex-col items-center group cursor-pointer -mt-4">
                  <div className="relative">
                    {/* Passive Telemetry Pulse */}
                    <div className="absolute -inset-4 border-2 border-blue-500 rounded-full animate-ping opacity-20" />
                    <div className="w-8 h-8 bg-blue-600 rounded-full border-2 border-zinc-950 flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="mt-2 bg-zinc-900/90 backdrop-blur border border-zinc-700 px-2 py-1 rounded text-[10px] font-bold text-white shadow-xl whitespace-nowrap">
                    Frank T. <span className="text-blue-400">65 mph</span>
                  </div>
                </div>
              ),
              popupContent: `<div class="p-2 bg-zinc-900 text-white rounded"><h3 class="font-bold">Frank T.</h3><p class="text-sm text-zinc-400">En route to pickup</p></div>`
            },
            {
              id: 'oscar-truck',
              lng: -84.3650,
              lat: 33.7250,
              element: (
                <div className="flex flex-col items-center group cursor-pointer -mt-4">
                  <div className="relative">
                    <div className="absolute -inset-4 border-2 border-purple-500 rounded-full animate-ping opacity-20" style={{ animationDelay: '1s' }} />
                    <div className="w-8 h-8 bg-purple-600 rounded-full border-2 border-zinc-950 flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="mt-2 bg-zinc-900/90 backdrop-blur border border-zinc-700 px-2 py-1 rounded text-[10px] font-bold text-white shadow-xl whitespace-nowrap">
                    Oscar O. <span className="text-purple-400">Stopped</span>
                  </div>
                </div>
              ),
              popupContent: `<div class="p-2 bg-zinc-900 text-white rounded"><h3 class="font-bold">Oscar O.</h3><p class="text-sm text-zinc-400">On Scene</p></div>`
            },
            {
              id: 'pending-job',
              lng: -84.3720,
              lat: 33.6950,
              element: (
                <div className="flex flex-col items-center group cursor-pointer -mt-4">
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
              ),
              popupContent: `<div class="p-2 bg-amber-900 text-white rounded"><h3 class="font-bold">Urgent Dispatch</h3><p class="text-sm text-amber-400">Unassigned</p></div>`
            }
          ]}
        />
      </div>

      {/* Map UI Overlay (Zoom controls, etc) */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-20 pointer-events-none">
        <button className="w-10 h-10 bg-zinc-900 border border-zinc-700 rounded shadow-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 font-bold text-lg pointer-events-auto">+</button>
        <button className="w-10 h-10 bg-zinc-900 border border-zinc-700 rounded shadow-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 font-bold text-lg pointer-events-auto">-</button>
      </div>

    </div>
  );
}
