"use client";

import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  FileText, 
  IdCard, 
  ShieldAlert,
  ChevronRight,
  CreditCard,
  CarFront,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type RecoveryState = 'search' | 'loading' | 'found';
type SearchType = 'plate' | 'vin';

interface VehicleRecoveryProps {
  onBack: () => void;
}

export default function VehicleRecovery({ onBack }: VehicleRecoveryProps) {
  const [viewState, setViewState] = useState<RecoveryState>('search');
  const [searchType, setSearchType] = useState<SearchType>('plate');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    
    setViewState('loading');
    setTimeout(() => {
      setViewState('found');
    }, 1500);
  };

  return (
    <div className="flex h-[100dvh] w-full flex-col bg-zinc-950 text-zinc-50 overflow-y-auto dark font-sans">
      
      {/* Header */}
      <div className="flex items-center p-4 sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800">
        <button 
          onClick={viewState === 'found' ? () => setViewState('search') : onBack}
          className="p-2 -ml-2 rounded-full hover:bg-zinc-800 transition-colors active:scale-95"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-zinc-300" />
        </button>
        <h1 className="flex-1 text-center font-bold tracking-tight text-lg pr-8">
          Vehicle Locator
        </h1>
      </div>

      <div className="flex-1 flex flex-col p-6">
        
        {/* STEP 1: SEARCH INTERFACE */}
        {viewState === 'search' && (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center p-3 bg-red-500/10 rounded-2xl mb-6">
                <ShieldAlert className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-4xl font-black tracking-tight leading-none mb-3">Find a towed vehicle</h2>
              <p className="text-zinc-400 font-medium text-lg leading-snug">
                Search our secure impound database to locate your vehicle and check release requirements.
              </p>
            </div>

            <form onSubmit={handleSearch} className="space-y-8 mt-4">
              {/* Toggle */}
              <div className="flex bg-zinc-900 rounded-xl p-1 border border-zinc-800">
                <button
                  type="button"
                  onClick={() => setSearchType('plate')}
                  className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${searchType === 'plate' ? 'bg-zinc-800 text-zinc-50 shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  License Plate
                </button>
                <button
                  type="button"
                  onClick={() => setSearchType('vin')}
                  className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${searchType === 'vin' ? 'bg-zinc-800 text-zinc-50 shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
                >
                  VIN
                </button>
              </div>

              {/* Massive Input */}
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 text-zinc-500" />
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
                  placeholder={searchType === 'plate' ? "e.g. XYZ-1234" : "17-digit VIN"}
                  className="w-full bg-zinc-900 border-2 border-zinc-700 rounded-2xl pl-16 pr-4 py-6 text-3xl font-black tracking-widest text-zinc-50 focus:border-red-500 focus:outline-none transition-colors uppercase placeholder:text-zinc-700 placeholder:font-bold"
                />
              </div>

              <Button
                type="submit"
                disabled={!searchValue}
                size="lg"
                className="w-full h-20 text-xl font-extrabold rounded-2xl bg-red-600 hover:bg-red-700 text-white shadow-[0_0_30px_-5px_rgba(220,38,38,0.4)] transition-all active:scale-[0.98]"
              >
                FIND MY VEHICLE <ChevronRight className="ml-2 w-6 h-6" />
              </Button>
            </form>
          </div>
        )}

        {/* STEP 2: LOADING STATE */}
        {viewState === 'loading' && (
          <div className="flex flex-col flex-1 items-center justify-center animate-in fade-in duration-300">
            <div className="relative flex items-center justify-center mb-8">
              <div className="w-24 h-24 border-4 border-zinc-800 border-t-red-500 rounded-full animate-spin" />
              <Search className="absolute w-8 h-8 text-zinc-500" />
            </div>
            <h3 className="text-2xl font-bold tracking-tight animate-pulse text-zinc-300">Searching Database...</h3>
          </div>
        )}

        {/* STEP 3 & 4: VEHICLE FOUND DASHBOARD */}
        {viewState === 'found' && (
          <div className="flex flex-col pb-24 animate-in fade-in slide-in-from-right-4 duration-500">
            
            {/* Status Banner */}
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-xl flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-bold text-sm tracking-wide">VEHICLE LOCATED IN SECURE FACILITY</span>
            </div>

            {/* Vehicle Details Card */}
            <div className="bg-zinc-900 border-l-4 border-l-red-500 border-y border-r border-zinc-800 rounded-r-2xl p-5 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-white mb-1">2015 Honda Civic</h2>
                  <p className="text-zinc-400 font-medium">Black • Plate: {searchValue || 'ATL-8492'}</p>
                </div>
                <div className="bg-zinc-950 p-3 rounded-full border border-zinc-800">
                  <CarFront className="w-6 h-6 text-zinc-400" />
                </div>
              </div>
              
              <div className="bg-zinc-950 rounded-xl p-4 border border-zinc-800 space-y-3">
                <div className="flex gap-3 text-sm">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                  <div>
                    <span className="font-bold text-zinc-300 block">ATL Towing Main Impound Lot</span>
                    <span className="text-zinc-500">1800 Jonesboro Rd SE, Atlanta, GA 30315</span>
                  </div>
                </div>
                <div className="flex gap-3 text-sm">
                  <Clock className="w-5 h-5 text-zinc-500 shrink-0" />
                  <div>
                    <span className="font-bold text-zinc-300 block">Operating Hours</span>
                    <span className="text-zinc-500">Mon-Sun: 8:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stark Itemized Bill */}
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-3 ml-1">Release Charges</h3>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-8">
              <div className="space-y-4 font-medium text-zinc-300">
                <div className="flex justify-between items-center pb-4 border-b border-zinc-800/80">
                  <span className="text-zinc-400">Base Towing Fee</span>
                  <span className="text-zinc-100">$150.00</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-800/80">
                  <div>
                    <span className="text-zinc-400 block">Storage Fee</span>
                    <span className="text-xs text-zinc-600">3 Days @ $25.00/day</span>
                  </div>
                  <span className="text-zinc-100">$75.00</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-800/80">
                  <span className="text-zinc-400">City Administrative Fee</span>
                  <span className="text-zinc-100">$25.00</span>
                </div>
                
                <div className="flex justify-between items-end pt-2">
                  <span className="text-lg font-bold text-zinc-100">Total Due</span>
                  <span className="text-4xl font-black text-red-500">$250.00</span>
                </div>
              </div>
            </div>

            {/* What to Bring Checklist */}
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-3 ml-1">Required for Release</h3>
            <div className="bg-zinc-900/50 border border-red-900/30 rounded-2xl p-5 mb-8 space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-400 font-bold leading-relaxed uppercase tracking-wider">
                  Vehicle will not be released without all 3 original documents present.
                </p>
              </div>
              <div className="grid gap-3 pt-2">
                <div className="flex items-center gap-3 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <IdCard className="w-5 h-5 text-zinc-400" />
                  <span className="text-sm font-bold text-zinc-300">Valid Photo ID</span>
                </div>
                <div className="flex items-center gap-3 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <ShieldAlert className="w-5 h-5 text-zinc-400" />
                  <span className="text-sm font-bold text-zinc-300">Proof of Insurance</span>
                </div>
                <div className="flex items-center gap-3 bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                  <FileText className="w-5 h-5 text-zinc-400" />
                  <span className="text-sm font-bold text-zinc-300">Proof of Ownership (Title/Registration)</span>
                </div>
              </div>
            </div>

            {/* Bottom Anchored Action */}
            <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800 p-6 pt-4 z-50 pb-8">
              <p className="text-center text-xs text-zinc-500 font-medium mb-3">
                Paying online expedites your release at the lot.
              </p>
              <Button 
                size="lg"
                className="w-full h-16 text-lg font-black tracking-wide rounded-2xl bg-white hover:bg-zinc-200 text-zinc-950 shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)] transition-all active:scale-[0.98]"
              >
                <CreditCard className="mr-2 w-5 h-5" />
                PAY NOW TO EXPEDITE
              </Button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
