import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const MapFilterPanel = ({ 
  filters, 
  onFiltersChange, 
  isCollapsed, 
  onToggleCollapse,
  issueStats 
}) => {
  const [dateRange, setDateRange] = useState(filters?.dateRange || 'all');

  const categories = [
    { id: 'pothole', label: 'Potholes', color: 'bg-red-500', count: issueStats?.pothole || 0 },
    { id: 'streetlight', label: 'Street Lights', color: 'bg-yellow-500', count: issueStats?.streetlight || 0 },
    { id: 'trash', label: 'Trash/Sanitation', color: 'bg-green-500', count: issueStats?.trash || 0 },
    { id: 'water', label: 'Water Issues', color: 'bg-blue-500', count: issueStats?.water || 0 },
    { id: 'traffic', label: 'Traffic Signals', color: 'bg-purple-500', count: issueStats?.traffic || 0 },
    { id: 'other', label: 'Other Issues', color: 'bg-gray-500', count: issueStats?.other || 0 }
  ];

  const statusOptions = [
    { id: 'submitted', label: 'Submitted', count: issueStats?.submitted || 0 },
    { id: 'acknowledged', label: 'Acknowledged', count: issueStats?.acknowledged || 0 },
    { id: 'in-progress', label: 'In Progress', count: issueStats?.inProgress || 0 },
    { id: 'resolved', label: 'Resolved', count: issueStats?.resolved || 0 }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 3 Months' }
  ];

  const handleCategoryChange = (categoryId, checked) => {
    const updatedCategories = checked 
      ? [...(filters?.categories || []), categoryId]
      : (filters?.categories || [])?.filter(id => id !== categoryId);
    
    onFiltersChange({
      ...filters,
      categories: updatedCategories
    });
  };

  const handleStatusChange = (statusId, checked) => {
    const updatedStatuses = checked 
      ? [...(filters?.statuses || []), statusId]
      : (filters?.statuses || [])?.filter(id => id !== statusId);
    
    onFiltersChange({
      ...filters,
      statuses: updatedStatuses
    });
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    onFiltersChange({
      ...filters,
      dateRange: range
    });
  };

  const clearAllFilters = () => {
    setDateRange('all');
    onFiltersChange({
      categories: [],
      statuses: [],
      dateRange: 'all'
    });
  };

  const totalActiveFilters = (filters?.categories?.length || 0) + (filters?.statuses?.length || 0) + (filters?.dateRange !== 'all' ? 1 : 0);

  return (
    <div className={`bg-card border border-border rounded-lg shadow-sm transition-all duration-300 ${
      isCollapsed ? 'lg:w-12' : 'lg:w-80'
    } w-full lg:h-full`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Icon name="Filter" size={16} className="text-primary" />
            <h3 className="font-semibold text-foreground">Filters</h3>
            {totalActiveFilters > 0 && (
              <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                {totalActiveFilters}
              </span>
            )}
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
          iconSize={16}
        />
      </div>
      {!isCollapsed && (
        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {/* Clear Filters */}
          {totalActiveFilters > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
              fullWidth
            >
              Clear All Filters
            </Button>
          )}

          {/* Date Range Filter */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground">Time Period</h4>
            <div className="space-y-2">
              {dateRangeOptions?.map((option) => (
                <label key={option?.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dateRange"
                    value={option?.value}
                    checked={dateRange === option?.value}
                    onChange={(e) => handleDateRangeChange(e?.target?.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                  />
                  <span className="text-sm text-foreground">{option?.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground">Issue Categories</h4>
            <div className="space-y-2">
              {categories?.map((category) => (
                <div key={category?.id} className="flex items-center justify-between">
                  <Checkbox
                    label={
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${category?.color}`} />
                        <span className="text-sm">{category?.label}</span>
                      </div>
                    }
                    checked={filters?.categories?.includes(category?.id) || false}
                    onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
                  />
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {category?.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground">Issue Status</h4>
            <div className="space-y-2">
              {statusOptions?.map((status) => (
                <div key={status?.id} className="flex items-center justify-between">
                  <Checkbox
                    label={status?.label}
                    checked={filters?.statuses?.includes(status?.id) || false}
                    onChange={(e) => handleStatusChange(status?.id, e?.target?.checked)}
                  />
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {status?.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Areas */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-foreground">Priority Areas</h4>
            <div className="p-3 bg-warning/10 border border-warning/20 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="AlertTriangle" size={14} className="text-warning" />
                <span className="text-sm font-medium text-warning">High Activity Zones</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Areas with 5+ issues or urgent priority reports are highlighted on the map
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapFilterPanel;