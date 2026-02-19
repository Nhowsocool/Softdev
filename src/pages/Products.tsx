import React, { useState, useRef } from 'react';
import { Search, Filter, Edit2, Calculator, Info, History, FlaskConical, Eye, Upload, Download, Package as PackageIcon, AlertCircle, CheckCircle } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { clsx } from 'clsx';
import * as XLSX from 'xlsx';

const initialProducts = [
  { id: 1, itemCode: 'P-001', name: 'Industrial Solvent A', sku: 'SLV-001', category: 'Solvents', unit: 'L', cost: 35.00, margin: 28.57, price: 45.00, targetMargin: 30, formulaCost: 75.00, savedFormula: true },
  { id: 2, itemCode: 'P-002', name: 'Polymer Mix B', sku: 'PLY-023', category: 'Polymers', unit: 'kg', cost: 90.00, margin: 38.89, price: 125.00, targetMargin: 40, formulaCost: null, savedFormula: false },
  { id: 3, itemCode: 'P-003', name: 'Adhesive X-200', sku: 'ADH-100', category: 'Adhesives', unit: 'kg', cost: 70.00, margin: 17.65, price: 85.00, targetMargin: 20, formulaCost: null, savedFormula: false },
];

// Sample saved formulas data
const initialSavedFormulas = [
  { 
    id: 1, 
    productId: 1, 
    productName: 'Industrial Solvent A', 
    sku: 'SLV-001',
    totalCost: 75.00, 
    ingredients: [
      { ingredientId: 1, name: 'Acetone Technical', qty: 10, cost: 1.25 },
      { ingredientId: 2, name: 'Resin Type A', qty: 5, cost: 4.50 },
    ],
    savedDate: '2024-01-15',
    status: 'Active'
  },
];

