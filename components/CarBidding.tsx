
import React, { useState } from 'react';
import { 
  Timer, 
  Hammer, 
  TrendingUp, 
  MapPin, 
  CheckCircle2, 
  History, 
  Fuel, 
  Zap,
  Info,
  Calendar,
  Gauge,
  Car as CarIcon,
  Check,
  Loader2
} from 'lucide-react';

interface CarBiddingProps {
  onNavigate?: (tab: any) => void;
}

const MOCK_CAR_AUCTIONS = [
  {
    id: 'car1',
    title: '2021 Perodua Myvi 1.5 AV (A)',
    price: 42500,
    mileage: '35,000 km',
    fuel: 'Petrol',
    transmission: 'Auto',
    location: 'Puchong, Selangor',
    timeLeft: '02h 45m',
    bids: 24,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop',
    verified: true
  },
  {
    id: 'car2',
    title: '2019 Proton Saga 1.3 Premium (A)',
    price: 28900,
    mileage: '62,000 km',
    fuel: 'Petrol',
    transmission: 'Auto',
    location: 'Cheras, KL',
    timeLeft: '05h 12m',
    bids: 15,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=800&auto=format&fit=crop',
    verified: true
  },
  {
    id: 'car3',
    title: '2020 Honda City 1.5 V i-VTEC',
    price: 64000,
    mileage: '48,000 km',
    fuel: 'Petrol',
    transmission: 'CVT',
    location: 'Ipoh, Perak',
    timeLeft: '12h 30m',
    bids: 32,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=800&auto=format&fit=crop',
    verified: true
  },
  {
    id: 'car4',
    title: '2018 Toyota Vios 1.5 G (A)',
    price: 52000,
    mileage: '75,000 km',
    fuel: 'Petrol',
    transmission: 'Auto',
    location: 'Johor Bahru',
    timeLeft: '01h 05m',
    bids: 41,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop',
    verified: false
  }
];

const CarBidding: React.FC<CarBiddingProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [biddingId, setBiddingId] = useState<string | null>(null);

  const filters = ['All', 'Perodua', 'Proton', 'Honda', 'Toyota', 'Other'];

  const handleBid = (id: string) => {
    setBiddingId(id);
    // Simulate bid logic
    setTimeout(() => {
      setBiddingId(null);
      alert("Bid placed successfully! You are currently the highest bidder.");
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Promotion Header */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-yellow-400 text-slate-900 text-[10px] font-black uppercase px-2 py-1 rounded">Live Auctions</span>
            <span className="text-blue-200 text-xs font-medium">Over 150 cars available today</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">Bid for Verified Secondhand Cars.</h2>
          <p className="text-slate-300 text-sm md:text-lg mb-8 max-w-lg leading-relaxed">
            All cars listed in the Premium section come with a 175-point inspection report and 1-year extended warranty. No hidden fees.
          </p>
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-2xl font-bold transition-all shadow-lg active:scale-95">Browse Listings</button>
            <button 
              onClick={() => onNavigate?.('management')}
              className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-2xl font-bold backdrop-blur-sm transition-all border border-white/20 active:scale-95"
            >
              Sell My Car
            </button>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <CarIcon className="w-full h-full p-20 -rotate-12 translate-x-1/4" />
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border
                ${activeFilter === filter 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'}
              `}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
           <button className="p-2 bg-white border rounded-xl text-slate-500 hover:text-blue-600 transition-colors">
              <History className="w-5 h-5" />
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
              Latest Auctions
           </button>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {MOCK_CAR_AUCTIONS.map(car => (
          <div key={car.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition-all group">
            <div className="relative w-full md:w-72 h-64 md:h-auto overflow-hidden">
              <img src={car.image} alt={car.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              {car.verified && (
                <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Inspection
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg">
                <Timer className="w-3.5 h-3.5 text-yellow-400" />
                {car.timeLeft}
              </div>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                    <MapPin className="w-3 h-3" />
                    {car.location}
                  </div>
                  <div className="flex items-center gap-1 text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded-lg">
                    <TrendingUp className="w-3 h-3" />
                    {car.bids} Bids
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{car.title}</h3>
                
                {/* Specs Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-slate-50 p-2 rounded-xl text-center">
                    <Gauge className="w-4 h-4 mx-auto text-slate-400 mb-1" />
                    <p className="text-[10px] text-slate-500 font-medium">Mileage</p>
                    <p className="text-xs font-bold text-slate-900">{car.mileage}</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl text-center">
                    <Zap className="w-4 h-4 mx-auto text-slate-400 mb-1" />
                    <p className="text-[10px] text-slate-500 font-medium">Trans</p>
                    <p className="text-xs font-bold text-slate-900">{car.transmission}</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-xl text-center">
                    <Fuel className="w-4 h-4 mx-auto text-slate-400 mb-1" />
                    <p className="text-[10px] text-slate-500 font-medium">Fuel</p>
                    <p className="text-xs font-bold text-slate-900">{car.fuel}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4 mt-auto">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Current High Bid</p>
                  <p className="text-2xl font-black text-slate-900">RM {car.price.toLocaleString()}</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button className="p-3 bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all">
                    <Info className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleBid(car.id)}
                    disabled={biddingId === car.id}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-sm hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200 disabled:opacity-50"
                  >
                    {/* Fixed missing Loader2 import */}
                    {biddingId === car.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Hammer className="w-4 h-4" />}
                    Bid Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] p-8 border border-dashed border-slate-300 flex flex-col md:flex-row items-center gap-8">
        <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
          <History className="w-10 h-10" />
        </div>
        <div className="flex-1">
           <h4 className="text-xl font-bold text-slate-900 mb-1">New to Bidding?</h4>
           <p className="text-slate-500 text-sm">Every bid is legally binding. Ensure you have your deposit ready (RM500 for most cars) and have read the inspection reports carefully before placing your bid.</p>
        </div>
        <button className="whitespace-nowrap px-6 py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
          View Auction Guide
        </button>
      </div>
    </div>
  );
};

export default CarBidding;
