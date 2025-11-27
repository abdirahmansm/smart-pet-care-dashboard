import React from 'react';
import Icon from '../../../components/AppIcon';

const AlertSummaryCard = ({ title, count, trend, trendValue, icon, severity, onClick }) => {
  const getSeverityColor = () => {
    switch (severity) {
      case 'critical':
        return 'bg-error/10 border-error text-error';
      case 'warning':
        return 'bg-warning/10 border-warning text-warning';
      case 'info':
        return 'bg-success/10 border-success text-success';
      default:
        return 'bg-muted border-border text-foreground';
    }
  };

  const getTrendColor = () => {
    return trend === 'up' ? 'text-error' : 'text-success';
  };

  return (
    <div
      className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${getSeverityColor()}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${title}: ${count} alerts`}
      onKeyDown={(e) => {
        if (e?.key === 'Enter' || e?.key === ' ') {
          e?.preventDefault();
          onClick();
        }
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-card">
          <Icon name={icon} size={24} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 ${getTrendColor()}`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={16} />
            <span className="text-sm font-medium">{trendValue}%</span>
          </div>
        )}
      </div>
      <h3 className="text-3xl font-bold mb-1">{count}</h3>
      <p className="text-sm opacity-80">{title}</p>
    </div>
  );
};

export default AlertSummaryCard;