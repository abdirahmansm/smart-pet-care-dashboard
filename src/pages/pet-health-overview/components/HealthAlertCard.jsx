import React from 'react';
import Icon from '../../../components/common/AppIcon';

const HealthAlertCard = ({ severity, title, message, timestamp, actionRequired }) => {
  const getSeverityConfig = () => {
    switch (severity) {
      case 'critical':
        return {
          icon: 'AlertCircle',
          color: 'var(--color-error)',
          bg: 'bg-error/10',
          border: 'border-error'
        };
      case 'warning':
        return {
          icon: 'AlertTriangle',
          color: 'var(--color-warning)',
          bg: 'bg-warning/10',
          border: 'border-warning'
        };
      case 'info':
        return {
          icon: 'Info',
          color: 'var(--color-primary)',
          bg: 'bg-primary/10',
          border: 'border-primary'
        };
      default:
        return {
          icon: 'Bell',
          color: 'var(--color-muted-foreground)',
          bg: 'bg-muted',
          border: 'border-border'
        };
    }
  };

  const config = getSeverityConfig();

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000 / 60);
    
    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return date?.toLocaleDateString();
  };

  return (
    <div className={`bg-card border ${config?.border} rounded-lg p-4 hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${config?.bg} flex-shrink-0`}>
          <Icon name={config?.icon} size={20} color={config?.color} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-sm font-semibold text-foreground">{title}</h4>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatTimestamp(timestamp)}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {message}
          </p>
          
          {actionRequired && (
            <div className="flex items-center gap-2 mt-3">
              <button className="text-xs font-medium px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Take Action
              </button>
              <button className="text-xs font-medium px-3 py-1.5 rounded-md border border-border text-foreground hover:bg-muted transition-colors">
                Dismiss
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HealthAlertCard;