export const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isFormulaViewOpen, setIsFormulaViewOpen] = useState(false);
  const [viewingFormula, setViewingFormula] = useState<any>(null);
  const [savedFormulas] = useState(initialSavedFormulas);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importedProducts, setImportedProducts] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = (prod: any) => {
    setEditingProduct(prod);
    setIsModalOpen(true);
  };

  const handleViewFormula = (productId: number) => {
    const formula = savedFormulas.find(f => f.productId === productId);
    if (formula) {
      setViewingFormula(formula);
      setIsFormulaViewOpen(true);
    }
  };

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

        const transformedData = jsonData
          .map((row: any) => ({
            itemCode: row.itemCode || row['Item Code'] || row.item_code || '',
            name: row.name || row.Name || row.product_name || '',
            sku: row.sku || row.SKU || row.sku_code || '',
            category: row.category || row.Category || row.CATEGORY || '',
            unit: row.unit || row.Unit || row.uom || '',
            cost: Number(row.cost || row.Cost || row.purchase_price || 0),
            price: Number(row.price || row.Price || row.selling_price || 0),
            targetMargin: Number(row.targetMargin || row['Target Margin'] || row.target_margin || 30),
            margin: 0, // Will be calculated
          }))
          .filter(product => product.name && product.sku);

        setImportedProducts(transformedData);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        alert('Error parsing Excel file. Please check the format.');
      } finally {
        setIsProcessing(false);
      }
    };

    reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {
    const sampleData = [
      { itemCode: 'P-001', name: 'Industrial Solvent A', sku: 'SLV-001', category: 'Solvents', unit: 'L', cost: 35.00, price: 45.50, targetMargin: 30 },
      { itemCode: 'P-002', name: 'Polymer Mix B', sku: 'PLY-023', category: 'Polymers', unit: 'kg', cost: 90.00, price: 125.00, targetMargin: 40 },
      { itemCode: 'P-003', name: 'Adhesive X-200', sku: 'ADH-100', category: 'Adhesives', unit: 'kg', cost: 70.00, price: 85.00, targetMargin: 20 },
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    ws['!cols'] = [
      { wch: 12 }, { wch: 25 }, { wch: 12 }, { wch: 15 }, { wch: 8 }, { wch: 10 }, { wch: 10 }, { wch: 15 },
    ];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    XLSX.writeFile(wb, 'products-template.xlsx');
  };

  const handleImportProducts = () => {
    if (importedProducts.length === 0) {
      alert('No products to import');
      return;
    }

    const newId = Math.max(0, ...products.map(p => p.id)) + 1;
    const productsToAdd = importedProducts.map((prod, index) => ({
      id: newId + index,
      ...prod,
      margin: prod.cost > 0 ? ((prod.price - prod.cost) / prod.price * 100).toFixed(2) : 0,
    }));

    setProducts([...products, ...productsToAdd]);
    setImportedProducts([]);
    setIsImportModalOpen(false);
    alert(`Successfully imported ${productsToAdd.length} products!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Products</h1>
          <p className="text-stone-500 mt-1">Manage product pricing and margins.</p>
        </div>
        <button 
          onClick={() => setIsImportModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          <Upload className="w-4 h-4" />
          Import Excel
        </button>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-300 font-mono">db: search_query</div>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-stone-200 bg-white rounded-lg hover:bg-stone-50 text-stone-600 text-sm font-medium">
            <Filter className="w-4 h-4" />
            Category: All
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
              <tr>
                <th className="px-6 py-4">Item Code</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4 text-right">Current Cost</th>
                <th className="px-6 py-4 text-right">Formula Cost</th>
                <th className="px-6 py-4 text-right">Price</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((row) => (
                <tr key={row.id} className={clsx(
                  "hover:bg-stone-50 transition-colors",
                  row.savedFormula ? "bg-blue-50/30" : ""
                )}>
                  <td className="px-6 py-4 font-mono text-xs text-stone-500">{row.itemCode}</td>
                  <td className="px-6 py-4 font-medium text-stone-900">{row.name}</td>
                  <td className="px-6 py-4 text-stone-600">{row.category}</td>
                  <td className="px-6 py-4 text-stone-600">{row.unit}</td>
                  <td className="px-6 py-4 text-right text-stone-600">${row.cost.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    {row.formulaCost ? (
                      <span className="font-bold text-emerald-600">${row.formulaCost.toFixed(2)}</span>
                    ) : (
                      <span className="text-stone-400 text-xs">No formula</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-stone-900">${row.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      {row.savedFormula && (
                        <button 
                          onClick={() => handleViewFormula(row.id)}
                          className="p-1.5 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="View formula"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleEdit(row)}
                        className="p-1.5 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={editingProduct}
        savedFormula={savedFormulas.find(f => f.productId === editingProduct?.id)}
      />

      <FormulaViewModal 
        isOpen={isFormulaViewOpen}
        onClose={() => setIsFormulaViewOpen(false)}
        formula={viewingFormula}
      />

      <ImportProductsModal 
        isOpen={isImportModalOpen}
        onClose={() => {
          setIsImportModalOpen(false);
          setImportedProducts([]);
        }}
        importedProducts={importedProducts}
        isProcessing={isProcessing}
        fileInputRef={fileInputRef}
        onFileUpload={handleFileUpload}
        onDownloadTemplate={downloadTemplate}
        onImport={handleImportProducts}
      />
    </div>
  );
};

const ImportProductsModal = ({ 
  isOpen, 
  onClose, 
  importedProducts, 
  isProcessing,
  fileInputRef,
  onFileUpload,
  onDownloadTemplate,
  onImport
}: { 
  isOpen: boolean; 
  onClose: () => void;
  importedProducts: any[];
  isProcessing: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDownloadTemplate: () => void;
  onImport: () => void;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Import Products from Excel"
      footer={
        importedProducts.length > 0 ? (
          <>
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-stone-200 text-stone-600 rounded-lg hover:bg-stone-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={onImport}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm"
            >
              <PackageIcon className="w-4 h-4" />
              Import {importedProducts.length} Products
            </button>
          </>
        ) : (
          <button onClick={onClose} className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors font-medium">Close</button>
        )
      }
    >
      <div className="space-y-4">
        {importedProducts.length === 0 ? (
          <>
            {/* Upload Area */}
            <label className="block cursor-pointer">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={onFileUpload}
                className="hidden"
                disabled={isProcessing}
              />
              <div className="border-2 border-dashed border-stone-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50/10 transition-all group">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900 mb-1">
                  {isProcessing ? 'Processing...' : 'Upload Excel File'}
                </h3>
                <p className="text-stone-500 text-sm">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-stone-400 mt-2">
                  Supports .xlsx, .xls files
                </p>
              </div>
            </label>

            {/* Template Info */}
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
              <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Required Columns
              </h4>
              <ul className="space-y-1 text-sm text-blue-800">
                <li>• <code className="bg-white px-2 py-0.5 rounded text-xs">itemCode</code> - Product code</li>
                <li>• <code className="bg-white px-2 py-0.5 rounded text-xs">name</code> - Product name</li>
                <li>• <code className="bg-white px-2 py-0.5 rounded text-xs">sku</code> - SKU code</li>
                <li>• <code className="bg-white px-2 py-0.5 rounded text-xs">category</code> - Category</li>
                <li>• <code className="bg-white px-2 py-0.5 rounded text-xs">unit</code> - Unit (L, kg, etc)</li>
                <li>• <code className="bg-white px-2 py-0.5 rounded text-xs">cost</code> - Cost price</li>
                <li>• <code className="bg-white px-2 py-0.5 rounded text-xs">price</code> - Selling price</li>
                <li>• <code className="bg-white px-2 py-0.5 rounded text-xs">targetMargin</code> - Target margin %</li>
              </ul>
            </div>

            {/* Download template button */}
            <button
              onClick={onDownloadTemplate}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              Download Template
            </button>
          </>
        ) : (
          <>
            {/* Import Preview */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-emerald-900">Ready to Import</h3>
                <p className="text-sm text-emerald-700 mt-1">
                  {importedProducts.length} product{importedProducts.length !== 1 ? 's' : ''} ready to import
                </p>
              </div>
            </div>

            {/* Preview Table */}
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-100 text-stone-600 font-medium sticky top-0">
                  <tr>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">SKU</th>
                    <th className="px-3 py-2">Category</th>
                    <th className="px-3 py-2 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {importedProducts.slice(0, 5).map((product, index) => (
                    <tr key={index} className="hover:bg-stone-50">
                      <td className="px-3 py-2 text-stone-900 font-medium">{product.name}</td>
                      <td className="px-3 py-2 text-stone-600 font-mono text-xs">{product.sku}</td>
                      <td className="px-3 py-2 text-stone-600">{product.category}</td>
                      <td className="px-3 py-2 text-right font-medium text-stone-900">${product.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {importedProducts.length > 5 && (
              <p className="text-xs text-stone-500 text-center">
                ...and {importedProducts.length - 5} more products
              </p>
            )}
          </>
        )}
      </div>
    </Modal>
  );
};

const FormulaViewModal = ({ isOpen, onClose, formula }: { isOpen: boolean; onClose: () => void; formula: any }) => {
  if (!formula) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Formula Details: ${formula.productName}`}
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2 bg-stone-100 text-stone-600 rounded-lg hover:bg-stone-200 transition-colors font-medium">Close</button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-stone-500">Product</label>
            <p className="text-sm font-medium text-stone-900 mt-1">{formula.productName}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-stone-500">SKU</label>
            <p className="text-sm font-mono text-stone-600 mt-1">{formula.sku}</p>
          </div>
        </div>

        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
          <h4 className="text-sm font-bold text-emerald-900 mb-3">Material Cost Breakdown</h4>
          <div className="space-y-2">
            {formula.ingredients.map((ing: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-emerald-700 font-medium">{ing.name}</p>
                  <p className="text-xs text-emerald-600/70">Qty: {ing.qty}</p>
                </div>
                <p className="text-sm font-bold text-emerald-600">${(ing.qty * ing.cost).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-emerald-200 mt-3 pt-3 flex justify-between items-center">
            <span className="font-bold text-emerald-900">Total Material Cost</span>
            <span className="text-lg font-bold text-emerald-600">${formula.totalCost.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
            <label className="text-xs font-medium text-stone-500">Saved Date</label>
            <p className="text-sm font-medium text-stone-900 mt-1">{formula.savedDate}</p>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
            <label className="text-xs font-medium text-stone-500">Status</label>
            <p className="text-sm font-medium text-stone-900 mt-1">{formula.status}</p>
          </div>
        </div>

        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex gap-2">
          <FlaskConical className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700">This formula was saved from the Formula Management dashboard.</p>
        </div>
      </div>
    </Modal>
  );
};

const ProductDetailModal = ({ isOpen, onClose, product, savedFormula }: { isOpen: boolean; onClose: () => void; product: any; savedFormula?: any }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'formula' | 'history'>('info');
  const [targetMargin, setTargetMargin] = useState(product?.targetMargin || 30);
  const [simulatedPrice, setSimulatedPrice] = useState(product?.price || 0);

  // Recalculate simulation when margin changes
  const handleMarginChange = (newMargin: number) => {
    setTargetMargin(newMargin);
    const cost = product?.cost || 0;
    // Price = Cost / (1 - Margin%)
    const newPrice = cost / (1 - (newMargin / 100));
    setSimulatedPrice(newPrice);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Product Details: ${product?.name}`}
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors font-medium">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm">Save Changes</button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex border-b border-stone-200">
          <button
            onClick={() => setActiveTab('info')}
            className={clsx(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
              activeTab === 'info' ? "border-emerald-600 text-emerald-600" : "border-transparent text-stone-500 hover:text-stone-700"
            )}
          >
            <Info className="w-4 h-4" />
            Product Info
          </button>
          <button
            onClick={() => setActiveTab('formula')}
            className={clsx(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
              activeTab === 'formula' ? "border-emerald-600 text-emerald-600" : "border-transparent text-stone-500 hover:text-stone-700"
            )}
          >
            <Calculator className="w-4 h-4" />
            Formula Cost
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={clsx(
              "px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2",
              activeTab === 'history' ? "border-emerald-600 text-emerald-600" : "border-transparent text-stone-500 hover:text-stone-700"
            )}
          >
            <History className="w-4 h-4" />
            Price History
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          {activeTab === 'info' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Item Code</label>
                  <input type="text" readOnly defaultValue={product?.itemCode} className="w-full px-4 py-2 rounded-lg border border-stone-200 bg-stone-50 text-stone-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">SKU</label>
                  <input type="text" readOnly defaultValue={product?.sku} className="w-full px-4 py-2 rounded-lg border border-stone-200 bg-stone-50 text-stone-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                  <input type="text" readOnly defaultValue={product?.category} className="w-full px-4 py-2 rounded-lg border border-stone-200 bg-stone-50 text-stone-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1">Unit</label>
                  <input type="text" readOnly defaultValue={product?.unit} className="w-full px-4 py-2 rounded-lg border border-stone-200 bg-stone-50 text-stone-500" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'formula' && (
             <div className="space-y-6 animate-in fade-in">
               {savedFormula ? (
                 <div className="space-y-4">
                   <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 items-start">
                     <FlaskConical className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                     <div>
                       <h4 className="font-bold text-blue-900 text-sm">Formula from R&D Dashboard</h4>
                       <p className="text-xs text-blue-700 mt-1">Saved on {savedFormula.savedDate}</p>
                     </div>
                   </div>

                   <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                     <h4 className="text-sm font-bold text-emerald-900 mb-3">Ingredients</h4>
                     <div className="space-y-2">
                       {savedFormula.ingredients.map((ing: any, idx: number) => (
                         <div key={idx} className="flex justify-between items-center p-2 bg-white rounded border border-emerald-100">
                           <div>
                             <p className="text-sm font-medium text-stone-900">{ing.name}</p>
                             <p className="text-xs text-stone-500">Qty: {ing.qty}</p>
                           </div>
                           <p className="text-sm font-bold text-emerald-600">${(ing.qty * ing.cost).toFixed(2)}</p>
                         </div>
                       ))}
                     </div>
                     <div className="mt-3 pt-3 border-t border-emerald-200 flex justify-between items-center">
                       <span className="font-bold text-emerald-900">Total Cost</span>
                       <span className="text-lg font-bold text-emerald-600">${savedFormula.totalCost.toFixed(2)}</span>
                     </div>
                   </div>
                 </div>
               ) : (
                 <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg text-center">
                   <FlaskConical className="w-8 h-8 mx-auto text-stone-300 mb-2" />
                   <p className="text-sm text-stone-600">No formula saved yet.</p>
                   <p className="text-xs text-stone-500 mt-1">Create a formula in the Formula Management page to link it to this product.</p>
                 </div>
               )}

               <div className="bg-stone-50 rounded-lg border border-stone-200 p-4">
                 <h4 className="text-sm font-bold text-stone-900 mb-3">Margin Simulation</h4>
                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-xs font-medium text-stone-600 mb-1">Target Margin (%)</label>
                     <input 
                       type="number" 
                       value={targetMargin}
                       onChange={(e) => handleMarginChange(Number(e.target.value))}
                       className="w-full px-3 py-2 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                     />
                   </div>
                   <div>
                     <label className="block text-xs font-medium text-stone-600 mb-1">Simulated Price ($)</label>
                     <input 
                       type="number" 
                       value={simulatedPrice.toFixed(2)}
                       readOnly
                       className="w-full px-3 py-2 rounded-md border border-stone-200 bg-white font-bold text-emerald-700"
                     />
                   </div>
                 </div>
               </div>
             </div>
          )}

          {activeTab === 'history' && (
            <div className="animate-in fade-in">
              <table className="w-full text-sm text-left">
                <thead className="bg-stone-50 text-stone-500 font-medium">
                  <tr>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2 text-right">Old Price</th>
                    <th className="px-4 py-2 text-right">New Price</th>
                    <th className="px-4 py-2">Changed By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr>
                    <td className="px-4 py-2 text-stone-600">Oct 24, 2023</td>
                    <td className="px-4 py-2 text-right text-stone-500 line-through">$42.00</td>
                    <td className="px-4 py-2 text-right font-medium text-stone-900">$45.00</td>
                    <td className="px-4 py-2 text-stone-600">John Doe</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-stone-600">Sep 15, 2023</td>
                    <td className="px-4 py-2 text-right text-stone-500 line-through">$40.00</td>
                    <td className="px-4 py-2 text-right font-medium text-stone-900">$42.00</td>
                    <td className="px-4 py-2 text-stone-600">System</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
