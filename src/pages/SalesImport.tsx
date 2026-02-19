import React, { useEffect, useMemo } from 'react';
import { Database, FileSpreadsheet, CalendarClock, Users } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { ensureSalesImportSeedData, getSalesImportRecords } from '../utils/salesImportStorage';

export const SalesImport = () => {
  const { role } = useUser();
  useEffect(() => {
    ensureSalesImportSeedData();
  }, []);

  const records = getSalesImportRecords();

  const summary = useMemo(() => {
    const totalFiles = records.length;
    const totalRows = records.reduce((sum, row) => sum + row.totalRows, 0);
    const totalAmount = records.reduce((sum, row) => sum + row.totalAmount, 0);
    const totalImporters = new Set(records.map((row) => row.importedBy)).size;

    return { totalFiles, totalRows, totalAmount, totalImporters };
  }, [records]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-900">Sales Import Storage</h1>
        <p className="text-stone-500 mt-1">
          {role === 'supervisor'
            ? 'Supervisor report of all uploaded sales files and import history.'
            : 'Storage view of uploaded sales files with importer and timestamp.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
          <p className="text-sm text-stone-500 font-medium">Imported Files</p>
          <h3 className="text-2xl font-bold text-stone-900 mt-1">{summary.totalFiles}</h3>
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mt-4">
            <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
          <p className="text-sm text-stone-500 font-medium">Total Rows</p>
          <h3 className="text-2xl font-bold text-stone-900 mt-1">{summary.totalRows.toLocaleString()}</h3>
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mt-4">
            <Database className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
          <p className="text-sm text-stone-500 font-medium">Unique Importers</p>
          <h3 className="text-2xl font-bold text-stone-900 mt-1">{summary.totalImporters}</h3>
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mt-4">
            <Users className="w-5 h-5 text-amber-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
          <p className="text-sm text-stone-500 font-medium">Imported Amount</p>
          <h3 className="text-2xl font-bold text-stone-900 mt-1">
            ${summary.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h3>
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mt-4">
            <CalendarClock className="w-5 h-5 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/50">
          <h2 className="text-lg font-bold text-stone-900">Import History</h2>
        </div>

        {records.length === 0 ? (
          <div className="p-8 text-center text-stone-500">No sales files imported yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
                <tr>
                  <th className="px-6 py-4">File Name</th>
                  <th className="px-6 py-4">Imported By</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-right">Rows</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4">Imported At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {records.map((row) => (
                  <tr key={row.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-stone-900">{row.fileName}</td>
                    <td className="px-6 py-4 text-stone-700">{row.importedBy}</td>
                    <td className="px-6 py-4 text-stone-600 capitalize">{row.importedRole}</td>
                    <td className="px-6 py-4 text-right text-stone-600">{row.totalRows.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right text-stone-600">
                      ${row.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 text-stone-600">{new Date(row.importedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
