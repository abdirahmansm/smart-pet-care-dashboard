import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../common/AppIcon';

const AlertBadgeIndicator = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState({
    critical: 2,
    warning: 5,
    info: 3
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const totalAlerts = alerts?.critical + alerts?.warning + alerts?.info;
  const hasCriticalAlerts = alerts?.critical > 0;
  const hasWarningAlerts = alerts?.warning > 0;

  const getSeverityClass = () => {
    if (hasCriticalAlerts) return '';
    if (hasWarningAlerts) return 'warning';
    return 'success';
  };

  const handleBadgeClick = () => {
    navigate('/alert-management-center');
  };

  const handleToggleExpand = (e) => {
    e?.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAlerts(prev => ({
        critical: Math.max(0, prev?.critical + Math.floor(Math.random() * 3) - 1),
        warning: Math.max(0, prev?.warning + Math.floor(Math.random() * 3) - 1),
        info: Math.max(0, prev?.info + Math.floor(Math.random() * 3) - 1)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="alert-badge-container">
      <div 
        className="alert-badge"
        onClick={handleBadgeClick}
        role="button"
        tabIndex={0}
        aria-label={`${totalAlerts} total alerts`}
        onKeyDown={(e) => {
          if (e?.key === 'Enter' || e?.key === ' ') {
            e?.preventDefault();
            handleBadgeClick();
          }
        }}
      >
        <Icon name="Bell" size={20} color="var(--color-foreground)" />
        
        {totalAlerts > 0 && (
          <>
            <span className={`alert-badge-count ${getSeverityClass()}`}>
              {totalAlerts}
            </span>
            {hasCriticalAlerts && <span className="alert-badge-pulse" />}
          </>
        )}

        <button
          className="ml-2 p-1 hover:bg-muted rounded transition-colors duration-200"
          onClick={handleToggleExpand}
          aria-label="Toggle alert details"
          aria-expanded={isExpanded}
        >
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            color="var(--color-muted-foreground)"
          />
        </button>
      </div>
      {isExpanded && (
        <div className="mt-2 bg-popover border border-border rounded-lg shadow-lg p-4 min-w-[200px]">
          <div className="space-y-2">
            {alerts?.critical > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-error" />
                  <span className="text-sm text-foreground">Critical</span>
                </div>
                <span className="text-sm font-medium text-foreground">{alerts?.critical}</span>
              </div>
            )}
            {alerts?.warning > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-warning" />
                  <span className="text-sm text-foreground">Warning</span>
                </div>
                <span className="text-sm font-medium text-foreground">{alerts?.warning}</span>
              </div>
            )}
            {alerts?.info > 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-sm text-foreground">Info</span>
                </div>
                <span className="text-sm font-medium text-foreground">{alerts?.info}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertBadgeIndicator;