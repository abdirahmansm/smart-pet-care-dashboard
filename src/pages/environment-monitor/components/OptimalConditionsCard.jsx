import React from 'react';
import Icon from '../../../components/AppIcon';

const OptimalConditionsCard = ({ recommendations }) => {
  const getRecommendationIcon = (type) => {
    const icons = {
      temperature: 'Thermometer',
      humidity: 'Droplets',
      airQuality: 'Wind',
      noise: 'Volume2',
      light: 'Sun',
      general: 'Lightbulb'
    };
    return icons?.[type] || icons?.general;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'var(--color-error)',
      medium: 'var(--color-warning)',
      low: 'var(--color-success)'
    };
    return colors?.[priority] || colors?.low;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Lightbulb" size={20} color="var(--color-warning)" />
        <h2 className="text-lg font-semibold text-foreground">Optimal Conditions</h2>
      </div>
      <div className="space-y-4">
        {recommendations?.map((rec, index) => (
          <div
            key={index}
            className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-200"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon
                  name={getRecommendationIcon(rec?.type)}
                  size={18}
                  color="var(--color-primary)"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-foreground">{rec?.title}</h3>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      color: getPriorityColor(rec?.priority),
                      backgroundColor: `${getPriorityColor(rec?.priority)}20`
                    }}
                  >
                    {rec?.priority?.charAt(0)?.toUpperCase() + rec?.priority?.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{rec?.description}</p>
                
                {rec?.currentValue && rec?.targetValue && (
                  <div className="flex items-center gap-4 text-xs mb-3">
                    <div>
                      <span className="text-muted-foreground">Current: </span>
                      <span className="font-medium text-foreground">{rec?.currentValue}</span>
                    </div>
                    <Icon name="ArrowRight" size={12} color="var(--color-muted-foreground)" />
                    <div>
                      <span className="text-muted-foreground">Target: </span>
                      <span className="font-medium text-success">{rec?.targetValue}</span>
                    </div>
                  </div>
                )}

                {rec?.actions && rec?.actions?.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-foreground">Suggested Actions:</p>
                    <ul className="space-y-1">
                      {rec?.actions?.map((action, actionIndex) => (
                        <li key={actionIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                          <Icon name="Check" size={12} className="mt-0.5 flex-shrink-0 text-success" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="TrendingUp" size={16} color="var(--color-success)" />
            <span className="text-xs text-muted-foreground">Comfort Score</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-success rounded-full transition-all duration-300"
                style={{ width: '85%' }}
              />
            </div>
            <span className="text-sm font-semibold text-foreground">85%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimalConditionsCard;