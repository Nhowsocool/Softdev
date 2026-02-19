import React from 'react';
import { Search, Filter, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { clsx } from 'clsx';

const violations = [
  { id: 1, date: '2024-03-10', product: 'Industrial Solvent A', salesman: 'Alex Johnson', selling: 18.50, recommended: 20.00, status: 'Pending' },
  { id: 2, date: '2024-03-09', product: 'Adhesive X-200', salesman: 'Sarah Miller', selling: 42.00, recommended: 45.00, status: 'Resolved' },
  { id: 3, date: '2024-03-08', product: 'Polymer Mix B', salesman: 'Mike Brown', selling: 30.00, recommended: 32.00, status: 'Flagged' },
  { id: 4, date: '2024-03-08', product: 'Industrial Solvent A', salesman: 'Alex Johnson', selling: 19.00, recommended: 20.00, status: 'Pending' },
];

export const Violations = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Pricing Violations</h1>
          <p className="text-stone-500 mt-1">Review and manage unauthorized price deviations.</p>
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-stone-200 text-stone-600 rounded-lg hover:bg-stone-50 text-sm font-medium">Export Report</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search violations..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-300 font-mono">db: search_query</div>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-stone-200 bg-white rounded-lg hover:bg-stone-50 text-stone-600 text-sm font-medium">
            <Filter className="w-4 h-4" />
            Filter Status
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
              <tr>
                <th className="px-6 py-4">Transaction Date</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Salesman</th>
                <th className="px-6 py-4 text-right text-red-600">Selling Price</th>
                <th className="px-6 py-4 text-right">Recommended Price</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {violations.map((row) => (
                <tr key={row.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 text-stone-600 whitespace-nowrap">{row.date}</td>
                  <td className="px-6 py-4 font-medium text-stone-900">{row.product}</td>
                  <td className="px-6 py-4 text-stone-600">{row.salesman}</td>
                  <td className="px-6 py-4 text-right font-medium text-red-600">${row.selling.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right text-stone-500">${row.recommended.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border",
                      row.status === 'Resolved' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      row.status === 'Pending' ? "bg-amber-50 text-amber-700 border-amber-100" :
                      "bg-red-50 text-red-700 border-red-100"
                    )}>
                      {row.status === 'Resolved' && <CheckCircle className="w-3 h-3" />}
                      {row.status === 'Pending' && <AlertTriangle className="w-3 h-3" />}
                      {row.status === 'Flagged' && <XCircle className="w-3 h-3" />}
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
