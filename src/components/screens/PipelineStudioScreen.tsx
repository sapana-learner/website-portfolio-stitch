import React, { useState } from 'react';
import { PipelineFlow, FlowNode } from '../../types';
import { SynapseLogo } from '../SynapseLogo';
import {
  Play,
  RotateCw,
  Sparkles,
  GitFork,
  Send,
  Webhook,
  Sliders,
  Check,
  Code,
  Layers,
  Activity,
  Cpu,
} from 'lucide-react';

interface PipelineStudioScreenProps {
  flows: PipelineFlow[];
  selectedFlowId: string;
  onSelectFlow: (id: string) => void;
  onTriggerSignal: () => void;
  isSimulating: boolean;
}

export const PipelineStudioScreen: React.FC<PipelineStudioScreenProps> = ({
  flows,
  selectedFlowId,
  onSelectFlow,
  onTriggerSignal,
  isSimulating,
}) => {
  const currentFlow = flows.find((f) => f.id === selectedFlowId) || flows[0];
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(0);
  const [executionStep, setExecutionStep] = useState<number>(-1);

  const selectedNode: FlowNode | undefined = currentFlow.nodes[activeNodeIndex];

  const handleSimulate = () => {
    onTriggerSignal();
    setExecutionStep(0);
    const interval = setInterval(() => {
      setExecutionStep((prev) => {
        if (prev >= currentFlow.nodes.length - 1) {
          clearInterval(interval);
          setTimeout(() => setExecutionStep(-1), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
  };

  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Webhook':
        return <Webhook className="w-4 h-4 text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-sky-400" />;
      case 'GitFork':
        return <GitFork className="w-4 h-4 text-indigo-400" />;
      case 'Send':
        return <Send className="w-4 h-4 text-purple-400" />;
      default:
        return <Cpu className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 text-slate-100 bg-gradient-to-b from-[#060913] via-[#080D1F] to-[#060913]">
      {/* Top flow selector bar */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 p-1 bg-[#090E1F] border border-[#1B2745] rounded-xl text-xs">
          {flows.map((flow) => (
            <button
              key={flow.id}
              onClick={() => onSelectFlow(flow.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                flow.id === currentFlow.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {flow.name.split(' ')[0]} {flow.name.split(' ')[1]}
            </button>
          ))}
        </div>

        <button
          onClick={handleSimulate}
          disabled={isSimulating || executionStep !== -1}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all shrink-0 ${
            isSimulating || executionStep !== -1
              ? 'bg-cyan-500/30 border-cyan-400 text-white shadow-[0_0_15px_rgba(34,211,238,0.4)]'
              : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-cyan-300/40 shadow-[0_0_12px_rgba(34,211,238,0.3)]'
          }`}
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{executionStep !== -1 ? `Firing Node ${executionStep + 1}...` : 'Fire Signal'}</span>
        </button>
      </div>

      {/* Hero Visual Pipeline Banner */}
      <div className="relative rounded-2xl bg-[#090E21] border border-[#1E2C52] p-4 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <SynapseLogo size={32} glow={false} />
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                {currentFlow.name}
              </h2>
              <p className="text-[11px] text-slate-400">{currentFlow.description}</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-800/40">
            <Activity className="w-3.5 h-3.5" />
            <span>Avg {currentFlow.avgLatencyMs}ms</span>
          </div>
        </div>

        {/* The Signature Glowing S-Pipeline Canvas */}
        <div className="relative my-2 py-4 px-2 rounded-xl bg-[#060A17] border border-[#17223D] flex flex-col items-center">
          {/* S-Circuit SVG Canvas */}
          <div className="relative w-full max-w-sm h-52 flex items-center justify-center">
            <svg
              viewBox="0 0 320 180"
              className="w-full h-full overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="s-flow-track-grad" x1="280" y1="30" x2="40" y2="150" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#22D3EE" />
                  <stop offset="35%" stopColor="#38BDF8" />
                  <stop offset="65%" stopColor="#6366F1" />
                  <stop offset="90%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#C084FC" />
                </linearGradient>

                <filter id="circuit-neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Glowing background halo */}
              <path
                d="M 270 35 L 90 35 C 50 35 50 90 90 90 L 230 90 C 270 90 270 145 230 145 L 50 145"
                stroke="url(#s-flow-track-grad)"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.35"
                filter="url(#circuit-neon-glow)"
              />

              {/* Main Crisp Track */}
              <path
                d="M 270 35 L 90 35 C 50 35 50 90 90 90 L 230 90 C 270 90 270 145 230 145 L 50 145"
                stroke="url(#s-flow-track-grad)"
                strokeWidth="10"
                strokeLinecap="round"
              />

              {/* Signal Traveling Pulse Particle */}
              {(isSimulating || executionStep !== -1) && (
                <circle r="7" fill="#FFFFFF" filter="url(#circuit-neon-glow)">
                  <animateMotion
                    path="M 270 35 L 90 35 C 50 35 50 90 90 90 L 230 90 C 270 90 270 145 230 145 L 50 145"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* Input Terminal (Cyan Dot - Top Right) */}
              <circle cx="270" cy="35" r="8" fill="#22D3EE" stroke="#FFFFFF" strokeWidth="2" />
              <text x="270" y="20" fill="#22D3EE" fontSize="9" fontWeight="bold" textAnchor="middle">
                INPUT INGEST
              </text>

              {/* Output Terminal (Purple Dot - Bottom Left) */}
              <circle cx="50" cy="145" r="8" fill="#C084FC" stroke="#FFFFFF" strokeWidth="2" />
              <text x="50" y="166" fill="#C084FC" fontSize="9" fontWeight="bold" textAnchor="middle">
                DISPATCH ACTION
              </text>
            </svg>
          </div>

          <div className="text-[11px] text-slate-400 font-mono mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
            <span>Cyan Ingest Terminal</span>
            <span className="text-slate-600">→</span>
            <span>Neural Transform Loop</span>
            <span className="text-slate-600">→</span>
            <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_6px_#a855f7]" />
            <span>Purple Egress Terminal</span>
          </div>
        </div>
      </div>

      {/* Nodes List & Step-by-Step Chain */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Pipeline Nodes ({currentFlow.nodes.length} Steps)</span>
          <span className="text-[11px] text-cyan-400 font-normal">Click node to inspect payload</span>
        </h3>

        <div className="space-y-2">
          {currentFlow.nodes.map((node, index) => {
            const isSelected = activeNodeIndex === index;
            const isFiring = executionStep === index;

            return (
              <div
                key={node.id}
                onClick={() => setActiveNodeIndex(index)}
                className={`cursor-pointer rounded-xl border p-3 transition-all duration-200 ${
                  isFiring
                    ? 'bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)] scale-[1.01]'
                    : isSelected
                    ? 'bg-[#0E152B] border-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.15)]'
                    : 'bg-[#090E1F] border-[#18233D] hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                        isSelected
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-[#121A33] border-[#222F52] text-slate-300'
                      }`}
                    >
                      {getNodeIcon(node.iconName)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{node.title}</span>
                        <span className="text-[10px] font-mono text-cyan-400">Step {index + 1}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{node.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {node.lastExecutionMs && (
                      <span className="text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-0.5 rounded border border-white/5">
                        {node.lastExecutionMs}ms
                      </span>
                    )}

                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        isFiring
                          ? 'bg-cyan-400 animate-ping'
                          : isSelected
                          ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]'
                          : 'bg-slate-600'
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Parameter & Inspector Card */}
      {selectedNode && (
        <div className="rounded-xl bg-[#090E20] border border-[#192442] p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Node Configuration Inspector: {selectedNode.title}
              </h4>
            </div>

            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300 uppercase">
              {selectedNode.type}
            </span>
          </div>

          <div className="bg-[#050711] border border-[#131B32] rounded-lg p-3 font-mono text-xs text-slate-300 overflow-x-auto">
            <pre className="text-cyan-300/90 leading-relaxed">
              {JSON.stringify(selectedNode.config, null, 2)}
            </pre>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5 text-slate-400">
            <span>Status: <strong className="text-emerald-400">Ready & Verified</strong></span>
            <button
              onClick={() => alert(`Node ${selectedNode.title} parameters verified and updated!`)}
              className="px-2.5 py-1 rounded-md bg-[#131B33] hover:bg-[#1A2647] text-cyan-300 text-[11px] font-medium border border-cyan-500/20"
            >
              Update Config
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
