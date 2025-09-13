import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunityActivityPanel = () => {
  const navigate = useNavigate();

  const communityStats = [
    {
      id: 1,
      label: "Issues This Week",
      value: "47",
      change: "+12%",
      changeType: "increase",
      icon: "TrendingUp",
      color: "text-primary"
    },
    {
      id: 2,
      label: "Resolved Issues",
      value: "23",
      change: "+8%",
      changeType: "increase",
      icon: "CheckCircle",
      color: "text-success"
    },
    {
      id: 3,
      label: "Active Reports",
      value: "24",
      change: "-5%",
      changeType: "decrease",
      icon: "Clock",
      color: "text-warning"
    },
    {
      id: 4,
      label: "Avg Response Time",
      value: "2.3 days",
      change: "-0.5 days",
      changeType: "improvement",
      icon: "Timer",
      color: "text-accent"
    }
  ];

  const nearbyIssues = [
    {
      id: 1,
      title: "Broken streetlight on Main St",
      distance: "0.2 miles",
      status: "in-progress",
      reportedBy: "Anonymous",
      timeAgo: "2 hours ago"
    },
    {
      id: 2,
      title: "Pothole near Central Park",
      distance: "0.5 miles",
      status: "acknowledged",
      reportedBy: "Sarah M.",
      timeAgo: "5 hours ago"
    },
    {
      id: 3,
      title: "Overflowing trash bin",
      distance: "0.8 miles",
      status: "submitted",
      reportedBy: "Mike R.",
      timeAgo: "1 day ago"
    }
  ];

  const announcements = [
    {
      id: 1,
      title: "Scheduled Road Maintenance",
      content: "Main Street will undergo maintenance from Dec 15-17. Expect minor delays.",
      date: "2025-09-10",
      priority: "medium",
      department: "Public Works"
    },
    {
      id: 2,
      title: "New Recycling Guidelines",
      content: "Updated recycling guidelines are now in effect. Please separate materials accordingly.",
      date: "2025-09-08",
      priority: "low",
      department: "Sanitation"
    }
  ];

  const getStatusColor = (status) => {
    const colorMap = {
      'submitted': 'text-warning',
      'acknowledged': 'text-primary',
      'in-progress': 'text-accent',
      'resolved': 'text-success'
    };
    return colorMap?.[status] || 'text-muted-foreground';
  };

  const getPriorityColor = (priority) => {
    const colorMap = {
      'high': 'border-l-error',
      'medium': 'border-l-warning',
      'low': 'border-l-success'
    };
    return colorMap?.[priority] || 'border-l-muted';
  };

  return (
    <div className="space-y-6">
      {/* Community Statistics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Icon name="BarChart3" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Community Activity</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="ExternalLink"
            iconSize={14}
            onClick={() => navigate('/community-issue-map')}
          >
            View Map
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {communityStats?.map((stat) => (
            <div key={stat?.id} className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon name={stat?.icon} size={16} className={stat?.color} />
                <span className="text-xs text-muted-foreground">{stat?.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-lg font-semibold text-foreground">{stat?.value}</span>
                <span className={`text-xs ${
                  stat?.changeType === 'increase' || stat?.changeType === 'improvement' ?'text-success' :'text-error'
                }`}>
                  {stat?.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Nearby Issues */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="MapPin" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Nearby Issues</h2>
        </div>

        <div className="space-y-3">
          {nearbyIssues?.map((issue) => (
            <div key={issue?.id} className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-foreground text-sm line-clamp-1">
                  {issue?.title}
                </h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {issue?.distance}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">by {issue?.reportedBy}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{issue?.timeAgo}</span>
                </div>
                <span className={`font-medium capitalize ${getStatusColor(issue?.status)}`}>
                  {issue?.status?.replace('-', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Map"
          iconPosition="left"
          iconSize={14}
          onClick={() => navigate('/community-issue-map')}
          className="mt-4"
        >
          View All on Map
        </Button>
      </div>
      {/* Municipal Announcements */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Megaphone" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Announcements</h2>
        </div>

        <div className="space-y-3">
          {announcements?.map((announcement) => (
            <div 
              key={announcement?.id} 
              className={`p-3 bg-muted/30 rounded-lg border-l-4 ${getPriorityColor(announcement?.priority)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-foreground text-sm">
                  {announcement?.title}
                </h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {new Date(announcement.date)?.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                {announcement?.content}
              </p>
              <div className="flex items-center gap-1">
                <Icon name="Building2" size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{announcement?.department}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityActivityPanel;