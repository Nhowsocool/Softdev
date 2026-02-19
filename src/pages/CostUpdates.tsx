import React from 'react';
import { Search, Filter, History, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

const costHistory = [
  { id: 1, ingredient: 'Acetone Technical', oldCost: 1.20, newCost: 1.25, user: 'John Doe (R&D)', date: 'Today', note: 'Supplier Adjustment' },
  { id: 2, ingredient: 'Resin Type A', oldCost: 4.50, newCost: 4.45, user: 'Jane Smith (R&D)', date: 'Today', note: 'Volume Discount' },
  { id: 3, ingredient: 'Pigment Blue', oldCost: 12.00, newCost: 12.50, user: 'System Import', date: 'Yesterday', note: 'Market Fluctuation' },
  { id: 4, ingredient: 'Ethanol 99%', oldCost: 0.90, newCost: 0.95, user: 'John Doe (R&D)', date: 'Oct 20, 2023', note: 'Shortage' },
];

export const CostUpdates = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Cost Update History</h1>
          <p className="text-stone-500 mt-1">Track fluctuations in raw material costs.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-stone-200 bg-white rounded-lg hover:bg-stone-50 text-stone-600 font-medium text-sm">
           <History className="w-4 h-4" />
           Export Log
        </button>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search by ingredient..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-300 font-mono">db: search_query</div>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-stone-200 bg-white rounded-lg hover:bg-stone-50 text-stone-600 text-sm font-medium">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
              <tr>
                <th className="px-6 py-4">Ingredient</th>
                <th className="px-6 py-4">Cost Change</th>
                <th className="px-6 py-4">Updated By</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {costHistory.map((row) => (
                <tr key={row.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-stone-900">{row.ingredient}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <span className="text-stone-400 line-through">${row.oldCost.toFixed(2)}</span>
                       <ArrowRight className="w-3 h-3 text-stone-400" />
                       <span className={clsx(
                         "font-bold",
                         row.newCost > row.oldCost ? "text-red-600" : "text-emerald-600"
                       )}>
                         ${row.newCost.toFixed(2)}
                       </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-600">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-600">
                        {row.user.charAt(0)}
                      </div>
                      {row.user}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-600">{row.date}</td>
                  <td className="px-6 py-4 text-stone-500 italic text-xs">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
