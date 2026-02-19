import React from 'react';
import { Search, Filter, ClipboardList } from 'lucide-react';

const auditLogs = [
  { id: 1, timestamp: '2024-03-11 14:30', user: 'John Doe (R&D)', action: 'Updated Cost', oldVal: '$1.20', newVal: '$1.25' },
  { id: 2, timestamp: '2024-03-11 13:15', user: 'Jane Smith (Mkt)', action: 'Changed Strategy', oldVal: 'Margin 20%', newVal: 'Margin 22%' },
  { id: 3, timestamp: '2024-03-11 10:00', user: 'Alex Johnson (Sales)', action: 'Upload Sales', oldVal: '-', newVal: '50 Records' },
  { id: 4, timestamp: '2024-03-10 16:45', user: 'System Admin', action: 'User Login', oldVal: '-', newVal: 'Success' },
  { id: 5, timestamp: '2024-03-10 09:20', user: 'John Doe (R&D)', action: 'Created Formula', oldVal: 'Draft', newVal: 'Active' },
];

export const AuditLogs = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">System Audit Logs</h1>
          <p className="text-stone-500 mt-1">Traceability of all system actions and data changes.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search by user, action, or entity..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-300 font-mono">db: search_query</div>
          </div>
          <div className="flex gap-2">
             <button className="flex items-center gap-2 px-3 py-2 border border-stone-200 bg-white rounded-lg hover:bg-stone-50 text-stone-600 text-sm font-medium">
               <Filter className="w-4 h-4" />
               Filter User
             </button>
             <button className="flex items-center gap-2 px-3 py-2 border border-stone-200 bg-white rounded-lg hover:bg-stone-50 text-stone-600 text-sm font-medium">
               <ClipboardList className="w-4 h-4" />
               Export CSV
             </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Old Value</th>
                <th className="px-6 py-4">New Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 text-stone-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="px-6 py-4 font-medium text-stone-900">{log.user}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-stone-400 font-mono text-xs truncate max-w-[150px]" title={log.oldVal}>{log.oldVal}</td>
                  <td className="px-6 py-4 text-stone-900 font-mono text-xs truncate max-w-[150px]" title={log.newVal}>{log.newVal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
