import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, Package } from 'lucide-react';
import { Modal } from '../components/ui/Modal';

const initialIngredients = [
  { id: 1, name: 'Acetone Technical', supplier: 'ChemCorp', cost: 1.25, unit: 'kg' },
  { id: 2, name: 'Resin Type A', supplier: 'PolyGlobal', cost: 4.50, unit: 'kg' },
  { id: 3, name: 'Pigment Blue', supplier: 'ColorWorks', cost: 12.50, unit: 'kg' },
  { id: 4, name: 'Ethanol 99%', supplier: 'BioSolv', cost: 0.95, unit: 'L' },
];

export const Ingredients = () => {
  const [ingredients, setIngredients] = useState(initialIngredients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<any>(null);

  const handleEdit = (ing: any) => {
    setEditingIngredient(ing);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingIngredient(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Ingredients</h1>
          <p className="text-stone-500 mt-1">Manage raw material costs and suppliers.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Ingredient
        </button>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              type="text" 
              placeholder="Search ingredients..." 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-300 font-mono">db: search_query</div>
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-stone-200 bg-white rounded-lg hover:bg-stone-50 text-stone-600 text-sm font-medium">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-stone-50 text-stone-500 font-medium border-b border-stone-100">
              <tr>
                <th className="px-6 py-4">Ingredient Name</th>
                <th className="px-6 py-4">Cost per Unit</th>
                <th className="px-6 py-4">Unit</th>
                <th className="px-6 py-4">Supplier</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {ingredients.map((row) => (
                <tr key={row.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-stone-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-stone-100 flex items-center justify-center text-stone-400">
                      <Package className="w-4 h-4" />
                    </div>
                    {row.name}
                  </td>
                  <td className="px-6 py-4 text-stone-900 font-medium">
                    ${row.cost.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-stone-600">{row.unit}</td>
                  <td className="px-6 py-4 text-stone-600">{row.supplier}</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleEdit(row)}
                      className="p-1.5 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <IngredientModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        ingredient={editingIngredient} 
      />
    </div>
  );
};

const IngredientModal = ({ isOpen, onClose, ingredient }: { isOpen: boolean; onClose: () => void; ingredient: any }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={ingredient ? 'Edit Ingredient' : 'Add New Ingredient'}
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors font-medium">Cancel</button>
          <button onClick={onClose} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-sm">Save Changes</button>
        </>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Ingredient Name</label>
          <input 
            type="text" 
            defaultValue={ingredient?.name}
            className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
          <div className="text-[10px] text-stone-400 font-mono mt-1">db: name</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Supplier</label>
          <input 
            type="text" 
            defaultValue={ingredient?.supplier}
            className="w-full px-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
          <div className="text-[10px] text-stone-400 font-mono mt-1">db: supplier_name</div>
        </div>

        <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
          <h4 className="text-sm font-bold text-stone-900 mb-3">Cost & Unit</h4>
          <div className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-xs font-medium text-stone-500 mb-1">Cost per Unit ($)</label>
               <input 
                  type="number" 
                  step="0.01"
                  defaultValue={ingredient?.cost}
                  className="w-full px-3 py-2 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-bold text-stone-900"
               />
               <div className="text-[10px] text-stone-400 font-mono mt-1">db: cost_per_unit</div>
             </div>
             <div>
               <label className="block text-xs font-medium text-stone-500 mb-1">Unit of Measure</label>
               <select className="w-full px-3 py-2 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                 <option>kg</option>
                 <option>L</option>
                 <option>g</option>
                 <option>ml</option>
                 <option>pcs</option>
               </select>
               <div className="text-[10px] text-stone-400 font-mono mt-1">db: unit_of_measure</div>
             </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
