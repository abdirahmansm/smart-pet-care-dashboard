import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FeedingEfficiencyTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'time', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const sortedData = [...data]?.sort((a, b) => {
    if (sortConfig?.direction === 'asc') {
      return a?.[sortConfig?.key] > b?.[sortConfig?.key] ? 1 : -1;
    }
    return a?.[sortConfig?.key] < b?.[sortConfig?.key] ? 1 : -1;
  });

  const totalPages = Math.ceil(sortedData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData?.slice(startIndex, startIndex + itemsPerPage);

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 95) return 'var(--color-success)';
    if (accuracy >= 85) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ChevronsUpDown" size={14} color="var(--color-muted-foreground)" />;
    }
    return (
      <Icon 
        name={sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
        size={14} 
        color="var(--color-primary)" 
      />
    );
  };

  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-[var(--color-foreground)] mb-1">
            Feeding Efficiency Analytics
          </h2>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            Per-meal performance metrics and waste analysis
          </p>
        </div>

        <button className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-primary-foreground)] rounded-lg text-sm font-medium hover:opacity-90 transition-opacity duration-200 flex items-center gap-2">
          <Icon name="Download" size={16} />
          Export Report
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              <th 
                className="text-left py-3 px-4 text-sm font-medium text-[var(--color-foreground)] cursor-pointer hover:bg-[var(--color-muted)] transition-colors duration-200"
                onClick={() => handleSort('time')}
              >
                <div className="flex items-center gap-2">
                  Time
                  <SortIcon columnKey="time" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 text-sm font-medium text-[var(--color-foreground)] cursor-pointer hover:bg-[var(--color-muted)] transition-colors duration-200"
                onClick={() => handleSort('mealType')}
              >
                <div className="flex items-center gap-2">
                  Meal Type
                  <SortIcon columnKey="mealType" />
                </div>
              </th>
              <th 
                className="text-left py-3 px-4 text-sm font-medium text-[var(--color-foreground)] cursor-pointer hover:bg-[var(--color-muted)] transition-colors duration-200"
                onClick={() => handleSort('device')}
              >
                <div className="flex items-center gap-2">
                  Device
                  <SortIcon columnKey="device" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-sm font-medium text-[var(--color-foreground)] cursor-pointer hover:bg-[var(--color-muted)] transition-colors duration-200"
                onClick={() => handleSort('scheduled')}
              >
                <div className="flex items-center justify-end gap-2">
                  Scheduled
                  <SortIcon columnKey="scheduled" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-sm font-medium text-[var(--color-foreground)] cursor-pointer hover:bg-[var(--color-muted)] transition-colors duration-200"
                onClick={() => handleSort('actual')}
              >
                <div className="flex items-center justify-end gap-2">
                  Actual
                  <SortIcon columnKey="actual" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-sm font-medium text-[var(--color-foreground)] cursor-pointer hover:bg-[var(--color-muted)] transition-colors duration-200"
                onClick={() => handleSort('accuracy')}
              >
                <div className="flex items-center justify-end gap-2">
                  Accuracy
                  <SortIcon columnKey="accuracy" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-sm font-medium text-[var(--color-foreground)] cursor-pointer hover:bg-[var(--color-muted)] transition-colors duration-200"
                onClick={() => handleSort('consumptionTime')}
              >
                <div className="flex items-center justify-end gap-2">
                  Time
                  <SortIcon columnKey="consumptionTime" />
                </div>
              </th>
              <th 
                className="text-right py-3 px-4 text-sm font-medium text-[var(--color-foreground)] cursor-pointer hover:bg-[var(--color-muted)] transition-colors duration-200"
                onClick={() => handleSort('waste')}
              >
                <div className="flex items-center justify-end gap-2">
                  Waste
                  <SortIcon columnKey="waste" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((row, index) => (
              <tr 
                key={index}
                className="border-b border-[var(--color-border)] hover:bg-[var(--color-muted)] transition-colors duration-200"
              >
                <td className="py-3 px-4 text-sm text-[var(--color-foreground)]">{row?.time}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[var(--color-primary)] bg-opacity-10 text-[var(--color-primary)] capitalize">
                    {row?.mealType}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-[var(--color-muted-foreground)]">{row?.device}</td>
                <td className="py-3 px-4 text-sm text-right text-[var(--color-foreground)]">{row?.scheduled}g</td>
                <td className="py-3 px-4 text-sm text-right text-[var(--color-foreground)]">{row?.actual}g</td>
                <td className="py-3 px-4 text-sm text-right">
                  <span 
                    className="font-medium"
                    style={{ color: getAccuracyColor(row?.accuracy) }}
                  >
                    {row?.accuracy}%
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-right text-[var(--color-muted-foreground)]">{row?.consumptionTime}</td>
                <td className="py-3 px-4 text-sm text-right">
                  <span className={row?.waste > 10 ? 'text-[var(--color-error)]' : 'text-[var(--color-success)]'}>
                    {row?.waste}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-[var(--color-border)]">
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData?.length)} of {sortedData?.length} entries
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm font-medium text-[var(--color-foreground)] hover:bg-[var(--color-muted)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>

          <div className="flex items-center gap-1">
            {[...Array(totalPages)]?.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  currentPage === i + 1
                    ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                    : 'text-[var(--color-foreground)] hover:bg-[var(--color-muted)]'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 border border-[var(--color-border)] rounded-lg text-sm font-medium text-[var(--color-foreground)] hover:bg-[var(--color-muted)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedingEfficiencyTable;