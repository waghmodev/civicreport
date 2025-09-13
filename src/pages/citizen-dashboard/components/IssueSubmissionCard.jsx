import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import IssueStatusIndicator from '../../../components/ui/IssueStatusIndicator';
import Button from '../../../components/ui/Button';

const IssueSubmissionCard = ({ issue }) => {
  const navigate = useNavigate();

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Road & Infrastructure': 'Construction',
      'Sanitation': 'Trash2',
      'Street Lighting': 'Lightbulb',
      'Water & Drainage': 'Droplets',
      'Parks & Recreation': 'Trees',
      'Traffic & Transportation': 'Car',
      'Public Safety': 'Shield',
      'Other': 'AlertCircle'
    };
    return iconMap?.[category] || 'AlertCircle';
  };

  const getPriorityColor = (priority) => {
    const colorMap = {
      'High': 'text-error',
      'Medium': 'text-warning',
      'Low': 'text-success'
    };
    return colorMap?.[priority] || 'text-muted-foreground';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleViewDetails = () => {
    navigate('/issue-details-view', { state: { issueId: issue?.id } });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
      <div className="flex items-start gap-4">
        {/* Issue Image */}
        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-muted">
          <Image
            src={issue?.image}
            alt={`Issue ${issue?.id}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Issue Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Icon 
                name={getCategoryIcon(issue?.category)} 
                size={16} 
                className="text-muted-foreground" 
              />
              <span className="text-sm font-medium text-foreground">
                {issue?.category}
              </span>
            </div>
            <IssueStatusIndicator status={issue?.status} size="sm" />
          </div>

          <h3 className="font-medium text-foreground mb-1 line-clamp-1">
            {issue?.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {issue?.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="Calendar" size={12} />
                <span>{formatDate(issue?.submittedDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="MapPin" size={12} />
                <span className="truncate max-w-24">{issue?.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Flag" size={12} />
                <span className={getPriorityColor(issue?.priority)}>
                  {issue?.priority}
                </span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              iconSize={14}
              onClick={handleViewDetails}
            >
              View
            </Button>
          </div>

          {/* Progress Timeline */}
          {issue?.estimatedResolution && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Est. Resolution: {formatDate(issue?.estimatedResolution)}
                </span>
                <span className="text-primary font-medium">
                  {issue?.daysRemaining} days remaining
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueSubmissionCard;