import React, { useState } from 'react';
import { Play, Save, AlertTriangle, TrendingUp, RefreshCw } from 'lucide-react';

export const PricingStrategy = () => {
  const [globalMargin, setGlobalMargin] = useState(30);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  const runSimulation = () => {
    setSimulationResult({
      revenueChange: '+4.5%',
      marginChange: '+1.2%',
      impactedProducts: 24,
      avgPriceIncrease: '$3.50'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Pricing Strategy</h1>
          <p className="text-stone-500 mt-1">Set global margin targets and simulate price updates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Strategy Controls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
            <h2 className="font-bold text-stone-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Global Pricing Rules
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">Default Target Margin (%)</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="10" 
                    max="60" 
                    value={globalMargin}
                    onChange={(e) => setGlobalMargin(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="w-20 px-3 py-2 border border-stone-200 rounded-lg text-center font-bold text-stone-900">
                    {globalMargin}%
                  </div>
                </div>
                <div className="text-[10px] text-stone-400 font-mono mt-1">db: target_margin</div>
                <p className="text-xs text-stone-500 mt-2">
                  This will apply to all products unless a specific override is set at the product level.
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-bold text-blue-800 text-sm mb-2">Simulation Preview</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Running a simulation will calculate new prices based on the current cost basis and the selected margin target ({globalMargin}%).
                </p>
                <button 
                  onClick={runSimulation}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Simulate New Prices
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Simulation Results */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm h-full flex flex-col">
            <div className="p-6 border-b border-stone-100">
              <h2 className="font-bold text-stone-900">Simulation Impact</h2>
            </div>
            
            <div className="p-6 flex-1">
              {simulationResult ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <span className="text-xs text-stone-500 uppercase font-bold tracking-wider">Revenue</span>
                      <div className="text-2xl font-bold text-emerald-600 mt-1">{simulationResult.revenueChange}</div>
                    </div>
                    <div>
                      <span className="text-xs text-stone-500 uppercase font-bold tracking-wider">Margin</span>
                      <div className="text-2xl font-bold text-emerald-600 mt-1">{simulationResult.marginChange}</div>
                    </div>
                    <div>
                      <span className="text-xs text-stone-500 uppercase font-bold tracking-wider">Impacted</span>
                      <div className="text-2xl font-bold text-stone-900 mt-1">{simulationResult.impactedProducts}</div>
                    </div>
                    <div>
                      <span className="text-xs text-stone-500 uppercase font-bold tracking-wider">Avg Price</span>
                      <div className="text-2xl font-bold text-stone-900 mt-1">{simulationResult.avgPriceIncrease}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-6 border-t border-stone-100">
                    <div className="flex items-start gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <p>Applying these changes will update the recommended selling price for all affected products immediately.</p>
                    </div>
                    <button className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-bold shadow-md flex items-center justify-center gap-2">
                      <Save className="w-4 h-4" />
                      Apply & Save Prices
                    </button>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-stone-400 min-h-[200px]">
                  <RefreshCw className="w-12 h-12 mb-3 opacity-20" />
                  <p className="text-sm">Adjust settings and run simulation<br/>to see results.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
