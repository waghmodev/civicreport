import React from 'react';
import Icon from '../../../components/AppIcon';

const MunicipalBranding = () => {
  return (
    <div className="text-center space-y-6">
      {/* Municipal Logo */}
      <div className="flex items-center justify-center">
        <div className="relative">
          <div className="flex items-center justify-center w-20 h-20 bg-primary rounded-2xl shadow-lg">
            <Icon name="Building2" size={40} color="white" />
          </div>
          <div className="absolute -bottom-2 -right-2 flex items-center justify-center w-8 h-8 bg-accent rounded-full border-2 border-background">
            <Icon name="Shield" size={16} color="white" />
          </div>
        </div>
      </div>
      {/* Municipal Information */}
      <div className="space-y-3">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">
            CivicReport Staff Portal
          </h1>
          <p className="text-base text-muted-foreground">
            Municipal Administration System
          </p>
        </div>

        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              City of Springfield
            </span>
          </div>
          
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <Icon name="Phone" size={12} />
              <span>Emergency: (555) 911-CITY</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Icon name="Mail" size={12} />
              <span>support@springfield.gov</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Icon name="Globe" size={12} />
              <span>www.springfield.gov</span>
            </div>
          </div>
        </div>
      </div>
      {/* Department Access Notice */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Icon name="Users" size={16} className="text-primary" />
          <span className="text-sm font-semibold text-primary">
            Multi-Department Access
          </span>
        </div>
        <p className="text-xs text-primary/80 leading-relaxed">
          Access to Public Works, Sanitation, IT, and Maintenance department tools based on your assigned role and permissions.
        </p>
      </div>
      {/* System Status */}
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span>System Online</span>
        </div>
        <div className="flex items-center gap-1">
          <Icon name="Clock" size={12} />
          <span>Last Updated: {new Date()?.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default MunicipalBranding;