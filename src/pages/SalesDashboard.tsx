import React, { useState, useMemo } from 'react';
import { StatCard } from '../components/ui/StatCard';
import { DollarSign, ShoppingCart, AlertTriangle, FileText } from 'lucide-react';
import { clsx } from 'clsx';

// Mock Data with multiple months
const allSalesData = [
  // August 2023
  { id: 1, date: '2023-08-24', month: 8, year: 2023, billNo: 'INV-001', product: 'Industrial Solvent A', qty: 50, sellingPrice: 45.00, recPrice: 50.00, profit: 500.00, collectionStatus: 'Unpaid' },
  { id: 2, date: '2023-08-24', month: 8, year: 2023, billNo: 'INV-002', product: 'Polymer Mix B', qty: 20, sellingPrice: 125.00, recPrice: 125.00, profit: 700.00, collectionStatus: 'Paid' },
  { id: 3, date: '2023-08-23', month: 8, year: 2023, billNo: 'INV-003', product: 'Adhesive X-200', qty: 80, sellingPrice: 85.00, recPrice: 95.00, profit: 1200.00, collectionStatus: 'Partial' },
  // September 2023
  { id: 4, date: '2023-09-15', month: 9, year: 2023, billNo: 'INV-004', product: 'Industrial Solvent A', qty: 120, sellingPrice: 48.00, recPrice: 50.00, profit: 1800.00, collectionStatus: 'Paid' },
  { id: 5, date: '2023-09-16', month: 9, year: 2023, billNo: 'INV-005', product: 'Coating Z-10', qty: 25, sellingPrice: 210.00, recPrice: 200.00, profit: 750.00, collectionStatus: 'Unpaid' },
  { id: 6, date: '2023-09-17', month: 9, year: 2023, billNo: 'INV-006', product: 'Polymer Mix B', qty: 30, sellingPrice: 125.00, recPrice: 125.00, profit: 1050.00, collectionStatus: 'Paid' },
  { id: 7, date: '2023-09-18', month: 9, year: 2023, billNo: 'INV-007', product: 'Adhesive X-200', qty: 60, sellingPrice: 85.00, recPrice: 95.00, profit: 900.00, collectionStatus: 'Paid' },
  // October 2023
  { id: 8, date: '2023-10-24', month: 10, year: 2023, billNo: 'INV-008', product: 'Industrial Solvent A', qty: 50, sellingPrice: 45.00, recPrice: 50.00, profit: 500.00, collectionStatus: 'Unpaid' },
  { id: 9, date: '2023-10-24', month: 10, year: 2023, billNo: 'INV-009', product: 'Polymer Mix B', qty: 20, sellingPrice: 125.00, recPrice: 125.00, profit: 700.00, collectionStatus: 'Paid' },
  { id: 10, date: '2023-10-23', month: 10, year: 2023, billNo: 'INV-010', product: 'Adhesive X-200', qty: 100, sellingPrice: 85.00, recPrice: 95.00, profit: 1500.00, collectionStatus: 'Partial' },
  { id: 11, date: '2023-10-23', month: 10, year: 2023, billNo: 'INV-011', product: 'Industrial Solvent A', qty: 200, sellingPrice: 48.00, recPrice: 50.00, profit: 1600.00, collectionStatus: 'Paid' },
  { id: 12, date: '2023-10-22', month: 10, year: 2023, billNo: 'INV-012', product: 'Coating Z-10', qty: 15, sellingPrice: 210.00, recPrice: 200.00, profit: 450.00, collectionStatus: 'Unpaid' },
  // November 2023
  { id: 13, date: '2023-11-10', month: 11, year: 2023, billNo: 'INV-013', product: 'Industrial Solvent A', qty: 75, sellingPrice: 46.00, recPrice: 50.00, profit: 750.00, collectionStatus: 'Paid' },
  { id: 14, date: '2023-11-12', month: 11, year: 2023, billNo: 'INV-014', product: 'Polymer Mix B', qty: 35, sellingPrice: 125.00, recPrice: 125.00, profit: 1225.00, collectionStatus: 'Paid' },
  { id: 15, date: '2023-11-15', month: 11, year: 2023, billNo: 'INV-015', product: 'Coating Z-10', qty: 22, sellingPrice: 215.00, recPrice: 200.00, profit: 715.00, collectionStatus: 'Partial' },
  // December 2023
  { id: 16, date: '2023-12-05', month: 12, year: 2023, billNo: 'INV-016', product: 'Adhesive X-200', qty: 110, sellingPrice: 85.00, recPrice: 95.00, profit: 1650.00, collectionStatus: 'Paid' },
  { id: 17, date: '2023-12-08', month: 12, year: 2023, billNo: 'INV-017', product: 'Industrial Solvent A', qty: 160, sellingPrice: 47.00, recPrice: 50.00, profit: 1600.00, collectionStatus: 'Paid' },
];

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const SalesDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState(10); // October (1-indexed)
  const [selectedYear, setSelectedYear] = useState(2023);

  // Filter data based on selected month and year
  const filteredSales = useMemo(() => {
    return allSalesData.filter(sale => sale.month === selectedMonth && sale.year === selectedYear);
  }, [selectedMonth, selectedYear]);

  // Calculate metrics for selected month
  const metrics = useMemo(() => {
    const totalAmount = filteredSales.reduce((sum, sale) => sum + (sale.profit), 0);
    const totalTransactions = filteredSales.length;
    const violations = filteredSales.filter(sale => sale.sellingPrice < sale.recPrice).length;
    const outstandingAR = filteredSales
      .filter(sale => sale.collectionStatus === 'Unpaid' || sale.collectionStatus === 'Partial')
      .reduce((sum, sale) => sum + (sale.profit), 0);

    return {
      totalAmount: totalAmount.toFixed(0),
      totalTransactions,
      violations,
      outstandingAR: outstandingAR.toFixed(0)
    };
  }, [filteredSales]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
           <p className="text-stone-500 mt-1">Sales overview and performance metrics.</p>
        </div>
        <div className="flex gap-3 items-center">
           <select 
             value={selectedMonth}
             onChange={(e) => setSelectedMonth(Number(e.target.value))}
             className="px-3 py-1.5 rounded-md border border-stone-200 bg-white text-stone-900 text-sm shadow-sm hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
           >
             {monthNames.map((month, index) => (
               <option key={index} value={index + 1}>
                 {month}
               </option>
             ))}
           </select>
           <select 
             value={selectedYear}
             onChange={(e) => setSelectedYear(Number(e.target.value))}
             className="px-3 py-1.5 rounded-md border border-stone-200 bg-white text-stone-900 text-sm shadow-sm hover:border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
           >
             <option value={2023}>2023</option>
             <option value={2024}>2024</option>
             <option value={2025}>2025</option>
           </select>
           <span className="text-sm text-stone-500 bg-white px-3 py-1.5 rounded-md border border-stone-200 shadow-sm">
             {monthNames[selectedMonth - 1]} {selectedYear}
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Amount" 
          value={`$${metrics.totalAmount}`}
          change={metrics.totalTransactions > 0 ? "12%" : "0%"}
          trend={metrics.totalTransactions > 0 ? "up" : "neutral"}
          icon={DollarSign} 
          color="emerald" 
        />
        <StatCard 
          title="Total Transactions" 
          value={metrics.totalTransactions.toString()}
          change={metrics.totalTransactions > 0 ? "8%" : "0%"}
          trend={metrics.totalTransactions > 0 ? "up" : "neutral"}
          icon={FileText} 
          color="blue" 
        />
        <StatCard 
          title="Violations Count" 
          value={metrics.violations.toString()}
          change={metrics.violations.toString()}
          trend={metrics.violations > 0 ? "down" : "neutral"}
          icon={AlertTriangle} 
          color="red" 
        />
        <StatCard 
          title="Outstanding AR" 
          value={`$${metrics.outstandingAR}`}
          change="2%"
          trend="neutral"
          icon={ShoppingCart} 
          color="amber" 
        />
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900">Recent Transactions</h2>
          <button className="text-sm text-stone-500 hover:text-stone-900">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
              <tr>
                <th className="px-6 py-4">Transaction Date</th>
                <th className="px-6 py-4">Bill Number</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4 text-right">Quantity</th>
                <th className="px-6 py-4 text-right">Selling Price</th>
                <th className="px-6 py-4 text-right">Rec. Price</th>
                <th className="px-6 py-4 text-right">Profit</th>
                <th className="px-6 py-4">Collection Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredSales.length > 0 ? (
                filteredSales.map((row) => (
                  <tr key={row.id} className={clsx(
                    "hover:bg-stone-50 transition-colors",
                    row.sellingPrice < row.recPrice ? "bg-red-50/30" : ""
                  )}>
                    <td className="px-6 py-4 text-stone-600">{row.date}</td>
                    <td className="px-6 py-4 font-mono text-xs text-stone-500">{row.billNo}</td>
                    <td className="px-6 py-4 font-medium text-stone-900">{row.product}</td>
                    <td className="px-6 py-4 text-right text-stone-600">{row.qty}</td>
                    <td className={clsx(
                      "px-6 py-4 text-right font-medium",
                      row.sellingPrice < row.recPrice ? "text-red-700 font-bold" : "text-emerald-600"
                    )}>
                      ${row.sellingPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right text-stone-500">${row.recPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right text-stone-600">${row.profit.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "px-2.5 py-1 rounded-full text-xs font-medium border",
                        row.collectionStatus === 'Paid' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                        row.collectionStatus === 'Partial' ? "bg-amber-50 text-amber-700 border-amber-100" :
                        "bg-stone-100 text-stone-600 border-stone-200"
                      )}>
                        {row.collectionStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-stone-500">
                    No transactions found for {monthNames[selectedMonth - 1]} {selectedYear}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
