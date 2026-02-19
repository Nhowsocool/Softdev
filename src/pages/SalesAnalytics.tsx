import React, { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, Download, TrendingUp, DollarSign, Package, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { clsx } from 'clsx';

interface SalesData {
  date: string;
  billNo: string;
  product: string;
  salesman?: string;
  quantity: number;
  price: number;
  amount: number;
}

interface ChartData {
  name: string;
  value: number;
  amount?: number;
  count?: number;
}

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export const SalesAnalytics = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

        // Transform data to match our structure
        const transformedData: SalesData[] = jsonData.map((row: any) => ({
          date: row.date || row.Date || row.DATE || '',
          billNo: row.billNo || row['Bill No'] || row.bill_no || '',
          product: row.product || row.Product || row.PRODUCT || '',
          salesman: row.salesman || row.Salesman || row.SALESMAN || '',
          quantity: Number(row.quantity || row.Quantity || row.qty || row.Qty || 0),
          price: Number(row.price || row.Price || row.selling_price || 0),
          amount: Number(row.amount || row.Amount || row.total || 0),
        }));

        setSalesData(transformedData);
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        alert('Error parsing Excel file. Please check the format.');
      } finally {
        setIsProcessing(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  const exportToPDF = async () => {
    if (!dashboardRef.current) return;

    const canvas = await html2canvas(dashboardRef.current, {
      scale: 2,
      logging: false,
      useCORS: true,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`sales-analytics-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
  };

  // Calculate summary statistics
  const summary = {
    totalSales: salesData.reduce((sum, row) => sum + row.amount, 0),
    totalTransactions: salesData.length,
    avgTransaction: salesData.length > 0 ? salesData.reduce((sum, row) => sum + row.amount, 0) / salesData.length : 0,
    totalProducts: new Set(salesData.map(row => row.product)).size,
  };

  // Sales by product
  const productSales = salesData.reduce((acc, row) => {
    const existing = acc.find(item => item.name === row.product);
    if (existing) {
      existing.value += row.amount;
      existing.count! += row.quantity;
    } else {
      acc.push({ name: row.product, value: row.amount, count: row.quantity });
    }
    return acc;
  }, [] as ChartData[]).sort((a, b) => b.value - a.value).slice(0, 10);

  // Sales by date (trend)
  const salesTrend = salesData.reduce((acc, row) => {
    const existing = acc.find(item => item.name === row.date);
    if (existing) {
      existing.value += row.amount;
    } else {
      acc.push({ name: row.date, value: row.amount });
    }
    return acc;
  }, [] as ChartData[]).sort((a, b) => a.name.localeCompare(b.name));

  // Sales by salesman
  const salesmanPerformance = salesData.reduce((acc, row) => {
    if (!row.salesman) return acc;
    const existing = acc.find(item => item.name === row.salesman);
    if (existing) {
      existing.value += row.amount;
      existing.count! += 1;
    } else {
      acc.push({ name: row.salesman, value: row.amount, count: 1 });
    }
    return acc;
  }, [] as ChartData[]).sort((a, b) => b.value - a.value).slice(0, 8);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Sales Analytics Dashboard</h1>
          <p className="text-stone-500 mt-1">Upload Excel files to visualize sales data with interactive charts</p>
        </div>
        {salesData.length > 0 && (
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export to PDF
          </button>
        )}
      </div>

      {/* Upload Section */}
      {salesData.length === 0 && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-8">
          <div className="max-w-2xl mx-auto">
            <label className="block cursor-pointer">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isProcessing}
              />
              <div className="border-2 border-dashed border-stone-300 rounded-xl p-12 text-center hover:border-emerald-500 hover:bg-emerald-50/10 transition-all group">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-900 mb-2">
                  {isProcessing ? 'Processing...' : 'Upload Sales Data'}
                </h3>
                <p className="text-stone-500 mb-4">
                  Click to upload or drag and drop your Excel file here
                </p>
                <p className="text-sm text-stone-400">
                  Supports .xlsx, .xls files • Max 10MB
                </p>
              </div>
            </label>

            <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-lg">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Excel Format Requirements:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• <strong>date</strong> - Transaction date (YYYY-MM-DD)</li>
                    <li>• <strong>billNo</strong> - Invoice/Bill number</li>
                    <li>• <strong>product</strong> - Product name</li>
                    <li>• <strong>quantity</strong> - Quantity sold</li>
                    <li>• <strong>price</strong> - Unit price</li>
                    <li>• <strong>amount</strong> - Total amount</li>
                    <li>• <strong>salesman</strong> (optional) - Salesperson name</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard with Charts */}
      {salesData.length > 0 && (
        <div ref={dashboardRef} className="space-y-6 bg-stone-50 p-6 rounded-xl">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500 font-medium">Total Sales</p>
                  <h3 className="text-2xl font-bold text-stone-900 mt-1">
                    ${summary.totalSales.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500 font-medium">Transactions</p>
                  <h3 className="text-2xl font-bold text-stone-900 mt-1">
                    {summary.totalTransactions.toLocaleString()}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileSpreadsheet className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500 font-medium">Avg Transaction</p>
                  <h3 className="text-2xl font-bold text-stone-900 mt-1">
                    ${summary.avgTransaction.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500 font-medium">Products Sold</p>
                  <h3 className="text-2xl font-bold text-stone-900 mt-1">
                    {summary.totalProducts}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Trend Chart */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-stone-900 mb-4">Sales Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesTrend}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    formatter={(value: number | undefined) => `$${(value ?? 0).toLocaleString()}`}
                  />
                  <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Top Products Chart */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-stone-900 mb-4">Top 10 Products by Revenue</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productSales} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#6b7280" fontSize={12} />
                  <YAxis dataKey="name" type="category" width={120} stroke="#6b7280" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                    formatter={(value: number | undefined) => `$${(value ?? 0).toLocaleString()}`}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Salesman Performance */}
            {salesmanPerformance.length > 0 && (
              <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
                <h3 className="text-lg font-bold text-stone-900 mb-4">Salesman Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesmanPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                      formatter={(value: number | undefined) => `$${(value ?? 0).toLocaleString()}`}
                    />
                    <Legend />
                    <Bar dataKey="value" fill="#10b981" name="Total Sales" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Product Distribution Pie Chart */}
            <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-stone-900 mb-4">Revenue Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={productSales.slice(0, 6)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productSales.slice(0, 6).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number | undefined) => `$${(value ?? 0).toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upload New File Button */}
          <div className="flex justify-center">
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-stone-200 text-stone-700 rounded-lg hover:border-emerald-500 hover:text-emerald-700 transition-colors font-medium shadow-sm">
                <Upload className="w-4 h-4" />
                Upload New File
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
