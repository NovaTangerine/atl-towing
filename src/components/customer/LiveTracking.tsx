"use client";

import React from 'react';
import { 
  MapPin, 
  Truck, 
  Star, 
  Phone,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LiveTracking() {
  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-zinc-950 overflow-hidden text-zinc-50 dark">
      {/* Mock Map Background - High contrast dark map placeholder */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234b5563' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      {/* Subtle Map Routing Line */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          {/* Mock Road */}
          <path d="M 50 150 C 200 150 250 400 200 600" stroke="#1f2937" strokeWidth="12" fill="none" strokeLinecap="round" />
          {/* Active Route highlighting */}
          <path d="M 50 150 C 120 150 150 200 180 320" stroke="var(--primary)" strokeWidth="6" fill="none" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(var(--primary),0.8)]" />
        </svg>
      </div>

      {/* Top Floating Status Banner */}
      <div className="absolute top-10 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="flex items-center gap-4 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 p-3 pr-6 rounded-full shadow-2xl shadow-black/50 animate-in slide-in-from-top-10 fade-in duration-500">
          <div className="flex items-center justify-center bg-primary/20 text-primary w-12 h-12 rounded-full relative">
            {/* Pulsing ring for live status */}
            <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-50" style={{ animationDuration: '2s' }} />
            <span className="font-black tracking-tighter text-xl leading-none">12<span className="text-[10px] uppercase ml-0.5 opacity-80 block text-center -mt-1 tracking-wider">min</span></span>
          </div>
          <div className="flex flex-col">
            <span className="text-zinc-50 font-bold text-lg leading-tight tracking-tight">Help is on the way</span>
            <span className="text-zinc-400 text-xs font-medium flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-primary" /> Driver Frank Dispatched
            </span>
          </div>
        </div>
      </div>

      {/* Map Pins Area */}
      <div className="relative z-10 flex-1 pointer-events-none">
        
        {/* Driver Truck Pin */}
        <div className="absolute top-[30%] left-[25%] -translate-x-1/2 -translate-y-1/2 animate-bounce" style={{ animationDuration: '3s' }}>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse" />
            <div className="bg-zinc-900 border-2 border-primary p-3 rounded-full shadow-xl shadow-primary/30 relative z-10">
              <Truck className="w-8 h-8 text-primary" />
            </div>
            {/* Truck shadow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/60 blur-[3px] rounded-full" />
          </div>
        </div>

        {/* User Location Pin */}
        <div className="absolute top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute w-16 h-16 bg-blue-500/20 rounded-full -left-4 -top-4 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <MapPin className="w-10 h-10 fill-blue-500/20 stroke-2" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/50 blur-[2px] rounded-full" />
          </div>
        </div>

      </div>

      {/* Bottom Driver Sheet */}
      <div className="relative z-50 bg-zinc-900 border-t border-zinc-800 shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.5)] rounded-t-[2.5rem] pt-3 px-6 pb-10 animate-in slide-in-from-bottom-full duration-700">
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
          
          {/* Quick Message Button */}
          <button className="w-12 h-12 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-zinc-300 transition-colors active:scale-95 shrink-0 border border-zinc-700/50">
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>

        {/* Truck Details Plate */}
        <div className="bg-zinc-950 border border-zinc-800/80 rounded-2xl p-4 flex items-center justify-between mb-8">
          <div>
            <div className="text-sm font-bold text-zinc-300">White Ford F-450</div>
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mt-0.5">Flatbed Tow</div>
          </div>
          <div className="bg-zinc-800/80 px-3 py-1.5 rounded-lg border border-zinc-700/50">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-0.5 text-center">Georgia</div>
            <div className="text-lg font-mono font-bold tracking-widest text-zinc-100">XCV-802</div>
          </div>
        </div>

        {/* Primary Action */}
        <Button 
          size="lg"
          className="w-full h-16 text-lg font-extrabold rounded-2xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.15)] transition-all active:scale-[0.98] mb-6 gap-2"
        >
          <Phone className="w-5 h-5" />
          CONTACT DRIVER
        </Button>

        {/* Cancel Tow Link */}
        <div className="text-center">
          <button className="text-zinc-500 text-sm font-medium hover:text-zinc-300 transition-colors underline-offset-4 hover:underline active:scale-95">
            Cancel Tow Request
          </button>
        </div>
      </div>
    </div>
  );
}
