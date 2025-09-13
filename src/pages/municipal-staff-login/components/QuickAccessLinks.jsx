import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickAccessLinks = () => {
  const navigate = useNavigate();

  const quickLinks = [
    {
      title: 'Citizen Portal',
      description: 'Switch to citizen login',
      icon: 'Users',
      action: () => navigate('/citizen-login'),
      variant: 'outline'
    },
    {
      title: 'System Status',
      description: 'Check service availability',
      icon: 'Activity',
      action: () => window.open('https://status.springfield.gov', '_blank'),
      variant: 'ghost'
    },
    {
      title: 'IT Support',
      description: 'Technical assistance',
      icon: 'HelpCircle',
      action: () => window.open('mailto:it-support@springfield.gov', '_blank'),
      variant: 'ghost'
    }
  ];

  const emergencyContacts = [
    {
      department: 'IT Emergency',
      contact: 'ext. 2024',
      icon: 'Laptop'
    },
    {
      department: 'Security Office',
      contact: 'ext. 3001',
      icon: 'Shield'
    },
    {
      department: 'Admin Office',
      contact: 'ext. 1000',
      icon: 'Building'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Access Links */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Icon name="Zap" size={16} className="text-primary" />
          Quick Access
        </h3>
        
        <div className="space-y-2">
          {quickLinks?.map((link, index) => (
            <Button
              key={index}
              variant={link?.variant}
              size="sm"
              fullWidth
              iconName={link?.icon}
              iconPosition="left"
              iconSize={16}
              onClick={link?.action}
              className="justify-start h-auto py-3"
            >
              <div className="text-left">
                <div className="font-medium">{link?.title}</div>
                <div className="text-xs opacity-70">{link?.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Emergency Contacts */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Icon name="Phone" size={16} className="text-error" />
          Emergency Contacts
        </h3>
        
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          {emergencyContacts?.map((contact, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full">
                <Icon name={contact?.icon} size={14} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {contact?.department}
                </p>
                <p className="text-xs text-muted-foreground">
                  {contact?.contact}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                iconName="Phone"
                iconSize={14}
                onClick={() => window.open(`tel:${contact?.contact}`, '_self')}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Office Hours */}
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Clock" size={16} className="text-primary" />
          <span className="text-sm font-semibold text-foreground">
            Office Hours
          </span>
        </div>
        
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Monday - Friday:</span>
            <span className="font-medium">8:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday:</span>
            <span className="font-medium">9:00 AM - 2:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday:</span>
            <span className="font-medium">Emergency Only</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-xs text-success font-medium">
              Currently Open - Regular Hours
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessLinks;