import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from 'recharts';
import { Download, Calendar } from 'lucide-react';

const salesData = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
  { name: 'Jul', sales: 3490, revenue: 4300 },
];

const priceTrendData = [
  { name: 'Week 1', avgPrice: 45 },
  { name: 'Week 2', avgPrice: 46 },
  { name: 'Week 3', avgPrice: 45.5 },
  { name: 'Week 4', avgPrice: 48 },
];

export const Reports = () => {
  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Performance Reports</h1>
          <p className="text-stone-500 mt-1">Sales trends and pricing analysis.</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-3 py-2 border border-stone-200 bg-white rounded-lg hover:bg-stone-50 text-stone-600 text-sm font-medium">
             <Calendar className="w-4 h-4" />
             Last 6 Months
           </button>
           <button className="flex items-center gap-2 px-3 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors text-sm font-medium shadow-sm">
             <Download className="w-4 h-4" />
             Export PDF
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend Chart */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <h3 className="text-lg font-bold text-stone-900 mb-6">Revenue Trend</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#78716c'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#78716c'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Price Trend Chart */}
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
          <h3 className="text-lg font-bold text-stone-900 mb-6">Average Selling Price Trend</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#78716c'}} />
                <YAxis domain={[40, 50]} axisLine={false} tickLine={false} tick={{fill: '#78716c'}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Legend />
                <Line type="monotone" dataKey="avgPrice" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
