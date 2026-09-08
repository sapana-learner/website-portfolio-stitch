import React, { useState } from 'react';
import { IntegrationService } from '../../types';
import {
  Blocks,
  Sparkles,
  Github,
  Home,
  MessageSquare,
  Server,
  CreditCard,
  Database,
  Send,
  Check,
  Plus,
  Radio,
  ExternalLink,
} from 'lucide-react';

interface IntegrationsScreenProps {
  integrations: IntegrationService[];
  onToggleIntegration: (id: string) => void;
  onPingIntegration: (id: string) => void;
}

export const IntegrationsScreen: React.FC<IntegrationsScreenProps> = ({
  integrations,
  onToggleIntegration,
  onPingIntegration,
}) => {
  const [pingingId, setPingingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [customHookName, setCustomHookName] = useState('');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
      case 'Github':
        return <Github className="w-5 h-5 text-purple-400" />;
      case 'Home':
        return <Home className="w-5 h-5 text-sky-400" />;
      case 'MessageSquare':
        return <MessageSquare className="w-5 h-5 text-indigo-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-blue-400" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-violet-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Send':
        return <Send className="w-5 h-5 text-cyan-300" />;
      default:
        return <Blocks className="w-5 h-5 text-cyan-400" />;
    }
  };

  const handlePing = (id: string) => {
    setPingingId(id);
    onPingIntegration(id);
    setTimeout(() => {
      setPingingId(null);
    }, 800);
  };

  const categories = ['All', 'AI & Intelligence', 'DevOps & Git', 'Smart Home IoT', 'Messaging & Alerts', 'Database & Storage'];

  const filtered = integrations.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 text-slate-100 bg-gradient-to-b from-[#060913] via-[#080D1F] to-[#060913]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            <Blocks className="w-4 h-4 text-cyan-400" />
            Ecosystem Connectors
          </h2>
          <p className="text-[11px] text-slate-400">Plug-and-play APIs, smart home bridges, and webhooks.</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-[0_0_10px_rgba(34,211,238,0.2)]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Hook</span>
        </button>
      </div>

      {/* Category filter pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300'
                : 'bg-[#0A0F21] border border-[#16223E] text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Connectors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((item) => {
          const isPinging = pingingId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-4 transition-all duration-200 relative overflow-hidden flex flex-col justify-between ${
                item.connected
                  ? 'bg-[#0A0F24] border-[#1C294B] hover:border-cyan-500/40'
                  : 'bg-[#070A18] border-[#141B30] opacity-80'
              }`}
            >
              {isPinging && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse" />
              )}

              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0F1732] border border-[#212E52] flex items-center justify-center shadow-inner">
                      {getServiceIcon(item.iconName)}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white tracking-tight">{item.name}</h3>
                      <span className="text-[10px] text-slate-400 font-mono">{item.category}</span>
                    </div>
                  </div>

                  {/* Connect toggle switch */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.connected}
                      onChange={() => onToggleIntegration(item.id)}
                      className="sr-only peer"
                    />
                    <div className="w-8 h-4.5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-cyan-500 shadow-[0_0_6px_rgba(34,211,238,0.4)]"></div>
                  </label>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  {item.description}
                </p>
              </div>

              {/* Status and ping action */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.connected ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]' : 'bg-slate-600'
                    }`}
                  />
                  <span className="text-[10px] text-slate-400">
                    {item.connected ? `${item.latencyMs}ms Latency` : 'Standby'}
                  </span>
                </div>

                {item.connected && (
                  <button
                    onClick={() => handlePing(item.id)}
                    disabled={isPinging}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] border transition-all ${
                      isPinging
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-[#0E152D] border-[#1E2B4E] text-slate-300 hover:text-white hover:border-cyan-500/50'
                    }`}
                  >
                    <Radio className={`w-3 h-3 ${isPinging ? 'animate-spin text-cyan-400' : 'text-cyan-400'}`} />
                    <span>{isPinging ? 'Pinging...' : 'Ping Test'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Custom Webhook Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-[#0A0F22] border border-[#233157] p-5 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-cyan-400" />
              Register Inbound Webhook
            </h3>

            <div className="space-y-2 text-xs">
              <label className="block text-slate-300 font-medium">Connector Name</label>
              <input
                type="text"
                placeholder="e.g., Shopify Order Stream"
                value={customHookName}
                onChange={(e) => setCustomHookName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#060814] border border-[#1C2746] text-white focus:outline-none focus:border-cyan-400 font-mono text-xs"
              />

              <div className="p-2.5 rounded-xl bg-[#060914] border border-white/5 text-[11px] text-slate-400 space-y-1">
                <p>Auto-generated Endpoint:</p>
                <code className="text-cyan-300 font-mono text-[10px] break-all">
                  https://api.synapse.network/v1/hook/{customHookName ? customHookName.toLowerCase().replace(/\s+/g, '-') : 'custom-endpoint'}
                </code>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Created webhook: ${customHookName || 'New Webhook'}`);
                  setShowAddModal(false);
                  setCustomHookName('');
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_10px_rgba(34,211,238,0.3)]"
              >
                Activate Hook
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
