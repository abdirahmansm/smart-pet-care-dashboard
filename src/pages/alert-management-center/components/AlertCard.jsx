import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AlertCard = ({ alert, onAcknowledge, onResolve, onExpand }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSeverityStyles = () => {
    switch (alert?.severity) {
      case 'critical':
        return {
          border: 'border-l-4 border-l-error',
          bg: 'bg-error/5',
          badge: 'bg-error text-error-foreground',
          icon: 'AlertTriangle'
        };
      case 'warning':
        return {
          border: 'border-l-4 border-l-warning',
          bg: 'bg-warning/5',
          badge: 'bg-warning text-warning-foreground',
          icon: 'AlertCircle'
        };
      case 'info':
        return {
          border: 'border-l-4 border-l-success',
          bg: 'bg-success/5',
          badge: 'bg-success text-success-foreground',
          icon: 'Info'
        };
      default:
        return {
          border: 'border-l-4 border-l-border',
          bg: 'bg-muted/5',
          badge: 'bg-muted text-muted-foreground',
          icon: 'Bell'
        };
    }
  };

  const styles = getSeverityStyles();

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (onExpand) onExpand(alert?.id);
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const alertDate = new Date(date);
    const diffMs = now - alertDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className={`bg-card rounded-lg border ${styles?.border} ${styles?.bg} p-4 mb-3 transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className={`p-2 rounded-lg ${styles?.badge}`}>
            <Icon name={styles?.icon} size={20} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-base font-semibold text-foreground">{alert?.title}</h4>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${styles?.badge}`}>
                  {alert?.severity?.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{alert?.message}</p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatTimestamp(alert?.timestamp)}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-2">
              <Image
                src={alert?.petAvatar}
                alt={alert?.petAvatarAlt}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm text-foreground font-medium">{alert?.petName}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Icon name={alert?.categoryIcon} size={14} />
              <span className="text-xs">{alert?.category}</span>
            </div>
            {alert?.deviceName && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Icon name="Wifi" size={14} />
                <span className="text-xs">{alert?.deviceName}</span>
              </div>
            )}
          </div>

          {isExpanded && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-3">
              <div>
                <h5 className="text-sm font-semibold text-foreground mb-2">Recommended Actions:</h5>
                <ul className="space-y-1">
                  {alert?.recommendedActions?.map((action, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                      <Icon name="CheckCircle2" size={16} className="flex-shrink-0 mt-0.5 text-success" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {alert?.additionalInfo && (
                <div>
                  <h5 className="text-sm font-semibold text-foreground mb-1">Additional Information:</h5>
                  <p className="text-sm text-muted-foreground">{alert?.additionalInfo}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
              onClick={handleToggleExpand}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </Button>
            {!alert?.acknowledged && (
              <Button
                variant="secondary"
                size="sm"
                iconName="Check"
                iconPosition="left"
                onClick={() => onAcknowledge(alert?.id)}
              >
                Acknowledge
              </Button>
            )}
            {alert?.acknowledged && !alert?.resolved && (
              <Button
                variant="success"
                size="sm"
                iconName="CheckCheck"
                iconPosition="left"
                onClick={() => onResolve(alert?.id)}
              >
                Resolve
              </Button>
            )}
            {alert?.resolved && (
              <span className="flex items-center gap-1 text-sm text-success">
                <Icon name="CheckCircle2" size={16} />
                Resolved
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;