import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTimeline = ({ timeline, currentStatus }) => {
  const statusOrder = ['submitted', 'acknowledged', 'in-progress', 'resolved'];
  
  const getStatusConfig = (status) => {
    const configs = {
      submitted: {
        icon: 'Clock',
        label: 'Submitted',
        color: 'text-warning',
        bgColor: 'bg-warning',
        description: 'Issue has been submitted and is awaiting review'
      },
      acknowledged: {
        icon: 'Eye',
        label: 'Acknowledged',
        color: 'text-primary',
        bgColor: 'bg-primary',
        description: 'Issue has been reviewed and acknowledged by the department'
      },
      'in-progress': {
        icon: 'Wrench',
        label: 'In Progress',
        color: 'text-accent',
        bgColor: 'bg-accent',
        description: 'Work is currently being performed to resolve the issue'
      },
      resolved: {
        icon: 'CheckCircle',
        label: 'Resolved',
        color: 'text-success',
        bgColor: 'bg-success',
        description: 'Issue has been successfully resolved'
      }
    };
    return configs?.[status] || configs?.submitted;
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const isStatusCompleted = (status) => {
    const currentIndex = statusOrder?.indexOf(currentStatus);
    const statusIndex = statusOrder?.indexOf(status);
    return statusIndex <= currentIndex;
  };

  const isStatusCurrent = (status) => {
    return status === currentStatus;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
        <Icon name="Clock" size={20} className="text-primary" />
        Progress Timeline
      </h2>
      <div className="space-y-6">
        {statusOrder?.map((status, index) => {
          const config = getStatusConfig(status);
          const isCompleted = isStatusCompleted(status);
          const isCurrent = isStatusCurrent(status);
          const timelineItem = timeline?.find(item => item?.status === status);
          
          return (
            <div key={status} className="relative">
              {/* Timeline Line */}
              {index < statusOrder?.length - 1 && (
                <div 
                  className={`absolute left-4 top-8 w-0.5 h-16 ${
                    isCompleted ? 'bg-primary' : 'bg-border'
                  }`} 
                />
              )}
              {/* Timeline Item */}
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-200
                    ${isCurrent 
                      ? `${config?.bgColor} border-transparent text-white shadow-lg` 
                      : isCompleted 
                        ? 'bg-primary border-primary text-white' :'bg-muted border-border text-muted-foreground'
                    }
                  `}
                >
                  <Icon 
                    name={config?.icon} 
                    size={14} 
                    className={isCurrent || isCompleted ? 'text-white' : 'text-muted-foreground'}
                  />
                </div>

                {/* Status Content */}
                <div className="flex-1 min-w-0 pb-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-medium ${isCurrent ? config?.color : isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {config?.label}
                    </h3>
                    {timelineItem && (
                      <span className="text-xs text-muted-foreground">
                        {formatDate(timelineItem?.timestamp)}
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-sm mb-2 ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {config?.description}
                  </p>

                  {timelineItem && timelineItem?.note && (
                    <div className="bg-muted rounded-md p-3 mt-2">
                      <p className="text-sm text-foreground">{timelineItem?.note}</p>
                      {timelineItem?.estimatedCompletion && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Estimated completion: {formatDate(timelineItem?.estimatedCompletion)}
                        </p>
                      )}
                    </div>
                  )}

                  {isCurrent && !timelineItem && (
                    <div className="bg-primary/5 border border-primary/20 rounded-md p-3 mt-2">
                      <p className="text-sm text-primary">
                        This stage is currently in progress. You will be notified when there are updates.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Estimated Completion */}
      {timeline?.some(item => item?.estimatedCompletion) && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <Icon name="Calendar" size={14} className="text-primary" />
            <span className="text-muted-foreground">Estimated Resolution:</span>
            <span className="font-medium text-foreground">
              {formatDate(timeline?.find(item => item?.estimatedCompletion)?.estimatedCompletion)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTimeline;