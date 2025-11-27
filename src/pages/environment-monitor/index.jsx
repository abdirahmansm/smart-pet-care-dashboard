import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationBar from '../../components/ui/NavigationBar';
import AlertBadgeIndicator from '../../components/ui/AlertBadgeIndicator';
import PetSelector from '../../components/ui/PetSelector';
import Icon from '../../components/common/AppIcon';
import Button from '../../components/common/Button';
import Select from '../../components/ui/Select';
import EnvironmentMetricCard from './components/EnvironmentMetricCard';
import EnvironmentTrendChart from './components/EnvironmentTrendChart';
import EnvironmentAlertPanel from './components/EnvironmentAlertPanel';
import OptimalConditionsCard from './components/OptimalConditionsCard';
import CorrelationMatrix from './components/CorrelationMatrix';
import HistoricalComfortAnalysis from './components/HistoricalComfortAnalysis';

const EnvironmentMonitor = () => {
  const [selectedLocation, setSelectedLocation] = useState('living-room');
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [alerts, setAlerts] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const locationOptions = [
    { value: 'living-room', label: 'Living Room' },
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'backyard', label: 'Backyard' }
  ];

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '12h', label: 'Last 12 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' }
  ];

  const environmentMetrics = [
    {
      title: 'Temperature',
      value: 72.5,
      unit: '°F',
      icon: 'Thermometer',
      iconColor: 'var(--color-error)',
      range: { min: 68, max: 78 },
      status: 'optimal',
      trendData: [70, 71, 72, 71.5, 72, 72.5, 73, 72.5, 72, 71.8, 72.2, 72.5],
      changePercent: 2.1
    },
    {
      title: 'Humidity',
      value: 48,
      unit: '%',
      icon: 'Droplets',
      iconColor: 'var(--color-primary)',
      range: { min: 40, max: 60 },
      status: 'optimal',
      trendData: [45, 46, 47, 48, 49, 48, 47, 48, 49, 48, 47, 48],
      changePercent: 3.5
    },
    {
      title: 'Air Quality',
      value: 92,
      unit: 'AQI',
      icon: 'Wind',
      iconColor: 'var(--color-success)',
      range: { min: 0, max: 100 },
      status: 'optimal',
      trendData: [88, 89, 90, 91, 92, 93, 92, 91, 92, 93, 92, 92],
      changePercent: 4.5
    },
    {
      title: 'Noise Level',
      value: 42,
      unit: 'dB',
      icon: 'Volume2',
      iconColor: 'var(--color-warning)',
      range: { min: 30, max: 50 },
      status: 'optimal',
      trendData: [40, 41, 42, 43, 42, 41, 42, 43, 42, 41, 42, 42],
      changePercent: 1.2
    },
    {
      title: 'Light Intensity',
      value: 450,
      unit: 'lux',
      icon: 'Sun',
      iconColor: 'var(--color-accent)',
      range: { min: 300, max: 500 },
      status: 'optimal',
      trendData: [420, 430, 440, 445, 450, 455, 450, 445, 450, 455, 450, 450],
      changePercent: 5.8
    },
    {
      title: 'Comfort Index',
      value: 85,
      unit: '%',
      icon: 'Heart',
      iconColor: 'var(--color-success)',
      range: { min: 70, max: 100 },
      status: 'optimal',
      trendData: [80, 81, 82, 83, 84, 85, 86, 85, 84, 85, 86, 85],
      changePercent: 6.2
    }
  ];

  const trendChartData = [
    { time: '00:00', temperature: 70, humidity: 45, activity: 20 },
    { time: '02:00', temperature: 69, humidity: 46, activity: 15 },
    { time: '04:00', temperature: 68, humidity: 47, activity: 10 },
    { time: '06:00', temperature: 69, humidity: 48, activity: 30 },
    { time: '08:00', temperature: 71, humidity: 47, activity: 60 },
    { time: '10:00', temperature: 72, humidity: 46, activity: 75 },
    { time: '12:00', temperature: 73, humidity: 45, activity: 80 },
    { time: '14:00', temperature: 74, humidity: 44, activity: 90 },
    { time: '16:00', temperature: 73, humidity: 45, activity: 85 },
    { time: '18:00', temperature: 72, humidity: 47, activity: 70 },
    { time: '20:00', temperature: 71, humidity: 48, activity: 50 },
    { time: '22:00', temperature: 70, humidity: 49, activity: 35 }
  ];

  const mockAlerts = [
    {
      id: 1,
      title: 'High Temperature Alert',
      message: 'Temperature exceeded optimal range in Living Room',
      severity: 'warning',
      location: 'Living Room',
      timestamp: new Date(Date.now() - 1800000),
      details: [
        'Current temperature: 78.5°F (Target: 68-78°F)',
        'Duration: 30 minutes',
        'Pet activity level increased by 15%'
      ],
      recommendation: 'Consider adjusting thermostat or opening windows to improve air circulation'
    },
    {
      id: 2,
      title: 'Low Humidity Detected',
      message: 'Humidity levels below recommended range',
      severity: 'info',
      location: 'Bedroom',
      timestamp: new Date(Date.now() - 3600000),
      details: [
        'Current humidity: 35% (Target: 40-60%)',
        'Duration: 1 hour',
        'May affect pet respiratory comfort'
      ],
      recommendation: 'Use humidifier to increase moisture levels in the room'
    }
  ];

  const recommendations = [
    {
      type: 'temperature',
      title: 'Optimize Temperature Settings',
      description: 'Current temperature is slightly above optimal range during peak afternoon hours',
      priority: 'medium',
      currentValue: '74°F',
      targetValue: '72°F',
      actions: [
        'Adjust thermostat to 72°F between 2 PM - 4 PM',
        'Ensure proper air circulation with ceiling fans',
        'Consider automated temperature scheduling'
      ]
    },
    {
      type: 'humidity',
      title: 'Maintain Humidity Balance',
      description: 'Humidity levels are optimal but require monitoring during seasonal changes',
      priority: 'low',
      currentValue: '48%',
      targetValue: '45-55%',
      actions: [
        'Monitor humidity during weather changes',
        'Keep humidifier ready for dry seasons',
        'Ensure proper ventilation in all rooms'
      ]
    },
    {
      type: 'airQuality',
      title: 'Excellent Air Quality',
      description: 'Air quality index is in optimal range, continue current practices',
      priority: 'low',
      currentValue: '92 AQI',
      targetValue: '85-100 AQI',
      actions: [
        'Maintain regular air filter replacement schedule',
        'Continue using air purifiers in main areas',
        'Keep windows open during favorable weather'
      ]
    }
  ];

  const correlationData = {
    columns: [
      { label: 'Activity', icon: 'Activity' },
      { label: 'Sleep', icon: 'Moon' },
      { label: 'Feeding', icon: 'UtensilsCrossed' },
      { label: 'Stress', icon: 'AlertCircle' }
    ],
    rows: [
      {
        label: 'Temperature',
        icon: 'Thermometer',
        values: [0.78, 0.65, 0.42, 0.58]
      },
      {
        label: 'Humidity',
        icon: 'Droplets',
        values: [0.52, 0.71, 0.38, 0.45]
      },
      {
        label: 'Air Quality',
        icon: 'Wind',
        values: [0.68, 0.82, 0.55, 0.72]
      },
      {
        label: 'Noise Level',
        icon: 'Volume2',
        values: [0.35, 0.88, 0.28, 0.91]
      },
      {
        label: 'Light',
        icon: 'Sun',
        values: [0.85, 0.92, 0.48, 0.38]
      }
    ]
  };

  const historicalData = [
    { period: 'Mon', score: 82, optimalHours: 18, alerts: 2 },
    { period: 'Tue', score: 85, optimalHours: 20, alerts: 1 },
    { period: 'Wed', score: 78, optimalHours: 16, alerts: 4 },
    { period: 'Thu', score: 88, optimalHours: 21, alerts: 1 },
    { period: 'Fri', score: 86, optimalHours: 19, alerts: 2 },
    { period: 'Sat', score: 90, optimalHours: 22, alerts: 0 },
    { period: 'Sun', score: 87, optimalHours: 20, alerts: 1 }
  ];

  useEffect(() => {
    setAlerts(mockAlerts);

    const updateInterval = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000);

    return () => clearInterval(updateInterval);
  }, []);

  const handleDismissAlert = (alertId) => {
    setAlerts(alerts?.filter(alert => alert?.id !== alertId));
  };

  const handleConfigureAlerts = () => {
    console.log('Configure alerts clicked');
  };

  const handleExportReport = () => {
    console.log('Export report clicked');
  };

  const formatLastUpdate = () => {
    const now = new Date();
    const diffMs = now - lastUpdate;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    return `${diffMins} minutes ago`;
  };

  return (
    <>
      <Helmet>
        <title>Environment Monitor - Smart Pet Care Dashboard</title>
        <meta name="description" content="Monitor environmental conditions and comfort zones for optimal pet wellbeing with real-time tracking and analytics" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <NavigationBar />
        
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
          <PetSelector />
          <AlertBadgeIndicator />
        </div>

        <main className="main-content max-w-[1920px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Environment Monitor</h1>
                <p className="text-sm text-muted-foreground">
                  Real-time environmental tracking and comfort zone analysis
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="RefreshCw" size={14} />
                  <span>Updated {formatLastUpdate()}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleExportReport}
                >
                  Export Report
                </Button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <Select
                label="Location"
                options={locationOptions}
                value={selectedLocation}
                onChange={setSelectedLocation}
                className="w-full md:w-48"
              />
              <Select
                label="Time Range"
                options={timeRangeOptions}
                value={selectedTimeRange}
                onChange={setSelectedTimeRange}
                className="w-full md:w-48"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            {environmentMetrics?.map((metric, index) => (
              <EnvironmentMetricCard key={index} {...metric} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <EnvironmentTrendChart 
                data={trendChartData} 
                selectedMetrics={['temperature', 'humidity', 'activity']}
                onMetricToggle={(metric) => console.log('Metric toggled:', metric)}
              />
            </div>
            <div className="space-y-6">
              <EnvironmentAlertPanel
                alerts={alerts}
                onDismiss={handleDismissAlert}
                onConfigure={handleConfigureAlerts}
              />
              <OptimalConditionsCard recommendations={recommendations} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <CorrelationMatrix data={correlationData} />
            <HistoricalComfortAnalysis 
              data={historicalData} 
              timeRange={selectedTimeRange}
              onTimeRangeChange={setSelectedTimeRange}
            />
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Info" size={14} />
                <span>
                  Environmental data updates every minute via IoT sensors. Comfort index calculated from temperature, humidity, and air quality metrics.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-xs text-muted-foreground">All sensors online</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EnvironmentMonitor;