import React from 'react';
import { LayoutDashboard, GitMerge, BarChart3, Blocks, Sparkles, Settings } from 'lucide-react';
import { ScreenId } from '../types';

interface NavigationProps {
  currentScreen: ScreenId;
  onScreenChange: (screen: ScreenId) => void;
  activeFlowsCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  onScreenChange,
  activeFlowsCount,
}) => {
  const tabs = [
    { id: 'dashboard' as ScreenId, label: 'Control', icon: LayoutDashboard },
    { id: 'studio' as ScreenId, label: 'S-Flows', icon: GitMerge, badge: activeFlowsCount },
    { id: 'analytics' as ScreenId, label: 'Telemetry', icon: BarChart3 },
    { id: 'integrations' as ScreenId, label: 'Connect', icon: Blocks },
    { id: 'templates' as ScreenId, label: 'Templates', icon: Sparkles },
    { id: 'settings' as ScreenId, label: 'Config', icon: Settings },
  ];

  return (
    <nav className="relative z-20 bg-[#070B16]/95 backdrop-blur-md border-t border-[#182035] px-2 py-1.5 flex items-center justify-around select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentScreen === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onScreenChange(tab.id)}
            className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 group ${
              isActive
                ? 'text-cyan-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {/* Active glow backing */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent rounded-xl pointer-events-none" />
            )}

            <div className="relative">
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]' : 'text-slate-400 group-hover:text-slate-300'
                }`}
              />

              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="absolute -top-1 -right-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[9px] font-bold px-1 min-w-[14px] h-[14px] rounded-full flex items-center justify-center shadow-[0_0_6px_rgba(56,189,248,0.5)]">
                  {tab.badge}
                </span>
              )}
            </div>

            <span className="text-[10px] mt-1 tracking-tight leading-none whitespace-nowrap">
              {tab.label}
            </span>

            {/* Active indicator dot */}
            {isActive && (
              <div className="w-1 h-1 rounded-full bg-cyan-400 mt-1 shadow-[0_0_6px_#22d3ee]" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
