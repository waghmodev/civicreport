import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MapFilterPanel from './components/MapFilterPanel';
import InteractiveMap from './components/InteractiveMap';
import MapSearchBar from './components/MapSearchBar';
import MapStatsOverview from './components/MapStatsOverview';
import Button from '../../components/ui/Button';


const CommunityIssueMap = () => {
  const navigate = useNavigate();
  const [isFilterPanelCollapsed, setIsFilterPanelCollapsed] = useState(false);
  const [mapView, setMapView] = useState('street');
  const [filters, setFilters] = useState({
    categories: [],
    statuses: [],
    dateRange: 'all'
  });

  // Mock user location
  const [userLocation] = useState({
    lat: 40.7128,
    lng: -74.0060,
    address: "123 Main Street, New York, NY"
  });

  // Mock issues data
  const [issues] = useState([
    {
      id: "ISS-001",
      title: "Large pothole on Main Street",
      description: "Deep pothole causing vehicle damage near intersection with Oak Avenue. Multiple cars have reported tire damage.",
      category: "pothole",
      status: "submitted",
      priority: "high",
      location: {
        lat: 40.7130,
        lng: -74.0058,
        address: "Main Street & Oak Avenue"
      },
      createdAt: "2025-01-10T08:30:00Z",
      reportedBy: "John Smith",
      images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"],
      votes: 12
    },
    {
      id: "ISS-002",
      title: "Broken streetlight",
      description: "Street light has been out for 3 days, creating safety hazard for pedestrians during evening hours.",
      category: "streetlight",
      status: "acknowledged",
      priority: "medium",
      location: {
        lat: 40.7125,
        lng: -74.0065,
        address: "Pine Street near Community Center"
      },
      createdAt: "2025-01-09T19:15:00Z",
      reportedBy: "Sarah Johnson",
      images: ["https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400"],
      votes: 8
    },
    {
      id: "ISS-003",
      title: "Overflowing trash bins",
      description: "Multiple trash bins overflowing for over a week. Attracting pests and creating unsanitary conditions.",
      category: "trash",
      status: "in-progress",
      priority: "high",
      location: {
        lat: 40.7135,
        lng: -74.0055,
        address: "Central Park Entrance"
      },
      createdAt: "2025-01-08T14:20:00Z",
      reportedBy: "Mike Davis",
      images: ["https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400"],
      votes: 15
    },
    {
      id: "ISS-004",
      title: "Water main leak",
      description: "Significant water leak causing flooding on sidewalk and potential foundation damage to nearby buildings.",
      category: "water",
      status: "in-progress",
      priority: "urgent",
      location: {
        lat: 40.7120,
        lng: -74.0070,
        address: "Elm Street & 2nd Avenue"
      },
      createdAt: "2025-01-11T06:45:00Z",
      reportedBy: "Lisa Chen",
      images: ["https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400"],
      votes: 23
    },
    {
      id: "ISS-005",
      title: "Traffic light malfunction",
      description: "Traffic light stuck on red in all directions, causing major traffic delays during rush hour.",
      category: "traffic",
      status: "resolved",
      priority: "high",
      location: {
        lat: 40.7140,
        lng: -74.0050,
        address: "Broadway & 5th Street"
      },
      createdAt: "2025-01-07T16:30:00Z",
      reportedBy: "Robert Wilson",
      images: ["https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400"],
      votes: 31,
      resolvedAt: "2025-01-08T10:15:00Z"
    },
    {
      id: "ISS-006",
      title: "Damaged sidewalk",
      description: "Cracked and uneven sidewalk creating tripping hazard for pedestrians, especially elderly residents.",
      category: "other",
      status: "submitted",
      priority: "medium",
      location: {
        lat: 40.7115,
        lng: -74.0075,
        address: "Maple Avenue near School"
      },
      createdAt: "2025-01-12T11:00:00Z",
      reportedBy: "Emma Thompson",
      images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"],
      votes: 6
    }
  ]);

  // Calculate statistics
  const issueStats = React.useMemo(() => {
    const stats = {
      total: issues?.length,
      active: issues?.filter(i => ['submitted', 'acknowledged', 'in-progress']?.includes(i?.status))?.length,
      inProgress: issues?.filter(i => i?.status === 'in-progress')?.length,
      resolved: issues?.filter(i => i?.status === 'resolved')?.length,
      submitted: issues?.filter(i => i?.status === 'submitted')?.length,
      acknowledged: issues?.filter(i => i?.status === 'acknowledged')?.length,
      priorityAreas: 2, // Mock priority areas count
      newReports: 3,
      recentResolved: 1,
      recentUpdated: 2
    };

    // Count by category
    issues?.forEach(issue => {
      stats[issue.category] = (stats?.[issue?.category] || 0) + 1;
    });

    return stats;
  }, [issues]);

  const handleLocationSearch = (location) => {
    console.log('Searching for location:', location);
    // In a real app, this would center the map on the searched location
  };

  const handleCenterMap = (location) => {
    console.log('Centering map on:', location);
    // In a real app, this would center the map on the specified location
  };

  const handleIssueSelect = (issue) => {
    if (issue?.isCluster) {
      // For clusters, navigate to a filtered view or show cluster details
      console.log('Viewing cluster:', issue);
    } else {
      // Navigate to issue details
      navigate('/issue-details-view', { state: { issueId: issue?.id } });
    }
  };

  const handleReportNewIssue = () => {
    navigate('/issue-reporting-form');
  };

  const toggleFilterPanel = () => {
    setIsFilterPanelCollapsed(!isFilterPanelCollapsed);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="h-[calc(100vh-4rem)] flex">
          {/* Filter Panel */}
          <div className={`transition-all duration-300 ${
            isFilterPanelCollapsed ? 'w-16' : 'w-80'
          } hidden lg:block border-r border-border bg-card`}>
            <div className="h-full flex flex-col">
              <MapFilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                isCollapsed={isFilterPanelCollapsed}
                onToggleCollapse={toggleFilterPanel}
                issueStats={issueStats}
              />
              
              {/* Stats Overview */}
              <div className="p-4 border-t border-border">
                <MapStatsOverview 
                  stats={issueStats} 
                  isCollapsed={isFilterPanelCollapsed} 
                />
              </div>
            </div>
          </div>

          {/* Main Map Area */}
          <div className="flex-1 flex flex-col">
            {/* Top Bar */}
            <div className="p-4 bg-card border-b border-border">
              <div className="flex items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="flex-1 max-w-md">
                  <MapSearchBar
                    onLocationSearch={handleLocationSearch}
                    onCenterMap={handleCenterMap}
                    userLocation={userLocation}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  {/* Mobile Filter Toggle */}
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Filter"
                    iconPosition="left"
                    iconSize={16}
                    className="lg:hidden"
                    onClick={toggleFilterPanel}
                  >
                    Filters
                  </Button>

                  {/* Report Issue Button */}
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={16}
                    onClick={handleReportNewIssue}
                  >
                    Report Issue
                  </Button>
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div className="flex-1 p-4">
              <InteractiveMap
                issues={issues}
                filters={filters}
                onIssueSelect={handleIssueSelect}
                userLocation={userLocation}
                mapView={mapView}
                onMapViewChange={setMapView}
              />
            </div>
          </div>
        </div>

        {/* Mobile Filter Panel Overlay */}
        {isFilterPanelCollapsed && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={toggleFilterPanel}>
            <div className="absolute left-0 top-16 bottom-0 w-80 bg-card" onClick={(e) => e?.stopPropagation()}>
              <MapFilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                isCollapsed={false}
                onToggleCollapse={toggleFilterPanel}
                issueStats={issueStats}
              />
              <div className="p-4 border-t border-border">
                <MapStatsOverview stats={issueStats} isCollapsed={false} />
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Button (Mobile) */}
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
          <Button
            variant="default"
            size="lg"
            iconName="Plus"
            iconSize={20}
            onClick={handleReportNewIssue}
            className="rounded-full shadow-lg"
          >
            Report
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CommunityIssueMap;