import React from 'react';

import Icon from '../../../components/AppIcon';

const PrioritySelector = ({ value, onChange, issueType }) => {
  const priorityLevels = [
    {
      id: 'low',
      label: 'Low Priority',
      description: 'Minor inconvenience, can wait for regular maintenance',
      icon: 'Minus',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/50'
    },
    {
      id: 'medium',
      label: 'Medium Priority',
      description: 'Moderate issue affecting daily activities',
      icon: 'Equal',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'high',
      label: 'High Priority',
      description: 'Significant problem requiring prompt attention',
      icon: 'Plus',
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    {
      id: 'emergency',
      label: 'Emergency',
      description: 'Immediate safety hazard or critical infrastructure failure',
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/20'
    }
  ];

  const getRecommendedPriority = () => {
    const recommendations = {
      water: 'high',
      traffic: 'high',
      streetlight: 'medium',
      pothole: 'medium',
      trash: 'low',
      sidewalk: 'medium',
      park: 'low',
      noise: 'medium',
      graffiti: 'low',
      other: 'medium'
    };
    return recommendations?.[issueType] || 'medium';
  };

  const recommendedPriority = getRecommendedPriority();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Priority Level <span className="text-error">*</span>
        </label>
        <p className="text-sm text-muted-foreground mb-4">
          Select the urgency level that best describes this issue
        </p>
      </div>
      <div className="grid gap-3">
        {priorityLevels?.map((priority) => (
          <div
            key={priority?.id}
            className={`
              relative border rounded-lg p-4 cursor-pointer transition-all duration-200
              ${value === priority?.id 
                ? 'border-primary bg-primary/5 shadow-sm' 
                : 'border-border bg-card hover:border-primary/50'
              }
            `}
            onClick={() => onChange(priority?.id)}
          >
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-md border-2 border-current">
                <input
                  type="radio"
                  name="priority"
                  value={priority?.id}
                  checked={value === priority?.id}
                  onChange={() => onChange(priority?.id)}
                  className="sr-only"
                />
                <div className={`
                  w-4 h-4 rounded-full border-2 transition-all duration-200
                  ${value === priority?.id 
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                  }
                `}>
                  {value === priority?.id && (
                    <div className="w-full h-full rounded-full bg-white scale-50" />
                  )}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Icon 
                    name={priority?.icon} 
                    size={16} 
                    className={priority?.color} 
                  />
                  <span className="font-medium text-foreground">
                    {priority?.label}
                  </span>
                  {priority?.id === recommendedPriority && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-accent/10 text-accent rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {priority?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {issueType && (
        <div className="p-3 bg-accent/5 border border-accent/20 rounded-md">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Lightbulb" size={14} className="text-accent" />
            <span className="text-sm font-medium text-accent">Priority Guidance</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Based on the issue type "{issueType}", we recommend "{priorityLevels?.find(p => p?.id === recommendedPriority)?.label}" priority.
          </p>
        </div>
      )}
    </div>
  );
};

export default PrioritySelector;