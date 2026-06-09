"use client";

import React, { useState, useEffect } from 'react';
import { Camera, Check, X, Loader2, ChevronRight, ArrowLeft, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InteractiveMap from '@/components/ui/InteractiveMap';

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

export interface VehicleDetails {
  make: string;
  color: string;
  licensePlate: string;
  year?: string;
}

interface VehicleDetailsIntakeProps {
  onNext: (details: VehicleDetails) => void;
  onBack: () => void;
  onTakePhoto?: () => void;
}

export default function VehicleDetailsIntake({ onNext, onBack, onTakePhoto }: VehicleDetailsIntakeProps) {
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [color, setColor] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [dismissedSuggestions, setDismissedSuggestions] = useState<Set<string>>(new Set());

  const handleScanPlate = () => {
    setIsScanning(true);
    setLicensePlate('SCANNING...');
    setTimeout(() => {
      setLicensePlate('ATL-8492');
      setIsScanning(false);
    }, 800);
  };

  const handleAutofill = () => {
    setYear('2021');
    setMake('Tesla Model 3 ');
    setColor('White');
    setLicensePlate('DEMO-123');
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
    <div className="relative flex h-[100dvh] w-full flex-col bg-zinc-950 overflow-hidden text-zinc-50 dark">
      {/* Map Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none transition-opacity duration-1000" />
        <InteractiveMap 
          center={[-84.3985, 33.7188]}
          zoom={15}
          interactive={false}
        />
      </div>

      {/* Header Area */}
      <div className="absolute top-0 left-0 right-0 p-4 pt-12 z-50 pointer-events-none flex justify-between items-center">
        <div className="flex items-center">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-full bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:bg-zinc-800 transition-colors active:scale-95 pointer-events-auto"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6 text-zinc-300" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {onTakePhoto && (
            <button
              onClick={onTakePhoto}
              className="px-4 py-2 -mr-2 rounded-full bg-zinc-900/50 backdrop-blur-md border border-zinc-800/50 hover:bg-zinc-800 transition-colors active:scale-95 pointer-events-auto text-zinc-300 hover:text-white flex items-center gap-2 text-sm font-bold shadow-lg"
            >
              <Camera className="w-4 h-4" />
              <span>Capture Photo Instead</span>
            </button>
          )}

          <button
            onClick={handleAutofill}
            className="p-2 -mr-2 rounded-full bg-zinc-900/30 backdrop-blur-md border border-zinc-800/50 hover:bg-zinc-800 transition-colors active:scale-95 pointer-events-auto text-zinc-500 hover:text-zinc-300"
            title="Autofill Demo Data"
          >
            <Wand2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filler to push drawer to bottom */}
      <div className="flex-1 pointer-events-none" />

      {/* Bottom Drawer */}
      <div className="relative z-50 h-[85vh] transition-all duration-700 ease-in-out">
        <div className="bg-zinc-900 border-t border-zinc-800 shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.9)] rounded-t-[2.5rem] pt-3 px-6 flex flex-col h-full pointer-events-auto">
          <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-6 shrink-0" />
          
          <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
            <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Vehicle Details</h1>
              <p className="text-zinc-400 mb-6 font-medium">Tell us about your vehicle.</p>
              
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

                {/* Massive Input - Year & Color with Swatches */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="relative w-1/3">
                      <input
                        type="text"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="e.g. 2021"
                        className="w-full bg-zinc-950/50 border-2 border-zinc-800 rounded-xl px-4 pt-8 pb-4 text-xl font-bold text-zinc-50 focus:border-primary focus:outline-none transition-colors peer placeholder-transparent"
                      />
                      <label htmlFor="year" className="absolute left-4 top-2 text-xs font-bold tracking-wider text-zinc-500 uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary">
                        Year
                      </label>
                    </div>

                    <div className="relative flex-1">
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
                  onClick={() => onNext({ year, make, color, licensePlate })}
                  disabled={!year || !make || !color || !licensePlate}
                  size="lg"
                  className="w-full h-16 text-lg font-bold rounded-2xl"
                >
                  Next <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
