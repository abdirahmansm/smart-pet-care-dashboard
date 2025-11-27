import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationBar from '../../components/ui/NavigationBar';
import AlertBadgeIndicator from '../../components/ui/AlertBadgeIndicator';
import PetSelector from '../../components/ui/PetSelector';
import AlertSummaryCard from './components/AlertSummaryCard';
import AlertCard from './components/AlertCard';
import ThresholdConfigCard from './components/ThresholdConfigCard';
import AlertAnalyticsChart from './components/AlertAnalyticsChart';
import FilterBar from './components/FilterBar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AlertManagementCenter = () => {
  const [filters, setFilters] = useState({
    severity: 'all',
    category: 'all',
    status: 'all',
    timeRange: '24h'
  });

  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [alerts, setAlerts] = useState([
  {
    id: 1,
    title: "Critical Heart Rate Spike Detected",
    message: "Max\'s heart rate exceeded 180 BPM during rest period. Immediate attention recommended.",
    severity: "critical",
    category: "Health",
    categoryIcon: "Activity",
    petName: "Max",
    petAvatar: "https://images.unsplash.com/photo-1426362117531-33ffe6437ac8",
    petAvatarAlt: "Golden Retriever dog with golden fur sitting outdoors in natural sunlight",
    deviceName: "Health Monitor Pro",
    timestamp: new Date(Date.now() - 300000),
    acknowledged: false,
    resolved: false,
    recommendedActions: [
    "Check pet\'s current activity level and environment",
    "Verify sensor placement and connection",
    "Contact veterinarian if symptoms persist beyond 15 minutes",
    "Review recent activity logs for unusual patterns"],

    additionalInfo: "Heart rate spike occurred at 7:45 PM during scheduled rest time. Previous baseline: 85 BPM. Current reading: 182 BPM."
  },
  {
    id: 2,
    title: "Low Food Level Warning",
    message: "Luna\'s automatic feeder has less than 20% food remaining. Refill recommended within 24 hours.",
    severity: "warning",
    category: "Feeding",
    categoryIcon: "UtensilsCrossed",
    petName: "Luna",
    petAvatar: "https://images.unsplash.com/photo-1612801143784-84b527938e53",
    petAvatarAlt: "White Persian cat with fluffy fur and blue eyes looking directly at camera",
    deviceName: "Smart Feeder X200",
    timestamp: new Date(Date.now() - 1800000),
    acknowledged: true,
    resolved: false,
    recommendedActions: [
    "Schedule food refill within next 24 hours",
    "Check feeder mechanism for blockages",
    "Verify portion sizes are appropriate",
    "Consider setting up auto-delivery subscription"],

    additionalInfo: "Current food level: 18%. Estimated time until empty: 36 hours based on current consumption rate."
  },
  {
    id: 3,
    title: "Temperature Outside Comfort Zone",
    message: "Charlie\'s environment temperature dropped to 62°F. Optimal range is 68-75°F.",
    severity: "warning",
    category: "Environment",
    categoryIcon: "Thermometer",
    petName: "Charlie",
    petAvatar: "https://images.unsplash.com/photo-1709313672361-9a6c1fdc25e3",
    petAvatarAlt: "Beagle dog with brown and white coat sitting on grass outdoors",
    deviceName: "Climate Sensor",
    timestamp: new Date(Date.now() - 3600000),
    acknowledged: true,
    resolved: false,
    recommendedActions: [
    "Adjust thermostat to maintain 68-75°F range",
    "Check for drafts near pet\'s resting area",
    "Provide additional bedding for warmth",
    "Monitor pet for signs of discomfort"],

    additionalInfo: "Temperature has been below optimal range for 45 minutes. Humidity level is within normal parameters at 45%."
  },
  {
    id: 4,
    title: "Feeding Schedule Completed Successfully",
    message: "Bella consumed 100% of scheduled meal at 6:00 PM. Feeding pattern remains consistent.",
    severity: "info",
    category: "Feeding",
    categoryIcon: "UtensilsCrossed",
    petName: "Bella",
    petAvatar: "https://images.unsplash.com/photo-1709107349695-8ade0be90d8a",
    petAvatarAlt: "Siamese cat with cream colored fur and dark brown points sitting elegantly",
    deviceName: "Smart Feeder X200",
    timestamp: new Date(Date.now() - 7200000),
    acknowledged: true,
    resolved: true,
    recommendedActions: [
    "Continue current feeding schedule",
    "Monitor weight trends weekly",
    "Maintain current portion sizes"],

    additionalInfo: "Meal consumed in 8 minutes. Average consumption time: 7.5 minutes. Weight stable at 9.2 lbs."
  },
  {
    id: 5,
    title: "Device Connection Lost",
    message: "Max\'s activity tracker lost connection. Last data received 15 minutes ago.",
    severity: "warning",
    category: "Device",
    categoryIcon: "Wifi",
    petName: "Max",
    petAvatar: "https://images.unsplash.com/photo-1426362117531-33ffe6437ac8",
    petAvatarAlt: "Golden Retriever dog with golden fur sitting outdoors in natural sunlight",
    deviceName: "Activity Tracker",
    timestamp: new Date(Date.now() - 900000),
    acknowledged: false,
    resolved: false,
    recommendedActions: [
    "Check device battery level",
    "Verify WiFi connection strength",
    "Restart device if connection persists",
    "Check for firmware updates"],

    additionalInfo: "Device was last online at 7:30 PM. Battery level before disconnect: 45%. Signal strength: Good."
  },
  {
    id: 6,
    title: "Unusual Activity Pattern Detected",
    message: "Luna\'s activity level is 40% below normal baseline for this time of day.",
    severity: "warning",
    category: "Health",
    categoryIcon: "Activity",
    petName: "Luna",
    petAvatar: "https://images.unsplash.com/photo-1612801143784-84b527938e53",
    petAvatarAlt: "White Persian cat with fluffy fur and blue eyes looking directly at camera",
    deviceName: "Activity Tracker",
    timestamp: new Date(Date.now() - 5400000),
    acknowledged: true,
    resolved: false,
    recommendedActions: [
    "Observe pet for signs of illness or discomfort",
    "Check for environmental stressors",
    "Monitor eating and drinking habits",
    "Schedule vet checkup if pattern continues"],

    additionalInfo: "Normal activity baseline: 450 steps/hour. Current activity: 270 steps/hour. Pattern observed for 90 minutes."
  }]
  );

  const [summaryStats, setSummaryStats] = useState({
    health: { count: 2, trend: 'up', trendValue: 15 },
    feeding: { count: 2, trend: 'down', trendValue: 8 },
    environment: { count: 1, trend: 'up', trendValue: 5 },
    device: { count: 1, trend: 'down', trendValue: 12 }
  });

  const [thresholdConfigs, setThresholdConfigs] = useState([
  {
    id: 1,
    name: "Heart Rate",
    description: "Monitor heart rate thresholds",
    icon: "Activity",
    minValue: 60,
    maxValue: 120,
    unit: "BPM",
    enabled: true,
    notifyEmail: true,
    notifySMS: true,
    notifyPush: true
  },
  {
    id: 2,
    name: "Temperature",
    description: "Environmental temperature range",
    icon: "Thermometer",
    minValue: 68,
    maxValue: 75,
    unit: "°F",
    enabled: true,
    notifyEmail: true,
    notifySMS: false,
    notifyPush: true
  },
  {
    id: 3,
    name: "Food Level",
    description: "Automatic feeder capacity",
    icon: "UtensilsCrossed",
    minValue: 20,
    maxValue: 100,
    unit: "%",
    enabled: true,
    notifyEmail: false,
    notifySMS: false,
    notifyPush: true
  },
  {
    id: 4,
    name: "Activity Level",
    description: "Daily activity threshold",
    icon: "TrendingUp",
    minValue: 300,
    maxValue: 600,
    unit: "steps/hr",
    enabled: true,
    notifyEmail: true,
    notifySMS: false,
    notifyPush: true
  }]
  );

  const resolutionTrendData = [
  { name: 'Mon', alerts: 12, resolved: 10 },
  { name: 'Tue', alerts: 15, resolved: 13 },
  { name: 'Wed', alerts: 8, resolved: 8 },
  { name: 'Thu', alerts: 18, resolved: 15 },
  { name: 'Fri', alerts: 10, resolved: 9 },
  { name: 'Sat', alerts: 14, resolved: 12 },
  { name: 'Sun', alerts: 9, resolved: 8 }];


  const alertFrequencyData = [
  { name: '00:00', count: 2 },
  { name: '04:00', count: 1 },
  { name: '08:00', count: 5 },
  { name: '12:00', count: 8 },
  { name: '16:00', count: 6 },
  { name: '20:00', count: 4 },
  { name: '23:59', count: 3 }];


  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleAcknowledge = (alertId) => {
    setAlerts((prev) => prev?.map((alert) =>
    alert?.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleResolve = (alertId) => {
    setAlerts((prev) => prev?.map((alert) =>
    alert?.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const handleBulkAction = (action) => {
    if (action === 'acknowledge') {
      setAlerts((prev) => prev?.map((alert) =>
      selectedAlerts?.includes(alert?.id) ? { ...alert, acknowledged: true } : alert
      ));
    } else if (action === 'resolve') {
      setAlerts((prev) => prev?.map((alert) =>
      selectedAlerts?.includes(alert?.id) ? { ...alert, resolved: true } : alert
      ));
    }
    setSelectedAlerts([]);
  };

  const handleThresholdSave = (configId, newData) => {
    setThresholdConfigs((prev) => prev?.map((config) =>
    config?.id === configId ? { ...config, ...newData } : config
    ));
  };

  const handleExportReport = () => {
    // Move filteredAlerts calculation before using it
    const filtered = alerts?.filter((alert) => {
      if (filters?.severity !== 'all' && alert?.severity !== filters?.severity) return false;
      if (filters?.category !== 'all' && alert?.category?.toLowerCase() !== filters?.category) return false;
      if (filters?.status !== 'all') {
        if (filters?.status === 'active' && (alert?.acknowledged || alert?.resolved)) return false;
        if (filters?.status === 'acknowledged' && (!alert?.acknowledged || alert?.resolved)) return false;
        if (filters?.status === 'resolved' && !alert?.resolved) return false;
      }
      return true;
    });

    const reportData = {
      generatedAt: new Date()?.toISOString(),
      filters,
      totalAlerts: filtered?.length,
      criticalAlerts: filtered?.filter((a) => a?.severity === 'critical')?.length,
      resolvedAlerts: filtered?.filter((a) => a?.resolved)?.length,
      alerts: filtered
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `alert-report-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredAlerts = alerts?.filter((alert) => {
    if (filters?.severity !== 'all' && alert?.severity !== filters?.severity) return false;
    if (filters?.category !== 'all' && alert?.category?.toLowerCase() !== filters?.category) return false;
    if (filters?.status !== 'all') {
      if (filters?.status === 'active' && (alert?.acknowledged || alert?.resolved)) return false;
      if (filters?.status === 'acknowledged' && (!alert?.acknowledged || alert?.resolved)) return false;
      if (filters?.status === 'resolved' && !alert?.resolved) return false;
    }
    return true;
  });

  const criticalAlerts = filteredAlerts?.filter((a) => a?.severity === 'critical' && !a?.resolved);
  const activeAlerts = filteredAlerts?.filter((a) => !a?.resolved);

  return (
    <>
      <Helmet>
        <title>Alert Management Center - Smart Pet Care Dashboard</title>
        <meta name="description" content="Centralized alert management system for pet care monitoring with real-time notifications, threshold configuration, and alert analytics" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <NavigationBar />
        
        <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
          <PetSelector />
          <AlertBadgeIndicator />
        </div>

        <main className="main-content max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-foreground">Alert Management Center</h1>
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={handleExportReport}>

                Export Report
              </Button>
            </div>
            <p className="text-muted-foreground">
              Monitor and manage all pet care alerts with real-time notifications and threshold configuration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <AlertSummaryCard
              title="Health Alerts"
              count={summaryStats?.health?.count}
              trend={summaryStats?.health?.trend}
              trendValue={summaryStats?.health?.trendValue}
              icon="Activity"
              severity="critical"
              onClick={() => handleFilterChange('category', 'health')} />

            <AlertSummaryCard
              title="Feeding Alerts"
              count={summaryStats?.feeding?.count}
              trend={summaryStats?.feeding?.trend}
              trendValue={summaryStats?.feeding?.trendValue}
              icon="UtensilsCrossed"
              severity="warning"
              onClick={() => handleFilterChange('category', 'feeding')} />

            <AlertSummaryCard
              title="Environment Alerts"
              count={summaryStats?.environment?.count}
              trend={summaryStats?.environment?.trend}
              trendValue={summaryStats?.environment?.trendValue}
              icon="Thermometer"
              severity="warning"
              onClick={() => handleFilterChange('category', 'environment')} />

            <AlertSummaryCard
              title="Device Alerts"
              count={summaryStats?.device?.count}
              trend={summaryStats?.device?.trend}
              trendValue={summaryStats?.device?.trendValue}
              icon="Wifi"
              severity="info"
              onClick={() => handleFilterChange('category', 'device')} />

          </div>

          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onBulkAction={handleBulkAction}
            selectedCount={selectedAlerts?.length} />


          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-border p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Active Alerts</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {activeAlerts?.length} active
                    </span>
                    {criticalAlerts?.length > 0 &&
                    <span className="px-2 py-1 rounded bg-error text-error-foreground text-xs font-medium">
                        {criticalAlerts?.length} critical
                      </span>
                    }
                  </div>
                </div>

                {filteredAlerts?.length === 0 ?
                <div className="text-center py-12">
                    <Icon name="CheckCircle2" size={48} color="var(--color-success)" className="mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No Alerts Found</h3>
                    <p className="text-muted-foreground">
                      All systems are operating normally. Adjust filters to view resolved alerts.
                    </p>
                  </div> :

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    {filteredAlerts?.map((alert) =>
                  <AlertCard
                    key={alert?.id}
                    alert={alert}
                    onAcknowledge={handleAcknowledge}
                    onResolve={handleResolve}
                    onExpand={() => {}} />

                  )}
                  </div>
                }
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-6 mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Threshold Configuration</h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {thresholdConfigs?.map((config) =>
                  <ThresholdConfigCard
                    key={config?.id}
                    config={config}
                    onSave={handleThresholdSave} />

                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <AlertAnalyticsChart
              title="Alert Resolution Trends"
              data={resolutionTrendData}
              type="line"
              dataKey="resolved"
              color="var(--color-success)" />

            <AlertAnalyticsChart
              title="Alert Frequency by Time"
              data={alertFrequencyData}
              type="bar"
              dataKey="count"
              color="var(--color-primary)" />

          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">System Performance Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">94.2%</div>
                <p className="text-sm text-muted-foreground">Resolution Rate</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-success">
                  <Icon name="TrendingUp" size={16} />
                  <span className="text-xs font-medium">+3.5%</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">12 min</div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-success">
                  <Icon name="TrendingDown" size={16} />
                  <span className="text-xs font-medium">-2 min</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground mb-1">99.8%</div>
                <p className="text-sm text-muted-foreground">System Uptime</p>
                <div className="flex items-center justify-center gap-1 mt-2 text-success">
                  <Icon name="CheckCircle2" size={16} />
                  <span className="text-xs font-medium">Excellent</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>);

};

export default AlertManagementCenter;