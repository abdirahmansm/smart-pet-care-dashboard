import React from 'react';
import Icon from '../../../components/common/AppIcon';

const HealthMilestoneTracker = ({ milestones }) => {
  const getMilestoneIcon = (type) => {
    switch (type) {
      case 'vaccination':
        return 'Syringe';
      case 'weight':
        return 'Scale';
      case 'medication':
        return 'Pill';
      default:
        return 'CheckCircle';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'var(--color-success)';
    if (progress >= 70) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Health Milestones</h3>
          <p className="text-sm text-muted-foreground mt-1">Track vaccination, weight, and medication progress</p>
        </div>
        <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>
      <div className="space-y-6">
        {milestones?.map((milestone, index) => (
          <div key={index} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon name={getMilestoneIcon(milestone?.type)} size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{milestone?.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{milestone?.description}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-foreground">{milestone?.progress}%</span>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {milestone?.completed}/{milestone?.total}
                </p>
              </div>
            </div>

            <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${milestone?.progress}%`,
                  backgroundColor: getProgressColor(milestone?.progress)
                }}
              />
            </div>

            {milestone?.nextDue && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
                <span>Next due: {milestone?.nextDue?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthMilestoneTracker;