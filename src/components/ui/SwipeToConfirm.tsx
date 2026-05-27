"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SwipeToConfirmProps {
  onConfirm: () => void;
  text?: string;
  className?: string;
  thumbClassName?: string;
}

export default function SwipeToConfirm({
  onConfirm,
  text = "Swipe to accept",
  className,
  thumbClassName
}: SwipeToConfirmProps) {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const startX = useRef(0);
  const maxDrag = useRef(0);



  const handlePointerDown = (e: React.PointerEvent) => {
    if (isUnlocked) return;
    
    if (containerRef.current && thumbRef.current) {
      maxDrag.current = containerRef.current.clientWidth - thumbRef.current.clientWidth - 8;
    }

    setIsDragging(true);
    startX.current = e.clientX - dragOffset;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isUnlocked) return;
    
    let newOffset = e.clientX - startX.current;
    
    // Constrain to boundaries
    if (newOffset < 0) newOffset = 0;
    if (newOffset > maxDrag.current) newOffset = maxDrag.current;
    
    setDragOffset(newOffset);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || isUnlocked) return;
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    // If dragged past 80% threshold, trigger confirm
    if (dragOffset > maxDrag.current * 0.8) {
      setDragOffset(maxDrag.current);
      setIsUnlocked(true);
      setTimeout(() => {
        onConfirm();
      }, 300); // brief pause to show completion
    } else {
      // Snap back
      setDragOffset(0);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative flex items-center h-20 bg-zinc-900 rounded-2xl border-2 border-zinc-800 overflow-hidden touch-none",
        isUnlocked && "border-green-500/50 bg-green-950/20",
        className
      )}
    >
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-none">
        <span className={cn(
          "text-xl font-bold uppercase tracking-wider text-zinc-500 transition-opacity duration-300",
          (dragOffset > 50 || isUnlocked) && "opacity-0"
        )}>
          {text}
        </span>
      </div>
      
      {/* Dynamic Background fill based on drag */}
      <div 
        className="absolute left-0 top-0 bottom-0 bg-green-500/20 transition-all"
        style={{ 
          width: isUnlocked ? '100%' : `${dragOffset + 40}px`,
          opacity: dragOffset > 10 || isUnlocked ? 1 : 0
        }}
      />

      {/* Draggable Thumb */}
      <div
        ref={thumbRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ 
          transform: `translateX(${dragOffset}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        className={cn(
          "absolute left-1 z-10 flex items-center justify-center w-[70px] h-[70px] rounded-xl cursor-grab active:cursor-grabbing",
          "bg-green-500 shadow-[0_0_20px_-5px_rgba(34,197,94,0.5)]",
          isUnlocked && "bg-green-400",
          thumbClassName
        )}
      >
        <ChevronsRight className={cn(
          "w-8 h-8 text-green-950",
          isUnlocked && "opacity-0"
        )} />
      </div>
    </div>
  );
}
