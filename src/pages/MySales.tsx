import React, { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';
import { clsx } from 'clsx';

const salesHistory = [
  { id: 1, date: '2023-10-24', billNo: 'INV-001', product: 'Industrial Solvent A', qty: 50, sellingPrice: 45.00, recPrice: 50.00, profit: 500.00, collectionStatus: 'Unpaid' },
  { id: 2, date: '2023-10-24', billNo: 'INV-002', product: 'Polymer Mix B', qty: 20, sellingPrice: 125.00, recPrice: 125.00, profit: 700.00, collectionStatus: 'Paid' },
  { id: 3, date: '2023-10-23', billNo: 'INV-003', product: 'Adhesive X-200', qty: 100, sellingPrice: 85.00, recPrice: 95.00, profit: 1500.00, collectionStatus: 'Partial' },
  { id: 4, date: '2023-10-22', billNo: 'INV-004', product: 'Industrial Solvent A', qty: 200, sellingPrice: 48.00, recPrice: 50.00, profit: 1600.00, collectionStatus: 'Paid' },
  { id: 5, date: '2023-10-20', billNo: 'INV-005', product: 'Coating Z-10', qty: 15, sellingPrice: 210.00, recPrice: 200.00, profit: 450.00, collectionStatus: 'Unpaid' },
];

export const MySales = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">My Sales</h1>
          <p className="text-stone-500 mt-1">Review your past transactions.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search by Bill No or Product..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-300 font-mono">db: search_query</div>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
             <button className="flex items-center gap-2 px-3 py-2 border border-stone-200 bg-white rounded-lg hover:bg-stone-50 text-stone-600 text-sm font-medium flex-1 justify-center sm:flex-none">
               <Calendar className="w-4 h-4" />
               Filter by Month
             </button>
             <button className="flex items-center gap-2 px-3 py-2 border border-stone-200 bg-white rounded-lg hover:bg-stone-50 text-stone-600 text-sm font-medium flex-1 justify-center sm:flex-none">
               <Filter className="w-4 h-4" />
               Filter
             </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
              <tr>
                <th className="px-6 py-4">Transaction Date</th>
                <th className="px-6 py-4">Bill Number</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4 text-right">Quantity</th>
                <th className="px-6 py-4 text-right">Selling Price</th>
                <th className="px-6 py-4 text-right">Rec. Price</th>
                <th className="px-6 py-4 text-right">Profit</th>
                <th className="px-6 py-4">Collection Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {salesHistory.map((row) => (
                <tr key={row.id} className={clsx(
                  "hover:bg-stone-50 transition-colors",
                  row.sellingPrice < row.recPrice ? "bg-red-50/30" : ""
                )}>
                  <td className="px-6 py-4 text-stone-600 whitespace-nowrap">{row.date}</td>
                  <td className="px-6 py-4 font-mono text-xs text-stone-500">{row.billNo}</td>
                  <td className="px-6 py-4 font-medium text-stone-900">{row.product}</td>
                  <td className="px-6 py-4 text-right text-stone-600">{row.qty}</td>
                  <td className={clsx(
                    "px-6 py-4 text-right font-medium",
                    row.sellingPrice < row.recPrice ? "text-red-700 font-bold" : "text-emerald-600"
                  )}>
                    ${row.sellingPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right text-stone-500">${row.recPrice.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right text-stone-600">${row.profit.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "px-2.5 py-1 rounded-full text-xs font-medium border",
                      row.collectionStatus === 'Paid' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      row.collectionStatus === 'Partial' ? "bg-amber-50 text-amber-700 border-amber-100" :
                      "bg-stone-100 text-stone-600 border-stone-200"
                    )}>
                      {row.collectionStatus}
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
