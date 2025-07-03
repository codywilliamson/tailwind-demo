// Dashboard data types and interfaces
export interface Deployment {
  id: string;
  name: string;
  environment: 'production' | 'staging' | 'development';
  status: 'success' | 'running' | 'failed' | 'pending';
  timestamp: string;
  author: string;
  version?: string;
  duration?: number;
  commit?: string;
}

export interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  threshold: number;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

export interface AlertItem {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  resolved: boolean;
  source: string;
}

export interface ServiceStatus {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'degraded';
  uptime: number;
  responseTime: number;
  errorRate: number;
  instances: number;
}

export interface ChartDataPoint {
  timestamp: string;
  value: number;
  label?: string;
}

export interface DashboardStats {
  totalServices: number;
  deploymentsToday: number;
  failedBuilds: number;
  uptime: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'developer' | 'viewer';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'deployment' | 'alert' | 'system' | 'security';
  read: boolean;
  timestamp: string;
  action?: {
    label: string;
    url: string;
  };
}