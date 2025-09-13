import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSection = () => {
  const trustBadges = [
    {
      id: 1,
      name: 'SSL Secured',
      icon: 'Shield',
      description: '256-bit SSL encryption protects your data'
    },
    {
      id: 2,
      name: 'Government Verified',
      icon: 'CheckCircle',
      description: 'Official municipal platform'
    },
    {
      id: 3,
      name: 'Privacy Protected',
      icon: 'Lock',
      description: 'Your information is kept confidential'
    }
  ];

  const securityFeatures = [
    'End-to-end encryption for all communications',
    'Regular security audits and compliance checks',
    'Multi-factor authentication available',
    'GDPR compliant data handling practices'
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center mb-6">
          <Icon name="ShieldCheck" size={24} className="text-primary mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-foreground mb-1">Secure & Trusted</h3>
          <p className="text-sm text-muted-foreground">
            Your security and privacy are our top priorities
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          {trustBadges?.map((badge) => (
            <div key={badge?.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-md">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                <Icon name={badge?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground">{badge?.name}</h4>
                <p className="text-xs text-muted-foreground">{badge?.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="Info" size={14} className="text-muted-foreground" />
            Security Features
          </h4>
          <ul className="space-y-2">
            {securityFeatures?.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                <Icon name="Check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-md">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Building2" size={14} className="text-primary" />
            <span className="text-xs font-medium text-primary">Official Government Platform</span>
          </div>
          <p className="text-xs text-muted-foreground">
            CivicReport is an official municipal service platform endorsed by local government authorities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustSection;