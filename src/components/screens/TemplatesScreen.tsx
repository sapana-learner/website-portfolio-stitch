import React, { useState } from 'react';
import { FlowTemplate, PipelineFlow } from '../../types';
import { Sparkles, Download, Check, Clock, Flame, ArrowRight } from 'lucide-react';

interface TemplatesScreenProps {
  templates: FlowTemplate[];
  onInstallTemplate: (template: FlowTemplate) => void;
}

export const TemplatesScreen: React.FC<TemplatesScreenProps> = ({
  templates,
  onInstallTemplate,
}) => {
  const [installedIds, setInstalledIds] = useState<string[]>([]);
  const [installingId, setInstallingId] = useState<string | null>(null);

  const handleInstall = (tpl: FlowTemplate) => {
    setInstallingId(tpl.id);
    setTimeout(() => {
      onInstallTemplate(tpl);
      setInstalledIds((prev) => [...prev, tpl.id]);
      setInstallingId(null);
    }, 900);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 text-slate-100 bg-gradient-to-b from-[#060913] via-[#080D1F] to-[#060913]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Curated Flow Blueprints
          </h2>
          <p className="text-[11px] text-slate-400">One-click activation for high-frequency neural pipelines.</p>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 gap-3">
        {templates.map((tpl) => {
          const isInstalled = installedIds.includes(tpl.id);
          const isInstalling = installingId === tpl.id;

          return (
            <div
              key={tpl.id}
              className="rounded-2xl bg-[#090F23] border border-[#1B294C] hover:border-cyan-500/40 p-4 transition-all duration-200 shadow-lg relative overflow-hidden"
            >
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                    {tpl.category}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-purple-950/80 border border-purple-800/80 text-purple-300 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-purple-400" /> {tpl.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{tpl.estimatedSetupMin}m setup</span>
                </div>
              </div>

              {/* Title & Desc */}
              <h3 className="text-sm font-bold text-white tracking-tight mb-1">{tpl.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                {tpl.description}
              </p>

              {/* Bottom stats & action */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span>{tpl.nodesCount} Pipeline Nodes</span>
                  <span>•</span>
                  <span className="text-cyan-400">{tpl.popularity}% Satisfaction</span>
                </div>

                <button
                  onClick={() => handleInstall(tpl)}
                  disabled={isInstalled || isInstalling}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isInstalled
                      ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-300'
                      : isInstalling
                      ? 'bg-cyan-500/30 border border-cyan-400 text-white animate-pulse'
                      : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-[0_0_10px_rgba(34,211,238,0.25)]'
                  }`}
                >
                  {isInstalled ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Installed to Flows</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>{isInstalling ? 'Provisioning...' : 'Install Blueprint'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
