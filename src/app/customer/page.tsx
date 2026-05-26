"use client";

import { useState } from 'react';
import SosLocationIntake from '@/components/customer/SosLocationIntake';
import IntakeWizard from '@/components/customer/IntakeWizard';
import LiveTracking from '@/components/customer/LiveTracking';

export default function CustomerView() {
  const [currentView, setCurrentView] = useState<'location' | 'wizard' | 'tracking'>('location');

  return (
    <main className="min-h-screen bg-zinc-950">
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
    </main>
  );
}
