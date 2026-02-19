import React from 'react';
import { LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color?: 'emerald' | 'blue' | 'amber' | 'red';
}

export const StatCard = ({ title, value, change, trend, icon: Icon, color = 'emerald' }: StatCardProps) => {
  const colorStyles = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
  };

  const trendColor = trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-600' : 'text-stone-500';

  return (
    <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-stone-500">{title}</p>
          <h3 className="text-2xl font-bold text-stone-900 mt-2">{value}</h3>
        </div>
        <div className={clsx("p-2 rounded-lg", colorStyles[color])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {change && (
        <div className="mt-4 flex items-center text-xs font-medium">
          <span className={clsx(trendColor, "mr-2")}>
            {trend === 'up' ? '↑' : '↓'} {change}
          </span>
          <span className="text-stone-400">vs last month</span>
        </div>
      )}
    </div>
  );
};
