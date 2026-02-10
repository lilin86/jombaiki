
import React, { useState } from 'react';
import { Filter, ShoppingCart, Info, CheckCircle2 } from 'lucide-react';
import { Vehicle, SparePart } from '../types.ts';

interface SparePartsProps {
  userVehicles?: Vehicle[];
  parts: SparePart[];
}

const SpareParts: React.FC<SparePartsProps> = ({ userVehicles = [], parts }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Engine', 'Suspension', 'Interior', 'Exterior', 'Electronics'];

  const filteredParts = selectedCategory === 'All' 
    ? parts 
    : parts.filter(p => p.category === selectedCategory);

  const checkFitment = (compatibility: string[]) => {
    return userVehicles.find(v => compatibility.some(c => v.model.includes(c) || c === 'Universal'));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border
                ${selectedCategory === cat 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xl' 
                  : 'bg-white text-slate-500 hover:bg-slate-50 border-slate-200'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase hover:bg-blue-600 transition-all">
          <Filter className="w-4 h-4" />
          Filter Options
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredParts.map(part => {
          const fittedVehicle = checkFitment(part.compatibility);
          return (
            <div key={part.id} className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-2xl transition-all group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img src={part.image} alt={part.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="px-3 py-1.5 bg-white/95 backdrop-blur rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-900 shadow-sm">
                    {part.condition}
                  </div>
                  {fittedVehicle && (
                    <div className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                      <CheckCircle2 className="w-3 h-3" />
                      Fits your {fittedVehicle.model}
                    </div>
                  )}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{part.category}</span>
                  <span className="text-[10px] font-bold text-slate-400">SKU-{part.id}</span>
                </div>
                <h3 className="font-black text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors h-12 line-clamp-2">{part.name}</h3>
                <p className="text-xs text-slate-500 font-bold mb-6">{part.brand}</p>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Price</span>
                    <span className="text-2xl font-black text-slate-900 leading-none">RM {part.price}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                      <Info className="w-5 h-5" />
                    </button>
                    <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-xl shadow-lg active:scale-90 transition-all">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpareParts;
