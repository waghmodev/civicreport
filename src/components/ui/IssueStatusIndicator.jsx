import React from 'react';
import Icon from '../AppIcon';

const IssueStatusIndicator = ({ 
  status = 'submitted', 
  size = 'default',
  showLabel = true,
  className = '' 
}) => {
  const statusConfig = {
    submitted: {
      label: 'Submitted',
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      borderColor: 'border-warning/20'
    },
    acknowledged: {
      label: 'Acknowledged',
      icon: 'Eye',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/20'
    },
    'in-progress': {
      label: 'In Progress',
      icon: 'Wrench',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/20'
    },
    resolved: {
      label: 'Resolved',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      borderColor: 'border-success/20'
    },
    closed: {
      label: 'Closed',
      icon: 'XCircle',
      color: 'text-muted-foreground',
      bgColor: 'bg-muted',
      borderColor: 'border-muted-foreground/20'
    },
    rejected: {
      label: 'Rejected',
      icon: 'AlertCircle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      borderColor: 'border-error/20'
    }
  };

  const config = statusConfig?.[status] || statusConfig?.submitted;
  
  const sizeClasses = {
    sm: {
      container: 'px-2 py-1 text-xs',
      icon: 12,
      gap: 'gap-1'
    },
    default: {
      container: 'px-3 py-1.5 text-sm',
      icon: 14,
      gap: 'gap-1.5'
    },
    lg: {
      container: 'px-4 py-2 text-base',
      icon: 16,
      gap: 'gap-2'
    }
  };

  const sizeConfig = sizeClasses?.[size] || sizeClasses?.default;

  return (
    <div 
      className={`
        inline-flex items-center rounded-md border font-medium transition-colors duration-200
        ${config?.bgColor} ${config?.borderColor} ${config?.color}
        ${sizeConfig?.container} ${sizeConfig?.gap}
        ${className}
      `}
    >
      <Icon 
        name={config?.icon} 
        size={sizeConfig?.icon} 
        className={config?.color}
      />
      {showLabel && (
        <span className="font-medium">{config?.label}</span>
      )}
    </div>
  );
};

export default IssueStatusIndicator;