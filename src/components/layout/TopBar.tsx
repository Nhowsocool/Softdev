import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const TopBar = () => {
  return (
    <header className="h-16 bg-white border-b border-stone-200 px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="hidden md:block">
          <BrandLogo scale={0.08} />
        </div>
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search transactions, products, users..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-stone-500 hover:text-stone-700 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-stone-200"></div>

        <button className="flex items-center gap-3 hover:bg-stone-50 p-1.5 pr-3 rounded-lg transition-colors border border-transparent hover:border-stone-100">
          <img 
            src="https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMG1hbiUyMGJ1c2luZXNzfGVufDF8fHx8MTc3MDc2MDU1MXww&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="User" 
            className="w-8 h-8 rounded-full object-cover border border-stone-200"
          />
          <div className="text-left hidden sm:block">
            <p className="text-sm font-semibold text-stone-800 leading-none">Alex Morgan</p>
            <p className="text-xs text-stone-500 mt-0.5">Admin</p>
          </div>
          <ChevronDown className="w-4 h-4 text-stone-400" />
        </button>
      </div>
    </header>
  );
};
