export type ScreenId =
  | 'dashboard'
  | 'studio'
  | 'analytics'
  | 'integrations'
  | 'templates'
  | 'settings';

export type ViewMode = 'mobile' | 'desktop' | 'overview';

export type NodeType = 'trigger' | 'filter' | 'ai' | 'action' | 'webhook';

export interface FlowNode {
  id: string;
  type: NodeType;
  title: string;
  subtitle: string;
  iconName: string;
  status: 'active' | 'idle' | 'running' | 'error';
  color: 'cyan' | 'blue' | 'indigo' | 'purple';
  config: Record<string, any>;
  lastExecutionMs?: number;
}

export interface PipelineFlow {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'automation' | 'devops' | 'smart_home' | 'ai' | 'finance';
  nodes: FlowNode[];
  triggersToday: number;
  avgLatencyMs: number;
  successRate: number;
  lastTriggered: string;
}

export interface TelemetryLog {
  id: string;
  timestamp: string;
  flowName: string;
  step: string;
  status: 'success' | 'warning' | 'error' | 'running';
  durationMs: number;
  payloadPreview: string;
}

export interface IntegrationService {
  id: string;
  name: string;
  description: string;
  category: string;
  iconName: string;
  connected: boolean;
  latencyMs: number;
  activeEventsCount: number;
  color: string;
}

export interface FlowTemplate {
  id: string;
  title: string;
  description: string;
  category: 'AI & Data' | 'DevOps' | 'IoT & Smart' | 'Productivity';
  badge: string;
  estimatedSetupMin: number;
  popularity: number;
  nodesCount: number;
  flowData: Partial<PipelineFlow>;
}

export interface SystemMetrics {
  activeFlowsCount: number;
  totalSignalsRouted: number;
  averageLatencyMs: number;
  uptimePercent: number;
  errorRatePercent: number;
  throughputHistory: { time: string; value: number; latency: number }[];
}
