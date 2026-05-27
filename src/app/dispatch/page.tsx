import React from 'react';
import ActiveStatusBoard from '@/components/dispatch/ActiveStatusBoard';
import FleetMapMock from '@/components/dispatch/FleetMapMock';
import ExceptionTriageQueue from '@/components/dispatch/ExceptionTriageQueue';

export default function DispatchView() {
  return (
    <div className="flex h-screen w-full bg-zinc-950 overflow-hidden font-sans">
      <ActiveStatusBoard />
      <FleetMapMock />
      <ExceptionTriageQueue />
    </div>
  );
}
