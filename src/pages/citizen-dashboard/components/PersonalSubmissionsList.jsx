import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import IssueSubmissionCard from './IssueSubmissionCard';

const PersonalSubmissionsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock user submissions data
  const userSubmissions = [
    {
      id: "NPR-2025-001",
      title: "Overflowing municipal garbage bin near Sitabuldi Market",
      description: "Large concrete garbage bin overflowing with waste materials scattered around the surrounding area. Plastic bags and various garbage covering the paved ground, creating unhygienic conditions for pedestrians and shoppers.",
      category: "Sanitation",
      status: "in-progress",
      priority: "High",
      submittedDate: "2025-09-10T08:30:00Z",
      estimatedResolution: "2025-09-18T17:00:00Z",
      daysRemaining: 5,
      location: "Sitabuldi Market, Nagpur",
      image: "https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: "NPR-2025-002", 
      title: "Waste spillage blocking pedestrian walkway in Civil Lines",
      description: "Municipal garbage container has overflowed causing waste materials to spill onto the walkway. Debris and plastic waste creating obstacles for daily commuters and contributing to poor sanitation.",
      category: "Sanitation",
      status: "acknowledged",
      priority: "Medium",
      submittedDate: "2025-09-08T14:15:00Z",
      estimatedResolution: "2025-09-15T12:00:00Z",
      daysRemaining: 2,
      location: "Civil Lines Area, Nagpur",
      image: "https://images.pexels.com/photos/3951628/pexels-photo-3951628.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: "NPR-2025-003",
      title: "Garbage overflow near Dharampeth residential area",
      description: "Multiple waste bins overflowing with household and commercial waste. Scattered garbage creating unsanitary environment and attracting stray animals and pests in the residential zone.",
      category: "Sanitation", 
      status: "resolved",
      priority: "Medium",
      submittedDate: "2025-09-05T10:45:00Z",
      estimatedResolution: null,
      daysRemaining: null,
      location: "Dharampeth, Nagpur",
      image: "https://images.pexels.com/photos/4099351/pexels-photo-4099351.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: "NPR-2025-004",
      title: "Municipal waste container overflow at Sadar area",
      description: "Large cement garbage bin completely overflowing with mixed waste including plastic bags, food waste, and paper materials. Spillage covering significant ground area around the container.",
      category: "Sanitation",
      status: "submitted", 
      priority: "High",
      submittedDate: "2025-09-12T16:20:00Z",
      estimatedResolution: "2025-09-20T15:00:00Z",
      daysRemaining: 7,
      location: "Sadar Area, Nagpur",
      image: "https://images.pexels.com/photos/2827354/pexels-photo-2827354.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: "NPR-2025-005",
      title: "Waste management crisis near Itwari railway station",
      description: "Multiple garbage disposal points overflowing simultaneously causing widespread waste scattering. High-traffic area near railway station severely affected, requiring immediate cleanup and better waste management system.",
      category: "Sanitation",
      status: "in-progress",
      priority: "High", 
      submittedDate: "2025-09-11T07:00:00Z",
      estimatedResolution: "2025-09-16T18:00:00Z",
      daysRemaining: 3,
      location: "Itwari Railway Station, Nagpur",
      image: "https://images.pexels.com/photos/4099352/pexels-photo-4099352.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'acknowledged', label: 'Acknowledged' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Road & Infrastructure', label: 'Road & Infrastructure' },
    { value: 'Street Lighting', label: 'Street Lighting' },
    { value: 'Sanitation', label: 'Sanitation' },
    { value: 'Water & Drainage', label: 'Water & Drainage' },
    { value: 'Parks & Recreation', label: 'Parks & Recreation' },
    { value: 'Traffic & Transportation', label: 'Traffic & Transportation' },
    { value: 'Public Safety', label: 'Public Safety' },
    { value: 'Other', label: 'Other' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'priority', label: 'Priority' },
    { value: 'status', label: 'Status' }
  ];

  // Filter and sort submissions
  const filteredSubmissions = userSubmissions?.filter(submission => {
      const matchesSearch = submission?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           submission?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           submission?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesStatus = statusFilter === 'all' || submission?.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || submission?.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesCategory;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.submittedDate) - new Date(a.submittedDate);
        case 'oldest':
          return new Date(a.submittedDate) - new Date(b.submittedDate);
        case 'priority':
          const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return priorityOrder?.[b?.priority] - priorityOrder?.[a?.priority];
        case 'status':
          return a?.status?.localeCompare(b?.status);
        default:
          return 0;
      }
    });

  const getStatusCounts = () => {
    const counts = {
      total: userSubmissions?.length,
      submitted: userSubmissions?.filter(s => s?.status === 'submitted')?.length,
      acknowledged: userSubmissions?.filter(s => s?.status === 'acknowledged')?.length,
      'in-progress': userSubmissions?.filter(s => s?.status === 'in-progress')?.length,
      resolved: userSubmissions?.filter(s => s?.status === 'resolved')?.length
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="FileText" size={20} className="text-primary" />
          <h2 className="text-lg font-semibold text-foreground">My Submissions</h2>
          <span className="px-2 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            {statusCounts?.total}
          </span>
        </div>
      </div>
      {/* Status Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Clock" size={14} className="text-warning" />
            <span className="text-xs text-warning font-medium">Submitted</span>
          </div>
          <span className="text-lg font-semibold text-foreground">{statusCounts?.submitted}</span>
        </div>
        <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Eye" size={14} className="text-primary" />
            <span className="text-xs text-primary font-medium">Acknowledged</span>
          </div>
          <span className="text-lg font-semibold text-foreground">{statusCounts?.acknowledged}</span>
        </div>
        <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Wrench" size={14} className="text-accent" />
            <span className="text-xs text-accent font-medium">In Progress</span>
          </div>
          <span className="text-lg font-semibold text-foreground">{statusCounts?.['in-progress']}</span>
        </div>
        <div className="p-3 bg-success/10 rounded-lg border border-success/20">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="CheckCircle" size={14} className="text-success" />
            <span className="text-xs text-success font-medium">Resolved</span>
          </div>
          <span className="text-lg font-semibold text-foreground">{statusCounts?.resolved}</span>
        </div>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Input
          type="search"
          placeholder="Search submissions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
        />
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
          placeholder="Filter by status"
        />
        <Select
          options={categoryOptions}
          value={categoryFilter}
          onChange={setCategoryFilter}
          placeholder="Filter by category"
        />
        <Select
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
          placeholder="Sort by"
        />
      </div>
      {/* Results Info */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">
          Showing {filteredSubmissions?.length} of {userSubmissions?.length} submissions
        </span>
        {(searchTerm || statusFilter !== 'all' || categoryFilter !== 'all') && (
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconPosition="left"
            iconSize={14}
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setCategoryFilter('all');
              setSortBy('newest');
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>
      {/* Submissions List */}
      <div className="space-y-4">
        {filteredSubmissions?.length > 0 ? (
          filteredSubmissions?.map((submission) => (
            <IssueSubmissionCard key={submission?.id} issue={submission} />
          ))
        ) : (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No submissions found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all' ? "Try adjusting your filters or search terms" :"You haven't submitted any issues yet"
              }
            </p>
            {!searchTerm && statusFilter === 'all' && categoryFilter === 'all' && (
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
                onClick={() => window.location.href = '/issue-reporting-form'}
              >
                Report Your First Issue
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalSubmissionsList;