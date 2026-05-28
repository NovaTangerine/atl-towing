"use client";

import React, { useState, useEffect } from 'react';
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
  ShieldCheck,
  Check,
  X,
  Loader2,
  Truck,
  Clock,
  CalendarClock,
  Navigation,
  Info,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type WizardStep = 'service_type' | 'schedule' | 'issue' | 'destination_prompt' | 'destination_map' | 'vehicle' | 'pricing';

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
    if (step === 'pricing') setStep('vehicle');
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
            <div className={`h-1.5 w-6 rounded-full transition-colors ${['service_type', 'schedule', 'issue', 'destination_prompt', 'destination_map', 'vehicle', 'pricing'].includes(step) ? 'bg-primary' : 'bg-zinc-800'}`} />
            <div className={`h-1.5 w-6 rounded-full transition-colors ${['schedule', 'issue', 'destination_prompt', 'destination_map', 'vehicle', 'pricing'].includes(step) ? 'bg-primary' : 'bg-zinc-800'}`} />
            <div className={`h-1.5 w-6 rounded-full transition-colors ${(['destination_prompt', 'destination_map', 'vehicle', 'pricing'].includes(step) && serviceCategory === 'tow') || ['vehicle', 'pricing'].includes(step) ? 'bg-primary' : 'bg-zinc-800'}`} />
            <div className={`h-1.5 w-6 rounded-full transition-colors ${['vehicle', 'pricing'].includes(step) ? 'bg-primary' : 'bg-zinc-800'}`} />
            <div className={`h-1.5 w-6 rounded-full transition-colors ${step === 'pricing' ? 'bg-primary' : 'bg-zinc-800'}`} />
          </div>
        </div>
        <div className="w-10" /> {/* Spacer to balance back button */}
      </div>

      <div className="flex-1 flex flex-col p-6">
        
        {/* STEP 1: ROOT CHOICE */}
        {step === 'service_type' && (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Dynamic Proximity Banner */}
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 mb-6 flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-zinc-200">
                3 Trucks Nearby | ~15 Min ETA | Base Rates from $75
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight mb-2">How can we help?</h1>
            <p className="text-zinc-400 mb-8 font-medium">Select the type of service you need.</p>
            
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleServiceSelect('tow')}
                className="relative flex items-center p-6 rounded-2xl border-2 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all active:scale-[0.97]"
              >
                <div className="bg-zinc-800 p-4 rounded-full mr-5">
                  <Truck className="w-8 h-8 text-zinc-300" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-zinc-50 mb-1">I need a Tow</div>
                  <div className="text-sm text-zinc-400">My vehicle needs to be moved to a shop or home.</div>
                </div>
              </button>

              <button
                onClick={() => handleServiceSelect('roadside')}
                className="relative flex items-center p-6 rounded-2xl border-2 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all active:scale-[0.97]"
              >
                <div className="bg-zinc-800 p-4 rounded-full mr-5">
                  <Wrench className="w-8 h-8 text-zinc-300" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-zinc-50 mb-1">Roadside Assistance</div>
                  <div className="text-sm text-zinc-400">Jump start, flat tire, lockout, or out of gas.</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SCHEDULE (TOW ONLY) */}
        {step === 'schedule' && (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">When do you need the tow?</h1>
            <p className="text-zinc-400 mb-8 font-medium">We can dispatch immediately or schedule for later.</p>
            
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleScheduleSelect('asap')}
                className="relative flex items-center p-6 rounded-2xl border-2 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all active:scale-[0.97]"
              >
                <div className="bg-zinc-800 p-4 rounded-full mr-5">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-zinc-50 mb-1">As soon as possible</div>
                  <div className="text-sm text-zinc-400">We'll dispatch the nearest available driver.</div>
                </div>
              </button>

              <button
                onClick={() => handleScheduleSelect('scheduled')}
                className="relative flex items-center p-6 rounded-2xl border-2 border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all active:scale-[0.97]"
              >
                <div className="bg-zinc-800 p-4 rounded-full mr-5">
                  <CalendarClock className="w-8 h-8 text-zinc-300" />
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold text-zinc-50 mb-1">Schedule for later</div>
                  <div className="text-sm text-zinc-400">Choose a specific date and time.</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ISSUE (ROADSIDE ONLY) */}
        {step === 'issue' && (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">What's wrong?</h1>
            <p className="text-zinc-400 mb-8 font-medium">Select the type of roadside assistance you need.</p>
            
            <div className="grid grid-cols-2 gap-4">
              {roadsideIssues.map((issue) => {
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
            
            {/* Flat Rate Display for Roadside */}
            <div className="mt-auto pt-8 pb-4 text-center">
              <div className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 shadow-sm">
                <ShieldCheck className="w-5 h-5 text-primary" /> 
                <span className="font-bold text-zinc-200">Roadside services are a flat $125.</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: DESTINATION PROMPT (TOW ONLY) */}
        {step === 'destination_prompt' && (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300 justify-center pb-20">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary border border-primary/20 mx-auto">
              <Navigation className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-4 text-center">Want an exact price right now?</h1>
            <p className="text-zinc-400 mb-10 text-center text-lg leading-relaxed max-w-xs mx-auto">
              Set your drop-off destination in advance to lock in a firm quote with no surprises.
            </p>
            
            <div className="flex flex-col gap-4 mt-8">
              <Button
                onClick={() => setStep('destination_map')}
                size="lg"
                className="w-full h-16 text-lg font-bold rounded-2xl shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
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
                className="w-full h-16 text-lg font-semibold rounded-2xl text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900"
              >
                Skip for now
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: DESTINATION MAP (MOCK) */}
        {step === 'destination_map' && (
          <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-300">
            <h1 className="text-2xl font-bold tracking-tight mb-4">Pinpoint Drop-off</h1>
            
            {/* Mock Map Area */}
            <div className="flex-1 bg-zinc-900 border-2 border-zinc-800 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-84.3880,33.7490,12,0/600x600?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2V4YW1wbGUifQ.example')] bg-cover bg-center opacity-40 grayscale" />
              <div className="relative z-10 flex flex-col items-center">
                <MapPin className="w-12 h-12 text-primary animate-bounce shadow-xl" />
                <div className="w-4 h-1 bg-black/50 rounded-full blur-sm mt-1" />
              </div>
              <div className="absolute bottom-4 inset-x-4 bg-zinc-950/90 backdrop-blur-md p-4 rounded-xl border border-zinc-800">
                <div className="text-sm text-zinc-400 font-medium mb-1">Destination Set:</div>
                <div className="font-bold text-zinc-100">123 Mechanic Shop Way, Atlanta</div>
                <div className="text-primary text-sm font-bold mt-1">Est. Distance: 12 Miles</div>
              </div>
            </div>

            <div className="mt-auto pb-4">
              <Button
                onClick={() => {
                  setHasDestination(true);
                  setDestinationMiles(12);
                  setStep('vehicle');
                }}
                size="lg"
                className="w-full h-16 text-lg font-bold rounded-2xl"
              >
                Confirm Destination <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 6: VEHICLE DETAILS */}
        {step === 'vehicle' && (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300">
            <h1 className="text-3xl font-extrabold tracking-tight mb-2">Vehicle Details</h1>
            <p className="text-zinc-400 mb-6 font-medium">Helps our driver find you quickly.</p>
            
            <div className="space-y-4 mb-6">
              {/* Massive Input - Make/Model */}
              <div className="relative group">
                {/* Background to prevent transparency issues if needed */}
                <div className="absolute inset-0 bg-zinc-900 rounded-xl border-2 border-zinc-800 z-0" aria-hidden="true" />
                
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
                      title="Accept suggestion (Tab or Enter)"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={dismissSuggestion}
                      className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-300 rounded-lg transition-colors"
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
                    className="w-full bg-zinc-900 border-2 border-zinc-800 rounded-xl px-4 pt-8 pb-4 text-xl font-bold text-zinc-50 focus:border-primary focus:outline-none transition-colors peer placeholder-transparent"
                  />
                  <label htmlFor="color" className="absolute left-4 top-2 text-xs font-bold tracking-wider text-zinc-500 uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary">
                    Vehicle Color
                  </label>
                </div>

                {/* Color Swatches */}
                <div className="flex overflow-x-auto no-scrollbar gap-5 py-3 px-4 border border-zinc-800/60 rounded-2xl bg-zinc-950/30">
                  {CAR_COLORS.map(c => {
                    const isActive = color.toLowerCase() === c.name.toLowerCase();
                    return (
                      <button
                        key={c.name}
                        onClick={() => setColor(c.name)}
                        className={`shrink-0 w-8 h-8 rounded-full border border-white/5 transition-all hover:scale-110 active:scale-95 shadow-sm ${isActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-zinc-950' : 'hover:border-white/20'} ${c.bgClass || ''}`}
                        style={!c.bgClass ? { backgroundColor: c.hex } : undefined}
                        title={c.name}
                        aria-label={`Select ${c.name}`}
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
                    className="w-full h-full bg-zinc-900 border-2 border-zinc-800 rounded-xl px-4 pt-8 pb-4 text-xl font-bold text-zinc-50 focus:border-primary focus:outline-none transition-colors peer placeholder-transparent"
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
                  {/* Conic Gradient Border Effect (only visible when scanning) */}
                  {isScanning && (
                    <div className="absolute inset-[-100%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg,transparent_0%,transparent_70%,hsl(var(--primary)))] opacity-70 z-0" />
                  )}
                  {/* Inner background mask to hollow out the gradient and leave a border */}
                  {isScanning && (
                    <div className="absolute inset-[2px] bg-zinc-800 rounded-[10px] z-10" />
                  )}
                  
                  <div className="relative z-20 flex flex-col items-center justify-center gap-1">
                    {isScanning ? (
                      <Loader2 className="w-7 h-7 animate-spin text-primary" />
                    ) : (
                      <Camera className="w-7 h-7" />
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-wider">Scan</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Optional Surcharge Toggles */}
            <div className="space-y-3 pt-4 border-t border-zinc-800/60">
              <div className="text-xs font-bold tracking-wider text-zinc-500 uppercase mb-2">Special Requirements (Optional)</div>
              
              <ToggleCard 
                title="Requires Flatbed / Special Care (+$50)"
                subtext="For AWD, lowered vehicles, EVs, or severe accident damage."
                checked={requiresFlatbed}
                onChange={setRequiresFlatbed}
              />
              
              <ToggleCard 
                title="Heavy Duty / Oversized (+$50)"
                subtext="For large trucks, utility vans, and oversized SUVs."
                checked={isHeavyDuty}
                onChange={setIsHeavyDuty}
              />
            </div>

            <div className="mt-8 pb-4">
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

        {/* STEP 7: PRICING SUMMARY (CHECKOUT) */}
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
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-4 relative overflow-hidden">
              {/* Receipt edge zig-zag mock */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjQiPjxwb2x5Z29uIHBvaW50cz0iMCAwIDQgNCA4IDAiIGZpbGw9IiMxODFhMWIiLz48L3N2Zz4=')] opacity-50" />
              
              <div className="space-y-4 font-medium text-zinc-300 mt-2">
                
                {/* Service Row */}
                <div className="flex justify-between items-end pb-4 border-b border-zinc-800 border-dashed">
                  <div>
                    <div className="text-sm text-zinc-500 mb-1 font-semibold uppercase tracking-wider">Service Type</div>
                    <div className="text-zinc-50 capitalize">
                      {serviceCategory === 'roadside' 
                        ? selectedIssue?.replace('_', ' ') 
                        : 'Vehicle Tow'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-zinc-500 mb-1 font-semibold uppercase tracking-wider">Base Rate</div>
                    <div className="text-zinc-50">
                      ${serviceCategory === 'roadside' ? '125.00' : '75.00'}
                    </div>
                  </div>
                </div>

                {/* Conditional Surcharge Rows */}
                {serviceCategory === 'tow' && requiresFlatbed && (
                  <div className="flex justify-between items-end pb-4 border-b border-zinc-800 border-dashed">
                    <div>
                      <div className="text-sm text-zinc-500 mb-1 font-semibold uppercase tracking-wider">Surcharge</div>
                      <div className="text-zinc-50">Flatbed / Special Care</div>
                    </div>
                    <div className="text-right">
                      <div className="text-zinc-50">$50.00</div>
                    </div>
                  </div>
                )}

                {serviceCategory === 'tow' && isHeavyDuty && (
                  <div className="flex justify-between items-end pb-4 border-b border-zinc-800 border-dashed">
                    <div>
                      <div className="text-sm text-zinc-500 mb-1 font-semibold uppercase tracking-wider">Surcharge</div>
                      <div className="text-zinc-50">Heavy Duty / Oversized</div>
                    </div>
                    <div className="text-right">
                      <div className="text-zinc-50">$50.00</div>
                    </div>
                  </div>
                )}

                {/* Conditional Distance Row */}
                {serviceCategory === 'tow' && (
                  <div className="flex justify-between items-end pb-4 border-b border-zinc-800 border-dashed">
                    <div>
                      <div className="text-sm text-zinc-500 mb-1 font-semibold uppercase tracking-wider">Distance {hasDestination ? '' : '(Est.)'}</div>
                      <div className="text-zinc-50">
                        {hasDestination ? `${destinationMiles} Miles @ $10/mi` : 'Calculated at drop-off @ $10/mi'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-zinc-50">
                        {hasDestination ? `$${(destinationMiles * 10).toFixed(2)}` : 'TBD'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Total Row */}
                <div className="flex justify-between items-center pt-2">
                  <div className="text-lg font-bold text-zinc-50">
                    {serviceCategory === 'roadside' ? 'Total' : (hasDestination ? 'Firm Quote' : 'Starting Estimate')}
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
                
                <p className="text-xs text-zinc-500 leading-tight pt-2">
                  * Card will not be charged until the service is complete. 
                  {!hasDestination && serviceCategory === 'tow' && ' Mileage fee will be added to the final invoice.'}
                </p>
              </div>
            </div>

            {/* Educational UI for Flatbed/EV Surcharge */}
            {serviceCategory === 'tow' && requiresFlatbed && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 mb-4 animate-in fade-in">
                <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-100/80 leading-relaxed">
                  <span className="font-bold text-blue-400">Why a Flatbed?</span> Electric vehicles, AWD drivetrains, and severely damaged vehicles require specialized flatbed loading techniques and heavier-duty equipment to safely transport without causing mechanical damage.
                </div>
              </div>
            )}

            {/* Destination Info Summary */}
            <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 flex gap-3 mb-auto">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-zinc-300">Pickup Location</div>
                <div className="text-xs text-zinc-500">I-85 Northbound, Exit 88</div>
              </div>
            </div>

            <div className="pt-6 pb-4 mt-auto">
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
                  "CONFIRM & DISPATCH"
                )}
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
