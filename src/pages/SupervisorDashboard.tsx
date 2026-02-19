import React from 'react';
import { StatCard } from '../components/ui/StatCard';
import { DollarSign, AlertTriangle, Users, CheckCircle } from 'lucide-react';

export const SupervisorDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-stone-900">Supervisor Dashboard</h1>
           <p className="text-stone-500 mt-1">Monitor compliance and sales performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Sales" 
          value="$1.2M" 
          change="12%" 
          trend="up" 
          icon={DollarSign} 
          color="emerald" 
        />
        <StatCard 
          title="Total Violations" 
          value="24" 
          change="5%" 
          trend="down" 
          icon={AlertTriangle} 
          color="red" 
        />
        <StatCard 
          title="Repeated Violators" 
          value="3" 
          change="0" 
          trend="neutral" 
          icon={Users} 
          color="amber" 
        />
        <StatCard 
          title="Approved Price Rate" 
          value="98%" 
          change="1%" 
          trend="up" 
          icon={CheckCircle} 
          color="blue" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Violations Preview */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-stone-900">Recent Violations</h2>
            <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
                <tr>
                  <th className="px-6 py-4">Salesman</th>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {[
                  { user: 'Alex Johnson', product: 'Industrial Solvent A', variance: '-5%' },
                  { user: 'Sarah Miller', product: 'Adhesive X-200', variance: '-8%' },
                  { user: 'Mike Brown', product: 'Polymer Mix B', variance: '-3%' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-stone-900">{row.user}</td>
                    <td className="px-6 py-4 text-stone-600">{row.product}</td>
                    <td className="px-6 py-4 text-red-600 font-bold">{row.variance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity / Audit Log Preview */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-stone-900">Recent Activity</h2>
            <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">View Logs</button>
          </div>
          <div className="p-4 space-y-3">
             {[
               { user: 'John Doe (R&D)', action: 'Updated Cost', detail: 'Acetone Technical', time: '10 mins ago' },
               { user: 'Jane Smith (Mkt)', action: 'Changed Strategy', detail: 'Bulk Discount Rules', time: '1 hour ago' },
               { user: 'Alex Johnson (Sales)', action: 'Uploaded Sales', detail: 'INV-2024-001', time: '2 hours ago' },
             ].map((item, i) => (
               <div key={i} className="p-3 bg-stone-50 rounded-lg flex items-center justify-between border border-stone-100">
                 <div>
                   <p className="font-medium text-stone-900">
                     <span className="font-bold">{item.user}</span> {item.action}
                   </p>
                   <p className="text-xs text-stone-500 mt-1">{item.detail}</p>
                 </div>
                 <span className="text-xs text-stone-400">{item.time}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
