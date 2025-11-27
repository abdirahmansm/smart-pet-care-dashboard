import React from 'react';
import Icon from '../../../components/AppIcon';

const NutritionRecommendations = ({ recommendations }) => {
  const getPriorityColor = (priority) => {
    const colors = {
      high: 'var(--color-error)',
      medium: 'var(--color-warning)',
      low: 'var(--color-success)'
    };
    return colors?.[priority] || colors?.low;
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      high: 'AlertTriangle',
      medium: 'Info',
      low: 'CheckCircle2'
    };
    return icons?.[priority] || 'Info';
  };

  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[var(--color-foreground)]">Nutrition Insights</h3>
        <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
      </div>
      <div className="space-y-3">
        {recommendations?.map((rec) => (
          <div 
            key={rec?.id}
            className="p-4 bg-[var(--color-background)] rounded-lg border-l-4 hover:shadow-md transition-shadow duration-200"
            style={{ borderLeftColor: getPriorityColor(rec?.priority) }}
          >
            <div className="flex items-start gap-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${getPriorityColor(rec?.priority)}15` }}
              >
                <Icon 
                  name={getPriorityIcon(rec?.priority)} 
                  size={16} 
                  color={getPriorityColor(rec?.priority)} 
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-[var(--color-foreground)] mb-1">
                  {rec?.title}
                </h4>
                <p className="text-xs text-[var(--color-muted-foreground)] leading-relaxed">
                  {rec?.description}
                </p>

                {rec?.action && (
                  <button className="mt-2 text-xs font-medium text-[var(--color-primary)] hover:underline flex items-center gap-1">
                    {rec?.action}
                    <Icon name="ArrowRight" size={12} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionRecommendations;