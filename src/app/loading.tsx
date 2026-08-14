import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background backdrop-blur-sm transition-all duration-300">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-20 w-20">
          {/* Inner ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/10 border-t-primary animate-spin" />
          
          {/* Outer pulsing ring */}
          <div className="absolute -inset-2 rounded-full border border-primary/5 animate-pulse" />
          
          {/* Central Logo Letter */}
          <div className="absolute inset-0 flex items-center justify-center text-primary font-black text-2xl tracking-tighter">
            S
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <p className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">
            Processing Request
          </p>
          <div className="h-0.5 w-24 bg-primary/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/2 animate-[loading_1.5s_infinite_ease-in-out]" />
          </div>
        </div>
      </div>
    </div>
  );
}
