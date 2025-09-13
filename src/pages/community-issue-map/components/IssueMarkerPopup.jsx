import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import IssueStatusIndicator from '../../../components/ui/IssueStatusIndicator';

const IssueMarkerPopup = ({ issue, onClose, onViewDetails }) => {
  const categoryIcons = {
    pothole: 'Construction',
    streetlight: 'Lightbulb',
    trash: 'Trash2',
    water: 'Droplets',
    traffic: 'Traffic',
    other: 'AlertCircle'
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleViewDetails = () => {
    onViewDetails(issue);
    onClose();
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 max-w-sm w-80 mx-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon 
                name={categoryIcons?.[issue?.category] || 'AlertCircle'} 
                size={16} 
                className="text-primary" 
              />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-foreground line-clamp-1">
                {issue?.isCluster ? issue?.title : issue?.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {issue?.isCluster ? `${issue?.count} issues` : `Reported ${formatDate(issue?.createdAt)}`}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={14}
            className="h-6 w-6"
          />
        </div>

        {/* Status */}
        {!issue?.isCluster && (
          <div className="mb-3">
            <IssueStatusIndicator status={issue?.status} size="sm" />
          </div>
        )}

        {/* Description */}
        <div className="mb-4">
          <p className="text-sm text-foreground line-clamp-2">
            {issue?.isCluster 
              ? `Multiple issues reported in this area including ${issue?.issues?.map(i => i?.category)?.join(', ')}`
              : issue?.description
            }
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-4 p-2 bg-muted rounded-md">
          <Icon name="MapPin" size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground font-mono">
            {issue?.location?.address || `${issue?.location?.lat?.toFixed(4)}, ${issue?.location?.lng?.toFixed(4)}`}
          </span>
        </div>

        {/* Priority Indicator */}
        {(issue?.priority === 'high' || issue?.count >= 5) && (
          <div className="flex items-center gap-2 mb-4 p-2 bg-warning/10 border border-warning/20 rounded-md">
            <Icon name="AlertTriangle" size={12} className="text-warning" />
            <span className="text-xs text-warning font-medium">
              {issue?.isCluster ? 'High Activity Area' : 'High Priority Issue'}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={handleViewDetails}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
            fullWidth
          >
            {issue?.isCluster ? 'View All Issues' : 'View Details'}
          </Button>
          {!issue?.isCluster && (
            <Button
              variant="outline"
              size="sm"
              iconName="Navigation"
              iconSize={14}
              onClick={() => {
                // Mock navigation to location
                console.log('Navigate to:', issue?.location);
              }}
            />
          )}
        </div>

        {/* Cluster Details */}
        {issue?.isCluster && issue?.issues && (
          <div className="mt-3 pt-3 border-t border-border">
            <h4 className="text-xs font-medium text-muted-foreground mb-2">Issues in this area:</h4>
            <div className="space-y-1 max-h-20 overflow-y-auto">
              {issue?.issues?.slice(0, 3)?.map((clusterIssue, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground capitalize">{clusterIssue?.category}</span>
                  <span className="text-muted-foreground">•</span>
                  <IssueStatusIndicator status={clusterIssue?.status} size="sm" showLabel={false} />
                </div>
              ))}
              {issue?.issues?.length > 3 && (
                <p className="text-xs text-muted-foreground">
                  +{issue?.issues?.length - 3} more issues
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueMarkerPopup;