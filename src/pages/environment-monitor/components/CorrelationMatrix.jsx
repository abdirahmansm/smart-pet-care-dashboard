import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CorrelationMatrix = ({ data }) => {
  const [selectedCell, setSelectedCell] = useState(null);

  const getCorrelationColor = (value) => {
    if (value >= 0.7) return 'var(--color-success)';
    if (value >= 0.4) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  const getCorrelationBgColor = (value) => {
    const opacity = Math.abs(value) * 0.3;
    if (value >= 0.7) return `rgba(16, 185, 129, ${opacity})`;
    if (value >= 0.4) return `rgba(251, 191, 36, ${opacity})`;
    return `rgba(239, 68, 68, ${opacity})`;
  };

  const getCorrelationLabel = (value) => {
    if (value >= 0.7) return 'Strong';
    if (value >= 0.4) return 'Moderate';
    return 'Weak';
  };

  const handleCellClick = (row, col, value) => {
    setSelectedCell({ row, col, value });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Environmental Correlation Matrix</h2>
          <p className="text-sm text-muted-foreground mt-1">Relationship between conditions and pet behavior</p>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Info" size={16} color="var(--color-muted-foreground)" />
          <span className="text-xs text-muted-foreground">Click cells for details</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-left text-xs font-medium text-muted-foreground border-b border-border"></th>
              {data?.columns?.map((col, index) => (
                <th
                  key={index}
                  className="p-2 text-center text-xs font-medium text-foreground border-b border-border"
                >
                  <div className="flex flex-col items-center gap-1">
                    <Icon name={col?.icon} size={16} />
                    <span className="hidden md:inline">{col?.label}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.rows?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="p-2 text-xs font-medium text-foreground border-r border-border">
                  <div className="flex items-center gap-2">
                    <Icon name={row?.icon} size={16} />
                    <span className="hidden md:inline">{row?.label}</span>
                  </div>
                </td>
                {row?.values?.map((value, colIndex) => (
                  <td
                    key={colIndex}
                    className="p-2 text-center border border-border cursor-pointer hover:opacity-80 transition-opacity duration-200"
                    style={{ backgroundColor: getCorrelationBgColor(value) }}
                    onClick={() => handleCellClick(row?.label, data?.columns?.[colIndex]?.label, value)}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: getCorrelationColor(value) }}
                      >
                        {value?.toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground hidden md:inline">
                        {getCorrelationLabel(value)}
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedCell && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-sm font-semibold text-foreground">Correlation Details</h3>
            <button
              onClick={() => setSelectedCell(null)}
              className="p-1 hover:bg-card rounded transition-colors duration-200"
              aria-label="Close details"
            >
              <Icon name="X" size={14} color="var(--color-muted-foreground)" />
            </button>
          </div>
          <div className="space-y-2 text-xs">
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">{selectedCell?.row}</span>
              {' vs '}
              <span className="font-medium text-foreground">{selectedCell?.col}</span>
            </p>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Correlation Strength:</span>
              <span
                className="font-semibold"
                style={{ color: getCorrelationColor(selectedCell?.value) }}
              >
                {selectedCell?.value?.toFixed(2)} ({getCorrelationLabel(selectedCell?.value)})
              </span>
            </div>
            <p className="text-muted-foreground mt-2">
              {selectedCell?.value >= 0.7
                ? `Strong positive correlation indicates ${selectedCell?.row?.toLowerCase()} significantly influences ${selectedCell?.col?.toLowerCase()}.`
                : selectedCell?.value >= 0.4
                ? `Moderate correlation suggests ${selectedCell?.row?.toLowerCase()} has some influence on ${selectedCell?.col?.toLowerCase()}.`
                : `Weak correlation indicates minimal relationship between ${selectedCell?.row?.toLowerCase()} and ${selectedCell?.col?.toLowerCase()}.`}
            </p>
          </div>
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: getCorrelationBgColor(0.8) }} />
              <span className="text-muted-foreground">Strong (≥0.7)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: getCorrelationBgColor(0.5) }} />
              <span className="text-muted-foreground">Moderate (0.4-0.7)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: getCorrelationBgColor(0.2) }} />
              <span className="text-muted-foreground">Weak (&lt;0.4)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrelationMatrix;