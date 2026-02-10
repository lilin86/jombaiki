import React, { useState } from 'react';
import { Package, Gavel, CheckCircle2, AlertCircle, Loader2, X } from 'lucide-react';
import { SparePart } from '../types.ts';

interface ManagementProps {
  onAddPart: (p: SparePart) => void;
  onAddAuction: (a: any) => void;
}

const Management: React.FC<ManagementProps> = ({ onAddPart, onAddAuction }) => {
  const [activeForm, setActiveForm] = useState<'part' | 'auction' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form States
  const [partData, setPartData] = useState({
    name: '',
    brand: '',
    price: '',
    category: 'Engine',
    compatibility: ''
  });

  const [auctionData, setAuctionData] = useState({
    title: '',
    startingBid: '',
    location: '',
    duration: '24h'
  });

  const handleAddPart = async () => {
    if (!partData.name || !partData.price) return;
    
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    
    onAddPart({
      id: Math.random().toString(36).substr(2, 9),
      name: partData.name,
      brand: partData.brand || 'Generic',
      price: parseInt(partData.price),
      category: partData.category as any,
      image: `https://picsum.photos/400/300?random=${Math.random()}`,
      compatibility: partData.compatibility ? partData.compatibility.split(',').map(c => c.trim()) : ['Universal'],
      condition: 'New'
    });
    
    setSuccess(true);
    setIsSubmitting(false);
    setTimeout(() => { 
      setSuccess(false); 
      setActiveForm(null); 
      setPartData({name:'', brand:'', price:'', category:'Engine', compatibility:''}); 
    }, 2000);
  };

  const handleAddAuction = async () => {
    if (!auctionData.title || !auctionData.startingBid) return;

    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));

    onAddAuction({
      id: Math.random().toString(36).substr(2, 9),
      title: auctionData.title,
      currentBid: parseInt(auctionData.startingBid),
      timeLeft: auctionData.duration,
      image: `https://picsum.photos/500/350?random=${Math.random()}`,
      bids: 0,
      location: auctionData.location || 'Kuala Lumpur'
    });

    setSuccess(true);
    setIsSubmitting(false);
    setTimeout(() => { 
      setSuccess(false); 
      setActiveForm(null); 
      setAuctionData({title:'', startingBid:'', location:'', duration:'24h'}); 
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-[2.5rem] p-8 border shadow-sm">
        <h2 className="text-2xl font-black mb-6">Portal Content Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button 
            disabled={isSubmitting}
            onClick={() => { setActiveForm('part'); setSuccess(false); }}
            className={`p-8 border-2 border-dashed rounded-[2rem] transition-all group flex flex-col items-center text-center
              ${activeForm === 'part' ? 'border-blue-500 bg-blue-50' : 'border-blue-200 hover:bg-blue-50'}
            `}
          >
            <div className="bg-blue-600 p-4 rounded-2xl text-white mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <Package className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-lg">Sell New Part</h4>
            <p className="text-slate-500 text-sm mt-2">Add items to the Spare Parts marketplace.</p>
          </button>

          <button 
            disabled={isSubmitting}
            onClick={() => { setActiveForm('auction'); setSuccess(false); }}
            className={`p-8 border-2 border-dashed rounded-[2rem] transition-all group flex flex-col items-center text-center
              ${activeForm === 'auction' ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:bg-slate-50'}
            `}
          >
            <div className="bg-slate-900 p-4 rounded-2xl text-white mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <Gavel className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-lg">Start Bidding</h4>
            <p className="text-slate-500 text-sm mt-2">List secondhand items for auction.</p>
          </button>
        </div>
      </div>

      {activeForm === 'part' && (
        <div className="bg-white rounded-[2.5rem] p-8 border shadow-xl animate-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Spare Part Details</h3>
            <button onClick={() => setActiveForm(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Part Name *</label>
              <input value={partData.name} onChange={e => setPartData({...partData, name: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Myvi Brake Pads" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Brand</label>
              <input value={partData.brand} onChange={e => setPartData({...partData, brand: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Price (RM) *</label>
              <input type="number" value={partData.price} onChange={e => setPartData({...partData, price: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none" />
            </div>
          </div>
          <button 
            onClick={handleAddPart}
            disabled={isSubmitting || !partData.name || !partData.price}
            className={`w-full py-4 mt-8 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${success ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'}`}
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : success ? <><CheckCircle2 className="w-5 h-5" /> Success!</> : 'Publish to Marketplace'}
          </button>
        </div>
      )}

      {activeForm === 'auction' && (
        <div className="bg-white rounded-[2.5rem] p-8 border shadow-xl animate-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold">Auction Item Details</h3>
            <button onClick={() => setActiveForm(null)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-5 h-5 text-slate-400" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Item Title *</label>
              <input value={auctionData.title} onChange={e => setAuctionData({...auctionData, title: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none" placeholder="e.g. Used Rim Set" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Starting Bid (RM) *</label>
              <input type="number" value={auctionData.startingBid} onChange={e => setAuctionData({...auctionData, startingBid: e.target.value})} className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none" />
            </div>
          </div>
          <button 
            onClick={handleAddAuction}
            disabled={isSubmitting || !auctionData.title || !auctionData.startingBid}
            className={`w-full py-4 mt-8 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${success ? 'bg-green-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50'}`}
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : success ? <><CheckCircle2 className="w-5 h-5" /> Auction Live!</> : 'Start Bidding Process'}
          </button>
        </div>
      )}
      
      <div className="p-6 bg-blue-50 rounded-2xl border flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-blue-600 mt-1" />
        <p className="text-xs text-blue-700 leading-relaxed">All listings are verified within 12 hours. Accurate descriptions help avoid rejection.</p>
      </div>
    </div>
  );
};

export default Management;