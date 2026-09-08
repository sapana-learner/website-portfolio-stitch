import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center py-6 px-4">
      {/* Phone device frame */}
      <div className="relative w-full max-w-[400px] h-[830px] rounded-[48px] bg-[#0A0E1A] p-3 shadow-2xl border-[4px] border-[#1E2742] ring-1 ring-white/10 flex flex-col overflow-hidden">
        {/* Outer glass specular reflection */}
        <div className="absolute inset-0 rounded-[44px] pointer-events-none border border-white/10 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.04]" />

        {/* Dynamic Island / Speaker Pill */}
        <div className="relative z-30 flex items-center justify-between px-6 pt-2 pb-1 bg-[#060913] text-xs text-slate-300 select-none">
          <span className="font-semibold text-xs tracking-tight">9:41</span>
          
          {/* Dynamic Island pill */}
          <div className="flex items-center gap-2 bg-black px-3 py-1 rounded-full border border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-300">Synapse</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5 text-slate-300" />
            <Wifi className="w-3.5 h-3.5 text-slate-300" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Screen inner content container */}
        <div className="relative flex-1 flex flex-col bg-[#060913] rounded-b-[36px] overflow-hidden">
          {children}
        </div>

        {/* Home indicator bar at bottom */}
        <div className="relative z-30 pt-2 pb-1 flex justify-center bg-[#060913]">
          <div className="w-32 h-1 rounded-full bg-slate-500/40" />
        </div>
      </div>
    </div>
  );
};
