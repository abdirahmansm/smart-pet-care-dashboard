import React from 'react';
import Icon from '../../../components/common/AppIcon';

const ActivityFeedItem = ({ type, title, description, timestamp, icon }) => {
  const getActivityConfig = () => {
    switch (type) {
      case 'health':
        return {
          icon: icon || 'Activity',
          color: 'var(--color-success)',
          bg: 'bg-success/10'
        };
      case 'feeding':
        return {
          icon: icon || 'UtensilsCrossed',
          color: 'var(--color-primary)',
          bg: 'bg-primary/10'
        };
      case 'medication':
        return {
          icon: icon || 'Pill',
          color: 'var(--color-warning)',
          bg: 'bg-warning/10'
        };
      case 'exercise':
        return {
          icon: icon || 'Footprints',
          color: 'var(--color-secondary)',
          bg: 'bg-secondary/10'
        };
      default:
        return {
          icon: icon || 'Clock',
          color: 'var(--color-muted-foreground)',
          bg: 'bg-muted'
        };
    }
  };

  const config = getActivityConfig();

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-b-0">
      <div className={`p-2 rounded-lg ${config?.bg} flex-shrink-0`}>
        <Icon name={config?.icon} size={16} color={config?.color} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h5 className="text-sm font-medium text-foreground">{title}</h5>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formatTime(timestamp)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  );
};

export default ActivityFeedItem;