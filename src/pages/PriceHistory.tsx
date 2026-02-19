import React from 'react';
import { Search, Filter, History, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

const historyData = [
  { id: 1, product: 'Industrial Solvent A', oldPrice: 42.00, newPrice: 45.00, changedBy: 'John Doe', changedAt: '2023-10-24 14:30' },
  { id: 2, product: 'Polymer Mix B', oldPrice: 120.00, newPrice: 125.00, changedBy: 'System Rule', changedAt: '2023-10-23 09:15' },
  { id: 3, product: 'Adhesive X-200', oldPrice: 90.00, newPrice: 85.00, changedBy: 'Jane Smith', changedAt: '2023-10-20 16:45' },
  { id: 4, product: 'Coating Z-10', oldPrice: 200.00, newPrice: 210.00, changedBy: 'John Doe', changedAt: '2023-10-15 11:20' },
];

export const PriceHistory = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Price History</h1>
          <p className="text-stone-500 mt-1">Audit log of all price changes.</p>
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
              placeholder="Search by product..." 
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
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4 text-right">Old Price</th>
                <th className="px-6 py-4 text-right">New Price</th>
                <th className="px-6 py-4">Changed By</th>
                <th className="px-6 py-4">Changed At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {historyData.map((row) => (
                <tr key={row.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-stone-900">{row.product}</td>
                  <td className="px-6 py-4 text-right text-stone-500 line-through">${row.oldPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right font-bold text-emerald-600">${row.newPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 text-stone-600">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-600">
                        {row.changedBy.charAt(0)}
                      </div>
                      {row.changedBy}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-600 font-mono text-xs">{row.changedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
