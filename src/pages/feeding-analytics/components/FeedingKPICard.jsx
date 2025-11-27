import React from 'react';
import Icon from '../../../components/AppIcon';

const FeedingKPICard = ({ title, value, unit, change, changeType, icon, iconColor }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-[var(--color-success)]';
    if (changeType === 'negative') return 'text-[var(--color-error)]';
    return 'text-[var(--color-muted-foreground)]';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${iconColor}15` }}
          >
            <Icon name={icon} size={24} color={iconColor} />
          </div>
          <h3 className="text-sm font-medium text-[var(--color-muted-foreground)]">{title}</h3>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-semibold text-[var(--color-foreground)]">{value}</span>
          <span className="text-lg text-[var(--color-muted-foreground)]">{unit}</span>
        </div>
        
        {change && (
          <div className={`flex items-center gap-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={16} />
            <span className="text-sm font-medium">{change}</span>
            <span className="text-xs text-[var(--color-muted-foreground)]">vs last period</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedingKPICard;