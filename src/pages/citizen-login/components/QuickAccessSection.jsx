import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickAccessSection = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: 'Report an Issue',
      description: 'Quickly report civic issues in your area',
      icon: 'FileText',
      action: () => navigate('/issue-reporting-form'),
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 2,
      title: 'View Community Map',
      description: 'See reported issues in your neighborhood',
      icon: 'Map',
      action: () => navigate('/community-issue-map'),
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 3,
      title: 'Staff Login',
      description: 'Municipal staff access portal',
      icon: 'Users',
      action: () => navigate('/municipal-staff-login'),
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center mb-6">
          <Icon name="Zap" size={24} className="text-warning mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-foreground mb-1">Quick Access</h3>
          <p className="text-sm text-muted-foreground">
            Access key features without logging in
          </p>
        </div>

        <div className="space-y-3">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant="ghost"
              size="default"
              fullWidth
              onClick={action?.action}
              className="justify-start h-auto p-4 text-left"
            >
              <div className="flex items-center gap-3 w-full">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${action?.bgColor}`}>
                  <Icon name={action?.icon} size={18} className={action?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground">{action?.title}</h4>
                  <p className="text-xs text-muted-foreground">{action?.description}</p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-6 p-3 bg-muted/50 rounded-md">
          <div className="flex items-start gap-2">
            <Icon name="Lightbulb" size={14} className="text-warning mt-0.5" />
            <div>
              <p className="text-xs font-medium text-foreground mb-1">Pro Tip</p>
              <p className="text-xs text-muted-foreground">
                Create an account to track your reports, receive updates, and access your submission history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessSection;