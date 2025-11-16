'use client';

import { Clock, RefreshCw, RotateCcw, X } from 'lucide-react';
import { SimulationHistoryEntry } from '@/lib/api';

interface SimulationHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: SimulationHistoryEntry[];
  loading: boolean;
  onRefresh: () => void;
  onRerun: (message: string) => void;
}

export default function SimulationHistoryPanel({
  isOpen,
  onClose,
  history,
  loading,
  onRefresh,
  onRerun,
}: SimulationHistoryPanelProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-bg-medium rounded-xl p-6 w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col border border-border">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Clock className="text-primary" size={24} />
            <div>
              <h2 className="text-xl font-semibold">Simulation History</h2>
              <p className="text-sm text-text-muted">Recent EnergyPlus runs stored on the server</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 px-3 py-2 bg-bg-light hover:bg-bg-dark rounded-lg transition-colors border border-border text-sm"
              disabled={loading}
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button onClick={onClose} className="p-2 hover:bg-bg-light rounded-lg transition-colors">
              <X size={20} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {loading && history.length === 0 && (
            <div className="text-center text-text-muted py-12">Loading history...</div>
          )}

          {!loading && history.length === 0 && (
            <div className="text-center text-text-muted py-12">
              No simulations have been recorded yet. Run one to get started.
            </div>
          )}

          {history.map((entry) => (
            <div
              key={entry.simulation_id}
              className="border border-border rounded-xl p-4 bg-bg-light flex flex-col gap-3"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm text-text-muted">#{entry.simulation_id}</p>
                  <p className="font-semibold">{entry.message}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Clock size={14} />
                  <span>{new Date(entry.created_at).toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-text-muted">Total Energy</p>
                  <p className="font-semibold">{entry.total_energy.toLocaleString()} kWh</p>
                </div>
                <div>
                  <p className="text-text-muted">Cooling</p>
                  <p className="font-semibold">{entry.energy_by_type.cooling.toLocaleString()} kWh</p>
                </div>
                <div>
                  <p className="text-text-muted">Heating</p>
                  <p className="font-semibold">{entry.energy_by_type.heating.toLocaleString()} kWh</p>
                </div>
                <div>
                  <p className="text-text-muted">Source</p>
                  <p className="font-semibold">{entry.used_mock_data ? 'Mock Data' : 'EnergyPlus'}</p>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <p className="text-xs text-text-muted">
                  IDF: {entry.idf_file || 'default.idf'} • Ventilation:{' '}
                  {entry.energy_by_type.ventilation.toLocaleString()} kWh
                </p>
                <button
                  onClick={() => onRerun(entry.message)}
                  className="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm transition-colors"
                >
                  <RotateCcw size={16} />
                  Re-run this scenario
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

