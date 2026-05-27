'use client';

import React, { useState } from 'react';
import { LayoutDashboard, TableProperties } from 'lucide-react';
import ActiveStatusBoard from '@/components/dispatch/ActiveStatusBoard';
import FleetMapMock from '@/components/dispatch/FleetMapMock';
import ExceptionTriageQueue from '@/components/dispatch/ExceptionTriageQueue';
import LotInventoryDataGrid from '@/components/dispatch/LotInventoryDataGrid';

export default function DispatchView() {
  const [activeView, setActiveView] = useState<'operations' | 'inventory'>('operations');

  return (
    <div className="flex flex-col h-screen w-full bg-zinc-950 overflow-hidden font-sans">
      {/* Top Navigation Bar */}
      <div className="h-14 min-h-[56px] border-b border-zinc-800 bg-zinc-950 flex items-center px-6 justify-between">
        <div className="flex items-center gap-6">
          <div className="text-white font-bold tracking-widest text-lg">
            NOVA<span className="text-blue-500">DISPATCH</span>
          </div>
          
          <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800">
            <button 
              onClick={() => setActiveView('operations')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeView === 'operations' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Live Operations
            </button>
            <button 
              onClick={() => setActiveView('inventory')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeView === 'inventory' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
            >
              <TableProperties className="w-4 h-4" />
              B2B & Lot Inventory
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-xs text-zinc-500 font-mono">
            OP-ID: <span className="text-zinc-300">OLIVIA-09</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold ring-2 ring-zinc-950 outline outline-1 outline-zinc-800">
            OO
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeView === 'operations' ? (
          <div className="flex h-full w-full">
            <ActiveStatusBoard />
            <FleetMapMock />
            <ExceptionTriageQueue />
          </div>
        ) : (
          <div className="h-full w-full p-4 bg-zinc-950">
            <div className="h-full w-full border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/20">
              <LotInventoryDataGrid />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
