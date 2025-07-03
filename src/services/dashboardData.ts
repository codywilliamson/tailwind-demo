import type { 
  Deployment, 
  SystemMetric, 
  AlertItem, 
  ServiceStatus, 
  ChartDataPoint, 
  DashboardStats, 
  User, 
  Notification 
} from '../types/dashboard';

// Mock data generators
class DashboardDataService {
  private static instance: DashboardDataService;
  private subscribers: Map<string, ((data: any) => void)[]> = new Map();
  
  static getInstance(): DashboardDataService {
    if (!DashboardDataService.instance) {
      DashboardDataService.instance = new DashboardDataService();
    }
    return DashboardDataService.instance;
  }

  // Generate mock deployments
  generateDeployments(): Deployment[] {
    const services = ['api-gateway', 'user-service', 'payment-service', 'notification-service', 'auth-service', 'logging-service', 'monitoring-service'];
    const environments: ('production' | 'staging' | 'development')[] = ['production', 'staging', 'development'];
    const statuses: ('success' | 'running' | 'failed' | 'pending')[] = ['success', 'running', 'failed', 'pending'];
    const authors = ['John Smith', 'Alice Cooper', 'Bob Johnson', 'Sarah Davis', 'Mike Wilson', 'Emma Rodriguez', 'Tom Chen'];
    
    return Array.from({ length: 15 }, (_, i) => ({
      id: `dep-${String(i + 1).padStart(3, '0')}`,
      name: services[Math.floor(Math.random() * services.length)],
      environment: environments[Math.floor(Math.random() * environments.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      author: authors[Math.floor(Math.random() * authors.length)],
      version: `v${Math.floor(Math.random() * 10) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
      duration: Math.floor(Math.random() * 300) + 30, // 30-330 seconds
      commit: Math.random().toString(36).substring(2, 9)
    }));
  }

  // Generate system metrics
  generateSystemMetrics(): SystemMetric[] {
    return [
      {
        name: 'CPU Usage',
        value: Math.floor(Math.random() * 100),
        unit: '%',
        threshold: 80,
        status: Math.random() > 0.7 ? 'critical' : Math.random() > 0.4 ? 'warning' : 'healthy',
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable'
      },
      {
        name: 'Memory Usage',
        value: Math.floor(Math.random() * 100),
        unit: '%',
        threshold: 85,
        status: Math.random() > 0.8 ? 'critical' : Math.random() > 0.5 ? 'warning' : 'healthy',
        trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.3 ? 'down' : 'stable'
      },
      {
        name: 'Disk Space',
        value: Math.floor(Math.random() * 100),
        unit: '%',
        threshold: 90,
        status: Math.random() > 0.75 ? 'critical' : Math.random() > 0.4 ? 'warning' : 'healthy',
        trend: Math.random() > 0.6 ? 'up' : 'stable'
      },
      {
        name: 'Network I/O',
        value: Math.floor(Math.random() * 1000),
        unit: 'MB/s',
        threshold: 800,
        status: 'healthy',
        trend: Math.random() > 0.5 ? 'up' : 'down'
      }
    ];
  }

  // Generate alerts
  generateAlerts(): AlertItem[] {
    const alertTypes = [
      { title: 'High CPU Usage', message: 'CPU usage has exceeded 85% for the last 5 minutes', severity: 'warning' as const, source: 'system' },
      { title: 'Deployment Failed', message: 'Payment service deployment failed due to test failures', severity: 'error' as const, source: 'deployment' },
      { title: 'New Version Available', message: 'A new version of the monitoring agent is available', severity: 'info' as const, source: 'update' },
      { title: 'Security Patch Applied', message: 'Critical security patch has been successfully applied', severity: 'success' as const, source: 'security' },
      { title: 'Database Connection Issues', message: 'Intermittent connection issues detected with primary database', severity: 'warning' as const, source: 'database' }
    ];

    return Array.from({ length: 8 }, (_, i) => {
      const alert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      return {
        id: `alert-${i + 1}`,
        title: alert.title,
        message: alert.message,
        severity: alert.severity,
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        resolved: Math.random() > 0.6,
        source: alert.source
      };
    });
  }

  // Generate service statuses
  generateServiceStatuses(): ServiceStatus[] {
    const services = ['API Gateway', 'User Service', 'Payment Service', 'Notification Service', 'Auth Service', 'Logging Service'];
    const statuses: ('online' | 'offline' | 'degraded')[] = ['online', 'offline', 'degraded'];
    
    return services.map((service, i) => ({
      id: `service-${i + 1}`,
      name: service,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      uptime: Math.random() * 100,
      responseTime: Math.floor(Math.random() * 500) + 50,
      errorRate: Math.random() * 5,
      instances: Math.floor(Math.random() * 10) + 1
    }));
  }

  // Generate chart data
  generateChartData(points: number = 7): ChartDataPoint[] {
    const now = new Date();
    return Array.from({ length: points }, (_, i) => {
      const date = new Date(now.getTime() - (points - 1 - i) * 24 * 60 * 60 * 1000);
      return {
        timestamp: date.toISOString(),
        value: Math.floor(Math.random() * 60) + 10,
        label: date.toLocaleDateString('en-US', { weekday: 'short' })
      };
    });
  }

  // Generate dashboard stats
  generateDashboardStats(): DashboardStats {
    return {
      totalServices: 24 + Math.floor(Math.random() * 6),
      deploymentsToday: 12 + Math.floor(Math.random() * 8),
      failedBuilds: Math.floor(Math.random() * 5),
      uptime: 99.8 + Math.random() * 0.19
    };
  }

  // Generate notifications
  generateNotifications(): Notification[] {
    const notifications = [
      { title: 'Deployment Complete', message: 'API Gateway v2.1.0 deployed successfully', type: 'deployment' as const },
      { title: 'System Alert', message: 'High memory usage detected on server-03', type: 'alert' as const },
      { title: 'Security Update', message: 'Security patch applied to all production servers', type: 'security' as const },
      { title: 'Maintenance Window', message: 'Scheduled maintenance will begin in 2 hours', type: 'system' as const }
    ];

    return Array.from({ length: 12 }, (_, i) => {
      const notif = notifications[Math.floor(Math.random() * notifications.length)];
      return {
        id: `notif-${i + 1}`,
        title: notif.title,
        message: notif.message,
        type: notif.type,
        read: Math.random() > 0.6,
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
        action: Math.random() > 0.7 ? { label: 'View Details', url: '#' } : undefined
      };
    });
  }

  // Real-time data simulation
  subscribe(event: string, callback: (data: any) => void) {
    if (!this.subscribers.has(event)) {
      this.subscribers.set(event, []);
    }
    this.subscribers.get(event)!.push(callback);
  }

  unsubscribe(event: string, callback: (data: any) => void) {
    const callbacks = this.subscribers.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any) {
    const callbacks = this.subscribers.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  // Start real-time updates
  startRealTimeUpdates() {
    // Update stats every 30 seconds
    setInterval(() => {
      this.emit('stats-update', this.generateDashboardStats());
    }, 30000);

    // Update metrics every 5 seconds
    setInterval(() => {
      this.emit('metrics-update', this.generateSystemMetrics());
    }, 5000);

    // Add new deployment occasionally
    setInterval(() => {
      if (Math.random() > 0.7) {
        const newDeployment = this.generateDeployments()[0];
        this.emit('new-deployment', newDeployment);
      }
    }, 60000);

    // Update chart data every minute
    setInterval(() => {
      this.emit('chart-update', this.generateChartData());
    }, 60000);
  }
}

export const dashboardService = DashboardDataService.getInstance();