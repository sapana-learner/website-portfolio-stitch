import React, { useState } from 'react';
import { SynapseLogo } from '../SynapseLogo';
import { PipelineFlow } from '../../types';
import {
  Settings,
  Sliders,
  Shield,
  Download,
  Upload,
  RefreshCw,
  Bell,
  Cpu,
  Zap,
  Check,
} from 'lucide-react';

interface SettingsScreenProps {
  flows: PipelineFlow[];
  onResetDefaults: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  flows,
  onResetDefaults,
}) => {
  const [perfMode, setPerfMode] = useState<'turbo' | 'balanced' | 'eco'>('turbo');
  const [accentColor, setAccentColor] = useState<'cyan' | 'purple' | 'emerald'>('cyan');
  const [notifications, setNotifications] = useState(true);
  const [hardwareSensors, setHardwareSensors] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleExportJson = () => {
    const dataStr = JSON.stringify(flows, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `synapse-flows-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 text-slate-100 bg-gradient-to-b from-[#060913] via-[#080D1F] to-[#060913]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <Settings className="w-4 h-4 text-cyan-400" />
            Neural Engine Configuration
          </h2>
          <p className="text-[11px] text-slate-400">Execution parameters, hardware bridges, and security.</p>
        </div>
      </div>

      {/* Brand Identity & Engine Info */}
      <div className="rounded-2xl bg-[#090F24] border border-[#1C2A4F] p-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <SynapseLogo size={46} glow={true} />
          <div>
            <h3 className="text-sm font-bold text-white">Synapse Flow Studio</h3>
            <p className="text-xs text-cyan-300 font-mono">v4.8.2-cloud-edge • Build #8492</p>
            <p className="text-[11px] text-slate-400">Quantum-ready asynchronous pipeline architecture</p>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-end text-xs font-mono text-slate-400">
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Edge Mesh Sync
          </span>
          <span>Latency: ~12ms</span>
        </div>
      </div>

      {/* Engine Execution Performance Mode */}
      <div className="rounded-2xl bg-[#090E20] border border-[#192444] p-4 space-y-3">
        <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          Execution Engine Mode
        </span>

        <div className="grid grid-cols-3 gap-2 text-xs">
          {[
            { id: 'turbo', label: 'Turbo (5ms)', desc: 'Zero-throttle concurrency' },
            { id: 'balanced', label: 'Balanced', desc: 'Standard cloud distribution' },
            { id: 'eco', label: 'Eco Sleep', desc: 'Battery & green compute' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setPerfMode(mode.id as any)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                perfMode === mode.id
                  ? 'bg-gradient-to-b from-cyan-500/20 to-purple-500/20 border-cyan-400 text-white shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                  : 'bg-[#060814] border-[#151D34] text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="font-bold text-xs">{mode.label}</div>
              <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{mode.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Device & Hardware Preferences */}
      <div className="rounded-2xl bg-[#090E20] border border-[#192444] p-4 space-y-3">
        <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-purple-400" />
          Hardware & Security Toggles
        </span>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#060914] border border-white/5">
            <div>
              <span className="text-white font-medium">Circadian Light Sensor Link</span>
              <p className="text-[10px] text-slate-400">Access ambient optical sensor for smart lighting</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={hardwareSensors}
                onChange={() => setHardwareSensors(!hardwareSensors)}
                className="sr-only peer"
              />
              <div className="w-8 h-4.5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.4)]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-[#060914] border border-white/5">
            <div>
              <span className="text-white font-medium">Critical On-Call Audio Ping</span>
              <p className="text-[10px] text-slate-400">Audible chime on severity == CRITICAL</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="sr-only peer"
              />
              <div className="w-8 h-4.5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-cyan-500 shadow-[0_0_6px_rgba(34,211,238,0.4)]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data Backup & Export */}
      <div className="rounded-2xl bg-[#090E20] border border-[#192444] p-4 space-y-3">
        <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          Backup & Pipeline Migration
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJson}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#0F1732] hover:bg-[#152044] border border-[#233157] text-cyan-300 text-xs font-semibold transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Exported to File</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export Flows (JSON)</span>
              </>
            )}
          </button>

          <button
            onClick={onResetDefaults}
            className="flex items-center gap-1.5 py-2 px-3 rounded-xl bg-red-950/40 hover:bg-red-950/70 border border-red-800/40 text-red-300 text-xs font-semibold transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
