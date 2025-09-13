import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import IssueStatusIndicator from '../../../components/ui/IssueStatusIndicator';
import Button from '../../../components/ui/Button';

const IssueHeader = ({ issue, onBack, onEdit }) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error bg-error/10 border-error/20';
      case 'medium':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'low':
        return 'text-success bg-success/10 border-success/20';
      default:
        return 'text-muted-foreground bg-muted border-muted-foreground/20';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          iconName="ArrowLeft"
          iconPosition="left"
          iconSize={16}
          onClick={onBack}
        >
          Back to Dashboard
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Edit3"
            iconPosition="left"
            iconSize={16}
            onClick={onEdit}
          >
            Edit Issue
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Share2"
            iconSize={16}
          />
        </div>
      </div>
      {/* Issue Title and Status */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-semibold text-foreground">{issue?.title}</h1>
            <IssueStatusIndicator status={issue?.status} size="default" />
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Icon name="Calendar" size={14} />
              Submitted {formatDate(issue?.submittedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="Hash" size={14} />
              #{issue?.id}
            </span>
            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium ${getPriorityColor(issue?.priority)}`}>
              <Icon name="Flag" size={12} />
              {issue?.priority?.charAt(0)?.toUpperCase() + issue?.priority?.slice(1)} Priority
            </div>
          </div>
        </div>
      </div>
      {/* Issue Images */}
      {issue?.images && issue?.images?.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {issue?.images?.map((image, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg border border-border">
              <Image
                src={image?.url}
                alt={`Issue image ${index + 1}`}
                className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                iconName="Expand"
                iconSize={16}
              />
            </div>
          ))}
        </div>
      )}
      {/* Issue Description */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <h3 className="font-medium text-foreground mb-2">Description</h3>
        <p className="text-muted-foreground leading-relaxed">{issue?.description}</p>
      </div>
      {/* Location and Department Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="font-medium text-foreground flex items-center gap-2">
            <Icon name="MapPin" size={16} className="text-primary" />
            Location
          </h3>
          <p className="text-sm text-muted-foreground">{issue?.location?.address}</p>
          <div className="text-xs text-muted-foreground font-mono">
            {issue?.location?.coordinates?.lat?.toFixed(6)}, {issue?.location?.coordinates?.lng?.toFixed(6)}
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium text-foreground flex items-center gap-2">
            <Icon name="Building2" size={16} className="text-primary" />
            Department
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Users" size={14} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{issue?.assignedDepartment}</p>
              <p className="text-xs text-muted-foreground">Assigned Department</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueHeader;