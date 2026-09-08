import React, { useState } from 'react';
import {
  PipelineFlow,
  TelemetryLog,
  SystemMetrics,
  ScreenId,
} from '../../types';
import { SynapseLogo } from '../SynapseLogo';
import {
  Play,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  Activity,
  Cpu,
  Clock,
  Radio,
  Plus,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface DashboardScreenProps {
  flows: PipelineFlow[];
  logs: TelemetryLog[];
  metrics: SystemMetrics;
  onToggleFlow: (flowId: string) => void;
  onRunFlow: (flowId: string) => void;
  onNavigate: (screen: ScreenId) => void;
  isSimulating: boolean;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  flows,
  logs,
  metrics,
  onToggleFlow,
  onRunFlow,
  onNavigate,
  isSimulating,
}) => {
  const [logFilter, setLogFilter] = useState<'all' | 'success' | 'warning'>('all');
  const [triggeringId, setTriggeringId] = useState<string | null>(null);

  const filteredLogs = logs.filter((log) => {
    if (logFilter === 'all') return true;
    return log.status === logFilter;
  });

  const handleManualRun = (flowId: string) => {
    setTriggeringId(flowId);
    onRunFlow(flowId);
    setTimeout(() => {
      setTriggeringId(null);
    }, 1500);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 text-slate-100 bg-gradient-to-b from-[#060913] via-[#080D1C] to-[#060913]">
      {/* Hero Welcome Card with Glowing S-Path */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0C1226] via-[#0F1733] to-[#0A0E21] border border-[#202C52] p-4 shadow-xl">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] text-cyan-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>Synaptic Mesh 4.2 Online</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Neural Control Center
            </h1>
            <p className="text-xs text-slate-400 max-w-sm">
              Continuous event ingestion, AI triage, and real-time smart pipeline routing.
            </p>
          </div>

          <div className="hidden sm:block">
            <SynapseLogo size={58} glow={true} animated={isSimulating} />
          </div>
        </div>

        {/* Action quick links */}
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Mesh Status:</span>
            <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              100% Operational
            </span>
          </div>

          <button
            onClick={() => onNavigate('studio')}
            className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium group"
          >
            <span>Open S-Studio</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="bg-[#0A0E1F] border border-[#1C2642] rounded-xl p-3 hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Active Flows</span>
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white tracking-tight">
            {flows.filter((f) => f.enabled).length}
            <span className="text-xs font-normal text-slate-500 ml-1">/ {flows.length}</span>
          </div>
          <div className="text-[10px] text-cyan-400 mt-0.5 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-cyan-400" /> All channels healthy
          </div>
        </div>

        <div className="bg-[#0A0E1F] border border-[#1C2642] rounded-xl p-3 hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Signals Today</span>
            <Radio className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white tracking-tight">
            {(metrics.totalSignalsRouted / 1000).toFixed(1)}k
          </div>
          <div className="text-[10px] text-indigo-300 mt-0.5 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3 text-emerald-400" /> +14.2% vs yesterday
          </div>
        </div>

        <div className="bg-[#0A0E1F] border border-[#1C2642] rounded-xl p-3 hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Avg Latency</span>
            <Clock className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white tracking-tight">
            {metrics.averageLatencyMs}
            <span className="text-xs font-normal text-slate-500 ml-1">ms</span>
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-400" /> Ultra fast tier
          </div>
        </div>

        <div className="bg-[#0A0E1F] border border-[#1C2642] rounded-xl p-3 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Success Rate</span>
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-white tracking-tight">
            {metrics.uptimePercent}%
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">0.02% error margin</div>
        </div>
      </div>

      {/* Active Pipelines Deck */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
            Active Synaptic Pipelines
          </h2>
          <button
            onClick={() => onNavigate('studio')}
            className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>New Flow</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {flows.map((flow) => {
            const isCurrentlyRunning = isSimulating || triggeringId === flow.id;

            return (
              <div
                key={flow.id}
                className={`relative overflow-hidden rounded-xl border transition-all duration-200 p-3.5 ${
                  flow.enabled
                    ? 'bg-[#0B1024] border-[#1E2B4E] hover:border-cyan-500/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.12)]'
                    : 'bg-[#080C1A] border-[#151D33] opacity-75'
                }`}
              >
                {/* Visual pulse line if active */}
                {isCurrentlyRunning && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 animate-pulse" />
                )}

                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{flow.name}</span>
                      <span
                        className={`text-[9px] uppercase font-mono px-1.5 py-0.5 rounded ${
                          flow.category === 'ai'
                            ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                            : flow.category === 'smart_home'
                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                            : flow.category === 'devops'
                            ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                            : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {flow.category}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-1">{flow.description}</p>

                    {/* Nodes step chain */}
                    <div className="flex items-center gap-1.5 pt-1.5">
                      {flow.nodes.map((node, i) => (
                        <React.Fragment key={node.id}>
                          <div
                            className={`flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                              isCurrentlyRunning
                                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                                : 'bg-[#0E162F] border-[#1D2847] text-slate-300'
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span>{node.title.split(':')[0]}</span>
                          </div>
                          {i < flow.nodes.length - 1 && (
                            <span className="text-slate-600 text-xs">→</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Flow controls */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={flow.enabled}
                        onChange={() => onToggleFlow(flow.id)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-purple-600 shadow-[0_0_8px_rgba(34,211,238,0.3)]"></div>
                    </label>

                    <button
                      onClick={() => handleManualRun(flow.id)}
                      disabled={isCurrentlyRunning}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                        isCurrentlyRunning
                          ? 'bg-cyan-500/30 border-cyan-400 text-white shadow-[0_0_10px_rgba(34,211,238,0.4)]'
                          : 'bg-[#10172B] border-[#223055] text-slate-300 hover:text-white hover:border-cyan-500/50'
                      }`}
                    >
                      <Play className={`w-3 h-3 text-cyan-400 ${isCurrentlyRunning ? 'animate-spin' : ''}`} />
                      <span>{isCurrentlyRunning ? 'Pulse...' : 'Run'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Ingest Telemetry Stream */}
      <div className="bg-[#0A0E1F] border border-[#19223D] rounded-xl p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Live Ingest Telemetry
            </h3>
          </div>

          <div className="flex items-center gap-1 bg-[#060914] p-0.5 rounded-lg border border-slate-800 text-[10px]">
            <button
              onClick={() => setLogFilter('all')}
              className={`px-2 py-0.5 rounded ${
                logFilter === 'all' ? 'bg-slate-700 text-white' : 'text-slate-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setLogFilter('success')}
              className={`px-2 py-0.5 rounded ${
                logFilter === 'success' ? 'bg-emerald-900/60 text-emerald-300' : 'text-slate-400'
              }`}
            >
              Success
            </button>
            <button
              onClick={() => setLogFilter('warning')}
              className={`px-2 py-0.5 rounded ${
                logFilter === 'warning' ? 'bg-amber-900/60 text-amber-300' : 'text-slate-400'
              }`}
            >
              Warnings
            </button>
          </div>
        </div>

        <div className="space-y-1.5 font-mono text-[11px]">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center justify-between p-2 rounded-lg bg-[#070B18] border border-[#141C33] hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-2 overflow-hidden pr-2">
                {log.status === 'success' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                )}
                <span className="text-slate-500 text-[10px] shrink-0">{log.timestamp}</span>
                <span className="text-cyan-300 font-medium shrink-0">{log.flowName}</span>
                <span className="text-slate-500 hidden sm:inline">•</span>
                <span className="text-slate-400 truncate">{log.step}</span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-500">{log.durationMs}ms</span>
                <span
                  className={`px-1.5 py-0.2 text-[9px] uppercase rounded ${
                    log.status === 'success'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}
                >
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
