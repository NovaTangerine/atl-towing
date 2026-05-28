"use client";

import React, { useState } from 'react';
import JobOfferPing from '@/components/driver/JobOfferPing';
import ActiveRouteMock from '@/components/driver/ActiveRouteMock';
import LiabilityCamera from '@/components/driver/LiabilityCamera';
import LiabilityWaiver from '@/components/driver/LiabilityWaiver';
import StartTransport from '@/components/driver/StartTransport';
import QuickDropSignoff from '@/components/driver/QuickDropSignoff';
import { Radar, Truck, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InteractiveMap, { MapMarker } from '@/components/ui/InteractiveMap';

type DriverState = 'idle' | 'pinging' | 'en_route_pickup' | 'arrived_pickup' | 'waiver' | 'loaded_confirm' | 'in_transit' | 'dropoff';

export default function DriverView() {
  const [status, setStatus] = useState<DriverState>('idle');

  if (status === 'pinging') {
    return <JobOfferPing onAccept={() => setStatus('en_route_pickup')} onDecline={() => setStatus('idle')} />;
  }

  if (status === 'en_route_pickup') {
    return <ActiveRouteMock onArrive={() => setStatus('arrived_pickup')} />;
  }

  if (status === 'arrived_pickup') {
    return <LiabilityCamera onComplete={() => setStatus('waiver')} />;
  }

  if (status === 'waiver') {
    return <LiabilityWaiver onComplete={() => setStatus('loaded_confirm')} />;
  }

  if (status === 'loaded_confirm') {
    return <StartTransport onStart={() => setStatus('in_transit')} />;
  }

  if (status === 'in_transit') {
    return (
      <ActiveRouteMock 
        onArrive={() => setStatus('dropoff')} 
        primaryInstruction="Arrive at"
        secondaryInstruction="Southside Auto & Tire"
      />
    );
  }

  if (status === 'dropoff') {
    return <QuickDropSignoff onComplete={() => setStatus('idle')} />;
  }

  const driverMarker: MapMarker = {
    id: 'driver-location',
    lng: -84.3800,
    lat: 33.7089,
    element: (
      <div className="bg-amber-500 p-2 rounded-full shadow-lg border-2 border-zinc-950 shadow-black/50 relative">
        <Truck className="w-5 h-5 text-amber-950" />
        <div className="absolute inset-0 border-2 border-amber-500 rounded-full animate-ping opacity-50 scale-150" />
      </div>
    )
  };

  return (
    <div className="flex min-h-[100dvh] flex-col relative overflow-hidden bg-zinc-950 text-zinc-50 dark">
      <div className="absolute inset-0 z-0">
        <InteractiveMap 
          center={[-84.3800, 33.7089]}
          zoom={14}
          markers={[driverMarker]}
          interactive={false} // Prevents user from panning away
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/20 pointer-events-none" />
      </div>
      
      {/* Floating Bottom Card (Idle only) */}
      <div className="relative z-10 mt-auto bg-zinc-950/80 backdrop-blur-xl rounded-t-3xl p-8 pb-12 w-full flex flex-col items-center border-t border-white/5 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
        <div className="bg-zinc-900 p-4 rounded-full mb-6 relative border border-white/10 shadow-lg">
          <Radar className="w-10 h-10 text-amber-500" />
          <div className="absolute inset-0 border-2 border-amber-500 rounded-full animate-ping opacity-70" />
        </div>
        
        <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-white">Looking for Jobs</h1>
        <p className="max-w-xs text-center text-zinc-400 font-medium mb-8">
          You are online and visible to dispatch. Keep the app open.
        </p>

        <Button 
          onClick={() => setStatus('pinging')}
          size="lg"
          className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold uppercase tracking-wider h-14 px-8 rounded-2xl w-full max-w-sm shadow-xl shadow-amber-900/20"
        >
          Simulate Incoming Ping
        </Button>
      </div>
    </div>
  );
}
