import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Calendar } from 'lucide-react';

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];

const violationTrend = [
  { name: 'Jan', violations: 5 },
  { name: 'Feb', violations: 8 },
  { name: 'Mar', violations: 12 },
  { name: 'Apr', violations: 7 },
  { name: 'May', violations: 4 },
  { name: 'Jun', violations: 6 },
  { name: 'Jul', violations: 3 },
];

export const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Analytics & Insights</h1>
          <p className="text-stone-500 mt-1">Deep dive into sales performance and compliance trends.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-lg text-stone-600 font-medium text-sm hover:bg-stone-50">
          <Calendar className="w-4 h-4" />
          Last 6 Months
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Month */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm min-w-0">
          <h3 className="text-lg font-bold text-stone-900 mb-6">Sales by Month</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#78716c', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#78716c', fontSize: 12}} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                />
                <Area type="monotone" dataKey="sales" name="Total Sales" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Violation Trend */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm min-w-0">
          <h3 className="text-lg font-bold text-stone-900 mb-6">Violation Trend</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={violationTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#78716c', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#78716c', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f5f5f4'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="violations" name="Violations Count" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
