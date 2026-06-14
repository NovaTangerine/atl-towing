"use client";

import React from 'react';
import { Truck, AlertTriangle, CarFront } from 'lucide-react';
import InteractiveMap from '@/components/ui/InteractiveMap';

export default function FleetMapMock({ center, zoom }: { center?: [number, number], zoom?: number }) {
  return (
    <div className="relative flex-1 h-full bg-[#0a0a0c] overflow-hidden">
      {/* Real Mapbox Dispatcher Map */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-blue-900/5 z-10 pointer-events-none" />
        <InteractiveMap
          bounds={!center ? [[-84.40, 33.67], [-84.34, 33.73]] : undefined}
          center={center}
          zoom={zoom}
          interactive={true}
          markers={[
            {
              id: 'frank-truck',
              lng: -84.3934,
              lat: 33.7042,
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
              popupContent: `<div class="px-4 py-3 flex flex-col gap-0.5"><h3 class="font-bold text-white text-base">Frank T.</h3><p class="text-sm text-zinc-400">En route to pickup</p></div>`
            },
            {
              id: 'oscar-truck',
              lng: -84.3879,
              lat: 33.7012,
              element: (
                <div className="flex flex-col items-center group cursor-pointer -mt-4">
                  <div className="relative">
                    <div className="absolute -inset-4 border-2 border-red-500 rounded-full animate-ping opacity-20" style={{ animationDelay: '1s' }} />
                    <div className="w-8 h-8 bg-red-600 rounded-full border-2 border-zinc-950 flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                      <Truck className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="mt-2 bg-zinc-900/90 backdrop-blur border border-zinc-700 px-2 py-1 rounded text-[10px] font-bold text-white shadow-xl whitespace-nowrap">
                    Oscar O. <span className="text-red-400">Exception</span>
                  </div>
                </div>
              ),
              popupContent: `<div class="px-4 py-3 flex flex-col gap-0.5"><h3 class="font-bold text-red-400 text-base">Oscar O.</h3><p class="text-sm text-zinc-400">Exception: Traffic Delay</p></div>`
            },
            {
              id: 'pending-job',
              lng: -84.3712,
              lat: 33.7259,
              element: (
                <div className="flex flex-col items-center group cursor-pointer -mt-4">
                  <div className="relative">
                    <div className="absolute -inset-3 bg-amber-500 rounded-full animate-pulse opacity-20" />
                    <div className="w-8 h-8 bg-zinc-800 rounded-full border-2 border-amber-500 flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                    </div>
                  </div>
                  <div className="mt-2 bg-amber-500/10 backdrop-blur border border-amber-500/30 px-2 py-1 rounded text-[10px] font-bold text-amber-500 shadow-xl whitespace-nowrap">
                    Pending: The Beacon
                  </div>
                </div>
              ),
              popupContent: `<div class="px-4 py-3 flex flex-col gap-0.5"><h3 class="font-bold text-amber-400 text-base">B2B Request</h3><p class="text-sm text-zinc-300">The Beacon Impound</p></div>`
            },
            {
              id: 'sarah-car',
              lng: -84.3985,
              lat: 33.7188,
              element: (
                <div className="flex flex-col items-center group cursor-pointer -mt-4">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-blue-500 rounded-full animate-pulse opacity-20" />
                    <div className="w-6 h-6 bg-zinc-800 rounded-full border border-blue-500 flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                      <CarFront className="w-3 h-3 text-zinc-300" />
                    </div>
                  </div>
                  <div className="mt-1 bg-zinc-900/90 backdrop-blur border border-zinc-700 px-1.5 py-0.5 rounded text-[9px] font-bold text-zinc-400 shadow-xl whitespace-nowrap">
                    Sarah M.
                  </div>
                </div>
              ),
              popupContent: `<div class="px-4 py-3 flex flex-col gap-0.5"><h3 class="font-bold text-white text-base">2019 Toyota RAV4</h3><p class="text-sm text-zinc-400">Waiting for Frank T.</p></div>`
            },
            {
              id: 'fender-bender-car',
              lng: -84.3491,
              lat: 33.7061,
              element: (
                <div className="flex flex-col items-center group cursor-pointer -mt-4">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-green-500 rounded-full animate-pulse opacity-20" />
                    <div className="w-6 h-6 bg-zinc-800 rounded-full border border-green-500 flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                      <CarFront className="w-3 h-3 text-zinc-300" />
                    </div>
                  </div>
                  <div className="mt-1 bg-zinc-900/90 backdrop-blur border border-zinc-700 px-1.5 py-0.5 rounded text-[9px] font-bold text-zinc-400 shadow-xl whitespace-nowrap">
                    Fender Bender
                  </div>
                </div>
              ),
              popupContent: `<div class="px-4 py-3 flex flex-col gap-0.5"><h3 class="font-bold text-white text-base">2018 Nissan Altima</h3><p class="text-sm text-zinc-400">In Transit with Marcus</p></div>`
            },
            {
              id: 'roadside-car',
              lng: -84.3768,
              lat: 33.6795,
              element: (
                <div className="flex flex-col items-center group cursor-pointer -mt-4">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-purple-500 rounded-full animate-pulse opacity-20" />
                    <div className="w-6 h-6 bg-zinc-800 rounded-full border border-purple-500 flex items-center justify-center shadow-lg relative z-10 group-hover:scale-110 transition-transform">
                      <CarFront className="w-3 h-3 text-zinc-300" />
                    </div>
                  </div>
                  <div className="mt-1 bg-zinc-900/90 backdrop-blur border border-zinc-700 px-1.5 py-0.5 rounded text-[9px] font-bold text-zinc-400 shadow-xl whitespace-nowrap">
                    Roadside Assist
                  </div>
                </div>
              ),
              popupContent: `<div class="px-4 py-3 flex flex-col gap-0.5"><h3 class="font-bold text-white text-base">2022 Chevy Malibu</h3><p class="text-sm text-zinc-400">David on scene</p></div>`
            }
          ]}
        />
      </div>

      {/* Map UI Overlay (Zoom controls, etc) */}
      <div className="absolute bottom-6 right-[374px] flex flex-col gap-2 z-20 pointer-events-none">
        <button className="w-10 h-10 bg-zinc-900 border border-zinc-700 rounded shadow-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 font-bold text-lg pointer-events-auto">+</button>
        <button className="w-10 h-10 bg-zinc-900 border border-zinc-700 rounded shadow-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 font-bold text-lg pointer-events-auto">-</button>
      </div>

    </div>
  );
}
