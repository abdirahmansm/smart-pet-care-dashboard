import React, { useState } from 'react';
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import Icon from '../../../components/common/AppIcon';

const EnvironmentTrendChart = ({ data, selectedMetrics, onMetricToggle }) => {
  const [activeMetrics, setActiveMetrics] = useState({
    temperature: true,
    humidity: true,
    activity: true
  });

  const metrics = [
    { key: 'temperature', label: 'Temperature', color: 'var(--color-error)', icon: 'Thermometer' },
    { key: 'humidity', label: 'Humidity', color: 'var(--color-primary)', icon: 'Droplets' },
    { key: 'activity', label: 'Pet Activity', color: 'var(--color-success)', icon: 'Activity' }
  ];

  const handleMetricToggle = (metricKey) => {
    const newActiveMetrics = {
      ...activeMetrics,
      [metricKey]: !activeMetrics?.[metricKey]
    };
    setActiveMetrics(newActiveMetrics);
    if (onMetricToggle) {
      onMetricToggle(newActiveMetrics);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs">
              <span style={{ color: entry?.color }}>{entry?.name}:</span>
              <span className="font-medium text-foreground">{entry?.value}{entry?.unit || ''}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Environmental Trends & Pet Activity</h2>
          <p className="text-sm text-muted-foreground mt-1">24-hour correlation analysis</p>
        </div>
        <div className="flex items-center gap-2">
          {metrics?.map((metric) => (
            <button
              key={metric?.key}
              onClick={() => handleMetricToggle(metric?.key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                activeMetrics?.[metric?.key]
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
              aria-label={`Toggle ${metric?.label}`}
            >
              <Icon name={metric?.icon} size={14} />
              <span className="hidden md:inline">{metric?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-80" aria-label="Environmental trends and pet activity correlation chart">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              yAxisId="left"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
              label={{ value: 'Temperature (°F) / Humidity (%)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
              label={{ value: 'Activity Level', angle: 90, position: 'insideRight', style: { fontSize: '12px' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="line"
            />
            {activeMetrics?.temperature && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="temperature"
                stroke="var(--color-error)"
                strokeWidth={2}
                dot={false}
                name="Temperature (°F)"
                unit="°F"
              />
            )}
            {activeMetrics?.humidity && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="humidity"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot={false}
                name="Humidity (%)"
                unit="%"
              />
            )}
            {activeMetrics?.activity && (
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="activity"
                stroke="var(--color-success)"
                strokeWidth={2}
                fill="url(#activityGradient)"
                name="Activity Level"
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-error/10">
              <Icon name="Thermometer" size={16} color="var(--color-error)" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Temperature</p>
              <p className="text-sm font-semibold text-foreground">72.5°F</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon name="Droplets" size={16} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Humidity</p>
              <p className="text-sm font-semibold text-foreground">48.2%</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <Icon name="Activity" size={16} color="var(--color-success)" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Peak Activity</p>
              <p className="text-sm font-semibold text-foreground">14:00 - 16:00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentTrendChart;