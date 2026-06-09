"use client";

import React, { useState } from 'react';
import { ArrowLeft, Trash2, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VehicleDetails } from './VehicleDetailsIntake';

interface VehiclePhotoReviewProps {
  photoUrl: string;
  initialDetails: VehicleDetails;
  onAccept: (details: VehicleDetails) => void;
  onDelete: () => void;
}

export default function VehiclePhotoReview({ photoUrl, initialDetails, onAccept, onDelete }: VehiclePhotoReviewProps) {
  const [details, setDetails] = useState<VehicleDetails>(initialDetails);

  const handleChange = (field: keyof VehicleDetails, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }));
  };

  const isComplete = details.make && details.color && details.licensePlate && details.year;

  return (
    <div className="flex h-[100dvh] w-full flex-col bg-zinc-950 overflow-y-auto text-zinc-50 dark">
      {/* Header */}
      <div className="flex justify-between items-center p-4 pt-12">
        <button 
          onClick={onDelete}
          className="p-2 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-zinc-300" />
        </button>
        <h1 className="text-xl font-bold">Review Details</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="px-6 flex flex-col items-center">
        {/* Photo Container */}
        <div className="relative w-full max-w-sm aspect-video rounded-2xl overflow-hidden border-2 border-zinc-800 shadow-lg">
          <img 
            src={photoUrl} 
            alt="Scanned Vehicle" 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onDelete}
            className="absolute top-2 right-2 p-2 bg-red-500/90 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
            title="Discard Photo"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          
          <div className="absolute bottom-2 left-2 bg-green-500/90 text-white px-3 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-md">
            <Check className="w-3 h-3" />
            Identified
          </div>
        </div>
      </div>

      {/* Details Form */}
      <div className="flex-1 px-6 pb-12 flex flex-col pt-8">
        <p className="text-zinc-400 mb-6 font-medium text-center">
          Review your scanned details and edit if needed.
        </p>

        <div className="space-y-4 mb-8">
          {/* Make Input */}
          <div className="relative">
            <input
              type="text"
              id="make"
              value={details.make}
              onChange={(e) => handleChange('make', e.target.value)}
              className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-primary rounded-xl px-4 pt-8 pb-4 text-xl font-bold text-zinc-50 focus:outline-none transition-colors peer"
            />
            <label htmlFor="make" className="absolute left-4 top-2 text-xs font-bold tracking-wider text-zinc-500 uppercase">
              Make & Model
            </label>
          </div>

          {/* Year & Color */}
          <div className="flex gap-3">
            <div className="relative w-1/3">
              <input
                type="text"
                id="year"
                value={details.year || ''}
                onChange={(e) => handleChange('year', e.target.value)}
                className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-primary rounded-xl px-4 pt-8 pb-4 text-xl font-bold text-zinc-50 focus:outline-none transition-colors peer"
              />
              <label htmlFor="year" className="absolute left-4 top-2 text-xs font-bold tracking-wider text-zinc-500 uppercase">
                Year
              </label>
            </div>

            <div className="relative flex-1">
              <input
                type="text"
                id="color"
                value={details.color}
                onChange={(e) => handleChange('color', e.target.value)}
                className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-primary rounded-xl px-4 pt-8 pb-4 text-xl font-bold text-zinc-50 focus:outline-none transition-colors peer"
              />
              <label htmlFor="color" className="absolute left-4 top-2 text-xs font-bold tracking-wider text-zinc-500 uppercase">
                Color
              </label>
            </div>
          </div>

          {/* License Plate Input */}
          <div className="relative">
            <input
              type="text"
              id="plate"
              value={details.licensePlate}
              onChange={(e) => handleChange('licensePlate', e.target.value)}
              className="w-full bg-zinc-900 border-2 border-zinc-800 focus:border-primary rounded-xl px-4 pt-8 pb-4 text-xl font-bold text-zinc-50 focus:outline-none transition-colors peer"
            />
            <label htmlFor="plate" className="absolute left-4 top-2 text-xs font-bold tracking-wider text-zinc-500 uppercase">
              License Plate
            </label>
          </div>
        </div>

        <div className="mt-auto">
          <Button
            onClick={() => onAccept(details)}
            disabled={!isComplete}
            size="lg"
            className="w-full h-16 text-lg font-bold rounded-2xl"
          >
            Confirm Details <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
