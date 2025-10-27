'use client';

import { X, Download } from 'lucide-react';
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

  const handleDownload = () => {
    // Create CSV content
    const csvContent = [
      ['Energy Type', 'Consumption (kWh)'],
      ['Cooling', data.energy_by_type.cooling],
      ['Heating', data.energy_by_type.heating],
      ['Lighting', data.energy_by_type.lighting],
      ['Equipment', data.energy_by_type.equipment],
      ['Ventilation', data.energy_by_type.ventilation],
      ['Total', data.total_energy],
    ].map(row => row.join(',')).join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energyplus_results_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="w-[500px] bg-bg-medium border-l border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold">Simulation Results</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-bg-light rounded-lg transition-colors flex items-center gap-2"
            title="Download Results"
          >
            <Download size={18} className="text-text-secondary" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-bg-light rounded-lg transition-colors"
          >
            <X size={20} className="text-text-secondary" />
          </button>
        </div>
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

