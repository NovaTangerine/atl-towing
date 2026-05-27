"use client";

import React, { useState } from 'react';
import JobOfferPing from '@/components/driver/JobOfferPing';
import ActiveRouteMock from '@/components/driver/ActiveRouteMock';
import LiabilityCamera from '@/components/driver/LiabilityCamera';
import LiabilityWaiver from '@/components/driver/LiabilityWaiver';
import StartTransport from '@/components/driver/StartTransport';
import QuickDropSignoff from '@/components/driver/QuickDropSignoff';
import { Radar } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-zinc-950 p-6 text-zinc-50 dark">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMzZjNmNDYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-20" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="bg-zinc-900/50 p-6 rounded-full mb-8 relative">
          <Radar className="w-16 h-16 text-zinc-500" />
          <div className="absolute inset-0 border-4 border-zinc-700 rounded-full animate-ping" />
        </div>
        
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-white">Looking for Jobs</h1>
        <p className="max-w-xs text-center text-zinc-400 font-medium mb-12">
          You are online and visible to dispatch. Keep the app open.
        </p>

        <Button 
          onClick={() => setStatus('pinging')}
          size="lg"
          className="bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold uppercase tracking-wider h-14 px-8 rounded-2xl"
        >
          Simulate Incoming Ping
        </Button>
      </div>
    </div>
  );
}
