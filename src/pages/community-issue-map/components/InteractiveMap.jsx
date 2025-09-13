import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import IssueMarkerPopup from './IssueMarkerPopup';

const InteractiveMap = ({ 
  issues, 
  filters, 
  onIssueSelect, 
  userLocation,
  mapView,
  onMapViewChange 
}) => {
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [mapCenter, setMapCenter] = useState(userLocation || { lat: 40.7128, lng: -74.0060 });
  const [zoomLevel, setZoomLevel] = useState(12);
  const [showClusters, setShowClusters] = useState(true);

  // Filter issues based on current filters
  const filteredIssues = issues?.filter(issue => {
    const categoryMatch = !filters?.categories?.length || filters?.categories?.includes(issue?.category);
    const statusMatch = !filters?.statuses?.length || filters?.statuses?.includes(issue?.status);
    
    let dateMatch = true;
    if (filters?.dateRange && filters?.dateRange !== 'all') {
      const issueDate = new Date(issue.createdAt);
      const now = new Date();
      const daysAgo = parseInt(filters?.dateRange?.replace('d', ''));
      const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
      dateMatch = issueDate >= cutoffDate;
    }
    
    return categoryMatch && statusMatch && dateMatch;
  });

  // Group issues by location for clustering
  const clusteredIssues = showClusters ? groupIssuesByLocation(filteredIssues) : filteredIssues?.map(issue => ({ ...issue, isCluster: false, count: 1 }));

  // Priority areas (locations with 5+ issues)
  const priorityAreas = clusteredIssues?.filter(item => item?.count >= 5);

  const categoryColors = {
    pothole: 'bg-red-500',
    streetlight: 'bg-yellow-500',
    trash: 'bg-green-500',
    water: 'bg-blue-500',
    traffic: 'bg-purple-500',
    other: 'bg-gray-500'
  };

  const handleMarkerClick = (issue) => {
    setSelectedIssue(issue);
    if (onIssueSelect) {
      onIssueSelect(issue);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 1));
  };

  const centerOnUser = () => {
    if (userLocation) {
      setMapCenter(userLocation);
      setZoomLevel(14);
    }
  };

  const toggleMapView = () => {
    const newView = mapView === 'street' ? 'satellite' : 'street';
    onMapViewChange(newView);
  };

  const toggleClusters = () => {
    setShowClusters(!showClusters);
  };

  return (
    <div className="relative w-full h-full bg-muted rounded-lg overflow-hidden border border-border">
      {/* Map Container */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
        {/* Mock Map Background */}
        <div className="w-full h-full relative overflow-hidden">
          {/* Grid Pattern for Street View */}
          {mapView === 'street' && (
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-12 grid-rows-12 h-full w-full">
                {Array.from({ length: 144 })?.map((_, i) => (
                  <div key={i} className="border border-gray-300" />
                ))}
              </div>
            </div>
          )}

          {/* Satellite View Pattern */}
          {mapView === 'satellite' && (
            <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-yellow-100 to-blue-200 opacity-60" />
          )}

          {/* Priority Area Highlights */}
          {priorityAreas?.map((area, index) => (
            <div
              key={`priority-${index}`}
              className="absolute w-20 h-20 bg-warning/20 border-2 border-warning rounded-full animate-pulse"
              style={{
                left: `${(area?.location?.lng + 74.0060) * 800 + 200}px`,
                top: `${(40.7128 - area?.location?.lat) * 600 + 100}px`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          ))}

          {/* Issue Markers */}
          {clusteredIssues?.map((issue, index) => (
            <div
              key={issue?.isCluster ? `cluster-${index}` : issue?.id}
              className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110"
              style={{
                left: `${(issue?.location?.lng + 74.0060) * 800 + 200}px`,
                top: `${(40.7128 - issue?.location?.lat) * 600 + 100}px`,
                zIndex: selectedIssue?.id === issue?.id ? 50 : 10
              }}
              onClick={() => handleMarkerClick(issue)}
            >
              {issue?.isCluster ? (
                <div className="relative">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg border-2 border-white">
                    {issue?.count}
                  </div>
                  <div className="absolute -inset-2 bg-primary/20 rounded-full animate-ping" />
                </div>
              ) : (
                <div className={`w-6 h-6 ${categoryColors?.[issue?.category] || 'bg-gray-500'} rounded-full shadow-lg border-2 border-white flex items-center justify-center`}>
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}
            </div>
          ))}

          {/* User Location Marker */}
          {userLocation && (
            <div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                left: `${(userLocation?.lng + 74.0060) * 800 + 200}px`,
                top: `${(40.7128 - userLocation?.lat) * 600 + 100}px`
              }}
            >
              <div className="w-4 h-4 bg-accent rounded-full shadow-lg border-2 border-white">
                <div className="absolute -inset-2 bg-accent/30 rounded-full animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
        {/* Zoom Controls */}
        <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomIn}
            iconName="Plus"
            iconSize={16}
            className="rounded-none border-b border-border"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleZoomOut}
            iconName="Minus"
            iconSize={16}
            className="rounded-none"
          />
        </div>

        {/* View Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={toggleMapView}
          iconName={mapView === 'street' ? "Satellite" : "Map"}
          iconPosition="left"
          iconSize={14}
          className="bg-card"
        >
          {mapView === 'street' ? 'Satellite' : 'Street'}
        </Button>

        {/* Cluster Toggle */}
        <Button
          variant={showClusters ? "default" : "outline"}
          size="sm"
          onClick={toggleClusters}
          iconName="GitMerge"
          iconPosition="left"
          iconSize={14}
          className="bg-card"
        >
          Cluster
        </Button>

        {/* Center on User */}
        {userLocation && (
          <Button
            variant="outline"
            size="icon"
            onClick={centerOnUser}
            iconName="Navigation"
            iconSize={16}
            className="bg-card"
          />
        )}
      </div>
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 shadow-sm z-30 max-w-xs">
        <h4 className="font-medium text-sm text-foreground mb-2">Legend</h4>
        <div className="space-y-1">
          {Object.entries(categoryColors)?.map(([category, color]) => (
            <div key={category} className="flex items-center gap-2 text-xs">
              <div className={`w-3 h-3 ${color} rounded-full`} />
              <span className="text-muted-foreground capitalize">{category?.replace('-', ' ')}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 text-xs pt-1 border-t border-border">
            <div className="w-3 h-3 bg-accent rounded-full" />
            <span className="text-muted-foreground">Your Location</span>
          </div>
        </div>
      </div>
      {/* Issue Details Popup */}
      {selectedIssue && (
        <IssueMarkerPopup
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
          onViewDetails={() => onIssueSelect(selectedIssue)}
        />
      )}
      {/* Loading State */}
      {filteredIssues?.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/80 z-40">
          <div className="text-center">
            <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No issues found matching current filters</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to group issues by location for clustering
function groupIssuesByLocation(issues, threshold = 0.001) {
  const clusters = [];
  const processed = new Set();

  issues?.forEach((issue, index) => {
    if (processed?.has(index)) return;

    const cluster = {
      ...issue,
      isCluster: false,
      count: 1,
      issues: [issue]
    };

    // Find nearby issues
    issues?.forEach((otherIssue, otherIndex) => {
      if (index === otherIndex || processed?.has(otherIndex)) return;

      const distance = Math.sqrt(
        Math.pow(issue?.location?.lat - otherIssue?.location?.lat, 2) +
        Math.pow(issue?.location?.lng - otherIssue?.location?.lng, 2)
      );

      if (distance < threshold) {
        cluster?.issues?.push(otherIssue);
        cluster.count++;
        processed?.add(otherIndex);
      }
    });

    if (cluster?.count > 1) {
      cluster.isCluster = true;
      cluster.title = `${cluster?.count} Issues in Area`;
      cluster.description = `Multiple issues reported in this location`;
    }

    clusters?.push(cluster);
    processed?.add(index);
  });

  return clusters;
}

export default InteractiveMap;