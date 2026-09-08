/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ScreenId,
  ViewMode,
  PipelineFlow,
  TelemetryLog,
  SystemMetrics,
  IntegrationService,
  FlowTemplate,
} from './types';
import {
  INITIAL_FLOWS,
  INITIAL_LOGS,
  INITIAL_METRICS,
  INTEGRATIONS_LIST,
  TEMPLATES_LIST,
} from './data/mockData';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { MobileFrame } from './components/MobileFrame';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { PipelineStudioScreen } from './components/screens/PipelineStudioScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { IntegrationsScreen } from './components/screens/IntegrationsScreen';
import { TemplatesScreen } from './components/screens/TemplatesScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { AllScreensOverview } from './components/screens/AllScreensOverview';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [viewMode, setViewMode] = useState<ViewMode>('mobile');
  const [flows, setFlows] = useState<PipelineFlow[]>(INITIAL_FLOWS);
  const [logs, setLogs] = useState<TelemetryLog[]>(INITIAL_LOGS);
  const [metrics, setMetrics] = useState<SystemMetrics>(INITIAL_METRICS);
  const [integrations, setIntegrations] = useState<IntegrationService[]>(INTEGRATIONS_LIST);
  const [selectedFlowId, setSelectedFlowId] = useState<string>(INITIAL_FLOWS[0].id);
  const [isSimulating, setIsSimulating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleFlow = (flowId: string) => {
    setFlows((prev) =>
      prev.map((f) => {
        if (f.id === flowId) {
          const nextState = !f.enabled;
          showToast(`Flow "${f.name.split(' ')[0]}" ${nextState ? 'Activated' : 'Paused'}`);
          return { ...f, enabled: nextState };
        }
        return f;
      })
    );
  };

  const handleRunFlow = (flowId: string) => {
    const flow = flows.find((f) => f.id === flowId);
    if (!flow) return;

    setIsSimulating(true);

    setTimeout(() => {
      setIsSimulating(false);
      const newLog: TelemetryLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toTimeString().slice(0, 8),
        flowName: flow.name.split(' ')[0] + ' ' + (flow.name.split(' ')[1] || ''),
        step: flow.nodes[flow.nodes.length - 1]?.title || 'Dispatched',
        status: 'success',
        durationMs: Math.floor(Math.random() * 20) + 8,
        payloadPreview: JSON.stringify({
          status: 'SUCCESS',
          event: 'SIGNAL_PULSE',
          latencyMs: flow.avgLatencyMs,
        }),
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 19)]);
      setMetrics((prev) => ({
        ...prev,
        totalSignalsRouted: prev.totalSignalsRouted + 1,
      }));
      setFlows((prev) =>
        prev.map((f) => (f.id === flowId ? { ...f, triggersToday: f.triggersToday + 1 } : f))
      );
      showToast(`Signal emitted successfully through ${flow.nodes.length} nodes!`);
    }, 1200);
  };

  const handleTriggerSignal = () => {
    handleRunFlow(selectedFlowId);
  };

  const handleToggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const next = !item.connected;
          showToast(`${item.name} ${next ? 'Connected' : 'Disconnected'}`);
          return { ...item, connected: next };
        }
        return item;
      })
    );
  };

  const handlePingIntegration = (id: string) => {
    setTimeout(() => {
      const pingVal = Math.floor(Math.random() * 16) + 4;
      setIntegrations((prev) =>
        prev.map((item) => (item.id === id ? { ...item, latencyMs: pingVal } : item))
      );
      showToast(`Pinged endpoint: ${pingVal}ms roundtrip`);
    }, 600);
  };

  const handleInstallTemplate = (tpl: FlowTemplate) => {
    const newFlow: PipelineFlow = {
      id: `flow-${Date.now()}`,
      name: tpl.title,
      description: tpl.description,
      enabled: true,
      category: tpl.flowData.category || 'automation',
      triggersToday: 1,
      avgLatencyMs: Math.floor(Math.random() * 15) + 10,
      successRate: 100,
      lastTriggered: 'Just now',
      nodes: [
        {
          id: `node-${Date.now()}-1`,
          type: 'webhook',
          title: 'Input Ingest Trigger',
          subtitle: 'HTTP webhook payload listener',
          iconName: 'Webhook',
          status: 'active',
          color: 'cyan',
          config: { endpoint: '/api/v1/auto' },
        },
        {
          id: `node-${Date.now()}-2`,
          type: 'ai',
          title: 'Gemini Neural Filter',
          subtitle: 'Payload categorization & schema check',
          iconName: 'Sparkles',
          status: 'active',
          color: 'indigo',
          config: { model: 'gemini-2.5-flash', temp: 0.1 },
        },
        {
          id: `node-${Date.now()}-3`,
          type: 'action',
          title: 'Destination Dispatch',
          subtitle: 'Webhook push & notification',
          iconName: 'Send',
          status: 'active',
          color: 'purple',
          config: { channel: 'primary' },
        },
      ],
    };

    setFlows((prev) => [newFlow, ...prev]);
    setSelectedFlowId(newFlow.id);
    showToast(`Blueprint "${tpl.title}" deployed!`);
  };

  const handleResetDefaults = () => {
    setFlows(INITIAL_FLOWS);
    setLogs(INITIAL_LOGS);
    setMetrics(INITIAL_METRICS);
    setIntegrations(INTEGRATIONS_LIST);
    setSelectedFlowId(INITIAL_FLOWS[0].id);
    showToast('Reset all data to default demonstration state.');
  };

  const renderCurrentScreen = (screenId: ScreenId = currentScreen) => {
    switch (screenId) {
      case 'dashboard':
        return (
          <DashboardScreen
            flows={flows}
            logs={logs}
            metrics={metrics}
            onToggleFlow={handleToggleFlow}
            onRunFlow={handleRunFlow}
            onNavigate={(screen) => setCurrentScreen(screen)}
            isSimulating={isSimulating}
          />
        );
      case 'studio':
        return (
          <PipelineStudioScreen
            flows={flows}
            selectedFlowId={selectedFlowId}
            onSelectFlow={setSelectedFlowId}
            onTriggerSignal={handleTriggerSignal}
            isSimulating={isSimulating}
          />
        );
      case 'analytics':
        return <AnalyticsScreen metrics={metrics} flows={flows} />;
      case 'integrations':
        return (
          <IntegrationsScreen
            integrations={integrations}
            onToggleIntegration={handleToggleIntegration}
            onPingIntegration={handlePingIntegration}
          />
        );
      case 'templates':
        return (
          <TemplatesScreen
            templates={TEMPLATES_LIST}
            onInstallTemplate={handleInstallTemplate}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            flows={flows}
            onResetDefaults={handleResetDefaults}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#060913] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Global Header */}
      <Header
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        currentScreen={currentScreen}
        onTriggerSignal={handleTriggerSignal}
        isSimulating={isSimulating}
      />

      {/* Floating Toast notification */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-[#0F1732] border border-cyan-500/50 text-cyan-200 text-xs font-semibold shadow-[0_0_20px_rgba(34,211,238,0.35)] animate-bounce flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Body Viewports */}
      {viewMode === 'overview' ? (
        <AllScreensOverview
          onSelectScreen={(screen) => {
            setCurrentScreen(screen);
            setViewMode('mobile');
          }}
          renderScreenContent={renderCurrentScreen}
        />
      ) : viewMode === 'mobile' ? (
        <main className="flex-1 flex items-center justify-center p-2 sm:p-4">
          <MobileFrame>
            {renderCurrentScreen()}
            <Navigation
              currentScreen={currentScreen}
              onScreenChange={setCurrentScreen}
              activeFlowsCount={flows.filter((f) => f.enabled).length}
            />
          </MobileFrame>
        </main>
      ) : (
        /* Full Desktop Screen View */
        <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto p-4 sm:p-6 overflow-hidden">
          {/* Desktop Tab Strip */}
          <div className="mb-4">
            <Navigation
              currentScreen={currentScreen}
              onScreenChange={setCurrentScreen}
              activeFlowsCount={flows.filter((f) => f.enabled).length}
            />
          </div>

          <div className="flex-1 flex flex-col rounded-2xl border border-[#1A2544] bg-[#070B17] overflow-hidden shadow-2xl min-h-[680px]">
            {renderCurrentScreen()}
          </div>
        </main>
      )}
    </div>
  );
}
