"use client";

import React from 'react';
import { Search, Filter, Truck } from 'lucide-react';

const MOCK_JOBS = [
  { id: 'ATL-4091', customer: 'Sarah M.', driver: 'Frank T.', status: 'en_route', eta: '4m', loc: 'I-75/85 SB' },
  { id: 'ATL-4092', customer: 'B2B Brian', driver: 'Unassigned', status: 'pending', eta: '--', loc: 'The Beacon' },
  { id: 'ATL-4093', customer: 'Event Traffic', driver: 'Oscar O.', status: 'exception', eta: '+15m', loc: 'Lakewood Amp' },
  { id: 'ATL-4094', customer: 'Fender Bender', driver: 'Marcus', status: 'in_transit', eta: '8m', loc: 'Moreland Ave' },
  { id: 'ATL-4095', customer: 'Roadside Assist', driver: 'David', status: 'on_scene', eta: '--', loc: 'Brownsmill Golf' },
];

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'en_route': return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">En Route</span>;
    case 'on_scene': return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30">On Scene</span>;
    case 'in_transit': return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-green-500/20 text-green-400 border border-green-500/30">In Transit</span>;
    case 'pending': return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">Pending</span>;
    case 'exception': return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">Exception</span>;
    default: return <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-zinc-500/20 text-zinc-400 border border-zinc-500/30">{status}</span>;
  }
};

export default function ActiveStatusBoard() {
  return (
    <div className="flex flex-col h-full bg-zinc-950 border-r border-zinc-800 text-zinc-300 w-[500px] shrink-0">
      {/* Header & Controls */}
      <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-extrabold text-white tracking-tight">Active Queue</h1>
          <div className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-400 rounded border border-zinc-700">Cmd+N</kbd>
            <button className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded transition-colors">New Job</button>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2 w-4 h-4 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search jobs, drivers, customers..." 
              className="w-full bg-zinc-900 border border-zinc-700 rounded pl-9 pr-12 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            <kbd className="absolute right-2 top-2 px-1 text-[10px] font-mono bg-zinc-800 text-zinc-500 rounded border border-zinc-700">Cmd+K</kbd>
          </div>
          <button className="p-1.5 bg-zinc-900 border border-zinc-700 rounded hover:bg-zinc-800 flex items-center justify-center relative">
            <Filter className="w-4 h-4 text-zinc-400" />
            <kbd className="absolute -top-2 -right-2 px-1 text-[9px] font-mono bg-zinc-800 text-zinc-500 rounded border border-zinc-700">F</kbd>
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-zinc-950 border-b border-zinc-800 z-10 shadow-sm">
            <tr>
              <th className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 w-24">Job ID</th>
              <th className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Details</th>
              <th className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Status</th>
              <th className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-right w-16">ETA</th>
            </tr>
          </thead>
          <tbody className="text-xs divide-y divide-zinc-800/50">
            {MOCK_JOBS.map((job, idx) => (
              <tr 
                key={job.id} 
                className={`group cursor-pointer transition-colors ${idx === 0 ? 'bg-zinc-800/40 border-l-2 border-l-blue-500' : 'hover:bg-zinc-900 border-l-2 border-l-transparent'}`}
              >
                <td className="px-4 py-3 font-mono text-zinc-400 group-hover:text-white transition-colors">{job.id}</td>
                <td className="px-4 py-3">
                  <div className="font-bold text-zinc-200">{job.customer}</div>
                  <div className="text-[10px] text-zinc-500 mt-0.5 flex items-center gap-1">
                    <Truck className="w-3 h-3" /> {job.driver} • {job.loc}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={job.status} />
                </td>
                <td className="px-4 py-3 text-right font-bold text-zinc-300">
                  {job.eta}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected Action Bar Mock */}
      <div className="p-3 bg-zinc-900 border-t border-zinc-800 flex justify-between items-center text-xs">
        <span className="text-zinc-500 font-medium">1 Job Selected</span>
        <div className="flex gap-2">
           <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-400 rounded border border-zinc-700 flex items-center gap-1">
             Enter <span className="text-zinc-500">Open</span>
           </kbd>
           <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-zinc-800 text-zinc-400 rounded border border-zinc-700 flex items-center gap-1">
             Cmd+P <span className="text-zinc-500">Ping</span>
           </kbd>
        </div>
      </div>
    </div>
  );
}
