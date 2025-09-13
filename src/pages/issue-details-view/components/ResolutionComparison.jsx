import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ResolutionComparison = ({ beforeImages, afterImages, resolutionDetails }) => {
  const [selectedBeforeIndex, setSelectedBeforeIndex] = useState(0);
  const [selectedAfterIndex, setSelectedAfterIndex] = useState(0);
  const [comparisonMode, setComparisonMode] = useState('side-by-side'); // 'side-by-side' or 'overlay'

  if (!afterImages || afterImages?.length === 0) {
    return null;
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const toggleComparisonMode = () => {
    setComparisonMode(prev => prev === 'side-by-side' ? 'overlay' : 'side-by-side');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="ImageIcon" size={20} className="text-success" />
          Before & After Comparison
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName={comparisonMode === 'side-by-side' ? 'Layers' : 'SplitSquareHorizontal'}
            iconSize={14}
            onClick={toggleComparisonMode}
          >
            {comparisonMode === 'side-by-side' ? 'Overlay' : 'Side by Side'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconSize={14}
          >
            Download
          </Button>
        </div>
      </div>
      {/* Resolution Details */}
      {resolutionDetails && (
        <div className="bg-success/5 border border-success/20 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="CheckCircle" size={16} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-success mb-1">Issue Resolved</h3>
              <p className="text-sm text-foreground mb-2">{resolutionDetails?.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Icon name="Calendar" size={12} />
                  Completed {formatDate(resolutionDetails?.completedAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="User" size={12} />
                  {resolutionDetails?.resolvedBy}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Clock" size={12} />
                  {resolutionDetails?.duration} days
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Image Comparison */}
      <div className={`grid gap-6 ${comparisonMode === 'side-by-side' ? 'lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Before Images */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <div className="w-3 h-3 bg-error rounded-full" />
              Before ({beforeImages?.length})
            </h3>
            {beforeImages?.length > 1 && (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="ChevronLeft"
                  iconSize={14}
                  onClick={() => setSelectedBeforeIndex(prev => 
                    prev > 0 ? prev - 1 : beforeImages?.length - 1
                  )}
                />
                <span className="text-xs text-muted-foreground px-2">
                  {selectedBeforeIndex + 1} / {beforeImages?.length}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="ChevronRight"
                  iconSize={14}
                  onClick={() => setSelectedBeforeIndex(prev => 
                    prev < beforeImages?.length - 1 ? prev + 1 : 0
                  )}
                />
              </div>
            )}
          </div>
          
          <div className="relative group overflow-hidden rounded-lg border border-border">
            <Image
              src={beforeImages?.[selectedBeforeIndex]?.url}
              alt={`Before image ${selectedBeforeIndex + 1}`}
              className="w-full h-64 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              iconName="Expand"
              iconSize={16}
            />
            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
              {formatDate(beforeImages?.[selectedBeforeIndex]?.timestamp)}
            </div>
          </div>

          {/* Before Thumbnails */}
          {beforeImages?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {beforeImages?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedBeforeIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all duration-200 ${
                    index === selectedBeforeIndex 
                      ? 'border-error shadow-md' 
                      : 'border-border hover:border-error/50'
                  }`}
                >
                  <Image
                    src={image?.url}
                    alt={`Before thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* After Images */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              After ({afterImages?.length})
            </h3>
            {afterImages?.length > 1 && (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="ChevronLeft"
                  iconSize={14}
                  onClick={() => setSelectedAfterIndex(prev => 
                    prev > 0 ? prev - 1 : afterImages?.length - 1
                  )}
                />
                <span className="text-xs text-muted-foreground px-2">
                  {selectedAfterIndex + 1} / {afterImages?.length}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="ChevronRight"
                  iconSize={14}
                  onClick={() => setSelectedAfterIndex(prev => 
                    prev < afterImages?.length - 1 ? prev + 1 : 0
                  )}
                />
              </div>
            )}
          </div>
          
          <div className="relative group overflow-hidden rounded-lg border border-border">
            <Image
              src={afterImages?.[selectedAfterIndex]?.url}
              alt={`After image ${selectedAfterIndex + 1}`}
              className="w-full h-64 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              iconName="Expand"
              iconSize={16}
            />
            <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
              {formatDate(afterImages?.[selectedAfterIndex]?.timestamp)}
            </div>
          </div>

          {/* After Thumbnails */}
          {afterImages?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {afterImages?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAfterIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all duration-200 ${
                    index === selectedAfterIndex 
                      ? 'border-success shadow-md' 
                      : 'border-border hover:border-success/50'
                  }`}
                >
                  <Image
                    src={image?.url}
                    alt={`After thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Comparison Actions */}
      <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName="Share2"
          iconPosition="left"
          iconSize={14}
        >
          Share Comparison
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="ThumbsUp"
          iconPosition="left"
          iconSize={14}
        >
          Rate Resolution
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="MessageSquare"
          iconPosition="left"
          iconSize={14}
        >
          Provide Feedback
        </Button>
      </div>
    </div>
  );
};

export default ResolutionComparison;