import React from 'react';
import { Search, Filter, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

const invoices = [
  { id: 1, customer: 'Acme Corp', invoice: 'INV-001', date: '2023-10-24', amount: 2250.00, dueDate: '2023-11-24', status: 'Unpaid' },
  { id: 2, customer: 'BuildIt Inc', invoice: 'INV-003', date: '2023-10-23', amount: 8500.00, dueDate: '2023-11-23', status: 'Unpaid' },
  { id: 3, customer: 'Global Tech', invoice: 'INV-000', date: '2023-09-15', amount: 1200.00, dueDate: '2023-10-15', status: 'Overdue' },
  { id: 4, customer: 'FastLogistics', invoice: 'INV-998', date: '2023-09-10', amount: 3150.00, dueDate: '2023-10-10', status: 'Paid' },
];

export const ARManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Accounts Receivable</h1>
          <p className="text-stone-500 mt-1">Track outstanding payments and invoice status.</p>
        </div>
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-lg border border-stone-200 shadow-sm">
           <div className="text-sm">
             <span className="text-stone-500">Total Outstanding:</span>
             <span className="ml-2 font-bold text-stone-900">$11,950.00</span>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search customer or invoice..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-300 font-mono">db: search_query</div>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-stone-200 bg-white rounded-lg hover:bg-stone-50 text-stone-600 text-sm font-medium">
            <Filter className="w-4 h-4" />
            Status: All
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Invoice #</th>
                <th className="px-6 py-4">Invoice Date</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-stone-900">{inv.customer}</td>
                  <td className="px-6 py-4 font-mono text-xs text-stone-500">{inv.invoice}</td>
                  <td className="px-6 py-4 text-stone-600">{inv.date}</td>
                  <td className="px-6 py-4 text-stone-600">{inv.dueDate}</td>
                  <td className="px-6 py-4 text-right font-medium text-stone-900">${inv.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 w-fit",
                      inv.status === 'Paid' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                      inv.status === 'Overdue' ? "bg-red-50 text-red-700 border-red-100" :
                      "bg-amber-50 text-amber-700 border-amber-100"
                    )}>
                      {inv.status === 'Paid' && <CheckCircle className="w-3 h-3" />}
                      {inv.status === 'Overdue' && <AlertCircle className="w-3 h-3" />}
                      {inv.status === 'Unpaid' && <Clock className="w-3 h-3" />}
                      {inv.status}
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
