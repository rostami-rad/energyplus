'use client';

import { EnergyByType } from '@/lib/api';

interface EnergyBreakdownProps {
  data: EnergyByType;
}

export default function EnergyBreakdown({ data }: EnergyBreakdownProps) {
  const categories = [
    { key: 'cooling', label: 'Cooling', color: '#22d3ee' },
    { key: 'heating', label: 'Heating', color: '#ef4444' },
    { key: 'lighting', label: 'Lighting', color: '#f59e0b' },
    { key: 'equipment', label: 'Equipment', color: '#8b5cf6' },
    { key: 'ventilation', label: 'Ventilation', color: '#10b981' },
  ];

  const total = Object.values(data).reduce((sum, val) => sum + val, 0);

  return (
    <div className="space-y-3">
      {categories.map((category) => {
        const value = data[category.key as keyof EnergyByType];
        const percentage = total > 0 ? (value / total) * 100 : 0;

        return (
          <div key={category.key}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-text-secondary">{category.label}</span>
              <span className="text-sm font-semibold text-text-primary">
                {value.toLocaleString()} kWh
              </span>
            </div>
            <div className="h-2 bg-bg-medium rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: category.color,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

