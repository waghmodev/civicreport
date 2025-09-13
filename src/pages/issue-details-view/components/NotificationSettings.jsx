import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const NotificationSettings = ({ currentSettings, onUpdateSettings }) => {
  const [settings, setSettings] = useState(currentSettings || {
    email: true,
    sms: false,
    push: true,
    statusUpdates: true,
    departmentMessages: true,
    resolutionPhotos: true,
    relatedIssues: false,
    emailAddress: '',
    phoneNumber: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      await onUpdateSettings(settings);
    } catch (error) {
      console.error('Failed to update settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const notificationTypes = [
    {
      key: 'statusUpdates',
      label: 'Status Updates',
      description: 'Get notified when your issue status changes',
      icon: 'Bell'
    },
    {
      key: 'departmentMessages',
      label: 'Department Messages',
      description: 'Receive messages from municipal staff',
      icon: 'MessageSquare'
    },
    {
      key: 'resolutionPhotos',
      label: 'Resolution Photos',
      description: 'Get notified when resolution photos are uploaded',
      icon: 'Camera'
    },
    {
      key: 'relatedIssues',
      label: 'Related Issues',
      description: 'Updates about similar issues in your area',
      icon: 'MapPin'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Settings" size={20} className="text-primary" />
          Notification Preferences
        </h2>
        <Button
          variant="ghost"
          size="sm"
          iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
          iconSize={14}
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced
        </Button>
      </div>
      {/* Delivery Methods */}
      <div className="mb-6">
        <h3 className="font-medium text-foreground mb-3">Delivery Methods</h3>
        <div className="space-y-3">
          <Checkbox
            label="Email Notifications"
            description="Receive notifications via email"
            checked={settings?.email}
            onChange={(e) => handleSettingChange('email', e?.target?.checked)}
          />
          <Checkbox
            label="SMS Notifications"
            description="Receive notifications via text message"
            checked={settings?.sms}
            onChange={(e) => handleSettingChange('sms', e?.target?.checked)}
          />
          <Checkbox
            label="Push Notifications"
            description="Receive browser push notifications"
            checked={settings?.push}
            onChange={(e) => handleSettingChange('push', e?.target?.checked)}
          />
        </div>
      </div>
      {/* Notification Types */}
      <div className="mb-6">
        <h3 className="font-medium text-foreground mb-3">What to notify me about</h3>
        <div className="space-y-4">
          {notificationTypes?.map((type) => (
            <div key={type?.key} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={type?.icon} size={14} className="text-primary" />
              </div>
              <div className="flex-1">
                <Checkbox
                  label={type?.label}
                  description={type?.description}
                  checked={settings?.[type?.key]}
                  onChange={(e) => handleSettingChange(type?.key, e?.target?.checked)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Advanced Settings */}
      {showAdvanced && (
        <div className="mb-6 p-4 bg-muted rounded-lg">
          <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="Settings2" size={16} className="text-primary" />
            Contact Information
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={settings?.emailAddress}
              onChange={(e) => handleSettingChange('emailAddress', e?.target?.value)}
              disabled={!settings?.email}
            />
            <Input
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={settings?.phoneNumber}
              onChange={(e) => handleSettingChange('phoneNumber', e?.target?.value)}
              disabled={!settings?.sms}
            />
          </div>
          
          <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-md">
            <div className="flex items-start gap-2">
              <Icon name="AlertTriangle" size={14} className="text-warning mt-0.5" />
              <div>
                <p className="text-sm font-medium text-warning">Privacy Notice</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Your contact information is only used for issue-related notifications and is not shared with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Volume2"
            iconSize={14}
          >
            Test Notification
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="History"
            iconSize={14}
          >
            Notification History
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSettings(currentSettings)}
          >
            Reset
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Save"
            iconPosition="left"
            iconSize={14}
            onClick={handleSaveSettings}
            loading={isLoading}
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;