import React from 'react';
import Icon from '../../../components/common/AppIcon';

const CareReminderCard = ({ type, title, dueDate, status, description }) => {
  const getReminderConfig = () => {
    switch (type) {
      case 'vaccination':
        return {
          icon: 'Syringe',
          color: 'var(--color-primary)',
          bg: 'bg-primary/10'
        };
      case 'checkup':
        return {
          icon: 'Stethoscope',
          color: 'var(--color-success)',
          bg: 'bg-success/10'
        };
      case 'medication':
        return {
          icon: 'Pill',
          color: 'var(--color-warning)',
          bg: 'bg-warning/10'
        };
      case 'grooming':
        return {
          icon: 'Scissors',
          color: 'var(--color-secondary)',
          bg: 'bg-secondary/10'
        };
      default:
        return {
          icon: 'Calendar',
          color: 'var(--color-muted-foreground)',
          bg: 'bg-muted'
        };
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'overdue':
        return {
          text: 'Overdue',
          bg: 'bg-error/10',
          color: 'var(--color-error)'
        };
      case 'due-soon':
        return {
          text: 'Due Soon',
          bg: 'bg-warning/10',
          color: 'var(--color-warning)'
        };
      case 'upcoming':
        return {
          text: 'Upcoming',
          bg: 'bg-success/10',
          color: 'var(--color-success)'
        };
      default:
        return {
          text: 'Scheduled',
          bg: 'bg-muted',
          color: 'var(--color-muted-foreground)'
        };
    }
  };

  const config = getReminderConfig();
  const statusBadge = getStatusBadge();

  const formatDate = (date) => {
    const now = new Date();
    const diff = Math.floor((date - now) / (1000 * 60 * 60 * 24));
    
    if (diff < 0) return `${Math.abs(diff)} days overdue`;
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    if (diff < 7) return `In ${diff} days`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${config?.bg} flex-shrink-0`}>
          <Icon name={config?.icon} size={20} color={config?.color} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="text-sm font-semibold text-foreground">{title}</h4>
            <div className={`px-2 py-0.5 rounded-full ${statusBadge?.bg}`}>
              <span className="text-xs font-medium" style={{ color: statusBadge?.color }}>
                {statusBadge?.text}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Calendar" size={14} color="var(--color-muted-foreground)" />
            <span className="text-xs text-muted-foreground">{formatDate(dueDate)}</span>
          </div>
          
          <p className="text-xs text-muted-foreground mb-3">{description}</p>
          
          <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
            Schedule Now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareReminderCard;