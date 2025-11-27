import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const FilterBar = ({ filters, onFilterChange, onBulkAction, selectedCount }) => {
  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical' },
    { value: 'warning', label: 'Warning' },
    { value: 'info', label: 'Info' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'health', label: 'Health' },
    { value: 'feeding', label: 'Feeding' },
    { value: 'environment', label: 'Environment' },
    { value: 'device', label: 'Device' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'acknowledged', label: 'Acknowledged' },
    { value: 'resolved', label: 'Resolved' }
  ];

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: 'all', label: 'All Time' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Severity"
          options={severityOptions}
          value={filters?.severity}
          onChange={(value) => onFilterChange('severity', value)}
        />
        <Select
          label="Category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
        />
        <Select
          label="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
        />
        <Select
          label="Time Range"
          options={timeRangeOptions}
          value={filters?.timeRange}
          onChange={(value) => onFilterChange('timeRange', value)}
        />
      </div>
      {selectedCount > 0 && (
        <div className="flex items-center gap-2 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">
            {selectedCount} alert{selectedCount !== 1 ? 's' : ''} selected
          </span>
          <Button
            variant="secondary"
            size="sm"
            iconName="Check"
            iconPosition="left"
            onClick={() => onBulkAction('acknowledge')}
          >
            Acknowledge All
          </Button>
          <Button
            variant="success"
            size="sm"
            iconName="CheckCheck"
            iconPosition="left"
            onClick={() => onBulkAction('resolve')}
          >
            Resolve All
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterBar;