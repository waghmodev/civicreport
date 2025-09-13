import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const IssueTypeSelector = ({ value, onChange, error }) => {
  const issueTypes = [
    { 
      value: 'pothole', 
      label: 'Pothole', 
      description: 'Road surface damage, cracks, or holes',
      icon: 'Construction'
    },
    { 
      value: 'streetlight', 
      label: 'Streetlight Issue', 
      description: 'Broken, flickering, or non-functional lights',
      icon: 'Lightbulb'
    },
    { 
      value: 'trash', 
      label: 'Trash/Waste Management', 
      description: 'Overflowing bins, missed collection, illegal dumping',
      icon: 'Trash2'
    },
    { 
      value: 'water', 
      label: 'Water/Drainage', 
      description: 'Leaks, flooding, blocked drains',
      icon: 'Droplets'
    },
    { 
      value: 'traffic', 
      label: 'Traffic Signal', 
      description: 'Malfunctioning signals, damaged signs',
      icon: 'Traffic'
    },
    { 
      value: 'sidewalk', 
      label: 'Sidewalk/Pathway', 
      description: 'Damaged walkways, accessibility issues',
      icon: 'Footprints'
    },
    { 
      value: 'park', 
      label: 'Parks & Recreation', 
      description: 'Damaged equipment, maintenance needed',
      icon: 'Trees'
    },
    { 
      value: 'noise', 
      label: 'Noise Complaint', 
      description: 'Excessive noise, disturbances',
      icon: 'Volume2'
    },
    { 
      value: 'graffiti', 
      label: 'Graffiti/Vandalism', 
      description: 'Property damage, unauthorized markings',
      icon: 'Paintbrush'
    },
    { 
      value: 'other', 
      label: 'Other', 
      description: 'Issues not covered by other categories',
      icon: 'MoreHorizontal'
    }
  ];

  const formatOptionLabel = (option) => (
    <div className="flex items-center gap-3 py-1">
      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-md">
        <Icon name={option?.icon} size={16} className="text-primary" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-foreground">{option?.label}</div>
        <div className="text-xs text-muted-foreground">{option?.description}</div>
      </div>
    </div>
  );

  const enhancedOptions = issueTypes?.map(option => ({
    ...option,
    customLabel: formatOptionLabel(option)
  }));

  return (
    <div className="space-y-2">
      <Select
        label="Issue Category"
        description="Select the type of civic issue you want to report"
        placeholder="Choose an issue category..."
        options={enhancedOptions}
        value={value}
        onChange={onChange}
        error={error}
        required
        searchable
        className="w-full"
      />
      
      {value && (
        <div className="p-3 bg-primary/5 border border-primary/20 rounded-md">
          <div className="flex items-center gap-2">
            <Icon name="Info" size={14} className="text-primary" />
            <span className="text-sm font-medium text-primary">Expected Response Time</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {value === 'pothole' && "Typically addressed within 3-5 business days"}
            {value === 'streetlight' && "Usually resolved within 1-2 business days"}
            {value === 'trash' && "Addressed within 24-48 hours"}
            {value === 'water' && "Emergency response within 2-4 hours"}
            {value === 'traffic' && "High priority - addressed within 4-8 hours"}
            {value === 'sidewalk' && "Typically addressed within 5-7 business days"}
            {value === 'park' && "Usually resolved within 3-5 business days"}
            {value === 'noise' && "Investigated within 24 hours"}
            {value === 'graffiti' && "Cleaned within 2-3 business days"}
            {value === 'other' && "Response time varies based on issue complexity"}
          </p>
        </div>
      )}
    </div>
  );
};

export default IssueTypeSelector;