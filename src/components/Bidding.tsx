
import React from 'react';
import { Timer, Hammer, TrendingUp } from 'lucide-react';

const MOCK_AUCTIONS = [
  { id: 'a1', title: 'Perodua Myvi Gen 3 Steering Rack (Used)', currentBid: 320, timeLeft: '04h 22m', image: 'https://picsum.photos/500/350?random=21', bids: 18, location: 'Cheras, Selangor' },
  { id: 'a2', title: 'Proton X50 Original Wheels (Set of 4)', currentBid: 1200, timeLeft: '12h 05m', image: 'https://picsum.photos/500/350?random=22', bids: 5, location: 'Ipoh, Perak' },
  { id: 'a3', title: 'Honda City GN2 Gearbox ECU', currentBid: 450, timeLeft: '01h 15m', image: 'https://picsum.photos/500/350?random=23', bids: 24, location: 'Johor Bahru' },
  { id: 'a4', title: 'Carbon Fiber Spoiler for Civic FE', currentBid: 580, timeLeft: '45m 12s', image: 'https://picsum.photos/500/350?random=24', bids: 42, location: 'Penang' },
];

const Bidding: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <span className="inline-block px-3 py-1 bg-red-500 rounded-full text-xs font-black uppercase mb-4 animate-pulse">Hot Auction</span>
          <h2 className="text-3xl font-bold mb-4">Grab rare parts at unbeatable prices.</h2>
          <p className="text-slate-400 mb-6 text-sm">Verified sellers and secure bidding process for all second-hand components.</p>
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-bold transition-all">Start Bidding</button>
            <button className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-xl font-bold backdrop-blur-sm transition-all">Sell Part</button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
           <div className="h-full w-full bg-gradient-to-l from-blue-600/20 to-transparent"></div>
           <Hammer className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 text-white/10 rotate-12" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_AUCTIONS.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border flex flex-col sm:flex-row overflow-hidden group hover:border-blue-500 transition-colors shadow-sm">
            <div className="w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.location}</span>
                  <div className="flex items-center gap-1 text-red-600 text-xs font-bold">
                    <Timer className="w-3 h-3" />
                    {item.timeLeft}
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
                  placeholder={`RM ${item.currentBid + 10}`} 
                  className="flex-1 bg-slate-50 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-all active:scale-95">
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
