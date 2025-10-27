'use client';

import { X } from 'lucide-react';
import { SimulationResponse } from '@/lib/api';
import EnergyChart from './EnergyChart';
import EnergyBreakdown from './EnergyBreakdown';

interface ResultsVisualizationProps {
  results: SimulationResponse;
  onClose: () => void;
}

export default function ResultsVisualization({
  results,
  onClose,
}: ResultsVisualizationProps) {
  const { results: data } = results;

  return (
    <div className="w-[500px] bg-bg-medium border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold">Simulation Results</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-bg-light rounded-lg transition-colors"
        >
          <X size={20} className="text-text-secondary" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Summary Stats */}
        <div className="bg-bg-light rounded-xl p-4 border border-border">
          <h3 className="text-sm font-semibold mb-3 text-text-secondary">
            Energy Summary
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">Total Energy</span>
              <span className="font-semibold">
                {data.total_energy.toLocaleString()} kWh
              </span>
            </div>
            {data.additional_info?.floor_area && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Floor Area</span>
                <span className="font-semibold">{data.additional_info.floor_area}</span>
              </div>
            )}
            {data.additional_info?.eui && (
              <div className="flex justify-between">
                <span className="text-text-secondary">EUI</span>
                <span className="font-semibold">
                  {data.additional_info.eui} kWh/m²
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Energy Chart */}
        <div className="bg-bg-light rounded-xl p-4 border border-border">
          <h3 className="text-sm font-semibold mb-3 text-text-secondary">
            Energy Consumption Breakdown
          </h3>
          <EnergyChart data={data.energy_breakdown} />
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-bg-light rounded-xl p-4 border border-border">
          <h3 className="text-sm font-semibold mb-3 text-text-secondary">
            Energy by Category
          </h3>
          <EnergyBreakdown data={data.energy_by_type} />
        </div>
      </div>
    </div>
  );
}

