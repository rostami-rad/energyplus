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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-bg-medium rounded-xl p-4 sm:p-6 w-full max-w-3xl max-h-[90vh] sm:max-h-[80vh] overflow-hidden flex flex-col border border-border">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Clock className="text-primary flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-semibold truncate">Simulation History</h2>
              <p className="text-xs sm:text-sm text-text-muted hidden sm:block">Recent EnergyPlus runs stored on the server</p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <button
              onClick={onRefresh}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-bg-light hover:bg-bg-dark rounded-lg transition-colors border border-border text-xs sm:text-sm"
              disabled={loading}
            >
              <RefreshCw size={14} className={`sm:w-4 sm:h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button onClick={onClose} className="p-2 hover:bg-bg-light rounded-lg transition-colors">
              <X size={18} className="sm:w-5 sm:h-5 text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-2 sm:space-y-3 pr-1 sm:pr-2">
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
              className="border border-border rounded-xl p-3 sm:p-4 bg-bg-light flex flex-col gap-2 sm:gap-3"
            >
              <div className="flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-text-muted truncate">#{entry.simulation_id}</p>
                  <p className="font-semibold text-sm sm:text-base truncate">{entry.message}</p>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-text-muted flex-shrink-0">
                  <Clock size={12} className="sm:w-3.5 sm:h-3.5" />
                  <span className="whitespace-nowrap">{new Date(entry.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm">
                <div>
                  <p className="text-text-muted">Total Energy</p>
                  <p className="font-semibold truncate">{entry.total_energy.toLocaleString()} kWh</p>
                </div>
                <div>
                  <p className="text-text-muted">Cooling</p>
                  <p className="font-semibold truncate">{entry.energy_by_type.cooling.toLocaleString()} kWh</p>
                </div>
                <div>
                  <p className="text-text-muted">Heating</p>
                  <p className="font-semibold truncate">{entry.energy_by_type.heating.toLocaleString()} kWh</p>
                </div>
                <div>
                  <p className="text-text-muted">Source</p>
                  <p className="font-semibold truncate">{entry.used_mock_data ? 'Mock' : 'EnergyPlus'}</p>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
                <p className="text-[10px] sm:text-xs text-text-muted truncate flex-1 min-w-0">
                  IDF: {entry.idf_file || 'default.idf'} • Vent:{' '}
                  {entry.energy_by_type.ventilation.toLocaleString()} kWh
                </p>
                <button
                  onClick={() => onRerun(entry.message)}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-xs sm:text-sm transition-colors flex-shrink-0"
                >
                  <RotateCcw size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">Re-run</span>
                  <span className="sm:hidden">Run</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

