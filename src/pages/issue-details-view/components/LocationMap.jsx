import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationMap = ({ location, relatedIssues = [] }) => {
  const [mapView, setMapView] = useState('satellite'); // 'satellite' or 'roadmap'

  const getMapUrl = (lat, lng, zoom = 16, maptype = 'roadmap') => {
    return `https://www.google.com/maps?q=${lat},${lng}&z=${zoom}&t=${maptype}&output=embed`;
  };

  const openInGoogleMaps = () => {
    const url = `https://www.google.com/maps?q=${location?.coordinates?.lat},${location?.coordinates?.lng}`;
    window.open(url, '_blank');
  };

  const toggleMapView = () => {
    setMapView(prev => prev === 'satellite' ? 'roadmap' : 'satellite');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Icon name="Map" size={20} className="text-primary" />
          Location Details
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName={mapView === 'satellite' ? 'Globe' : 'Satellite'}
            iconSize={14}
            onClick={toggleMapView}
          >
            {mapView === 'satellite' ? 'Road' : 'Satellite'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconSize={14}
            onClick={openInGoogleMaps}
          >
            Open in Maps
          </Button>
        </div>
      </div>
      {/* Address Information */}
      <div className="mb-4 p-3 bg-muted rounded-lg">
        <div className="flex items-start gap-2">
          <Icon name="MapPin" size={16} className="text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground mb-1">{location?.address}</p>
            <p className="text-xs text-muted-foreground font-mono">
              {location?.coordinates?.lat?.toFixed(6)}, {location?.coordinates?.lng?.toFixed(6)}
            </p>
            {location?.accuracy && (
              <p className="text-xs text-muted-foreground mt-1">
                Location accuracy: ±{location?.accuracy}m
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden border border-border mb-4">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Issue Location"
          referrerPolicy="no-referrer-when-downgrade"
          src={getMapUrl(
            location?.coordinates?.lat, 
            location?.coordinates?.lng, 
            16, 
            mapView
          )}
          className="w-full h-full"
        />
        
        {/* Map Overlay Controls */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          <Button
            variant="secondary"
            size="icon"
            iconName="Plus"
            iconSize={14}
            className="bg-white/90 hover:bg-white shadow-md"
          />
          <Button
            variant="secondary"
            size="icon"
            iconName="Minus"
            iconSize={14}
            className="bg-white/90 hover:bg-white shadow-md"
          />
        </div>
      </div>
      {/* Related Issues */}
      {relatedIssues?.length > 0 && (
        <div>
          <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
            <Icon name="MapPin" size={16} className="text-accent" />
            Nearby Issues ({relatedIssues?.length})
          </h3>
          <div className="space-y-2">
            {relatedIssues?.slice(0, 3)?.map((issue) => (
              <div key={issue?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    issue?.status === 'resolved' ? 'bg-success' :
                    issue?.status === 'in-progress' ? 'bg-accent' :
                    issue?.status === 'acknowledged' ? 'bg-primary' : 'bg-warning'
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{issue?.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {issue?.distance}m away • {issue?.category}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ArrowRight"
                  iconSize={14}
                />
              </div>
            ))}
            
            {relatedIssues?.length > 3 && (
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="MapPin"
                iconPosition="left"
                iconSize={14}
              >
                View All {relatedIssues?.length} Nearby Issues
              </Button>
            )}
          </div>
        </div>
      )}
      {/* Location Actions */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          iconName="Navigation"
          iconPosition="left"
          iconSize={14}
        >
          Get Directions
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Share2"
          iconPosition="left"
          iconSize={14}
        >
          Share Location
        </Button>
      </div>
    </div>
  );
};

export default LocationMap;