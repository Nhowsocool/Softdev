import React, { useState, useEffect } from 'react';
import { Search, Plus, Trash2, Save, Calculator, FlaskConical, AlertCircle, Check } from 'lucide-react';
import { Modal } from '../components/ui/Modal';

const mockIngredients = [
  { id: 1, name: 'Acetone Technical', cost: 1.25, unit: 'kg' },
  { id: 2, name: 'Resin Type A', cost: 4.50, unit: 'kg' },
  { id: 3, name: 'Pigment Blue', cost: 12.50, unit: 'kg' },
  { id: 4, name: 'Ethanol 99%', cost: 0.95, unit: 'L' },
];

const mockProducts = [
  { id: 1, name: 'Industrial Solvent A', sku: 'SLV-001' },
  { id: 2, name: 'Polymer Mix B', sku: 'PLY-023' },
  { id: 3, name: 'Adhesive X-200', sku: 'ADH-100' },
];

// Initial saved formulas data
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

export const Formulas = () => {
  const [selectedProduct, setSelectedProduct] = useState(mockProducts[0].id);
  const [formulaItems, setFormulaItems] = useState([
    { id: 1, ingredientId: 1, qty: 10 },
    { id: 2, ingredientId: 2, qty: 5 },
  ]);
  const [savedFormulas, setSavedFormulas] = useState(initialSavedFormulas);
  const [totalCost, setTotalCost] = useState(0);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Calculate total cost whenever items change
  useEffect(() => {
    const total = formulaItems.reduce((sum, item) => {
      const ing = mockIngredients.find(i => i.id === item.ingredientId);
      return sum + (ing ? ing.cost * item.qty : 0);
    }, 0);
    setTotalCost(total);
  }, [formulaItems]);

  const addIngredient = () => {
    const newId = Math.max(0, ...formulaItems.map(i => i.id)) + 1;
    setFormulaItems([...formulaItems, { id: newId, ingredientId: 1, qty: 1 }]);
  };

  const removeIngredient = (id: number) => {
    setFormulaItems(formulaItems.filter(item => item.id !== id));
  };

  const updateItem = (id: number, field: 'ingredientId' | 'qty', value: any) => {
    setFormulaItems(formulaItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleSaveFormula = () => {
    const selectedProd = mockProducts.find(p => p.id === selectedProduct);
    if (!selectedProd) return;

    const newFormulaId = Math.max(0, ...savedFormulas.map(f => f.id)) + 1;
    const newFormula = {
      id: newFormulaId,
      productId: selectedProduct,
      productName: selectedProd.name,
      sku: selectedProd.sku,
      totalCost: totalCost,
      ingredients: formulaItems.map(item => {
        const ing = mockIngredients.find(i => i.id === item.ingredientId);
        return {
          ingredientId: item.ingredientId,
          name: ing?.name || '',
          qty: item.qty,
          cost: ing?.cost || 0
        };
      }),
      savedDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };

    // Check if product already has a formula
    const existingFormulaIndex = savedFormulas.findIndex(f => f.productId === selectedProduct);
    
    if (existingFormulaIndex >= 0) {
      const updatedFormulas = [...savedFormulas];
      updatedFormulas[existingFormulaIndex] = newFormula;
      setSavedFormulas(updatedFormulas);
      setSaveMessage(`Formula for ${selectedProd.name} has been updated!`);
    } else {
      setSavedFormulas([...savedFormulas, newFormula]);
      setSaveMessage(`Formula for ${selectedProd.name} has been saved successfully!`);
    }

    // Show success message for 3 seconds
    setTimeout(() => setSaveMessage(''), 3000);
    setShowSaveModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Save Success Message */}
      {saveMessage && (
        <div className="flex gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg items-center">
          <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <p className="text-sm text-emerald-700 font-medium">{saveMessage}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Formula Management</h1>
          <p className="text-stone-500 mt-1">Define product compositions and calculate costs.</p>
        </div>
        <button 
          onClick={() => setShowSaveModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm"
        >
          <Save className="w-4 h-4" />
          Save Formula
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Product Selection & Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <h3 className="font-bold text-stone-900 mb-4 flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-emerald-600" />
              Target Product
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Select Product</label>
                <select 
                  className="w-full px-3 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(Number(e.target.value))}
                >
                  {mockProducts.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                  ))}
                </select>
                <div className="text-[10px] text-stone-400 font-mono mt-1">db: product_id</div>
              </div>
              
              <div className="p-4 bg-stone-50 rounded-lg border border-stone-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-stone-500">Total Material Cost</span>
                  <span className="text-lg font-bold text-stone-900">${totalCost.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span>Last Updated</span>
                  <span>Just now</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl border border-amber-100 p-4 text-sm text-amber-800">
            <p><strong>Note:</strong> Saving this formula will automatically update the "Formula Cost" used by Marketing for pricing calculations.</p>
          </div>
        </div>

        {/* Right: Formula Builder */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
               <h2 className="font-bold text-stone-900">Ingredients List</h2>
               <button 
                 onClick={addIngredient}
                 className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
               >
                 <Plus className="w-4 h-4" /> Add Item
               </button>
             </div>
             
             <div className="p-1">
               <table className="w-full text-sm text-left">
                 <thead className="bg-white text-stone-500 font-medium border-b border-stone-100">
                   <tr>
                     <th className="px-4 py-3">Ingredient</th>
                     <th className="px-4 py-3 w-32">Unit Cost</th>
                     <th className="px-4 py-3 w-32">Quantity</th>
                     <th className="px-4 py-3 w-32 text-right">Subtotal</th>
                     <th className="px-4 py-3 w-16"></th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-stone-100">
                   {formulaItems.map((item) => {
                     const ing = mockIngredients.find(i => i.id === item.ingredientId);
                     const subtotal = ing ? ing.cost * item.qty : 0;
                     
                     return (
                       <tr key={item.id} className="group hover:bg-stone-50">
                         <td className="px-4 py-3">
                           <select 
                             className="w-full bg-transparent border-none focus:ring-0 p-0 font-medium text-stone-900 cursor-pointer hover:underline"
                             value={item.ingredientId}
                             onChange={(e) => updateItem(item.id, 'ingredientId', Number(e.target.value))}
                           >
                             {mockIngredients.map(i => (
                               <option key={i.id} value={i.id}>{i.name}</option>
                             ))}
                           </select>
                           <div className="text-[10px] text-stone-400 font-mono mt-1">db: ingredient_id</div>
                         </td>
                         <td className="px-4 py-3 text-stone-500">
                           ${ing?.cost.toFixed(2)} <span className="text-xs">/ {ing?.unit}</span>
                         </td>
                         <td className="px-4 py-3">
                           <input 
                             type="number" 
                             min="0"
                             step="0.1"
                             className="w-20 px-2 py-1 rounded border border-stone-200 text-right focus:outline-none focus:border-emerald-500"
                             value={item.qty}
                             onChange={(e) => updateItem(item.id, 'qty', Number(e.target.value))}
                           />
                           <div className="text-[10px] text-stone-400 font-mono mt-1 text-right">db: quantity</div>
                         </td>
                         <td className="px-4 py-3 text-right font-medium text-stone-900">
                           ${subtotal.toFixed(2)}
                         </td>
                         <td className="px-4 py-3 text-right">
                           <button 
                             onClick={() => removeIngredient(item.id)}
                             className="text-stone-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                         </td>
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
               
               {formulaItems.length === 0 && (
                 <div className="p-8 text-center text-stone-400">
                   No ingredients added. Click "Add Item" to start.
                 </div>
               )}
             </div>
             
             {formulaItems.length > 0 && (
                <div className="p-4 border-t border-stone-100 bg-stone-50 flex justify-end">
                  <div className="text-right">
                    <span className="text-sm text-stone-500 mr-4">Total Cost</span>
                    <span className="text-xl font-bold text-stone-900">${totalCost.toFixed(2)}</span>
                  </div>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* Saved Formulas Section */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-stone-900">Saved Product Formulas</h2>
          <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">Total Material Cost</th>
                <th className="px-6 py-4">Ingredients Count</th>
                <th className="px-6 py-4">Saved Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {savedFormulas.length > 0 ? (
                savedFormulas.map((formula) => (
                  <tr key={formula.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-stone-900">{formula.productName}</td>
                    <td className="px-6 py-4 font-mono text-xs text-stone-500">{formula.sku}</td>
                    <td className="px-6 py-4 text-emerald-600 font-bold">${formula.totalCost.toFixed(2)}</td>
                    <td className="px-6 py-4 text-stone-600">{formula.ingredients.length} ingredients</td>
                    <td className="px-6 py-4 text-stone-600">{formula.savedDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        formula.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-stone-100 text-stone-600 border-stone-200'
                      }`}>
                        {formula.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-stone-400">
                    No formulas saved yet. Create and save a formula above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Formula Modal */}
      <SaveFormulaModal 
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSaveFormula}
        product={mockProducts.find(p => p.id === selectedProduct)}
        totalCost={totalCost}
        ingredientsCount={formulaItems.length}
      />
    </div>
  );
};

const SaveFormulaModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  product, 
  totalCost, 
  ingredientsCount 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSave: () => void;
  product: any;
  totalCost: number;
  ingredientsCount: number;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Save Formula"
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors font-medium">Cancel</button>
          <button onClick={onSave} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm">Save Formula to Product</button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex gap-3">
            <FlaskConical className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Confirm Formula Save</h4>
              <p className="text-sm text-blue-700 mt-1">This formula will be saved and stored in the Products dashboard.</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-stone-50 rounded-lg border border-stone-100">
            <span className="text-sm text-stone-600">Product Name</span>
            <span className="font-medium text-stone-900">{product?.name}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-stone-50 rounded-lg border border-stone-100">
            <span className="text-sm text-stone-600">SKU</span>
            <span className="font-mono text-xs text-stone-500">{product?.sku}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg border border-emerald-100">
            <span className="text-sm text-emerald-600 font-medium">Total Material Cost</span>
            <span className="text-lg font-bold text-emerald-700">${totalCost.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center p-3 bg-stone-50 rounded-lg border border-stone-100">
            <span className="text-sm text-stone-600">Ingredients Count</span>
            <span className="font-medium text-stone-900">{ingredientsCount}</span>
          </div>
        </div>

        <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700">Once saved, this formula will appear in the Products dashboard and can be used for cost calculations.</p>
        </div>
      </div>
    </Modal>
  );
};
