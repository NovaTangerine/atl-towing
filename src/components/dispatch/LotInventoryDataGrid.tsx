'use client';

import React, { useState, useRef } from 'react';
import { Truck, CheckCircle2, AlertCircle, Clock, CheckSquare } from 'lucide-react';

type Status = 'Pending Dispatch' | 'In Lot' | 'Payment Cleared' | 'Released';

interface VehicleRecord {
  id: string;
  licensePlate: string;
  vin: string;
  makeModel: string;
  location: string;
  status: Status;
  feesOwed: number;
}

const MOCK_RECORDS: VehicleRecord[] = [
  { id: '1', licensePlate: 'ATL-9921', vin: '1HGCM826...', makeModel: '2019 Honda Accord', location: '1040 West Peachtree (B2B)', status: 'Pending Dispatch', feesOwed: 0 },
  { id: '2', licensePlate: 'GEO-4412', vin: '2T1BR32E...', makeModel: '2021 Toyota Camry', location: 'Lot A, Row 4', status: 'In Lot', feesOwed: 150 },
  { id: '3', licensePlate: 'PEA-7734', vin: '3VW1K7F...', makeModel: '2018 VW Jetta', location: 'Lot B, Row 1', status: 'Payment Cleared', feesOwed: 0 },
  { id: '4', licensePlate: 'XTR-1002', vin: '1FMCU0G...', makeModel: '2015 Ford Escape', location: 'Released', status: 'Released', feesOwed: 0 },
];

