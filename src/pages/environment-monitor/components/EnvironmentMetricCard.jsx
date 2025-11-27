import React from 'react';
import Icon from '../../../components/common/AppIcon';

const EnvironmentMetricCard = ({ 
  title, 
  value, 
  unit, 
  icon, 
  iconColor, 
  range, 
  status, 
  trendData, 
  changePercent 
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'optimal':
        return 'var(--color-success)';
      case 'warning':
        return 'var(--color-warning)';
      case 'critical':
        return 'var(--color-error)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getStatusBgColor = () => {
    switch (status) {
      case 'optimal':
        return 'bg-success/10';
      case 'warning':
        return 'bg-warning/10';
      case 'critical':
        return 'bg-error/10';
      default:
        return 'bg-muted';
    }
  };

  const renderMicroChart = () => {
    if (!trendData || trendData?.length === 0) return null;

    const max = Math.max(...trendData);
    const min = Math.min(...trendData);
    const range = max - min || 1;

    const points = trendData?.map((value, index) => {
      const x = (index / (trendData?.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    })?.join(' ');

    return (
      <svg className="w-full h-12 mt-2" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke={getStatusColor()}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-lg ${getStatusBgColor()}`}>
            <Icon name={icon} size={20} color={iconColor} />
          </div>
          <h3 className="text-sm font-medium text-foreground">{title}</h3>
        </div>
        {changePercent !== undefined && (
          <div className={`flex items-center gap-1 text-xs ${changePercent >= 0 ? 'text-success' : 'text-error'}`}>
            <Icon name={changePercent >= 0 ? "TrendingUp" : "TrendingDown"} size={14} />
            <span>{Math.abs(changePercent)}%</span>
          </div>
        )}
      </div>
      <div className="mb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        {range && (
          <p className="text-xs text-muted-foreground mt-1">
            Range: {range?.min} - {range?.max} {unit}
          </p>
        )}
      </div>
      {renderMicroChart()}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Status</span>
          <span 
            className="text-xs font-medium px-2 py-1 rounded-full"
            style={{ 
              color: getStatusColor(),
              backgroundColor: `${getStatusColor()}20`
            }}
          >
            {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentMetricCard;