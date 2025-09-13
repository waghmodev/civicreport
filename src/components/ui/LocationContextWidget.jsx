import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const LocationContextWidget = ({ 
  onLocationChange,
  initialLocation = null,
  showMap = true,
  size = 'default',
  className = ''
}) => {
  const [location, setLocation] = useState(initialLocation || {
    address: '',
    coordinates: null,
    accuracy: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [manualEntry, setManualEntry] = useState(false);

  const sizeClasses = {
    sm: 'p-3',
    default: 'p-4',
    lg: 'p-6'
  };

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setIsLoading(true);
    setError('');

    navigator.geolocation?.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position?.coords;
        
        try {
          // Simulate reverse geocoding (in real app, use actual geocoding service)
          const mockAddress = `${latitude?.toFixed(4)}, ${longitude?.toFixed(4)}`;
          
          const newLocation = {
            address: mockAddress,
            coordinates: { lat: latitude, lng: longitude },
            accuracy: Math.round(accuracy)
          };
          
          setLocation(newLocation);
          onLocationChange?.(newLocation);
        } catch (err) {
          setError('Failed to get address for location');
        } finally {
          setIsLoading(false);
        }
      },
      (error) => {
        setIsLoading(false);
        switch (error?.code) {
          case error?.PERMISSION_DENIED:
            setError('Location access denied. Please enable location services.');
            break;
          case error?.POSITION_UNAVAILABLE:
            setError('Location information unavailable.');
            break;
          case error?.TIMEOUT:
            setError('Location request timed out.');
            break;
          default:
            setError('An unknown error occurred.');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const handleManualAddressChange = (e) => {
    const address = e?.target?.value;
    const newLocation = {
      ...location,
      address,
      coordinates: null // Clear coordinates when manually entering
    };
    setLocation(newLocation);
    onLocationChange?.(newLocation);
  };

  const toggleManualEntry = () => {
    setManualEntry(!manualEntry);
    setError('');
  };

  useEffect(() => {
    // Auto-detect location on mount if no initial location provided
    if (!initialLocation && !manualEntry) {
      getCurrentLocation();
    }
  }, [initialLocation, manualEntry]);

  return (
    <div className={`bg-card border border-border rounded-lg ${sizeClasses?.[size]} ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon name="MapPin" size={16} className="text-primary" />
          <span className="font-medium text-sm text-foreground">Location</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName={manualEntry ? "Navigation" : "Edit3"}
          iconSize={14}
          onClick={toggleManualEntry}
        >
          {manualEntry ? 'Auto-detect' : 'Manual'}
        </Button>
      </div>
      {error && (
        <div className="flex items-center gap-2 p-2 mb-3 bg-error/10 border border-error/20 rounded-md">
          <Icon name="AlertCircle" size={14} className="text-error" />
          <span className="text-sm text-error">{error}</span>
        </div>
      )}
      {manualEntry ? (
        <Input
          type="text"
          placeholder="Enter address or location description"
          value={location?.address}
          onChange={handleManualAddressChange}
          className="mb-3"
        />
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Navigation"
              iconPosition="left"
              iconSize={14}
              onClick={getCurrentLocation}
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Getting Location...' : 'Get Current Location'}
            </Button>
          </div>

          {location?.address && (
            <div className="p-3 bg-muted rounded-md">
              <div className="flex items-start gap-2">
                <Icon name="MapPin" size={14} className="text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground font-mono break-all">
                    {location?.address}
                  </p>
                  {location?.coordinates && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Coordinates: {location?.coordinates?.lat?.toFixed(6)}, {location?.coordinates?.lng?.toFixed(6)}
                      {location?.accuracy && ` (±${location?.accuracy}m)`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {showMap && location?.coordinates && (
        <div className="mt-3 h-32 bg-muted rounded-md flex items-center justify-center border border-border">
          <div className="text-center">
            <Icon name="Map" size={24} className="text-muted-foreground mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Map View</p>
            <p className="text-xs text-muted-foreground font-mono">
              {location?.coordinates?.lat?.toFixed(4)}, {location?.coordinates?.lng?.toFixed(4)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationContextWidget;