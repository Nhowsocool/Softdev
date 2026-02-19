import React from 'react';
import { StatCard } from '../components/ui/StatCard';
import { Package, TrendingUp, History, Star } from 'lucide-react';

export const MarketingDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-stone-900">Marketing Dashboard</h1>
           <p className="text-stone-500 mt-1">Overview of product performance and pricing strategies.</p>
        </div>
        <div className="flex gap-3">
           <span className="text-sm text-stone-500 bg-white px-3 py-1.5 rounded-md border border-stone-200 shadow-sm">
             Oct 2023
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Products" 
          value="48" 
          change="3" 
          trend="up" 
          icon={Package} 
          color="blue" 
        />
        <StatCard 
          title="Average Margin" 
          value="32.5%" 
          change="1.2%" 
          trend="up" 
          icon={TrendingUp} 
          color="emerald" 
        />
        <StatCard 
          title="Price Changes" 
          value="12" 
          change="4" 
          trend="neutral" 
          icon={History} 
          color="amber" 
        />
        <StatCard 
          title="Top Product" 
          value="Solvent A" 
          icon={Star} 
          color="red" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products Table */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900">Top Performing Products</h2>
            <button className="text-sm text-stone-500 hover:text-stone-900">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4 text-right">Revenue</th>
                  <th className="px-6 py-4 text-right">Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {[
                  { name: 'Industrial Solvent A', revenue: '$12,450', margin: '28%' },
                  { name: 'Polymer Mix B', revenue: '$8,200', margin: '38%' },
                  { name: 'Adhesive X-200', revenue: '$6,150', margin: '18%' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-stone-900">{row.name}</td>
                    <td className="px-6 py-4 text-right text-stone-600">{row.revenue}</td>
                    <td className="px-6 py-4 text-right text-emerald-600 font-bold">{row.margin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Price Changes */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-stone-900">Recent Price Updates</h2>
            <button className="text-sm text-stone-500 hover:text-stone-900">View History</button>
          </div>
          <div className="divide-y divide-stone-100">
            {[
              { product: 'Solvent A', old: 42, new: 45, date: '2 days ago' },
              { product: 'Mix B', old: 120, new: 125, date: '5 days ago' },
              { product: 'Coating Z', old: 200, new: 210, date: '1 week ago' },
            ].map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-stone-50 transition-colors">
                <div>
                  <div className="font-medium text-stone-900">{item.product}</div>
                  <div className="text-xs text-stone-500">{item.date}</div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                   <span className="text-stone-400 line-through">${item.old}</span>
                   <span className="text-stone-300">→</span>
                   <span className="font-bold text-emerald-600">${item.new}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
