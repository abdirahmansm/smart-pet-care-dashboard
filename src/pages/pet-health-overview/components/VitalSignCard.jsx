import React from 'react';
import Icon from '../../../components/common/AppIcon';

const VitalSignCard = ({ title, value, unit, status, trend, icon, sparklineData }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'normal':
        return 'var(--color-success)';
      case 'warning':
        return 'var(--color-warning)';
      case 'critical':
        return 'var(--color-error)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getStatusBg = () => {
    switch (status) {
      case 'normal':
        return 'bg-success/10';
      case 'warning':
        return 'bg-warning/10';
      case 'critical':
        return 'bg-error/10';
      default:
        return 'bg-muted';
    }
  };

  const getTrendIcon = () => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend > 0) return 'var(--color-success)';
    if (trend < 0) return 'var(--color-error)';
    return 'var(--color-muted-foreground)';
  };

  const renderSparkline = () => {
    if (!sparklineData || sparklineData?.length === 0) return null;

    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min || 1;

    const points = sparklineData?.map((value, index) => {
      const x = (index / (sparklineData?.length - 1)) * 100;
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
          <div className={`p-2 rounded-lg ${getStatusBg()}`}>
            <Icon name={icon} size={20} color={getStatusColor()} />
          </div>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name={getTrendIcon()} size={16} color={getTrendColor()} />
          <span className="text-xs font-medium" style={{ color: getTrendColor() }}>
            {Math.abs(trend)}%
          </span>
        </div>
      </div>
      <div className="mb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className={`px-2 py-0.5 rounded-full ${getStatusBg()}`}>
            <span className="text-xs font-medium" style={{ color: getStatusColor() }}>
              {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
            </span>
          </div>
        </div>
      </div>
      {renderSparkline()}
    </div>
  );
};

export default VitalSignCard;