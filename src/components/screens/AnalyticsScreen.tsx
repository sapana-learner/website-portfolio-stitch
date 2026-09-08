import React, { useState } from 'react';
import { SystemMetrics, PipelineFlow } from '../../types';
import {
  BarChart3,
  TrendingUp,
  Cpu,
  Clock,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Filter,
} from 'lucide-react';

interface AnalyticsScreenProps {
  metrics: SystemMetrics;
  flows: PipelineFlow[];
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({
  metrics,
  flows,
}) => {
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d'>('24h');

  // Calculate maximum for SVG chart scaling
  const maxThroughput = Math.max(...metrics.throughputHistory.map((p) => p.value));
  const chartHeight = 130;
  const chartWidth = 320;

  // Build SVG path points
  const points = metrics.throughputHistory.map((item, idx) => {
    const x = (idx / (metrics.throughputHistory.length - 1)) * chartWidth;
    const y = chartHeight - (item.value / maxThroughput) * (chartHeight - 30) - 15;
    return { x, y, ...item };
  });

  const svgPath = points.reduce((acc, curr, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${curr.x} ${curr.y}`;
  }, '');

  const areaPath = `${svgPath} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 text-slate-100 bg-gradient-to-b from-[#060913] via-[#080D1F] to-[#060913]">
      {/* Top Header & Range selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            Neural Telemetry & Analytics
          </h2>
          <p className="text-[11px] text-slate-400">Throughput, execution latency, and error tolerance.</p>
        </div>

        <div className="flex items-center gap-1 bg-[#090E20] p-1 rounded-xl border border-[#1C2847] text-xs">
          {(['1h', '24h', '7d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                timeRange === range
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/40 text-cyan-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Main Signal Volume Chart Card */}
      <div className="rounded-2xl bg-[#090E21] border border-[#1E2C52] p-4 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Total Throughput</span>
            <div className="text-2xl font-bold font-mono text-white tracking-tight flex items-center gap-2">
              {(metrics.totalSignalsRouted).toLocaleString()}
              <span className="text-xs font-normal text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +18.4%
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400">Peak Load</span>
            <div className="text-sm font-mono font-bold text-cyan-300">1,890 sig/sec</div>
          </div>
        </div>

        {/* SVG Neon Area Chart */}
        <div className="relative pt-2 pb-1">
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-36 overflow-visible">
            <defs>
              <linearGradient id="analytics-area-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.35" />
                <stop offset="70%" stopColor="#6366F1" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.0" />
              </linearGradient>

              <linearGradient id="analytics-line-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22D3EE" />
                <stop offset="50%" stopColor="#38BDF8" />
                <stop offset="85%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>

              <filter id="neon-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Subtle horizontal grid lines */}
            <line x1="0" y1="35" x2={chartWidth} y2="35" stroke="#17223B" strokeDasharray="3 3" />
            <line x1="0" y1="75" x2={chartWidth} y2="75" stroke="#17223B" strokeDasharray="3 3" />
            <line x1="0" y1="115" x2={chartWidth} y2="115" stroke="#17223B" strokeDasharray="3 3" />

            {/* Area gradient */}
            <path d={areaPath} fill="url(#analytics-area-grad)" />

            {/* Line with neon glow */}
            <path
              d={svgPath}
              fill="none"
              stroke="url(#analytics-line-grad)"
              strokeWidth="2.5"
              filter="url(#neon-glow-filter)"
            />

            {/* Interactive Data dots */}
            {points.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r="3.5"
                fill="#060913"
                stroke="#22D3EE"
                strokeWidth="2"
                className="hover:r-5 transition-all cursor-pointer"
              />
            ))}
          </svg>

          {/* Time axis labels */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2 px-1">
            {metrics.throughputHistory.map((item) => (
              <span key={item.time}>{item.time}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Latency & Quality Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Latency card */}
        <div className="rounded-xl bg-[#090E20] border border-[#1B2748] p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Latency Breakdown
            </span>
            <span className="text-[11px] font-mono text-cyan-400">14.8ms Avg</span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Webhook Ingest</span>
                <span className="font-mono text-slate-300">3.2ms (22%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="w-[22%] h-full bg-cyan-400" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Gemini LLM Inference</span>
                <span className="font-mono text-slate-300">8.9ms (60%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="w-[60%] h-full bg-indigo-500" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Dispatch & Egress</span>
                <span className="font-mono text-slate-300">2.7ms (18%)</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="w-[18%] h-full bg-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* SLA & Health Card */}
        <div className="rounded-xl bg-[#090E20] border border-[#1B2748] p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              SLA & High Availability
            </span>
            <span className="text-[11px] font-mono text-emerald-400">99.98%</span>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-[#060914] border border-white/5">
              <span className="text-slate-400">Zero-Downtime Revisions</span>
              <span className="font-mono text-white font-semibold">14 Deployments</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#060914] border border-white/5">
              <span className="text-slate-400">Dropped Signal Packets</span>
              <span className="font-mono text-emerald-400 font-semibold">0 (0.00%)</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-[#060914] border border-white/5">
              <span className="text-slate-400">Encrypted Ingest</span>
              <span className="font-mono text-cyan-400 font-semibold">TLS 1.3 / AES-256</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Workflows Leaderboard */}
      <div className="rounded-xl bg-[#090E20] border border-[#1A2544] p-3.5 space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Workflows Performance Ranking
        </h3>

        <div className="space-y-1.5">
          {flows.map((flow, index) => (
            <div
              key={flow.id}
              className="flex items-center justify-between p-2 rounded-lg bg-[#070B18] border border-[#131C33] text-xs"
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-slate-500 w-4">#{index + 1}</span>
                <span className="text-white font-medium">{flow.name}</span>
              </div>

              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-cyan-300">{flow.triggersToday} hits</span>
                <span className="text-slate-400">{flow.avgLatencyMs}ms</span>
                <span className="text-emerald-400 font-bold">{flow.successRate}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
