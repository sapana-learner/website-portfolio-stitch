import React from 'react';
import { SynapseLogo } from './SynapseLogo';
import { ViewMode, ScreenId } from '../types';
import { Zap, Smartphone, Monitor, Grid, Radio } from 'lucide-react';

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  currentScreen: ScreenId;
  onTriggerSignal: () => void;
  isSimulating: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onViewModeChange,
  currentScreen,
  onTriggerSignal,
  isSimulating,
}) => {
  return (
    <header className="relative z-20 bg-[#070B16]/90 backdrop-blur-md border-b border-[#182035] px-4 py-3 select-none">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2.5">
            <SynapseLogo size={36} glow={true} animated={isSimulating} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                  Synapse
                  <span className="text-xs px-1.5 py-0.5 rounded-full font-medium bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/30">
                    Flow
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#34d399]" />
                <span>Sync Active</span>
                <span className="text-slate-600">•</span>
                <span className="font-mono text-cyan-400">12ms latency</span>
              </div>
            </div>
          </div>

          {/* Quick trigger button on mobile */}
          <button
            onClick={onTriggerSignal}
            disabled={isSimulating}
            className={`sm:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              isSimulating
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.4)]'
                : 'bg-[#10172A] border-[#223055] text-slate-300 hover:text-white hover:border-cyan-500/50'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isSimulating ? 'text-cyan-400 animate-spin' : 'text-cyan-400'}`} />
            <span>{isSimulating ? 'Firing...' : 'Signal'}</span>
          </button>
        </div>

        {/* Global Controls & Mode Switcher */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {/* Simulate Signal Button for Desktop */}
          <button
            onClick={onTriggerSignal}
            disabled={isSimulating}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              isSimulating
                ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border-cyan-400 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]'
                : 'bg-[#0E1529] border-[#202C4E] text-slate-200 hover:border-cyan-500/60 hover:shadow-[0_0_10px_rgba(56,189,248,0.2)]'
            }`}
          >
            <Zap className={`w-4 h-4 text-cyan-400 ${isSimulating ? 'animate-bounce' : ''}`} />
            <span>{isSimulating ? 'Propagating Signal...' : 'Simulate Live Signal'}</span>
          </button>

          {/* Viewport Mode Switcher */}
          <div className="flex items-center p-0.5 bg-[#0B1020] border border-[#1B2540] rounded-xl text-xs">
            <button
              onClick={() => onViewModeChange('mobile')}
              title="Mobile App View"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                viewMode === 'mobile'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_8px_rgba(34,211,238,0.25)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-medium">Mobile</span>
            </button>

            <button
              onClick={() => onViewModeChange('desktop')}
              title="Full Desktop View"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                viewMode === 'desktop'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_8px_rgba(34,211,238,0.25)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-medium">Desktop</span>
            </button>

            <button
              onClick={() => onViewModeChange('overview')}
              title="All Screens Showcase Grid"
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all ${
                viewMode === 'overview'
                  ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_8px_rgba(168,85,247,0.25)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span className="hidden md:inline font-medium">Screens Grid</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