export default function LotInventoryDataGrid() {
  const [records, setRecords] = useState<VehicleRecord[]>(MOCK_RECORDS);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  
  // Rapid Entry State
  const [newPlate, setNewPlate] = useState('');
  const [newVin, setNewVin] = useState('');
  const [newMake, setNewMake] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const plateInputRef = useRef<HTMLInputElement>(null);

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleAll = () => {
    if (selectedIds.size === records.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(records.map(r => r.id)));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!newPlate && !newMake) return; // Basic validation
      
      const newRecord: VehicleRecord = {
        id: Math.random().toString(36).substr(2, 9),
        licensePlate: newPlate || 'UNKNOWN',
        vin: newVin || 'PENDING',
        makeModel: newMake || 'UNKNOWN',
        location: newLocation || 'PENDING DISPATCH',
        status: 'Pending Dispatch',
        feesOwed: 75, // Agreed Base Fee
      };
      
      setRecords([newRecord, ...records]);
      setNewPlate('');
      setNewVin('');
      setNewMake('');
      setNewLocation('');
      
      plateInputRef.current?.focus();
    }
  };

  const StatusBadge = ({ status }: { status: Status }) => {
    switch (status) {
      case 'Pending Dispatch':
        return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20 whitespace-nowrap"><Clock className="w-3 h-3" /> Pending</span>;
      case 'In Lot':
        return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-red-500/10 text-red-500 border border-red-500/20 whitespace-nowrap"><AlertCircle className="w-3 h-3" /> In Lot</span>;
      case 'Payment Cleared':
        return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap"><CheckCircle2 className="w-3 h-3" /> Cleared</span>;
      case 'Released':
        return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-800 text-zinc-400 border border-zinc-700 whitespace-nowrap"><CheckSquare className="w-3 h-3" /> Released</span>;
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-zinc-950 overflow-hidden font-mono text-sm relative">
      {/* Grid Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-4">
          <h2 className="text-zinc-100 font-semibold text-sm tracking-wide flex items-center gap-2">
            <Truck className="w-4 h-4 text-zinc-400" />
            B2B INTAKE & LOT INVENTORY
          </h2>
          <span className="text-zinc-500 text-xs px-2 py-1 bg-zinc-900 rounded border border-zinc-800">
            {records.length} Records
          </span>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-xs font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 rounded border border-zinc-700 transition-colors">
            Export CSV
          </button>
        </div>
      </div>

      {/* Spreadsheet Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead className="sticky top-0 z-10 bg-zinc-900 border-b border-zinc-800 text-zinc-400 text-xs shadow-sm">
            <tr>
              <th className="px-4 py-2 w-10 border-r border-zinc-800">
                <input 
                  type="checkbox" 
                  checked={selectedIds.size === records.length && records.length > 0}
                  onChange={toggleAll}
                  className="w-3.5 h-3.5 rounded-sm bg-zinc-800 border-zinc-600 checked:bg-blue-500"
                />
              </th>
              <th className="px-4 py-2 font-medium tracking-wide border-r border-zinc-800 w-32">LPN</th>
              <th className="px-4 py-2 font-medium tracking-wide border-r border-zinc-800 w-48">VIN</th>
              <th className="px-4 py-2 font-medium tracking-wide border-r border-zinc-800 w-64">Make / Model</th>
              <th className="px-4 py-2 font-medium tracking-wide border-r border-zinc-800 flex-1">Location / Client</th>
              <th className="px-4 py-2 font-medium tracking-wide border-r border-zinc-800 w-32">Status</th>
              <th className="px-4 py-2 font-medium tracking-wide w-24 text-right">Fees</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 text-zinc-300">
            {/* Rapid Entry Row */}
            <tr className="bg-blue-900/10 border-b-2 border-blue-900/30 hover:bg-blue-900/20 transition-colors group">
              <td className="px-4 py-1 border-r border-zinc-800 bg-zinc-950/50">
                <div className="w-3.5 h-3.5" /> {/* Empty space for checkbox */}
              </td>
              <td className="p-0 border-r border-zinc-800 relative">
                <input
                  ref={plateInputRef}
                  value={newPlate}
                  onChange={(e) => setNewPlate(e.target.value.toUpperCase())}
                  onKeyDown={handleKeyDown}
                  placeholder="NEW LPN..."
                  className="w-full h-full px-4 py-2.5 bg-transparent outline-none focus:bg-blue-900/30 focus:ring-1 focus:ring-inset focus:ring-blue-500 text-blue-400 placeholder:text-zinc-600 font-bold"
                />
              </td>
              <td className="p-0 border-r border-zinc-800">
                <input
                  value={newVin}
                  onChange={(e) => setNewVin(e.target.value.toUpperCase())}
                  onKeyDown={handleKeyDown}
                  placeholder="VIN (Opt)"
                  className="w-full h-full px-4 py-2.5 bg-transparent outline-none focus:bg-blue-900/30 focus:ring-1 focus:ring-inset focus:ring-blue-500 placeholder:text-zinc-600"
                />
              </td>
              <td className="p-0 border-r border-zinc-800">
                <input
                  value={newMake}
                  onChange={(e) => setNewMake(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Make / Model"
                  className="w-full h-full px-4 py-2.5 bg-transparent outline-none focus:bg-blue-900/30 focus:ring-1 focus:ring-inset focus:ring-blue-500 placeholder:text-zinc-600"
                />
              </td>
              <td className="p-0 border-r border-zinc-800">
                <input
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Location / Client"
                  className="w-full h-full px-4 py-2.5 bg-transparent outline-none focus:bg-blue-900/30 focus:ring-1 focus:ring-inset focus:ring-blue-500 placeholder:text-zinc-600"
                />
              </td>
              <td className="px-4 py-2.5 border-r border-zinc-800 bg-zinc-950/50">
                <span className="text-zinc-500 text-xs italic opacity-0 group-hover:opacity-100 transition-opacity">Press Enter ↵</span>
              </td>
              <td className="px-4 py-2.5 bg-zinc-950/50 text-right text-zinc-500">
                $75.00
              </td>
            </tr>

            {/* Data Rows */}
            {records.map((record) => {
              const isSelected = selectedIds.has(record.id);
              return (
                <tr 
                  key={record.id} 
                  className={`hover:bg-zinc-800/50 transition-colors cursor-default ${isSelected ? 'bg-zinc-800/80' : ''}`}
                  onClick={(e) => {
                    // Only toggle if not clicking an interactive element, but for a spreadsheet, row click to select is nice
                    if ((e.target as HTMLElement).tagName !== 'INPUT') {
                       toggleSelection(record.id);
                    }
                  }}
                >
                  <td className="px-4 py-2 border-r border-zinc-800">
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => toggleSelection(record.id)}
                      className="w-3.5 h-3.5 rounded-sm bg-zinc-800 border-zinc-600 checked:bg-blue-500"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-zinc-200 border-r border-zinc-800">{record.licensePlate}</td>
                  <td className="px-4 py-2 text-zinc-400 border-r border-zinc-800">{record.vin}</td>
                  <td className="px-4 py-2 border-r border-zinc-800 truncate max-w-[16rem]">{record.makeModel}</td>
                  <td className="px-4 py-2 text-zinc-400 border-r border-zinc-800 truncate max-w-[20rem]">{record.location}</td>
                  <td className="px-4 py-2 border-r border-zinc-800">
                    <StatusBadge status={record.status} />
                  </td>
                  <td className={`px-4 py-2 text-right font-medium ${record.feesOwed > 0 ? 'text-red-400' : 'text-zinc-500'}`}>
                    ${record.feesOwed.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Batch Action Bar */}
      {selectedIds.size > 0 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-700 shadow-2xl rounded-lg px-4 py-3 flex items-center gap-6 animate-in slide-in-from-bottom-8">
          <span className="text-sm font-medium text-white flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">
              {selectedIds.size}
            </div>
            Selected
          </span>
          <div className="h-6 w-px bg-zinc-700" />
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-xs font-medium bg-zinc-700 hover:bg-zinc-600 text-white rounded transition-colors">
              Assign Driver
            </button>
            <button className="px-3 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded transition-colors">
              Mark Released
            </button>
            <button className="px-3 py-1.5 text-xs font-medium bg-red-900/50 hover:bg-red-900 text-red-200 border border-red-800/50 rounded transition-colors ml-2">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
