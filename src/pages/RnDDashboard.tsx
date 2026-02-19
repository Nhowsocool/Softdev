import React from 'react';
import { StatCard } from '../components/ui/StatCard';
import { Beaker, FlaskConical, RefreshCw } from 'lucide-react';

export const RnDDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-stone-900">R&D Dashboard</h1>
           <p className="text-stone-500 mt-1">Overview of formulation and cost updates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Ingredients Count" 
          value="342" 
          change="8" 
          trend="up" 
          icon={Beaker} 
          color="blue" 
        />
        <StatCard 
          title="Products With Formula" 
          value="89%" 
          change="2%" 
          trend="up" 
          icon={FlaskConical} 
          color="red" 
        />
        <StatCard 
          title="Cost Updates Today" 
          value="5" 
          change="Today" 
          trend="neutral" 
          icon={RefreshCw} 
          color="amber" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Cost Updates */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-stone-900">Recent Cost Updates</h2>
            <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
                <tr>
                  <th className="px-6 py-4">Ingredient</th>
                  <th className="px-6 py-4">Old Cost</th>
                  <th className="px-6 py-4">New Cost</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {[
                  { name: 'Acetone Technical', old: 1.20, new: 1.25, date: 'Today' },
                  { name: 'Resin Type A', old: 4.50, new: 4.45, date: 'Today' },
                  { name: 'Pigment Blue', old: 12.00, new: 12.50, date: 'Yesterday' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-stone-900">{row.name}</td>
                    <td className="px-6 py-4 text-stone-500">${row.old.toFixed(2)}</td>
                    <td className="px-6 py-4 font-bold text-stone-900">${row.new.toFixed(2)}</td>
                    <td className="px-6 py-4 text-stone-500">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Formulas */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-stone-900">Pending Formulas</h2>
            <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">View All</button>
          </div>
          <div className="p-4 space-y-3">
             {[
               { name: 'New Adhesive X-300', status: 'Draft', priority: 'High' },
               { name: 'Solvent Blend Y', status: 'In Review', priority: 'Medium' },
               { name: 'Custom Coating Z', status: 'Draft', priority: 'Low' },
             ].map((item, i) => (
               <div key={i} className="p-3 bg-stone-50 rounded-lg flex items-center justify-between border border-stone-100">
                 <div>
                   <p className="font-medium text-stone-900">{item.name}</p>
                   <p className="text-xs text-stone-500 mt-1">Status: {item.status}</p>
                 </div>
                 <span className={`px-2 py-1 text-xs rounded font-medium ${
                   item.priority === 'High' ? 'bg-red-100 text-red-700' :
                   item.priority === 'Medium' ? 'bg-amber-100 text-amber-700' :
                   'bg-blue-100 text-blue-700'
                 }`}>
                   {item.priority}
                 </span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
