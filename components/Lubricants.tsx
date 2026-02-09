
import React, { useState } from 'react';
import { Filter, ShoppingCart, Droplet, Info, ShieldCheck } from 'lucide-react';

const MOCK_LUBRICANTS = [
  { 
    id: 'l1', 
    name: 'Petronas Syntium 3000 E', 
    brand: 'Petronas', 
    price: 135, 
    viscosity: '5W-30', 
    type: 'Fully Synthetic', 
    volume: '4L', 
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&h=300&fit=crop',
    category: 'Engine Oil'
  },
  { 
    id: 'l2', 
    name: 'Shell Helix Ultra', 
    brand: 'Shell', 
    price: 185, 
    viscosity: '0W-20', 
    type: 'Fully Synthetic', 
    volume: '4L', 
    image: 'https://images.unsplash.com/photo-1597739239353-50270a473397?q=80&w=400&h=300&fit=crop',
    category: 'Engine Oil'
  },
  { 
    id: 'l3', 
    name: 'Perodua Genuine Engine Oil', 
    brand: 'Perodua', 
    price: 95, 
    viscosity: '5W-30', 
    type: 'Semi-Synthetic', 
    volume: '4L', 
    image: 'https://images.unsplash.com/photo-1635773054018-22c98980310f?q=80&w=400&h=300&fit=crop',
    category: 'Engine Oil'
  },
  { 
    id: 'l4', 
    name: 'Castrol Magnatec Stop-Start', 
    brand: 'Castrol', 
    price: 145, 
    viscosity: '10W-40', 
    type: 'Semi-Synthetic', 
    volume: '4L', 
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=400&h=300&fit=crop',
    category: 'Engine Oil'
  },
  { 
    id: 'l5', 
    name: 'Proton Genuine ATF-DW1', 
    brand: 'Proton', 
    price: 45, 
    viscosity: 'ATF', 
    type: 'Fully Synthetic', 
    volume: '1L', 
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&h=300&fit=crop',
    category: 'Gear Oil'
  },
  { 
    id: 'l6', 
    name: 'Brembo DOT 4 Brake Fluid', 
    brand: 'Brembo', 
    price: 35, 
    viscosity: 'DOT 4', 
    type: 'Synthetic', 
    volume: '500ml', 
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=400&h=300&fit=crop',
    category: 'Brake Fluid'
  },
];

const Lubricants: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const categories = ['All', 'Engine Oil', 'Gear Oil', 'Brake Fluid', 'Coolant'];
  const types = ['All', 'Fully Synthetic', 'Semi-Synthetic', 'Mineral'];

  const filteredItems = MOCK_LUBRICANTS.filter(item => {
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
    const typeMatch = selectedType === 'All' || item.type === selectedType;
    return categoryMatch && typeMatch;
  });

  return (
    <div className="space-y-6">
      <div className="bg-blue-600 rounded-3xl p-6 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-blue-200" />
            <span className="text-blue-100 text-sm font-bold uppercase tracking-wider">100% Genuine Guaranteed</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">The Best Fluids for your Malaysian Drive.</h2>
          <p className="text-blue-100/80 text-sm md:text-base mb-6">Whether it's a highway cruise in a Vios or city crawling in a Myvi, we have the right grade for your engine.</p>
          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-xs font-bold">Low Viscosity Experts</div>
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-xs font-bold">Direct from Distributor</div>
          </div>
        </div>
        <div className="relative z-10 hidden lg:block">
           <Droplet className="w-48 h-48 text-white/10 -rotate-12" />
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-50"></div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border
                ${selectedCategory === cat 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-lg' 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <span className="text-xs font-bold text-slate-400 uppercase mr-2 ml-1">Type:</span>
          {types.map(t => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all
                ${selectedType === t 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}
              `}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all group relative">
            <div className="relative aspect-square overflow-hidden bg-slate-100">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-black text-slate-900 uppercase shadow-sm">
                {item.viscosity}
              </div>
              <div className="absolute bottom-3 right-3 px-3 py-1 bg-blue-600 rounded-lg text-[10px] font-black text-white uppercase shadow-lg">
                {item.volume}
              </div>
            </div>
            
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.brand}</span>
                <div className="flex items-center gap-1 text-green-600">
                  <ShieldCheck className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase">Genuine</span>
                </div>
              </div>
              
              <h3 className="font-bold text-slate-900 mb-1 leading-tight group-hover:text-blue-600 transition-colors h-10 line-clamp-2">
                {item.name}
              </h3>
              <p className="text-xs text-slate-500 mb-4">{item.type}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Our Price</span>
                  <span className="text-xl font-black text-slate-900">RM {item.price}</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2.5 bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
                    <Info className="w-5 h-5" />
                  </button>
                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all">
                    <ShoppingCart className="w-4 h-4" />
                    Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
          <Droplet className="w-16 h-16 text-slate-200 mb-4" />
          <h3 className="text-lg font-bold text-slate-900">No lubricants found</h3>
          <p className="text-slate-500 text-sm">Try adjusting your filters to find more products.</p>
        </div>
      )}
    </div>
  );
};

export default Lubricants;
