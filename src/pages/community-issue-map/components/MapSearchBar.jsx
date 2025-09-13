import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MapSearchBar = ({ onLocationSearch, onCenterMap, userLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Mock search results for demonstration
  const mockLocations = [
    { id: 1, name: "City Hall", address: "123 Main Street, Downtown", lat: 40.7128, lng: -74.0060, type: "government" },
    { id: 2, name: "Central Park", address: "Central Park, Manhattan", lat: 40.7829, lng: -73.9654, type: "park" },
    { id: 3, name: "Brooklyn Bridge", address: "Brooklyn Bridge, NYC", lat: 40.7061, lng: -73.9969, type: "landmark" },
    { id: 4, name: "Times Square", address: "Times Square, Manhattan", lat: 40.7580, lng: -73.9855, type: "landmark" },
    { id: 5, name: "Public Library", address: "456 Oak Avenue, Midtown", lat: 40.7614, lng: -73.9776, type: "public" },
    { id: 6, name: "Fire Station 12", address: "789 Pine Street, Queens", lat: 40.7282, lng: -73.7949, type: "emergency" },
    { id: 7, name: "Community Center", address: "321 Elm Street, Brooklyn", lat: 40.6892, lng: -73.9442, type: "community" }
  ];

  const locationTypeIcons = {
    government: 'Building2',
    park: 'Trees',
    landmark: 'MapPin',
    public: 'BookOpen',
    emergency: 'Shield',
    community: 'Users'
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (query) => {
    if (!query?.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = mockLocations?.filter(location =>
        location?.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
        location?.address?.toLowerCase()?.includes(query?.toLowerCase())
      );
      
      setSearchResults(filtered);
      setShowResults(true);
      setIsSearching(false);
    }, 300);
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const handleLocationSelect = (location) => {
    setSearchQuery(location?.name);
    setShowResults(false);
    onLocationSearch(location);
  };

  const handleCurrentLocation = () => {
    if (userLocation) {
      onCenterMap(userLocation);
      setSearchQuery('Current Location');
    } else {
      // Mock getting current location
      const mockUserLocation = { lat: 40.7128, lng: -74.0060, address: "Current Location" };
      onCenterMap(mockUserLocation);
      setSearchQuery('Current Location');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search locations, addresses, or landmarks..."
          value={searchQuery}
          onChange={handleInputChange}
          className="pl-10 pr-20"
        />
        
        {/* Search Icon */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Icon 
            name={isSearching ? "Loader2" : "Search"} 
            size={16} 
            className={`text-muted-foreground ${isSearching ? 'animate-spin' : ''}`} 
          />
        </div>

        {/* Action Buttons */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              iconName="X"
              iconSize={14}
              className="h-6 w-6"
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleCurrentLocation}
            iconName="Navigation"
            iconSize={14}
            className="h-6 w-6"
            title="Use current location"
          />
        </div>
      </div>
      {/* Search Results Dropdown */}
      {showResults && searchResults?.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {searchResults?.map((location) => (
            <button
              key={location?.id}
              onClick={() => handleLocationSelect(location)}
              className="w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-150 border-b border-border last:border-b-0 first:rounded-t-lg last:rounded-b-lg"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon 
                    name={locationTypeIcons?.[location?.type] || 'MapPin'} 
                    size={14} 
                    className="text-primary" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-foreground truncate">
                    {location?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground truncate">
                    {location?.address}
                  </p>
                </div>
                <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      )}
      {/* No Results */}
      {showResults && searchQuery && searchResults?.length === 0 && !isSearching && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 p-4">
          <div className="text-center">
            <Icon name="Search" size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No locations found</p>
            <p className="text-xs text-muted-foreground mt-1">
              Try searching for landmarks, addresses, or points of interest
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapSearchBar;