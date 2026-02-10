
import React, { useState } from 'react';
import { Plus, Package, Gavel, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { SparePart } from '../types.ts';

interface ManagementProps {
  onAddPart: (p: SparePart) => void;
  onAddAuction: (a: any) => void;
}

const Management: React.FC<ManagementProps> = ({ onAddPart, onAddAuction }) => {
  const [activeForm, setActiveForm] = useState<'part' | 'auction' | null>(null);
  const [success, setSuccess] = useState(false);

  const [partData, setPartData] = useState({
    name: '',
    brand: '',
    price: '',
    category: 'Engine',
    compatibility: ''
  });

  const handleAddPart = () => {
    onAddPart({
      id: Math.random().toString(36).substr(2, 9),
      name: partData.name,
      brand: partData.brand,
      price: parseInt(partData.price),
      category: partData.category as any,
      image: `https://picsum.photos/400/300?random=${Math.random()}`,
      compatibility: partData.compatibility.split(',').map(c => c.trim()),
      condition: 'New'
    });
    setSuccess(true);
    setTimeout(() => { setSuccess(false); setActiveForm(null); }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-[2.5rem] p-8 border shadow-sm">
        <h2 className="text-2xl font-black mb-6">Portal Content Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            onClick={() => setActiveForm('part')}
            className="p-8 border-2 border-dashed border-blue-200 rounded-[2rem] hover:bg-blue-50 transition-all group flex flex-col items-center text-center"
          >
            <div className="bg-blue-600 p-4 rounded-2xl text-white mb-4 group-hover:scale-110 transition-transform">
              <Package className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-lg">Add Spare Part</h4>
            <p className="text-slate-500 text-sm mt-2">Upload new items to the Spare Parts marketplace.</p>
          </button>

          <button 
            onClick={() => setActiveForm('auction')}
            className="p-8 border-2 border-dashed border-slate-200 rounded-[2rem] hover:bg-slate-50 transition-all group flex flex-col items-center text-center"
          >
            <div className="bg-slate-900 p-4 rounded-2xl text-white mb-4 group-hover:scale-110 transition-transform">
              <Gavel className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-lg">Create Auction</h4>
            <p className="text-slate-500 text-sm mt-2">List a second-hand part for bidding.</p>
          </button>
        </div>
      </div>

      {activeForm === 'part' && (
        <div className="bg-white rounded-[2.5rem] p-8 border shadow-xl animate-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xl font-bold mb-6">Enter Part Details</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2 col-span-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Part Name</label>
              <input 
                value={partData.name}
                onChange={e => setPartData({...partData, name: e.target.value})}
                className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Brand</label>
              <input 
                value={partData.brand}
                onChange={e => setPartData({...partData, brand: e.target.value})}
                className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Price (RM)</label>
              <input 
                type="number"
                value={partData.price}
                onChange={e => setPartData({...partData, price: e.target.value})}
                className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Category</label>
              <select 
                value={partData.category}
                onChange={e => setPartData({...partData, category: e.target.value})}
                className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none"
              >
                <option>Engine</option>
                <option>Suspension</option>
                <option>Electronics</option>
                <option>Exterior</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Compatibility (Comma separated)</label>
              <input 
                value={partData.compatibility}
                onChange={e => setPartData({...partData, compatibility: e.target.value})}
                placeholder="Perodua Myvi, Proton Saga" 
                className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none" 
              />
            </div>
          </div>
          <div className="mt-8 flex gap-3">
             <button onClick={() => setActiveForm(null)} className="flex-1 py-4 bg-slate-100 rounded-2xl font-bold">Cancel</button>
             <button 
                onClick={handleAddPart}
                className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                {success ? <><CheckCircle2 /> Added!</> : 'Publish to Marketplace'}
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Management;
