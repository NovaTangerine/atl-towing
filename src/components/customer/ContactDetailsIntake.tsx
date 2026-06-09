"use client";

import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, User, Phone, Mail, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InteractiveMap from '@/components/ui/InteractiveMap';

export interface ContactDetails {
  name: string;
  phone: string;
  email: string;
}

interface ContactDetailsIntakeProps {
  onNext: (details: ContactDetails) => void;
  onBack: () => void;
}

export default function ContactDetailsIntake({ onNext, onBack }: ContactDetailsIntakeProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const isValid = name.trim().length > 0 && phone.trim().length >= 10 && email.includes('@');

  const handleAutofill = () => {
    setName('Jane Doe');
    setPhone('4045551234');
    setEmail('jane@example.com');
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
        
        <button
          onClick={handleAutofill}
          className="p-2 -mr-2 rounded-full bg-zinc-900/30 backdrop-blur-md border border-zinc-800/50 hover:bg-zinc-800 transition-colors active:scale-95 pointer-events-auto text-zinc-500 hover:text-zinc-300"
          title="Autofill Demo Data"
        >
          <Wand2 className="w-5 h-5" />
        </button>
      </div>

      {/* Filler to push drawer to bottom */}
      <div className="flex-1 pointer-events-none" />

      {/* Bottom Drawer */}
      <div className="relative z-50 h-[85vh] transition-all duration-700 ease-in-out">
        <div className="bg-zinc-900 border-t border-zinc-800 shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.9)] rounded-t-[2.5rem] pt-3 px-6 flex flex-col h-full pointer-events-auto">
          <div className="w-12 h-1.5 bg-zinc-800 rounded-full mx-auto mb-6 shrink-0" />
          
          <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
            <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-300">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">Your Info</h1>
              <p className="text-zinc-400 mb-6 font-medium">How can we reach you?</p>
              
              <div className="space-y-4 mb-8">
                {/* Name Input */}
                <div className="group relative flex items-center bg-zinc-900/40 border-2 border-zinc-800 hover:border-zinc-700 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 focus-within:bg-zinc-900/80 rounded-2xl transition-all duration-300 px-5 h-20">
                  <div className="shrink-0 text-zinc-500 group-focus-within:text-primary transition-colors duration-300 mr-4">
                    <User className="w-6 h-6" />
                  </div>
                  
                  <div className="flex flex-col flex-1 h-full justify-center pt-1">
                    <label htmlFor="name" className="text-[11px] font-extrabold tracking-widest text-zinc-500 uppercase group-focus-within:text-primary transition-colors duration-300 cursor-text">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jane Doe"
                      className="w-full bg-transparent text-xl font-bold text-zinc-50 placeholder:text-zinc-700 focus:outline-none mt-0.5"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div className="group relative flex items-center bg-zinc-900/40 border-2 border-zinc-800 hover:border-zinc-700 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 focus-within:bg-zinc-900/80 rounded-2xl transition-all duration-300 px-5 h-20">
                  <div className="shrink-0 text-zinc-500 group-focus-within:text-primary transition-colors duration-300 mr-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  
                  <div className="flex flex-col flex-1 h-full justify-center pt-1">
                    <label htmlFor="phone" className="text-[11px] font-extrabold tracking-widest text-zinc-500 uppercase group-focus-within:text-primary transition-colors duration-300 cursor-text">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full bg-transparent text-xl font-bold text-zinc-50 placeholder:text-zinc-700 focus:outline-none mt-0.5"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="group relative flex items-center bg-zinc-900/40 border-2 border-zinc-800 hover:border-zinc-700 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 focus-within:bg-zinc-900/80 rounded-2xl transition-all duration-300 px-5 h-20">
                  <div className="shrink-0 text-zinc-500 group-focus-within:text-primary transition-colors duration-300 mr-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  
                  <div className="flex flex-col flex-1 h-full justify-center pt-1">
                    <label htmlFor="email" className="text-[11px] font-extrabold tracking-widest text-zinc-500 uppercase group-focus-within:text-primary transition-colors duration-300 cursor-text">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-transparent text-xl font-bold text-zinc-50 placeholder:text-zinc-700 focus:outline-none mt-0.5"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  onClick={() => onNext({ name, phone, email })}
                  disabled={!isValid}
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
