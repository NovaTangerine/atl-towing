"use client";

import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Wrench, 
  BatteryWarning, 
  Droplets, 
  Key, 
  AlertTriangle,
  Camera,
  CheckCircle2,
  Receipt,
  MapPin,
  ChevronRight,
  Check,
  X,
  Loader2,
  Truck,
  Clock,
  CalendarClock,
  Navigation,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import InteractiveMap from '@/components/ui/InteractiveMap';

type WizardStep = 'service_type' | 'schedule' | 'issue' | 'destination_prompt' | 'destination_map' | 'vehicle' | 'requirements' | 'pricing';

const CAR_MAKES = [
  "Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "Hyundai", "Kia", "Subaru", "Volkswagen", "Jeep", 
  "GMC", "Ram", "Dodge", "Chrysler", "Mazda", "Buick", "Tesla", "BMW", "Audi", "Mercedes-Benz", "Lexus", "Volvo", "Rivian", "Lucid", "Polestar"
];

const CAR_COLORS = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' },
  { name: 'Silver', hex: '#C0C0C0' },
  { name: 'Gray', hex: '#808080' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Brown', hex: '#8B4513' },
  { name: 'Green', hex: '#008000' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Gold', hex: '#FFD700', bgClass: 'bg-gradient-to-br from-[#FFD700] via-[#D4AF37] to-[#AA6C39]' },
  { name: 'Yellow', hex: '#D4C47C' },
  { name: 'Purple', hex: '#800080' },
  { name: 'Maroon', hex: '#800000' }
];

const ToggleCard = ({ title, subtext, checked, onChange }: { title: string, subtext: string, checked: boolean, onChange: (v: boolean) => void }) => (
  <div 
    onClick={() => onChange(!checked)}
    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${checked ? 'border-primary bg-primary/10 shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)]' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'}`}
  >
    <div className={`mt-0.5 shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${checked ? 'bg-primary border-primary' : 'border-zinc-600'}`}>
      {checked && <Check className="w-3.5 h-3.5 text-zinc-950 stroke-[3]" />}
    </div>
    <div>
      <div className={`font-bold ${checked ? 'text-zinc-50' : 'text-zinc-300'}`}>{title}</div>
      <div className="text-xs text-zinc-500 mt-1 leading-tight">{subtext}</div>
    </div>
  </div>
);

interface IntakeWizardProps {
  onBackToLocation: () => void;
  onDispatchComplete: () => void;
}

export default function IntakeWizard({ onBackToLocation, onDispatchComplete }: IntakeWizardProps) {
  const [step, setStep] = useState<WizardStep>('service_type');
  
  // Flow State
  const [serviceCategory, setServiceCategory] = useState<'tow' | 'roadside' | null>(null);
  const [schedule, setSchedule] = useState<'asap' | 'scheduled' | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  
  // Destination State
  const [hasDestination, setHasDestination] = useState(false);
  const [destinationMiles, setDestinationMiles] = useState(12); // Mock exact miles
  const [dropoffCoords, setDropoffCoords] = useState<[number, number]>([-84.3880, 33.7490]);
  const [isDraggingMap, setIsDraggingMap] = useState(false);
  const [isConfirmingDest, setIsConfirmingDest] = useState(false);
  const [showDestSuccess, setShowDestSuccess] = useState(false);
  const pickupCoords: [number, number] = [-84.3985, 33.7188]; // Mock pickup
  
  // Vehicle Details State
  const [make, setMake] = useState('');
  const [color, setColor] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  
  // Surcharge State
  const [requiresFlatbed, setRequiresFlatbed] = useState(false);
  const [isHeavyDuty, setIsHeavyDuty] = useState(false);
  const [autoDetectedEV, setAutoDetectedEV] = useState(false);
  
  const [isConfirming, setIsConfirming] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [dismissedSuggestions, setDismissedSuggestions] = useState<Set<string>>(new Set());

  const roadsideIssues = [
    { id: 'flat_tire', label: 'Flat Tire', icon: AlertTriangle },
    { id: 'dead_battery', label: 'Dead Battery', icon: BatteryWarning },
    { id: 'out_of_gas', label: 'Out of Gas', icon: Droplets },
    { id: 'locked_out', label: 'Locked Out', icon: Key },
  ];

  // Auto-detect EV makes
  useEffect(() => {
    const lowerMake = make.toLowerCase();
    const evBrands = ['tesla', 'rivian', 'lucid', 'polestar'];
    if (evBrands.some(brand => lowerMake.includes(brand))) {
      if (!autoDetectedEV && !requiresFlatbed) {
        setRequiresFlatbed(true);
        setAutoDetectedEV(true);
      }
    } else if (autoDetectedEV) {
      setRequiresFlatbed(false);
      setAutoDetectedEV(false);
    }
  }, [make, autoDetectedEV, requiresFlatbed]);

  const handleServiceSelect = (category: 'tow' | 'roadside') => {
    setServiceCategory(category);
    if (category === 'tow') setStep('schedule');
    else setStep('issue');
  };

  const handleScheduleSelect = (type: 'asap' | 'scheduled') => {
    setSchedule(type);
    setStep('destination_prompt');
  };

  const handleIssueSelect = (id: string) => {
    setSelectedIssue(id);
    setTimeout(() => setStep('vehicle'), 300); // Brief delay for visual feedback
  };

  const handleScanPlate = () => {
    setIsScanning(true);
    setLicensePlate('SCANNING...');
    setTimeout(() => {
      setLicensePlate('ATL-8492');
      setIsScanning(false);
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
    if (step === 'pricing') setStep('requirements');
    else if (step === 'requirements') setStep('vehicle');
    else if (step === 'vehicle') {
      if (serviceCategory === 'roadside') setStep('issue');
      else setStep(hasDestination ? 'destination_map' : 'destination_prompt');
    }
    else if (step === 'destination_map') setStep('destination_prompt');
    else if (step === 'destination_prompt') setStep('schedule');
    else if (step === 'issue') setStep('service_type');
    else if (step === 'schedule') setStep('service_type');
    else onBackToLocation();
  };

  // Autocomplete Logic
  const words = make.split(' ');
  const lastWord = words[words.length - 1];
  let suggestion = '';
  let ghostText = '';
  
  if (lastWord.length >= 2) {
    const match = CAR_MAKES.find(m => m.toLowerCase().startsWith(lastWord.toLowerCase()));
    if (match && !dismissedSuggestions.has(match)) {
      suggestion = match;
      ghostText = match.slice(lastWord.length);
    }
  }

  const handleMakeKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Tab' || e.key === 'Enter') && suggestion) {
      e.preventDefault();
      acceptSuggestion();
    }
  };

  const acceptSuggestion = () => {
    const newWords = [...words];
    newWords[newWords.length - 1] = suggestion;
    setMake(newWords.join(' ') + ' ');
  };

  const dismissSuggestion = () => {
    if (suggestion) {
      setDismissedSuggestions(new Set([...dismissedSuggestions, suggestion]));
    }
  };

  // Determine map center and zoom based on step
  const mapZoom = step === 'destination_map' ? 13 : 15;
  const mapCenter: [number, number] = step === 'destination_map' ? dropoffCoords : pickupCoords;
  
  // Determine drawer height class based on step
  const isExpandedStep = ['vehicle', 'requirements', 'pricing'].includes(step);
  const isHiddenStep = step === 'destination_map' && !showDestSuccess;
  
  let drawerHeightClass = '';
  if (isHiddenStep) {
    drawerHeightClass = 'translate-y-[120%] opacity-0 pointer-events-none';
  } else if (isExpandedStep) {
    drawerHeightClass = 'h-[85vh] translate-y-0 opacity-100 pointer-events-auto';
  } else {
    drawerHeightClass = 'h-[55vh] translate-y-0 opacity-100 pointer-events-auto';
  }

  return (
    <div className="relative flex h-[100dvh] w-full flex-col bg-zinc-950 overflow-hidden text-zinc-50 dark">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none transition-opacity duration-1000" />
        <InteractiveMap 
          center={mapCenter}
          zoom={mapZoom}
          interactive={step === 'destination_map'}
          onCenterChange={(lng, lat) => {
            if (step === 'destination_map') setDropoffCoords([lng, lat]);
          }}
          onMoveStart={() => setIsDraggingMap(true)}
          onMoveEnd={() => setIsDraggingMap(false)}
          markers={step === 'destination_map' ? [
            {
              id: 'pickup',
              lng: pickupCoords[0],
              lat: pickupCoords[1],
              element: (
                <div className="relative flex flex-col items-center">
                  <div className="w-5 h-5 bg-blue-500 border-[3px] border-zinc-100 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10" />
                  <div className="absolute top-6 whitespace-nowrap bg-zinc-950/90 text-zinc-300 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded border border-zinc-800 shadow-xl">
                    Pickup
                  </div>
                </div>
              )
            }
          ] : []}
        />
        
        {/* PICKUP PIN (Visible only in drawer steps) */}
        {step !== 'destination_map' && (
          <div className={`absolute top-24 left-0 right-0 ${isExpandedStep ? 'bottom-[85vh]' : 'bottom-[55vh]'} z-20 flex flex-col items-center justify-center pointer-events-none transition-all duration-500`}>
            {/* Address Label */}
            <div className="mb-2 bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-700/50 shadow-xl text-xs font-bold text-zinc-100 flex items-center gap-1.5 animate-in fade-in zoom-in duration-500">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              123 Mechanic Shop Way
            </div>
            {/* Pin */}
            <div className="drop-shadow-[0_10px_20px_rgba(255,255,255,0.3)]">
              <MapPin className="w-14 h-14 text-primary fill-primary/10 stroke-[1.5]" />
            </div>
          </div>
        )}

        {/* DROPOFF CROSSHAIRS (Visible only in destination_map) */}
        {step === 'destination_map' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
            {/* Pin */}
            <div className={`transition-transform duration-200 ease-out drop-shadow-[0_15px_20px_rgba(255,255,255,0.4)] ${isDraggingMap ? '-translate-y-4' : 'translate-y-0'}`}>
              <MapPin className="w-16 h-16 text-primary fill-primary/10 stroke-[1.5]" />
            </div>
            {/* Pin Shadow */}
            <div className={`w-4 h-1 bg-black/60 blur-[2px] rounded-[100%] absolute top-1/2 mt-7 transition-all duration-200 ${isDraggingMap ? 'w-2 opacity-30' : 'w-4 opacity-100'}`} />
            
            {/* Fading Instructions */}
            <div className={`mt-4 bg-zinc-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-zinc-700/50 shadow-xl transition-opacity duration-300 ${isDraggingMap ? 'opacity-0' : 'opacity-100'}`}>
              <span className="text-sm font-bold text-zinc-100">Drag map to set drop-off</span>
            </div>
          </div>
        )}
      </div>

      {/* Header Area */}
      <div className="absolute top-0 left-0 right-0 p-4 pt-12 z-50 pointer-events-none flex flex-col">
        {/* Back Button & Stepper */}
        <div className="flex items-center">
          <button 
            onClick={goBack}
            className="p-2 -ml-2 rounded-full bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:bg-zinc-800 transition-colors active:scale-95 pointer-events-auto"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-zinc-300" />
          </button>
          <div className="flex-1 flex justify-center pointer-events-auto">
            <div className="flex gap-2 bg-zinc-900/50 backdrop-blur-md px-4 py-2.5 rounded-full border border-zinc-800">
              <div className={`h-1.5 w-6 rounded-full transition-colors ${['service_type', 'schedule', 'issue', 'destination_prompt', 'destination_map', 'vehicle', 'requirements', 'pricing'].includes(step) ? 'bg-primary' : 'bg-zinc-800'}`} />
              <div className={`h-1.5 w-6 rounded-full transition-colors ${['schedule', 'issue', 'destination_prompt', 'destination_map', 'vehicle', 'requirements', 'pricing'].includes(step) ? 'bg-primary' : 'bg-zinc-800'}`} />
              <div className={`h-1.5 w-6 rounded-full transition-colors ${(['destination_prompt', 'destination_map', 'vehicle', 'requirements', 'pricing'].includes(step) && serviceCategory === 'tow') || ['vehicle', 'requirements', 'pricing'].includes(step) ? 'bg-primary' : 'bg-zinc-800'}`} />
              <div className={`h-1.5 w-6 rounded-full transition-colors ${['vehicle', 'requirements', 'pricing'].includes(step) ? 'bg-primary' : 'bg-zinc-800'}`} />
              <div className={`h-1.5 w-6 rounded-full transition-colors ${['requirements', 'pricing'].includes(step) ? 'bg-primary' : 'bg-zinc-800'}`} />
              <div className={`h-1.5 w-6 rounded-full transition-colors ${step === 'pricing' ? 'bg-primary' : 'bg-zinc-800'}`} />
            </div>
          </div>
          <div className="w-10" />
        </div>

        {/* Floating Current Selection for Destination Map */}
        {step === 'destination_map' && (
          <div className="mt-6 mx-auto w-full max-w-sm pointer-events-auto animate-in slide-in-from-top-4 fade-in duration-500">
            <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700 p-4 rounded-2xl shadow-2xl flex flex-col">
              <div className="text-[10px] text-zinc-400 font-bold mb-1 uppercase tracking-wider flex items-center gap-1.5">
                <Navigation className="w-3 h-3 text-primary" />
                Drop-off Location
              </div>
              <div className="font-extrabold text-zinc-50 truncate text-lg">
                482 Highland Avenue NE
              </div>
              <div className="text-primary text-sm font-bold mt-1">Est. Distance: ~12.4 Miles</div>
            </div>
          </div>
        )}
      </div>

      {/* Success Toast */}
      <div className={`absolute top-28 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-green-500/20 text-green-400 border border-green-500/30 px-5 py-3 rounded-full backdrop-blur-md shadow-lg shadow-green-500/20 transition-all duration-300 ${showDestSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-semibold text-sm">Destination Set</span>
      </div>

      {/* Floating Confirm Button for Destination Map */}
      {step === 'destination_map' && (
        <div className="absolute bottom-8 left-6 right-6 z-50 pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-500">
          <Button
            onClick={() => {
              setIsConfirmingDest(true);
              setTimeout(() => {
                setIsConfirmingDest(false);
                setShowDestSuccess(true);
                setTimeout(() => {
                  setShowDestSuccess(false);
                  setHasDestination(true);
                  setDestinationMiles(12);
                  setStep('vehicle');
                }, 1500);
              }, 1000);
            }}
            disabled={isConfirmingDest || showDestSuccess}
            size="lg"
            className="w-full h-16 text-lg font-bold rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] border-t border-zinc-700 active:scale-[0.97]"
          >
            {isConfirmingDest ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin mr-3" />
                Locking Destination...
              </>
            ) : showDestSuccess ? (
              <>
                <CheckCircle2 className="w-6 h-6 mr-3 text-green-400" />
                Confirmed
              </>
            ) : (
              <>
                Confirm Destination <ChevronRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      )}

      {/* Filler to push drawer to bottom */}
      <div className="flex-1 pointer-events-none" />

      {/* Bottom Drawer */}
      <div className={`relative z-50 transition-all duration-700 ease-in-out pointer-events-none ${drawerHeightClass}`}>
        <div className="bg-zinc-900 border-t border-zinc-800 shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.9)] rounded-t-[2.5rem] pt-3 px-6 flex flex-col h-full pointer-events-auto">
          <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-6 shrink-0" />
          
          <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
            {/* STEP 1: ROOT CHOICE */}
            {step === 'service_type' && (
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h1 className="text-3xl font-extrabold tracking-tight mb-2">How can we help?</h1>
                <p className="text-zinc-400 mb-8 font-medium">Select the type of service you need.</p>
                
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => handleServiceSelect('tow')}
                    className="relative flex items-center p-5 rounded-2xl border-2 border-zinc-800 bg-zinc-950/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all active:scale-[0.97]"
                  >
                    <div className="bg-zinc-800 p-3.5 rounded-full mr-4 shrink-0">
                      <Truck className="w-7 h-7 text-zinc-300" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-lg font-bold text-zinc-50 mb-0.5">I need a Tow</div>
                      <div className="text-xs text-zinc-400">My vehicle needs to be moved.</div>
                    </div>
                    <div className="bg-primary/20 text-primary px-3 py-1.5 rounded-full text-xs font-bold border border-primary/20 whitespace-nowrap">
                      $75 Base
                    </div>
                  </button>

                  <button
                    onClick={() => handleServiceSelect('roadside')}
                    className="relative flex items-center p-5 rounded-2xl border-2 border-zinc-800 bg-zinc-950/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all active:scale-[0.97]"
                  >
                    <div className="bg-zinc-800 p-3.5 rounded-full mr-4 shrink-0">
                      <Wrench className="w-7 h-7 text-zinc-300" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-lg font-bold text-zinc-50 mb-0.5">Roadside Assistance</div>
                      <div className="text-xs text-zinc-400">Jump start, flat tire, lockout.</div>
                    </div>
                    <div className="bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full text-xs font-bold border border-zinc-700 whitespace-nowrap">
                      $125 Flat
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SCHEDULE (TOW ONLY) */}
            {step === 'schedule' && (
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                <h1 className="text-3xl font-extrabold tracking-tight mb-2">When do you need it?</h1>
                <p className="text-zinc-400 mb-8 font-medium">We can dispatch immediately or later.</p>
                
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => handleScheduleSelect('asap')}
                    className="relative flex items-center p-5 rounded-2xl border-2 border-zinc-800 bg-zinc-950/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all active:scale-[0.97]"
                  >
                    <div className="bg-zinc-800 p-3.5 rounded-full mr-4 shrink-0">
                      <Clock className="w-7 h-7 text-primary" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-lg font-bold text-zinc-50 mb-0.5">As soon as possible</div>
                      <div className="text-xs text-zinc-400">Nearest available driver.</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleScheduleSelect('scheduled')}
                    className="relative flex items-center p-5 rounded-2xl border-2 border-zinc-800 bg-zinc-950/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all active:scale-[0.97]"
                  >
                    <div className="bg-zinc-800 p-3.5 rounded-full mr-4 shrink-0">
                      <CalendarClock className="w-7 h-7 text-zinc-300" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-lg font-bold text-zinc-50 mb-0.5">Schedule for later</div>
                      <div className="text-xs text-zinc-400">Choose a date and time.</div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: ISSUE (ROADSIDE ONLY) */}
            {step === 'issue' && (
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                <h1 className="text-3xl font-extrabold tracking-tight mb-2">What's wrong?</h1>
                <p className="text-zinc-400 mb-8 font-medium">Select the assistance you need.</p>
                
                <div className="grid grid-cols-2 gap-4">
                  {roadsideIssues.map((issue) => {
                    const Icon = issue.icon;
                    const isSelected = selectedIssue === issue.id;
                    return (
                      <button
                        key={issue.id}
                        onClick={() => handleIssueSelect(issue.id)}
                        className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all active:scale-[0.97]
                          ${isSelected 
                            ? 'border-primary bg-primary/10 shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)]' 
                            : 'border-zinc-800 bg-zinc-950/50 hover:bg-zinc-800 hover:border-zinc-700'
                          }`}
                      >
                        <Icon className={`w-8 h-8 mb-2 ${isSelected ? 'text-primary' : 'text-zinc-400'}`} />
                        <span className={`font-semibold text-sm ${isSelected ? 'text-zinc-50' : 'text-zinc-300'}`}>
                          {issue.label}
                        </span>
                        {isSelected && (
                          <div className="absolute top-2 right-2 text-primary animate-in zoom-in">
                            <CheckCircle2 className="w-4 h-4 fill-primary/20" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: DESTINATION PROMPT (TOW ONLY) */}
            {step === 'destination_prompt' && (
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300 justify-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary border border-primary/20 mx-auto">
                  <Navigation className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-4 text-center">Want an exact quote?</h1>
                <p className="text-zinc-400 mb-8 text-center text-sm leading-relaxed max-w-xs mx-auto">
                  Set your drop-off destination in advance to lock in a firm quote with no surprises.
                </p>
                
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => setStep('destination_map')}
                    size="lg"
                    className="w-full h-14 text-lg font-bold rounded-2xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
                  >
                    Set Destination
                  </Button>
                  <Button
                    onClick={() => {
                      setHasDestination(false);
                      setStep('vehicle');
                    }}
                    variant="ghost"
                    size="lg"
                    className="w-full h-14 text-lg font-semibold rounded-2xl text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
                  >
                    Skip for now
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 6: VEHICLE DETAILS */}
            {step === 'vehicle' && (
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                <h1 className="text-3xl font-extrabold tracking-tight mb-2">Vehicle Details</h1>
                <p className="text-zinc-400 mb-6 font-medium">Tell us about your vehicle to finalize your quote.</p>
                
                <div className="space-y-4 mb-6">
                  {/* Massive Input - Make/Model */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-zinc-950/50 rounded-xl border-2 border-zinc-800 z-0" aria-hidden="true" />
                    
                    <input
                      type="text"
                      id="make"
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                      onKeyDown={handleMakeKeyDown}
                      placeholder="e.g. Honda Civic"
                      className="w-full border-2 border-zinc-800 focus:border-primary rounded-xl px-4 pt-8 pb-4 text-xl font-bold text-zinc-50 focus:outline-none transition-colors peer placeholder-transparent relative z-10 bg-transparent"
                    />
                    
                    {/* Ghost Text Overlay */}
                    {ghostText && (
                      <div 
                        className="absolute inset-0 pointer-events-none flex items-center px-4 pt-8 pb-4 border-2 border-transparent text-xl font-bold whitespace-pre overflow-hidden rounded-xl z-10"
                        aria-hidden="true"
                      >
                        <span className="text-transparent">{make}</span>
                        <span className="text-zinc-500">{ghostText}</span>
                      </div>
                    )}
                    
                    {/* Floating Action Buttons */}
                    {ghostText && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 z-20 animate-in fade-in duration-200">
                        <button 
                          onClick={acceptSuggestion}
                          className="p-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors"
                          title="Accept suggestion"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={dismissSuggestion}
                          className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-lg transition-colors"
                          title="Dismiss"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}

                    <label htmlFor="make" className="absolute left-4 top-2 text-xs font-bold tracking-wider text-zinc-500 uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary z-20 pointer-events-none">
                      Make & Model
                    </label>
                  </div>

                  {/* Massive Input - Color with Swatches */}
                  <div className="space-y-3">
                    <div className="relative">
                      <input
                        type="text"
                        id="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        placeholder="e.g. Silver"
                        className="w-full bg-zinc-950/50 border-2 border-zinc-800 rounded-xl px-4 pt-8 pb-4 text-xl font-bold text-zinc-50 focus:border-primary focus:outline-none transition-colors peer placeholder-transparent"
                      />
                      <label htmlFor="color" className="absolute left-4 top-2 text-xs font-bold tracking-wider text-zinc-500 uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary">
                        Vehicle Color
                      </label>
                    </div>

                    {/* Color Swatches */}
                    <div className="flex overflow-x-auto no-scrollbar gap-4 py-3 px-3 border border-zinc-800/60 rounded-xl bg-zinc-950/30">
                      {CAR_COLORS.map(c => {
                        const isActive = color.toLowerCase() === c.name.toLowerCase();
                        return (
                          <button
                            key={c.name}
                            onClick={() => setColor(c.name)}
                            className={`shrink-0 w-8 h-8 rounded-full border border-white/5 transition-all hover:scale-110 active:scale-95 shadow-sm ${isActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-zinc-900' : 'hover:border-white/20'} ${c.bgClass || ''}`}
                            style={!c.bgClass ? { backgroundColor: c.hex } : undefined}
                            title={c.name}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Massive Input - License Plate with Scan Button */}
                  <div className="relative flex gap-3 pt-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        id="plate"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        placeholder="Plate Number"
                        className="w-full h-full bg-zinc-950/50 border-2 border-zinc-800 rounded-xl px-4 pt-8 pb-4 text-xl font-bold text-zinc-50 focus:border-primary focus:outline-none transition-colors peer placeholder-transparent"
                      />
                      <label htmlFor="plate" className="absolute left-4 top-2 text-xs font-bold tracking-wider text-zinc-500 uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary">
                        License Plate
                      </label>
                    </div>
                    
                    <button 
                      onClick={handleScanPlate}
                      disabled={isScanning}
                      className={`relative overflow-hidden bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl px-5 flex flex-col items-center justify-center gap-1 transition-colors active:scale-95 border-2 ${isScanning ? 'border-transparent' : 'border-zinc-800'}`}
                    >
                      {isScanning && (
                        <div className="absolute inset-[-100%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg,transparent_0%,transparent_70%,hsl(var(--primary)))] opacity-70 z-0" />
                      )}
                      {isScanning && (
                        <div className="absolute inset-[2px] bg-zinc-800 rounded-[10px] z-10" />
                      )}
                      
                      <div className="relative z-20 flex flex-col items-center justify-center gap-1">
                        {isScanning ? (
                          <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        ) : (
                          <Camera className="w-6 h-6" />
                        )}
                        <span className="text-[10px] font-bold uppercase tracking-wider">Scan</span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    onClick={() => setStep('requirements')}
                    disabled={!make || !color || !licensePlate}
                    size="lg"
                    className="w-full h-16 text-lg font-bold rounded-2xl"
                  >
                    Next: View Estimate <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 7: REQUIREMENTS */}
            {step === 'requirements' && (
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                <h1 className="text-3xl font-extrabold tracking-tight mb-2">Special Requirements</h1>
                <p className="text-zinc-400 mb-6 font-medium">Let us know to ensure we send the right equipment.</p>
                
                <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-5 mb-6 relative overflow-hidden flex flex-col items-center justify-center shadow-inner">
                  <div className="text-sm text-zinc-500 font-bold uppercase tracking-wider mb-1">Estimated Total</div>
                  <div className="text-5xl font-black text-primary transition-all duration-500">
                    ${(
                      (serviceCategory === 'roadside' ? 125 : 75) + 
                      (serviceCategory === 'tow' && requiresFlatbed ? 50 : 0) + 
                      (serviceCategory === 'tow' && isHeavyDuty ? 50 : 0) + 
                      (serviceCategory === 'tow' && hasDestination ? destinationMiles * 10 : 0)
                    ).toFixed(2)}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <ToggleCard 
                    title="Requires Flatbed (+$50)"
                    subtext="For EVs, AWD, or severe accident damage."
                    checked={requiresFlatbed}
                    onChange={setRequiresFlatbed}
                  />
                  
                  {serviceCategory === 'tow' && requiresFlatbed && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex gap-3 animate-in fade-in zoom-in-95">
                      <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-blue-100/80 leading-relaxed">
                        <span className="font-bold text-blue-400">Why a Flatbed?</span> EVs and AWD vehicles require a flatbed to safely transport without causing mechanical damage.
                      </div>
                    </div>
                  )}

                  <ToggleCard 
                    title="Heavy Duty (+$50)"
                    subtext="For large trucks and oversized SUVs."
                    checked={isHeavyDuty}
                    onChange={setIsHeavyDuty}
                  />
                </div>

                <div className="mt-8">
                  <Button
                    onClick={() => setStep('pricing')}
                    size="lg"
                    className="w-full h-16 text-lg font-bold rounded-2xl"
                  >
                    Next: Review Quote <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 8: PRICING SUMMARY (CHECKOUT) */}
            {step === 'pricing' && (
              <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Receipt className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Review</h1>
                    <p className="text-zinc-400 font-medium text-sm">No hidden fees. Upfront pricing.</p>
                  </div>
                </div>
                
                <div className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-5 mb-4 relative overflow-hidden">
                  <div className="space-y-4 font-medium text-zinc-300">
                    
                    {/* Service Row */}
                    <div className="flex justify-between items-end pb-4 border-b border-zinc-800 border-dashed">
                      <div>
                        <div className="text-sm text-zinc-500 mb-1 font-semibold uppercase tracking-wider">Service</div>
                        <div className="text-zinc-50 capitalize">
                          {serviceCategory === 'roadside' ? selectedIssue?.replace('_', ' ') : 'Vehicle Tow'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-zinc-50">
                          ${serviceCategory === 'roadside' ? '125.00' : '75.00'}
                        </div>
                      </div>
                    </div>

                    {/* Surcharges */}
                    {serviceCategory === 'tow' && requiresFlatbed && (
                      <div className="flex justify-between items-end pb-4 border-b border-zinc-800 border-dashed">
                        <div>
                          <div className="text-zinc-50">Flatbed Surcharge</div>
                        </div>
                        <div className="text-right text-zinc-50">$50.00</div>
                      </div>
                    )}
                    {serviceCategory === 'tow' && isHeavyDuty && (
                      <div className="flex justify-between items-end pb-4 border-b border-zinc-800 border-dashed">
                        <div>
                          <div className="text-zinc-50">Heavy Duty Surcharge</div>
                        </div>
                        <div className="text-right text-zinc-50">$50.00</div>
                      </div>
                    )}

                    {/* Distance Row */}
                    {serviceCategory === 'tow' && (
                      <div className="flex justify-between items-end pb-4 border-b border-zinc-800 border-dashed">
                        <div>
                          <div className="text-zinc-50">
                            {hasDestination ? `${destinationMiles} Miles @ $10/mi` : 'Distance (Est.)'}
                          </div>
                        </div>
                        <div className="text-right text-zinc-50">
                          {hasDestination ? `$${(destinationMiles * 10).toFixed(2)}` : 'TBD'}
                        </div>
                      </div>
                    )}

                    {/* Total Row */}
                    <div className="flex justify-between items-center pt-2">
                      <div className="text-lg font-bold text-zinc-50">
                        {serviceCategory === 'roadside' ? 'Total' : (hasDestination ? 'Firm Quote' : 'Starting Est.')}
                      </div>
                      <div className="text-3xl font-extrabold text-primary">
                        ${(
                          (serviceCategory === 'roadside' ? 125 : 75) + 
                          (serviceCategory === 'tow' && requiresFlatbed ? 50 : 0) + 
                          (serviceCategory === 'tow' && isHeavyDuty ? 50 : 0) + 
                          (serviceCategory === 'tow' && hasDestination ? destinationMiles * 10 : 0)
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-auto">
                  <Button
                    onClick={handleDispatch}
                    disabled={isConfirming}
                    size="lg"
                    className="w-full h-16 text-lg font-extrabold rounded-2xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.2)] transition-all active:scale-[0.97]"
                  >
                    {isConfirming ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-3" />
                        Dispatching...
                      </>
                    ) : (
                      "CONFIRM & DISPATCH"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
