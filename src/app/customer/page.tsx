"use client";

import { useState } from 'react';
import SosLocationIntake from '@/components/customer/SosLocationIntake';
import IntakeWizard from '@/components/customer/IntakeWizard';

export default function CustomerView() {
  const [currentView, setCurrentView] = useState<'location' | 'wizard'>('location');

  return (
    <main className="min-h-screen bg-zinc-950">
      {currentView === 'location' ? (
        <SosLocationIntake onNext={() => setCurrentView('wizard')} />
      ) : (
        <IntakeWizard 
          onBackToLocation={() => setCurrentView('location')} 
          onDispatchComplete={() => {
            // For now, reset or show success. We'll just reset for the prototype loop.
            console.log("Dispatch complete!");
            alert("Tow dispatched! (End of Wizard Prototype)");
            setCurrentView('location');
          }}
        />
      )}
    </main>
  );
}
