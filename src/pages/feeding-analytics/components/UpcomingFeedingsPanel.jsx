import React from 'react';
import Icon from '../../../components/AppIcon';

const UpcomingFeedingsPanel = ({ feedings }) => {
  const getMealTypeIcon = (type) => {
    const icons = {
      breakfast: 'Sunrise',
      lunch: 'Sun',
      dinner: 'Moon',
      snack: 'Cookie'
    };
    return icons?.[type] || 'UtensilsCrossed';
  };

  const getMealTypeColor = (type) => {
    const colors = {
      breakfast: 'var(--color-warning)',
      lunch: 'var(--color-primary)',
      dinner: 'var(--color-secondary)',
      snack: 'var(--color-accent)'
    };
    return colors?.[type] || 'var(--color-muted-foreground)';
  };

  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)]">Upcoming Feedings</h3>
        <Icon name="Clock" size={20} color="var(--color-primary)" />
      </div>
      <div className="space-y-3">
        {feedings?.map((feeding) => (
          <div 
            key={feeding?.id}
            className="p-4 bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors duration-200"
          >
            <div className="flex items-start gap-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${getMealTypeColor(feeding?.type)}15` }}
              >
                <Icon 
                  name={getMealTypeIcon(feeding?.type)} 
                  size={20} 
                  color={getMealTypeColor(feeding?.type)} 
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-[var(--color-foreground)] capitalize">
                    {feeding?.type}
                  </h4>
                  <span className="text-xs font-medium text-[var(--color-primary)]">
                    {feeding?.time}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                    <Icon name="Scale" size={12} />
                    <span>{feeding?.amount}g</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                    <Icon name="Smartphone" size={12} />
                    <span>{feeding?.device}</span>
                  </div>

                  {feeding?.isAutomated && (
                    <div className="flex items-center gap-1 mt-2">
                      <span className="px-2 py-0.5 bg-[var(--color-primary)] bg-opacity-10 text-[var(--color-primary)] text-xs rounded-full font-medium">
                        Automated
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2">
        <Icon name="Plus" size={16} />
        Schedule New Feeding
      </button>
    </div>
  );
};

export default UpcomingFeedingsPanel;