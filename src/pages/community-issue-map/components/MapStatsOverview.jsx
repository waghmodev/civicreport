import React from 'react';
import Icon from '../../../components/AppIcon';

const MapStatsOverview = ({ stats, isCollapsed }) => {
  const statItems = [
    {
      label: 'Total Issues',
      value: stats?.total || 0,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Active',
      value: stats?.active || 0,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'In Progress',
      value: stats?.inProgress || 0,
      icon: 'Wrench',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Resolved',
      value: stats?.resolved || 0,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  if (isCollapsed) {
    return (
      <div className="space-y-2">
        {statItems?.map((item, index) => (
          <div
            key={index}
            className={`w-10 h-10 ${item?.bgColor} rounded-lg flex items-center justify-center relative group`}
            title={`${item?.label}: ${item?.value}`}
          >
            <Icon name={item?.icon} size={16} className={item?.color} />
            <span className="absolute -top-1 -right-1 bg-card text-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-border">
              {item?.value > 99 ? '99+' : item?.value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="BarChart3" size={16} className="text-primary" />
        <h3 className="font-semibold text-foreground">Map Overview</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {statItems?.map((item, index) => (
          <div
            key={index}
            className="p-3 bg-muted rounded-lg border border-border hover:shadow-sm transition-shadow duration-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-1.5 ${item?.bgColor} rounded-md`}>
                <Icon name={item?.icon} size={12} className={item?.color} />
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {item?.label}
              </span>
            </div>
            <div className="text-xl font-bold text-foreground">
              {item?.value?.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      {/* Priority Areas Alert */}
      {stats?.priorityAreas > 0 && (
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center gap-2">
            <Icon name="AlertTriangle" size={14} className="text-warning" />
            <span className="text-sm font-medium text-warning">
              {stats?.priorityAreas} Priority Area{stats?.priorityAreas !== 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Areas with high issue concentration requiring attention
          </p>
        </div>
      )}
      {/* Recent Activity */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground">Recent Activity</span>
          <span className="text-xs text-muted-foreground">Last 24h</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">New Reports</span>
            <span className="text-foreground font-medium">+{stats?.newReports || 0}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Resolved</span>
            <span className="text-success font-medium">+{stats?.recentResolved || 0}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Updated</span>
            <span className="text-accent font-medium">+{stats?.recentUpdated || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapStatsOverview;