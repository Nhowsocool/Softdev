import React, { useState } from 'react';
import { Upload, Search, Filter, FileText, Download, Eye, File } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { clsx } from 'clsx';

// Mock Data
const documents = [
  { id: 1, name: 'Invoice_INV-001.pdf', type: 'Invoice', transaction: 'INV-001', size: '156 KB', uploadedBy: 'System', date: '2023-10-24' },
  { id: 2, name: 'PO_AcmeCorp_Oct.pdf', type: 'Purchase Order', transaction: 'INV-001', size: '2.4 MB', uploadedBy: 'John Doe', date: '2023-10-24' },
  { id: 3, name: 'Delivery_Note_INV-001.pdf', type: 'Delivery Note', transaction: 'INV-001', size: '450 KB', uploadedBy: 'John Doe', date: '2023-10-25' },
];

export const Documents = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Documents</h1>
          <p className="text-stone-500 mt-1">Manage proofs of delivery, invoices, and purchase orders linked to transactions.</p>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </button>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search by file name or transaction ID..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-300 font-mono">db: search_query</div>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-stone-200 bg-white rounded-lg hover:bg-stone-50 text-stone-600 text-sm font-medium">
            <Filter className="w-4 h-4" />
            Type: All
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
              <tr>
                <th className="px-6 py-4">File URL / Name</th>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Document Type</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-stone-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-stone-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                      <File className="w-4 h-4" />
                    </div>
                    <a href="#" className="hover:text-emerald-600 hover:underline transition-colors">{doc.name}</a>
                  </td>
                  <td className="px-6 py-4 text-stone-600">
                    <span className="font-mono text-xs bg-stone-100 px-2 py-1 rounded border border-stone-200">{doc.transaction}</span>
                  </td>
                  <td className="px-6 py-4 text-stone-600">{doc.type}</td>
                  <td className="px-6 py-4 text-stone-600">{doc.size}</td>
                  <td className="px-6 py-4 text-stone-600">{doc.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <UploadDocumentModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </div>
  );
};

const UploadDocumentModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Upload Supporting Document"
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors font-medium">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm">Upload</button>
        </>
      }
    >
      <div className="space-y-6">
        <div className="border-2 border-dashed border-stone-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-emerald-500 hover:bg-emerald-50/10 transition-colors cursor-pointer group">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-emerald-100">
            <Upload className="w-8 h-8 text-stone-400 group-hover:text-emerald-600" />
          </div>
          <h4 className="text-lg font-semibold text-stone-900">Click to upload or drag and drop</h4>
          <p className="text-stone-500 mt-2 max-w-sm">PDF, JPG, PNG up to 10MB.</p>
          <div className="text-[10px] text-stone-300 font-mono mt-2">db: document_file</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Transaction ID</label>
          <input 
            type="text" 
            className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            placeholder="e.g. INV-001"
          />
          <div className="text-[10px] text-stone-400 font-mono mt-1">db: transaction_ref</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Document Type</label>
          <select className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
            <option>Purchase Order</option>
            <option>Delivery Note</option>
            <option>Payment Proof</option>
            <option>Contract</option>
            <option>Other</option>
          </select>
          <div className="text-[10px] text-stone-400 font-mono mt-1">db: document_type</div>
        </div>
      </div>
    </Modal>
  );
};
