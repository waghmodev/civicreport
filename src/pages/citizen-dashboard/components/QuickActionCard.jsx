import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActionCard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: "Report New Issue",
      description: "Submit a new civic issue with photos and location",
      icon: "Plus",
      color: "text-primary",
      bgColor: "bg-primary/10",
      action: () => navigate('/issue-reporting-form')
    },
    {
      id: 2,
      title: "View Community Map",
      description: "Explore issues reported in your neighborhood",
      icon: "Map",
      color: "text-accent",
      bgColor: "bg-accent/10",
      action: () => navigate('/community-issue-map')
    },
    {
      id: 3,
      title: "My Issues",
      description: "Track status of your submitted reports",
      icon: "List",
      color: "text-warning",
      bgColor: "bg-warning/10",
      action: () => navigate('/issue-details-view')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Zap" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <div
            key={action?.id}
            className="group cursor-pointer p-4 rounded-lg border border-border hover:border-primary/30 transition-all duration-200 hover:shadow-sm"
            onClick={action?.action}
          >
            <div className={`w-12 h-12 rounded-lg ${action?.bgColor} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform duration-200`}>
              <Icon name={action?.icon} size={20} className={action?.color} />
            </div>
            <h3 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
              {action?.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {action?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionCard;