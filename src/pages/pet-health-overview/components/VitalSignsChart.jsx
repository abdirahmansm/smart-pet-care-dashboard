import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/common/AppIcon';

const VitalSignsChart = ({ data, timeRange }) => {
  const [visibleLines, setVisibleLines] = useState({
    heartRate: true,
    temperature: true,
    activity: true,
    sleep: true
  });

  const metrics = [
    { key: 'heartRate', name: 'Heart Rate', color: 'var(--color-error)', unit: 'bpm', threshold: { min: 60, max: 120 } },
    { key: 'temperature', name: 'Temperature', color: 'var(--color-warning)', unit: '°F', threshold: { min: 100, max: 102.5 } },
    { key: 'activity', name: 'Activity Level', color: 'var(--color-success)', unit: '%', threshold: { min: 30, max: 100 } },
    { key: 'sleep', name: 'Sleep Quality', color: 'var(--color-primary)', unit: '%', threshold: { min: 70, max: 100 } }
  ];

  const toggleLine = (key) => {
    setVisibleLines(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4 mb-1">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-xs text-muted-foreground">{entry?.name}</span>
              </div>
              <span className="text-xs font-medium text-foreground">
                {entry?.value} {metrics?.find(m => m?.name === entry?.name)?.unit}
              </span>
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
          <h3 className="text-lg font-semibold text-foreground">Vital Signs Trends</h3>
          <p className="text-sm text-muted-foreground mt-1">24-hour monitoring data with threshold zones</p>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Download" size={20} color="var(--color-muted-foreground)" className="cursor-pointer hover:text-primary transition-colors" />
          <Icon name="Maximize2" size={20} color="var(--color-muted-foreground)" className="cursor-pointer hover:text-primary transition-colors" />
        </div>
      </div>
      <div className="flex flex-wrap gap-3 mb-6">
        {metrics?.map(metric => (
          <button
            key={metric?.key}
            onClick={() => toggleLine(metric?.key)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
              visibleLines?.[metric?.key]
                ? 'border-primary bg-primary/10' :'border-border bg-muted hover:bg-muted/80'
            }`}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: visibleLines?.[metric?.key] ? metric?.color : 'var(--color-muted-foreground)' }}
            />
            <span className={`text-sm font-medium ${
              visibleLines?.[metric?.key] ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {metric?.name}
            </span>
          </button>
        ))}
      </div>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
            
            {metrics?.map(metric => (
              visibleLines?.[metric?.key] && (
                <Line
                  key={metric?.key}
                  type="monotone"
                  dataKey={metric?.key}
                  name={metric?.name}
                  stroke={metric?.color}
                  strokeWidth={2}
                  dot={{ fill: metric?.color, r: 3 }}
                  activeDot={{ r: 5 }}
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-start gap-2">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
          <p className="text-xs text-muted-foreground">
            Click on metric badges to show/hide data series. Hover over chart for detailed values. Threshold zones indicate normal ranges for each vital sign.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VitalSignsChart;