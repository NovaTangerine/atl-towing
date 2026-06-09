import React, { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, ...props }, ref) => {
    // Generate a stable ID if none is provided so the label can associate correctly
    const inputId = id || React.useId();

    return (
      <div className="relative w-full">
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full bg-zinc-900 border-2 border-zinc-800 focus:border-primary rounded-xl px-4 pt-8 pb-4 text-xl font-bold text-zinc-50 focus:outline-none transition-colors peer placeholder-transparent",
            className
          )}
          placeholder={props.placeholder || label}
          {...props}
        />
        <label 
          htmlFor={inputId} 
          className="absolute left-4 top-2 text-xs font-bold tracking-wider text-zinc-500 uppercase transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-6 peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-xs peer-focus:font-bold peer-focus:text-primary pointer-events-none"
        >
          {label}
        </label>
      </div>
    );
  }
);
Input.displayName = "Input";
