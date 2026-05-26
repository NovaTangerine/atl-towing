"use client";

import { useState } from 'react';
import SosLocationIntake from '@/components/customer/SosLocationIntake';
import IntakeWizard from '@/components/customer/IntakeWizard';
import LiveTracking from '@/components/customer/LiveTracking';
import VehicleRecovery from '@/components/customer/VehicleRecovery';
import { Truck, ShieldAlert } from 'lucide-react';

export default function CustomerView() {
  const [currentView, setCurrentView] = useState<'home' | 'location' | 'wizard' | 'tracking' | 'recovery'>('home');

  return (
    <main className="min-h-screen bg-zinc-950">
      
      {currentView === 'home' && (
        <div className="flex flex-col h-[100dvh] items-center justify-center p-6 text-zinc-50 dark bg-zinc-950">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-black tracking-tight mb-2">ATL Towing</h1>
            <p className="text-zinc-400 font-medium">How can we help you today?</p>
          </div>
          
          <div className="w-full max-w-md space-y-4">
            <button 
              onClick={() => setCurrentView('location')}
              className="w-full bg-zinc-900 border-2 border-zinc-800 hover:border-primary p-6 rounded-2xl flex items-center gap-4 transition-all active:scale-95 text-left group"
            >
              <div className="bg-primary/20 p-4 rounded-full text-primary group-hover:scale-110 transition-transform">
                <Truck className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Request a Tow</h2>
                <p className="text-sm text-zinc-400">I need a tow truck right now</p>
              </div>
            </button>

            <button 
              onClick={() => setCurrentView('recovery')}
              className="w-full bg-zinc-900 border-2 border-zinc-800 hover:border-red-500 p-6 rounded-2xl flex items-center gap-4 transition-all active:scale-95 text-left group"
            >
              <div className="bg-red-500/20 p-4 rounded-full text-red-500 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Find Towed Vehicle</h2>
                <p className="text-sm text-zinc-400">My car was impounded or towed</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {currentView === 'location' && (
        <SosLocationIntake onNext={() => setCurrentView('wizard')} />
      )}
      
      {currentView === 'wizard' && (
        <IntakeWizard 
          onBackToLocation={() => setCurrentView('location')} 
          onDispatchComplete={() => setCurrentView('tracking')}
        />
      )}

      {currentView === 'tracking' && (
        <LiveTracking />
      )}

      {currentView === 'recovery' && (
        <VehicleRecovery onBack={() => setCurrentView('home')} />
      )}
    </main>
  );
}
