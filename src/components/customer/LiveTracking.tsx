"use client";

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Truck, 
  Star, 
  Phone,
  ShieldCheck,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import InteractiveMap from '@/components/ui/InteractiveMap';

const ROUTE_PATH = [
  [-84.3934, 33.7042],
  [-84.3935, 33.7065],
  [-84.3936, 33.7090],
  [-84.3937, 33.7115],
  [-84.3938, 33.7145],
  [-84.3950, 33.7147],
  [-84.3965, 33.7148],
  [-84.3975, 33.7155],
  [-84.3980, 33.7170],
  [-84.3985, 33.7188] // Customer location
];

export default function LiveTracking() {
  const [driverPos, setDriverPos] = useState<[number, number]>(ROUTE_PATH[0] as [number, number]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isApproaching, setIsApproaching] = useState(false);

  // Animate truck along route
  useEffect(() => {
    if (!isAnimating) return;

    const totalDuration = 3000;
    const targetIndex = ROUTE_PATH.length - 2; // Stop one block away
    const intervalTime = totalDuration / targetIndex;
    
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex <= targetIndex) {
        setDriverPos(ROUTE_PATH[currentIndex] as [number, number]);
      }
      
      if (currentIndex >= targetIndex) {
        clearInterval(interval);
        setIsAnimating(false);
        setIsApproaching(true);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleSimulate = () => {
    setDriverPos(ROUTE_PATH[0] as [number, number]);
    setIsApproaching(false);
    setIsAnimating(true);
  };

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-zinc-950 overflow-hidden text-zinc-50 dark">
      {/* Dev Simulate Button */}
      <button 
        onClick={handleSimulate}
        className="absolute top-4 right-4 z-50 bg-black/50 text-white/50 text-[10px] font-mono px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10 hover:text-white transition-colors"
      >
        [Dev] Simulate Approach
      </button>

      {/* Mapbox Live Map */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-zinc-950/20 z-10 pointer-events-none" />
        <InteractiveMap
          center={[-84.3960, 33.7115]}
          zoom={14}
          fitBounds={true}
          fitRouteToBounds={!isAnimating && !isApproaching}
          fitBoundsPadding={{ top: 120, bottom: 380, left: 40, right: 40 }}
          interactive={false}
          routePath={ROUTE_PATH as any}
          markers={[
            {
              id: 'driver',
              lng: driverPos[0],
              lat: driverPos[1],
              element: (
                <div className="relative animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse" />
                  <div className="bg-zinc-900 border-2 border-primary p-3 rounded-full shadow-xl shadow-primary/30 relative z-10">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  {/* Truck shadow */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/60 blur-[3px] rounded-full" />
                </div>
              )
            },
            {
              id: 'customer',
              lng: ROUTE_PATH[ROUTE_PATH.length - 1][0],
              lat: ROUTE_PATH[ROUTE_PATH.length - 1][1],
              element: (
                <div className="relative">
                  <div className="absolute w-16 h-16 bg-blue-500/20 rounded-full -left-4 -top-4 animate-ping" style={{ animationDuration: '3s' }} />
                  <div className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    <MapPin className="w-10 h-10 fill-blue-500/20 stroke-2" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/50 blur-[2px] rounded-full" />
                </div>
              )
            }
          ]}
        />
      </div>

      {/* Top Floating Status Banner */}
      <div className="absolute top-10 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
        <div className={`flex items-center gap-4 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 p-3 pr-6 rounded-full shadow-2xl animate-in slide-in-from-top-10 fade-in duration-500 transition-colors ${isApproaching ? 'border-amber-500/50 shadow-amber-500/20' : 'shadow-black/50'}`}>
          <div className={`flex items-center justify-center w-12 h-12 rounded-full relative ${isApproaching ? 'bg-amber-500/20 text-amber-500' : 'bg-primary/20 text-primary'}`}>
            {/* Pulsing ring for live status */}
            <div className={`absolute inset-0 rounded-full border-2 animate-ping opacity-50 ${isApproaching ? 'border-amber-500' : 'border-primary'}`} style={{ animationDuration: isApproaching ? '1s' : '2s' }} />
            
            {isApproaching ? (
              <span className="font-black tracking-tighter text-xl leading-none">&lt;1<span className="text-[10px] uppercase ml-0.5 opacity-80 block text-center -mt-1 tracking-wider">min</span></span>
            ) : (
              <span className="font-black tracking-tighter text-xl leading-none">4<span className="text-[10px] uppercase ml-0.5 opacity-80 block text-center -mt-1 tracking-wider">min</span></span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-zinc-50 font-bold text-lg leading-tight tracking-tight">
              {isApproaching ? 'Arriving Now' : 'Help is on the way'}
            </span>
            <span className="text-zinc-400 text-xs font-medium flex items-center gap-1">
              <ShieldCheck className={`w-3 h-3 ${isApproaching ? 'text-amber-500' : 'text-primary'}`} /> Driver Frank Dispatched
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex-1 pointer-events-none"></div>

      {/* Bottom Driver Sheet */}
      <div className="relative z-50 animate-in slide-in-from-bottom-full duration-700">
        
        {/* Approaching Toast overlaying the sheet */}
        {isApproaching && (
          <div className="absolute -top-[5.5rem] left-4 right-4 animate-in slide-in-from-bottom-8 fade-in duration-500 z-50">
            <div className="bg-amber-500 rounded-2xl p-4 shadow-[0_10px_40px_-10px_rgba(245,158,11,0.6)] flex items-start gap-4 cursor-default">
              <div className="bg-amber-950/20 p-2 rounded-full mt-0.5 shrink-0 animate-pulse">
                <AlertTriangle className="w-6 h-6 text-amber-950" strokeWidth={3} />
              </div>
              <div>
                <h3 className="text-amber-950 font-extrabold text-lg tracking-tight leading-tight mb-1">
                  Driver is Arriving
                </h3>
                <p className="text-amber-900 font-bold text-sm leading-tight">
                  Please head to your vehicle immediately. Frank is pulling up now.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-zinc-900 border-t border-zinc-800 shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.5)] rounded-t-[2.5rem] pt-3 px-6 pb-8">
          {/* Drag handle pill */}
          <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-6" />

          {/* Driver Profile */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop" 
                alt="Driver Frank" 
                className="w-16 h-16 rounded-full border-2 border-zinc-700 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 bg-zinc-800 border border-zinc-700 rounded-full px-1.5 py-0.5 flex items-center gap-0.5 shadow-lg">
                <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                <span className="text-[10px] font-bold">4.9</span>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-extrabold tracking-tight text-white leading-none mb-1">Frank K.</h2>
              <p className="text-zinc-400 text-sm font-medium">Atlanta Metro Fleet</p>
            </div>
            
            {/* Quick Contact Buttons */}
            <div className="flex gap-2 shrink-0">
              <button className="w-11 h-11 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-zinc-300 transition-colors active:scale-95 border border-zinc-700/50">
                <MessageSquare className="w-4 h-4" />
              </button>
              <button className="w-11 h-11 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-white transition-colors active:scale-95 border border-zinc-700/50">
                <Phone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Truck Details Plate */}
          <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between mb-0">
            <div>
              <div className="text-sm font-bold text-zinc-300">White Ford F-450</div>
              <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mt-0.5">Flatbed Tow</div>
            </div>
            <div className="bg-zinc-800/80 px-3 py-1.5 rounded-lg border border-zinc-700/50">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-0.5 text-center">Georgia</div>
              <div className="text-lg font-mono font-bold tracking-widest text-zinc-100">XCV-802</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
