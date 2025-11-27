import React from 'react';
import Icon from '../../../components/AppIcon';

const DeviceStatusPanel = ({ devices }) => {
  const getStatusColor = (status) => {
    const colors = {
      online: 'var(--color-success)',
      offline: 'var(--color-error)',
      maintenance: 'var(--color-warning)'
    };
    return colors?.[status] || colors?.offline;
  };

  const getStatusIcon = (status) => {
    const icons = {
      online: 'CheckCircle2',
      offline: 'XCircle',
      maintenance: 'AlertCircle'
    };
    return icons?.[status] || 'HelpCircle';
  };

  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)]">Device Status</h3>
        <Icon name="Smartphone" size={20} color="var(--color-primary)" />
      </div>
      <div className="space-y-4">
        {devices?.map((device) => (
          <div 
            key={device?.id}
            className="p-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${getStatusColor(device?.status)}15` }}
                >
                  <Icon 
                    name={getStatusIcon(device?.status)} 
                    size={20} 
                    color={getStatusColor(device?.status)} 
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[var(--color-foreground)]">{device?.name}</h4>
                  <p className="text-xs text-[var(--color-muted-foreground)]">{device?.type}</p>
                </div>
              </div>
              <span 
                className="px-2 py-1 rounded text-xs font-medium"
                style={{ 
                  backgroundColor: `${getStatusColor(device?.status)}15`,
                  color: getStatusColor(device?.status)
                }}
              >
                {device?.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--color-muted-foreground)]">Battery</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-[var(--color-muted)] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${device?.battery}%`,
                        backgroundColor: device?.battery > 20 ? 'var(--color-success)' : 'var(--color-error)'
                      }}
                    />
                  </div>
                  <span className="text-[var(--color-foreground)] font-medium">{device?.battery}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--color-muted-foreground)]">Food Level</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-[var(--color-muted)] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-300"
                      style={{ 
                        width: `${device?.foodLevel}%`,
                        backgroundColor: device?.foodLevel > 30 ? 'var(--color-primary)' : 'var(--color-warning)'
                      }}
                    />
                  </div>
                  <span className="text-[var(--color-foreground)] font-medium">{device?.foodLevel}%</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-[var(--color-border)]">
                <span className="text-[var(--color-muted-foreground)]">Last Feeding</span>
                <span className="text-[var(--color-foreground)] font-medium">{device?.lastFeeding}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceStatusPanel;