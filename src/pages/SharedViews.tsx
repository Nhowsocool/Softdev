import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Share2, 
  Eye, 
  Edit, 
  Copy, 
  Trash2, 
  X,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { clsx } from 'clsx';

// Mock Data
const MOCK_SHARED_VIEWS = [
  { id: 1, name: 'Q1 Sales Performance', type: 'Sales', sharedWith: 'John Doe', date: '2023-10-15', status: 'Active' },
  { id: 2, name: 'Top 50 Violations', type: 'Violations', sharedWith: 'Jane Smith', date: '2023-11-02', status: 'Active' },
  { id: 3, name: 'AR Aging Report', type: 'AR', sharedWith: 'Mike Johnson', date: '2023-09-20', status: 'Revoked' },
  { id: 4, name: 'Product Margin Analysis', type: 'Reports', sharedWith: 'Sarah Williams', date: '2023-12-01', status: 'Active' },
  { id: 5, name: 'Client A History', type: 'Sales', sharedWith: 'John Doe', date: '2023-08-14', status: 'Active' },
];

export const SharedViews = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  // Modal State
  const [viewName, setViewName] = useState('');
  const [selectedSeller, setSelectedSeller] = useState('');
  const [viewType, setViewType] = useState('Sales');
  const [expirationDate, setExpirationDate] = useState('');

  const filteredViews = MOCK_SHARED_VIEWS.filter(view => 
    view.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    view.sharedWith.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShare = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    console.log('Sharing view:', { viewName, selectedSeller, viewType, expirationDate });
    setIsModalOpen(false);
    // Reset form
    setViewName('');
    setSelectedSeller('');
    setViewType('Sales');
    setExpirationDate('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-stone-500">
          <span>Dashboard</span>
          <span>/</span>
          <span className="font-medium text-stone-900">Shared Views</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-stone-900">Shared Views Management</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            Share My View
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search shared views..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-white border border-stone-200 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider font-semibold border-b border-stone-100">
                <th className="px-6 py-4">Shared View Name</th>
                <th className="px-6 py-4">Data Type</th>
                <th className="px-6 py-4">Shared With</th>
                <th className="px-6 py-4">Date Shared</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredViews.map((view) => (
                <tr key={view.id} className="hover:bg-stone-50/60 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Share2 className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-stone-900">{view.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-700 border border-stone-200">
                      {view.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-600">
                        {view.sharedWith.charAt(0)}
                      </div>
                      <span className="text-sm text-stone-600">{view.sharedWith}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-stone-500">
                    {view.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                      view.status === 'Active' 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                        : "bg-amber-50 text-amber-700 border-amber-100"
                    )}>
                      {view.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {view.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors" title="Edit">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Duplicate">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Revoke Access">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-stone-100 flex items-center justify-between text-sm text-stone-500">
          <span>Showing 1 to {filteredViews.length} of {filteredViews.length} entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-stone-200 rounded hover:bg-stone-50 disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 bg-emerald-600 text-white border border-emerald-600 rounded">1</button>
            <button className="px-3 py-1 border border-stone-200 rounded hover:bg-stone-50 disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>

      {/* Share View Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
              <h3 className="font-bold text-lg text-stone-800">Share View</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleShare} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-700">View Name</label>
                <input 
                  type="text" 
                  value={viewName}
                  onChange={(e) => setViewName(e.target.value)}
                  placeholder="e.g., Q4 Performance Overview"
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-stone-700">Select Seller</label>
                  <select 
                    value={selectedSeller}
                    onChange={(e) => setSelectedSeller(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm bg-white"
                    required
                  >
                    <option value="">Select seller...</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="Mike Johnson">Mike Johnson</option>
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-stone-700">View Type</label>
                  <select 
                    value={viewType}
                    onChange={(e) => setViewType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm bg-white"
                  >
                    <option value="Sales">Sales</option>
                    <option value="Violations">Violations</option>
                    <option value="AR">AR Management</option>
                    <option value="Reports">Reports</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-stone-700 flex items-center justify-between">
                  Expiration Date
                  <span className="text-xs text-stone-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <input 
                    type="date" 
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
                  />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-900 border border-transparent hover:border-stone-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all"
                >
                  Confirm Share
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
