import React, { useState, useEffect } from 'react';
import Icon from '../../../components/common/AppIcon';

const SyncStatusIndicator = () => {
  const [status, setStatus] = useState('connected');
  const [lastSync, setLastSync] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastSync(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: 'Wifi',
          color: 'var(--color-success)',
          bg: 'bg-success/10',
          text: 'Connected',
          pulse: true
        };
      case 'syncing':
        return {
          icon: 'RefreshCw',
          color: 'var(--color-primary)',
          bg: 'bg-primary/10',
          text: 'Syncing...',
          pulse: false
        };
      case 'disconnected':
        return {
          icon: 'WifiOff',
          color: 'var(--color-error)',
          bg: 'bg-error/10',
          text: 'Disconnected',
          pulse: false
        };
      default:
        return {
          icon: 'Wifi',
          color: 'var(--color-muted-foreground)',
          bg: 'bg-muted',
          text: 'Unknown',
          pulse: false
        };
    }
  };

  const config = getStatusConfig();

  const formatLastSync = () => {
    const now = new Date();
    const diff = Math.floor((now - lastSync) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return lastSync?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-card border border-border rounded-lg">
      <div className={`relative p-2 rounded-lg ${config?.bg}`}>
        <Icon name={config?.icon} size={16} color={config?.color} />
        {config?.pulse && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-success rounded-full animate-pulse" />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-foreground">{config?.text}</span>
        <span className="text-xs text-muted-foreground">Last sync: {formatLastSync()}</span>
      </div>
    </div>
  );
};

export default SyncStatusIndicator;