import React from 'react';
import { ScreenId } from '../../types';
import { SynapseLogo } from '../SynapseLogo';
import {
  LayoutDashboard,
  GitMerge,
  BarChart3,
  Blocks,
  Sparkles,
  Settings,
  ExternalLink,
  Maximize2,
} from 'lucide-react';

interface AllScreensOverviewProps {
  onSelectScreen: (screen: ScreenId) => void;
  renderScreenContent: (screen: ScreenId) => React.ReactNode;
}

export const AllScreensOverview: React.FC<AllScreensOverviewProps> = ({
  onSelectScreen,
  renderScreenContent,
}) => {
  const screens = [
    {
      id: 'dashboard' as ScreenId,
      title: '1. Neural Control Center (Home)',
      subtitle: 'Active flow cards, live stats, real-time ingest telemetry',
      icon: LayoutDashboard,
    },
    {
      id: 'studio' as ScreenId,
      title: '2. S-Curve Pipeline Studio',
      subtitle: 'The signature glowing neon circuit with interactive signal simulator',
      icon: GitMerge,
    },
    {
      id: 'analytics' as ScreenId,
      title: '3. Telemetry & Latency Insights',
      subtitle: 'Throughput volume chart, latency breakdown, node ranking',
      icon: BarChart3,
    },
    {
      id: 'integrations' as ScreenId,
      title: '4. Ecosystem Connectors',
      subtitle: 'Gemini, GitHub, Home Assistant, Slack, Stripe with live ping',
      icon: Blocks,
    },
    {
      id: 'templates' as ScreenId,
      title: '5. Curated Flow Blueprints',
      subtitle: '1-click deployment for AI incident triage, IoT mesh, DevOps',
      icon: Sparkles,
    },
    {
      id: 'settings' as ScreenId,
      title: '6. Hardware & Engine Config',
      subtitle: 'Turbo/Eco performance modes, JSON export, hardware triggers',
      icon: Settings,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-100 bg-[#050813]">
      {/* Overview Banner */}
      <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-r from-[#0C132B] via-[#101A38] to-[#0A0E23] border border-[#212E54] p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
            <span>Complete 6-Screen Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Synapse Flow Studio — Design Showcase
          </h1>
          <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
            Crafted with the iconic glowing cyan-to-purple S-pathway design system. Click any screen below to open it in full interactive view.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <SynapseLogo size={80} glow={true} animated={true} />
        </div>
      </div>

      {/* Grid of Screens in Phone Frames */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {screens.map((screen) => {
          const Icon = screen.icon;

          return (
            <div
              key={screen.id}
              className="flex flex-col rounded-3xl bg-[#090E21] border border-[#1C2749] hover:border-cyan-500/50 transition-all duration-300 shadow-xl overflow-hidden group"
            >
              {/* Screen card header */}
              <div className="p-4 border-b border-[#16203D] flex items-center justify-between bg-[#0B1229]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {screen.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{screen.subtitle}</p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectScreen(screen.id)}
                  className="p-1.5 rounded-lg bg-[#141C36] hover:bg-cyan-500/20 text-slate-400 hover:text-cyan-300 transition-all border border-white/5"
                  title="Open this screen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Scaled Preview Frame */}
              <div
                onClick={() => onSelectScreen(screen.id)}
                className="relative h-[480px] bg-[#060913] overflow-hidden cursor-pointer select-none"
              >
                {/* Embedded screen render */}
                <div className="w-full h-full pointer-events-none scale-95 transform-gpu origin-top">
                  {renderScreenContent(screen.id)}
                </div>

                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                  <div className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                    <span>Open Interactive Screen</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
