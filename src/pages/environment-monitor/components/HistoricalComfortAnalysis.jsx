import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HistoricalComfortAnalysis = ({ data, timeRange, onTimeRangeChange }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const timeRanges = [
    { value: 'day', label: 'Today', icon: 'Calendar' },
    { value: 'week', label: 'This Week', icon: 'CalendarDays' },
    { value: 'month', label: 'This Month', icon: 'CalendarRange' },
    { value: 'year', label: 'This Year', icon: 'CalendarClock' }
  ];

  const getComfortColor = (score) => {
    if (score >= 80) return 'var(--color-success)';
    if (score >= 60) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    if (onTimeRangeChange) {
      onTimeRangeChange(period);
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{data?.period}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-muted-foreground">Comfort Score:</span>
              <span className="font-semibold" style={{ color: getComfortColor(data?.score) }}>
                {data?.score}%
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-muted-foreground">Optimal Hours:</span>
              <span className="font-medium text-foreground">{data?.optimalHours}h</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-muted-foreground">Alerts:</span>
              <span className="font-medium text-foreground">{data?.alerts}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const averageScore = data?.reduce((sum, item) => sum + item?.score, 0) / data?.length;
  const totalOptimalHours = data?.reduce((sum, item) => sum + item?.optimalHours, 0);
  const totalAlerts = data?.reduce((sum, item) => sum + item?.alerts, 0);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Historical Comfort Analysis</h2>
          <p className="text-sm text-muted-foreground mt-1">Comfort zone performance over time</p>
        </div>
        <div className="flex items-center gap-2">
          {timeRanges?.map((range) => (
            <Button
              key={range?.value}
              variant={selectedPeriod === range?.value ? 'default' : 'outline'}
              size="sm"
              iconName={range?.icon}
              iconPosition="left"
              onClick={() => handlePeriodChange(range?.value)}
            >
              <span className="hidden md:inline">{range?.label}</span>
              <span className="md:hidden">{range?.label?.split(' ')?.[1] || range?.label}</span>
            </Button>
          ))}
        </div>
      </div>
      <div className="w-full h-64 mb-6" aria-label="Historical comfort score bar chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis
              dataKey="period"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
              label={{ value: 'Comfort Score (%)', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getComfortColor(entry?.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-success/10">
              <Icon name="TrendingUp" size={18} color="var(--color-success)" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Average Score</p>
              <p className="text-xl font-semibold" style={{ color: getComfortColor(averageScore) }}>
                {averageScore?.toFixed(1)}%
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {averageScore >= 80 ? 'Excellent comfort conditions' : averageScore >= 60 ? 'Good comfort conditions' : 'Needs improvement'}
          </p>
        </div>

        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon name="Clock" size={18} color="var(--color-primary)" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Optimal Hours</p>
              <p className="text-xl font-semibold text-foreground">{totalOptimalHours}h</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Total time in comfort zone
          </p>
        </div>

        <div className="border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-warning/10">
              <Icon name="Bell" size={18} color="var(--color-warning)" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Alerts</p>
              <p className="text-xl font-semibold text-foreground">{totalAlerts}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Environmental threshold breaches
          </p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Icon name="Info" size={14} color="var(--color-muted-foreground)" />
            <span className="text-muted-foreground">
              Comfort score based on temperature, humidity, and air quality metrics
            </span>
          </div>
          <Button variant="ghost" size="sm" iconName="Download" iconPosition="left">
            Export
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HistoricalComfortAnalysis;