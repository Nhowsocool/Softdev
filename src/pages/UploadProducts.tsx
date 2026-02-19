import React, { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, Download, Package, AlertCircle, CheckCircle, Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import { clsx } from 'clsx';

interface ProductData {
  itemCode: string;
  name: string;
  sku: string;
  category: string;
  unit: string;
  cost: number;
  price: number;
  targetMargin: number;
}

interface ImportResult {
  success: number;
  failed: number;
  warnings: string[];
}

export const UploadProducts = () => {
  const [productsData, setProductsData] = useState<ProductData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        const transformedData: ProductData[] = jsonData
          .map((row: any) => ({
            itemCode: row.itemCode || row['Item Code'] || row.item_code || '',
            name: row.name || row.Name || row.product_name || '',
            sku: row.sku || row.SKU || row.sku_code || '',
            category: row.category || row.Category || row.CATEGORY || '',
            unit: row.unit || row.Unit || row.uom || '',
            cost: Number(row.cost || row.Cost || row.purchase_price || 0),
            price: Number(row.price || row.Price || row.selling_price || 0),
            targetMargin: Number(row.targetMargin || row['Target Margin'] || row.target_margin || 30),
          }))
          .filter(product => product.name && product.sku); // Filter out empty rows

        // Validate data
        const warnings: string[] = [];
        let validCount = 0;

        transformedData.forEach((product, index) => {
          if (!product.itemCode) warnings.push(`Row ${index + 2}: Missing Item Code`);
          if (!product.category) warnings.push(`Row ${index + 2}: Missing Category`);
          if (!product.unit) warnings.push(`Row ${index + 2}: Missing Unit`);
          if (product.cost <= 0) warnings.push(`Row ${index + 2}: Invalid Cost`);
          if (product.price <= 0) warnings.push(`Row ${index + 2}: Invalid Price`);
          if (product.targetMargin < 0 || product.targetMargin > 100) warnings.push(`Row ${index + 2}: Target Margin should be 0-100%`);
          validCount++;
        });

        setProductsData(transformedData);
        setImportResult({
          success: validCount,
          failed: jsonData.length - validCount,
          warnings: warnings.slice(0, 5), // Show first 5 warnings
        });

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        alert('Error parsing Excel file. Please check the format.');
        setImportResult({
          success: 0,
          failed: 1,
          warnings: ['Failed to parse the Excel file'],
        });
      } finally {
        setIsProcessing(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {
    // Create sample data
    const sampleData = [
      { 
        itemCode: 'P-001', 
        name: 'Industrial Solvent A', 
        sku: 'SLV-001', 
        category: 'Solvents', 
        unit: 'L', 
        cost: 35.00, 
        price: 45.50, 
        targetMargin: 30 
      },
      { 
        itemCode: 'P-002', 
        name: 'Polymer Mix B', 
        sku: 'PLY-023', 
        category: 'Polymers', 
        unit: 'kg', 
        cost: 90.00, 
        price: 125.00, 
        targetMargin: 40 
      },
      { 
        itemCode: 'P-003', 
        name: 'Adhesive X-200', 
        sku: 'ADH-100', 
        category: 'Adhesives', 
        unit: 'kg', 
        cost: 70.00, 
        price: 85.00, 
        targetMargin: 20 
      },
      { 
        itemCode: 'P-004', 
        name: 'Coating Z-10', 
        sku: 'COT-055', 
        category: 'Coatings', 
        unit: 'L', 
        cost: 150.00, 
        price: 210.00, 
        targetMargin: 40 
      },
      { 
        itemCode: 'P-005', 
        name: 'Pigment Blue', 
        sku: 'PIG-042', 
        category: 'Pigments', 
        unit: 'kg', 
        cost: 12.50, 
        price: 18.75, 
        targetMargin: 50 
      },
    ];

    // Create workbook
    const ws = XLSX.utils.json_to_sheet(sampleData);
    
    // Set column widths
    ws['!cols'] = [
      { wch: 12 }, // itemCode
      { wch: 25 }, // name
      { wch: 12 }, // sku
      { wch: 15 }, // category
      { wch: 8 },  // unit
      { wch: 10 }, // cost
      { wch: 10 }, // price
      { wch: 15 }, // targetMargin
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');

    // Download
    XLSX.writeFile(wb, 'products-template.xlsx');
  };

  const handleImport = () => {
    if (productsData.length === 0) {
      alert('No products to import');
      return;
    }

    // Here you would typically send the data to your backend
    alert(`Successfully imported ${productsData.length} products!`);
    setProductsData([]);
    setImportResult(null);
  };

  const handleReset = () => {
    setProductsData([]);
    setImportResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Import Products</h1>
          <p className="text-stone-500 mt-1">Upload Excel file to import multiple products at once</p>
        </div>
      </div>

      {/* Upload Section */}
      {productsData.length === 0 && (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-8">
          <div className="max-w-2xl mx-auto">
            <label className="block cursor-pointer">
              <input
                ref={fileInputRef}
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
                  {isProcessing ? 'Processing...' : 'Upload Product Data'}
                </h3>
                <p className="text-stone-500 mb-4">
                  Click to upload or drag and drop your Excel file here
                </p>
                <p className="text-sm text-stone-400">
                  Supports .xlsx, .xls files • Max 10MB
                </p>
              </div>
            </label>

            <div className="mt-6 flex justify-center">
              <button
                onClick={downloadTemplate}
                className="flex items-center gap-2 px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors font-medium"
              >
                <Download className="w-4 h-4" />
                Download Template
              </button>
            </div>

            {/* Template Info */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4" />
                Excel Template Format
              </h4>
              <div className="space-y-2 text-sm text-blue-800">
                <p><strong>Required Columns:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li><code className="bg-white px-2 py-1 rounded">itemCode</code> - Unique product code (e.g., P-001)</li>
                  <li><code className="bg-white px-2 py-1 rounded">name</code> - Product name (e.g., Industrial Solvent A)</li>
                  <li><code className="bg-white px-2 py-1 rounded">sku</code> - Stock Keeping Unit (e.g., SLV-001)</li>
                  <li><code className="bg-white px-2 py-1 rounded">category</code> - Product category (e.g., Solvents)</li>
                  <li><code className="bg-white px-2 py-1 rounded">unit</code> - Unit of measure (e.g., L, kg, pcs)</li>
                  <li><code className="bg-white px-2 py-1 rounded">cost</code> - Cost price (e.g., 35.00)</li>
                  <li><code className="bg-white px-2 py-1 rounded">price</code> - Selling price (e.g., 45.50)</li>
                  <li><code className="bg-white px-2 py-1 rounded">targetMargin</code> - Target margin % (0-100, e.g., 30)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {productsData.length > 0 && (
        <div className="space-y-4">
          {/* Import Status */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-emerald-900">Ready to Import</h3>
              <p className="text-sm text-emerald-700 mt-1">
                {productsData.length} product{productsData.length !== 1 ? 's' : ''} ready to import
              </p>
            </div>
          </div>

          {/* Warnings */}
          {importResult?.warnings && importResult.warnings.length > 0 && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900">Validation Warnings</h3>
                <ul className="text-sm text-amber-700 mt-2 space-y-1">
                  {importResult.warnings.map((warning, index) => (
                    <li key={index}>• {warning}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Preview Table */}
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-stone-100">
              <h2 className="text-lg font-bold text-stone-900">Preview Products</h2>
              <p className="text-sm text-stone-500 mt-1">Review the data before importing</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
                  <tr>
                    <th className="px-6 py-4">Item Code</th>
                    <th className="px-6 py-4">Product Name</th>
                    <th className="px-6 py-4">SKU</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Unit</th>
                    <th className="px-6 py-4 text-right">Cost</th>
                    <th className="px-6 py-4 text-right">Price</th>
                    <th className="px-6 py-4 text-right">Margin %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {productsData.slice(0, 10).map((product, index) => (
                    <tr key={index} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-stone-600">{product.itemCode}</td>
                      <td className="px-6 py-4 font-medium text-stone-900">{product.name}</td>
                      <td className="px-6 py-4 text-stone-600">{product.sku}</td>
                      <td className="px-6 py-4 text-stone-600">{product.category}</td>
                      <td className="px-6 py-4 text-stone-600">{product.unit}</td>
                      <td className="px-6 py-4 text-right text-stone-600">${product.cost.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right font-medium text-stone-900">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right text-emerald-600 font-bold">{product.targetMargin}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {productsData.length > 10 && (
              <div className="p-4 bg-stone-50 text-center text-sm text-stone-600 border-t border-stone-100">
                Showing 10 of {productsData.length} products
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleImport}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm flex-1"
            >
              <Package className="w-4 h-4" />
              Import {productsData.length} Products
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-6 py-2 border border-stone-200 text-stone-600 rounded-lg hover:bg-stone-50 transition-colors font-medium"
            >
              <Trash2 className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
