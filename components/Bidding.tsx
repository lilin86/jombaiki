
import React, { useState } from 'react';
import { Timer, Hammer, TrendingUp } from 'lucide-react';

interface BiddingProps {
  auctions: any[];
  onBid: (id: string, amount: number) => void;
}

const Bidding: React.FC<BiddingProps> = ({ auctions, onBid }) => {
  const [bidAmounts, setBidAmounts] = useState<Record<string, string>>({});

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <span className="inline-block px-3 py-1 bg-red-500 rounded-full text-xs font-black uppercase mb-4 animate-pulse">Live Auction</span>
          <h2 className="text-3xl font-bold mb-4">Grab rare parts at unbeatable prices.</h2>
          <p className="text-slate-400 mb-6 text-sm">Verified sellers and secure bidding process for all second-hand components.</p>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block opacity-10">
           <Hammer className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-white rotate-12" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {auctions.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border flex flex-col sm:flex-row overflow-hidden group hover:border-blue-500 transition-colors shadow-sm">
            <div className="w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{item.location}</span>
                  <div className="flex items-center gap-1 text-red-600 text-xs font-bold">
                    <Timer className="w-3 h-3" /> {item.timeLeft}
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-medium">Current Bid</p>
                    <p className="text-lg font-black text-slate-900">RM {item.currentBid}</p>
                  </div>
                  <div className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs font-bold">{item.bids} Bids</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  value={bidAmounts[item.id] || ''}
                  onChange={e => setBidAmounts({...bidAmounts, [item.id]: e.target.value})}
                  placeholder={`RM ${item.currentBid + 10}`} 
                  className="flex-1 bg-slate-50 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button 
                  onClick={() => {
                    const amt = parseInt(bidAmounts[item.id]);
                    if (amt > item.currentBid) {
                      onBid(item.id, amt);
                      setBidAmounts({...bidAmounts, [item.id]: ''});
                    }
                  }}
                  className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all"
                >
                  Bid
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bidding;
