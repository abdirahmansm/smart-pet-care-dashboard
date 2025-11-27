import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EnvironmentAlertPanel = ({ alerts, onDismiss, onConfigure }) => {
  const [expandedAlert, setExpandedAlert] = useState(null);

  const getSeverityConfig = (severity) => {
    const configs = {
      critical: {
        color: 'var(--color-error)',
        bgColor: 'bg-error/10',
        icon: 'AlertTriangle',
        label: 'Critical'
      },
      warning: {
        color: 'var(--color-warning)',
        bgColor: 'bg-warning/10',
        icon: 'AlertCircle',
        label: 'Warning'
      },
      info: {
        color: 'var(--color-success)',
        bgColor: 'bg-success/10',
        icon: 'Info',
        label: 'Info'
      }
    };
    return configs?.[severity] || configs?.info;
  };

  const handleToggleExpand = (alertId) => {
    setExpandedAlert(expandedAlert === alertId ? null : alertId);
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Bell" size={20} color="var(--color-foreground)" />
          <h2 className="text-lg font-semibold text-foreground">Environmental Alerts</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Settings"
          iconPosition="left"
          onClick={onConfigure}
        >
          Configure
        </Button>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} color="var(--color-success)" className="mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">All environmental conditions optimal</p>
          </div>
        ) : (
          alerts?.map((alert) => {
            const config = getSeverityConfig(alert?.severity);
            const isExpanded = expandedAlert === alert?.id;

            return (
              <div
                key={alert?.id}
                className={`border border-border rounded-lg p-4 transition-all duration-200 ${config?.bgColor}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-card">
                      <Icon name={config?.icon} size={18} color={config?.color} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-foreground">{alert?.title}</h3>
                        <span
                          className="text-xs font-medium px-2 py-0.5 rounded-full"
                          style={{
                            color: config?.color,
                            backgroundColor: `${config?.color}20`
                          }}
                        >
                          {config?.label}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{alert?.message}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="MapPin" size={12} />
                          {alert?.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={12} />
                          {formatTimestamp(alert?.timestamp)}
                        </span>
                      </div>

                      {isExpanded && alert?.details && (
                        <div className="mt-3 pt-3 border-t border-border">
                          <p className="text-xs text-foreground mb-2 font-medium">Details:</p>
                          <ul className="space-y-1">
                            {alert?.details?.map((detail, index) => (
                              <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                                <Icon name="ChevronRight" size={12} className="mt-0.5 flex-shrink-0" />
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                          {alert?.recommendation && (
                            <div className="mt-3 p-2 bg-card rounded-lg">
                              <p className="text-xs font-medium text-foreground mb-1">Recommendation:</p>
                              <p className="text-xs text-muted-foreground">{alert?.recommendation}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-2">
                    <button
                      onClick={() => handleToggleExpand(alert?.id)}
                      className="p-1 hover:bg-muted rounded transition-colors duration-200"
                      aria-label={isExpanded ? "Collapse details" : "Expand details"}
                    >
                      <Icon
                        name={isExpanded ? "ChevronUp" : "ChevronDown"}
                        size={16}
                        color="var(--color-muted-foreground)"
                      />
                    </button>
                    <button
                      onClick={() => onDismiss(alert?.id)}
                      className="p-1 hover:bg-muted rounded transition-colors duration-200"
                      aria-label="Dismiss alert"
                    >
                      <Icon name="X" size={16} color="var(--color-muted-foreground)" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {alerts?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{alerts?.length} active alert{alerts?.length !== 1 ? 's' : ''}</span>
            <button
              onClick={() => alerts?.forEach(alert => onDismiss(alert?.id))}
              className="text-primary hover:underline"
            >
              Dismiss all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnvironmentAlertPanel;