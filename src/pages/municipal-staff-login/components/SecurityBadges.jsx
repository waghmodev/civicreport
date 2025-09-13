import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Government Certified',
      description: 'FISMA Compliant System'
    },
    {
      icon: 'Lock',
      title: 'SSL Encrypted',
      description: '256-bit Encryption'
    },
    {
      icon: 'Eye',
      title: 'Audit Logged',
      description: 'All Access Monitored'
    },
    {
      icon: 'Clock',
      title: 'Session Timeout',
      description: 'Auto-logout Protection'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Security Badge */}
      <div className="bg-card border-2 border-primary/20 rounded-lg p-6 text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
          <Icon name="ShieldCheck" size={32} className="text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Secure Government Portal
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          This system is for authorized municipal staff only. All activities are monitored and logged for security compliance.
        </p>
      </div>
      {/* Security Features Grid */}
      <div className="grid grid-cols-2 gap-3">
        {securityFeatures?.map((feature, index) => (
          <div 
            key={index}
            className="bg-muted/50 border border-border rounded-lg p-3 text-center"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full mx-auto mb-2">
              <Icon name={feature?.icon} size={16} className="text-primary" />
            </div>
            <h4 className="text-xs font-medium text-foreground mb-1">
              {feature?.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Compliance Notice */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-warning mb-1">
              Security Notice
            </h4>
            <p className="text-xs text-warning/80 leading-relaxed">
              Unauthorized access is prohibited. Report security concerns to IT Security at ext. 2024.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;