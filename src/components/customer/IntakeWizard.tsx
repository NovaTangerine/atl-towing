"use client";

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Wrench, 
  BatteryWarning, 
  Droplets, 
  Key, 
  CarFront, 
  AlertTriangle,
  Camera,
  CheckCircle2,
  Receipt,
  MapPin,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type WizardStep = 'issue' | 'vehicle' | 'pricing';

interface IntakeWizardProps {
  onBackToLocation: () => void;
  onDispatchComplete: () => void;
}

export default function IntakeWizard({ onBackToLocation, onDispatchComplete }: IntakeWizardProps) {
  const [step, setStep] = useState<WizardStep>('issue');
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  
  // Vehicle Details State
  const [make, setMake] = useState('');
  const [color, setColor] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  
  const [isConfirming, setIsConfirming] = useState(false);

  const issues = [
    { id: 'flat_tire', label: 'Flat Tire', icon: AlertTriangle },
    { id: 'dead_battery', label: 'Dead Battery', icon: BatteryWarning },
    { id: 'accident', label: 'Accident', icon: CarFront },
    { id: 'mechanical', label: 'Mechanical', icon: Wrench },
    { id: 'out_of_gas', label: 'Out of Gas', icon: Droplets },
    { id: 'locked_out', label: 'Locked Out', icon: Key },
  ];

  const handleIssueSelect = (id: string) => {
    setSelectedIssue(id);
    setTimeout(() => setStep('vehicle'), 300); // Brief delay for visual feedback
  };

  const handleScanPlate = () => {
    // Simulate high-tech scanning
    setLicensePlate('SCANNING...');
    setTimeout(() => {
      setLicensePlate('ATL-8492');
    }, 800);
  };

  const handleDispatch = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      onDispatchComplete();
    }, 1500);
  };

  const goBack = () => {
    if (step === 'pricing') setStep('vehicle');
    else if (step === 'vehicle') setStep('issue');
    else onBackToLocation();
  };

  return (
    <div className="flex h-[100dvh] w-full flex-col bg-zinc-950 text-zinc-50 overflow-y-auto dark">
      {/* Header with Back Button */}
      <div className="flex items-center p-4 sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/50">
        <button 
          onClick={goBack}
          className="p-2 -ml-2 rounded-full hover:bg-zinc-800 transition-colors active:scale-95"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6 text-zinc-300" />
        </button>
        <div className="flex-1 flex justify-center">
          <div className="flex gap-2">
            <div className={`h-1.5 w-8 rounded-full transition-colors ${step === 'issue' || step === 'vehicle' || step === 'pricing' ? 'bg-primary' : 'bg-zinc-800'}`} />
            <div className={`h-1.5 w-8 rounded-full transition-colors ${step === 'vehicle' || step === 'pricing' ? 'bg-primary' : 'bg-zinc-800'}`} />
            <div className={`h-1.5 w-8 rounded-full transition-colors ${step === 'pricing' ? 'bg-primary' : 'bg-zinc-800'}`} />
          </div>
        </div>
        <div className="w-10" /> {/* Spacer to balance back button */}
      </div>

      <div className="flex-1 flex flex-col p-6">
        
        {/* STEP 1: ISSUE SELECTOR */}
        {step === 'issue' && (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">What's wrong?</h1>
            <p className="text-zinc-400 mb-8 font-medium">Tap the issue to request the right truck.</p>
            
            <div className="grid grid-cols-2 gap-4">
              {issues.map((issue) => {
                const Icon = issue.icon;
                const isSelected = selectedIssue === issue.id;
                return (
                  <button
                    key={issue.id}
                    onClick={() => handleIssueSelect(issue.id)}
                    className={`relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all active:scale-[0.97]
                      ${isSelected 
                        ? 'border-primary bg-primary/10 shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)]' 
                        : 'border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700'
                      }`}
                  >
                    <Icon className={`w-10 h-10 mb-3 ${isSelected ? 'text-primary' : 'text-zinc-400'}`} />
                    <span className={`font-semibold ${isSelected ? 'text-zinc-50' : 'text-zinc-300'}`}>
                      {issue.label}
                    </span>
                    {isSelected && (
                      <div className="absolute top-3 right-3 text-primary animate-in zoom-in">
                        <CheckCircle2 className="w-5 h-5 fill-primary/20" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="mt-auto pt-8 pb-4 text-center">
              <p className="text-sm text-zinc-500 font-medium flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Priority dispatch enabled
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: VEHICLE DETAILS */}
        {step === 'vehicle' && (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Vehicle Details</h1>
            <p className="text-zinc-400 mb-8 font-medium">Helps our driver find you quickly.</p>
            
            <div className="space-y-5">
              {/* Massive Input - Make/Model */}
              <div className="relative">
                <input
                  type="text"
                  id="make"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  placeholder="e.g. Honda Civic"
                  className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-xl px-4 pt-8 pb-4 text-xl font-bold text-zinc-50 focus:border-primary focus:outline-none transition-colors peer placeholder-transparent"
                />
                <label htmlFor="make" className="absolute left-4 top-2 text-xs font-bold tracking-wider text-zinc-500 uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary">
                  Make & Model
                </label>
              </div>

              {/* Massive Input - Color */}
              <div className="relative">
                <input
                  type="text"
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. Silver"
                  className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-xl px-4 pt-8 pb-4 text-xl font-bold text-zinc-50 focus:border-primary focus:outline-none transition-colors peer placeholder-transparent"
                />
                <label htmlFor="color" className="absolute left-4 top-2 text-xs font-bold tracking-wider text-zinc-500 uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary">
                  Vehicle Color
                </label>
              </div>

              {/* Massive Input - License Plate with Scan Button */}
              <div className="relative flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    id="plate"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                    placeholder="Plate Number"
                    className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-xl px-4 pt-8 pb-4 text-xl font-bold text-zinc-50 focus:border-primary focus:outline-none transition-colors peer placeholder-transparent"
                  />
                  <label htmlFor="plate" className="absolute left-4 top-2 text-xs font-bold tracking-wider text-zinc-500 uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary">
                    License Plate
                  </label>
                </div>
                <button 
                  onClick={handleScanPlate}
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl px-4 flex flex-col items-center justify-center gap-1 transition-colors active:scale-95 border-2 border-zinc-800"
                >
                  <Camera className="w-6 h-6" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Scan</span>
                </button>
              </div>
            </div>

            <div className="mt-auto pt-8 pb-4">
              <Button
                onClick={() => setStep('pricing')}
                disabled={!make || !color || !licensePlate}
                size="lg"
                className="w-full h-16 text-lg font-bold rounded-2xl"
              >
                Next: See Pricing <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: PRICING SUMMARY (CHECKOUT) */}
        {step === 'pricing' && (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Receipt className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">Review & Dispatch</h1>
                <p className="text-zinc-400 font-medium text-sm">No hidden fees. Upfront pricing.</p>
              </div>
            </div>
            
            {/* Transparent Receipt View */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6 relative overflow-hidden">
              {/* Receipt edge zig-zag mock */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjQiPjxwb2x5Z29uIHBvaW50cz0iMCAwIDQgNCA4IDAiIGZpbGw9IiMxODFhMWIiLz48L3N2Zz4=')] opacity-50" />
              
              <div className="space-y-4 font-medium text-zinc-300">
                <div className="flex justify-between items-end pb-4 border-b border-zinc-800 border-dashed">
                  <div>
                    <div className="text-sm text-zinc-500 mb-1 font-semibold uppercase tracking-wider">Service Type</div>
                    <div className="text-zinc-50 capitalize">{selectedIssue?.replace('_', ' ')}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-zinc-500 mb-1 font-semibold uppercase tracking-wider">Base Rate</div>
                    <div className="text-zinc-50">$75.00</div>
                  </div>
                </div>

                <div className="flex justify-between items-end pb-4 border-b border-zinc-800 border-dashed">
                  <div>
                    <div className="text-sm text-zinc-500 mb-1 font-semibold uppercase tracking-wider">Distance (Est.)</div>
                    <div className="text-zinc-50">10 Miles @ $4.50/mi</div>
                  </div>
                  <div className="text-right">
                    <div className="text-zinc-50">$45.00</div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="text-lg font-bold text-zinc-50">Total Estimate</div>
                  <div className="text-3xl font-extrabold text-primary">$120.00</div>
                </div>
                
                <p className="text-xs text-zinc-500 leading-tight pt-2">
                  * Final price may vary slightly based on exact drop-off location. Card will not be charged until the service is complete.
                </p>
              </div>
            </div>

            {/* Destination Info Summary */}
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 flex gap-3 mb-auto">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-zinc-300">Pickup Location</div>
                <div className="text-xs text-zinc-500">I-85 Northbound, Exit 88</div>
              </div>
            </div>

            <div className="pt-6 pb-4">
              <Button
                onClick={handleDispatch}
                disabled={isConfirming}
                size="lg"
                className="w-full h-20 text-xl font-extrabold rounded-2xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] transition-all active:scale-[0.97]"
              >
                {isConfirming ? (
                  <>
                    <div className="w-6 h-6 border-4 border-zinc-900 border-t-transparent rounded-full animate-spin mr-3" />
                    Dispatching...
                  </>
                ) : (
                  "CONFIRM & DISPATCH TOW"
                )}
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
