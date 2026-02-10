import React from 'react';
import { 
  ArrowRight, 
  ShoppingBag, 
  Users, 
  Gavel, 
  Sparkles, 
  Car as CarIcon
} from 'lucide-react';

interface HomeProps {
  onNavigate: (tab: any) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const brands = [
    { name: 'Perodua', logo: '🚗' },
    { name: 'Proton', logo: '🚘' },
    { name: 'Honda', logo: '🏎️' },
    { name: 'Toyota', logo: '🚐' },
    { name: 'Nissan', logo: '🚜' },
    { name: 'Mazda', logo: '🚓' },
  ];

  const featuredBids = [
    { id: '1', title: 'Civic FC Headlamp', price: 'RM 450', bids: 12, image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=200&auto=format&fit=crop' },
    { id: '2', title: 'Myvi G3 Spoiler', price: 'RM 120', bids: 8, image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=200&auto=format&fit=crop' },
  ];

  return (
    <div className="animate-in fade-in duration-700 space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 h-[500px] md:h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="relative z-10 p-8 md:p-16 max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" />
            Empowering Malaysian Drivers
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            The Only <span className="text-blue-500">Auto Hub</span> You Need.
          </h1>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Find genuine spare parts, join Malaysia's biggest car community, and troubleshoot issues instantly with our AI Mechanic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => onNavigate('parts')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
            >
              Shop Spare Parts
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onNavigate('ai')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border border-white/10 active:scale-95"
            >
              Ask AI Mechanic
            </button>
          </div>
        </div>
      </section>

      {/* Brand Shortcuts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold text-slate-900">Shop by Brand</h3>
          <button 
            onClick={() => onNavigate('parts')}
            className="text-blue-600 text-sm font-bold hover:underline"
          >
            View All Brands
          </button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <button 
              key={brand.name}
              onClick={() => onNavigate('parts')}
              className="bg-white border p-6 rounded-2xl hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{brand.logo}</div>
              <p className="text-sm font-bold text-slate-800">{brand.name}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border hover:shadow-2xl transition-all group">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h4 className="text-xl font-bold text-slate-900 mb-3">Parts Marketplace</h4>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">Millions of new and used parts for every Malaysian car model. Genuine quality guaranteed.</p>
          <button onClick={() => onNavigate('parts')} className="flex items-center gap-2 text-blue-600 font-bold text-sm">
            Explore Store <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 border hover:shadow-2xl transition-all group">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Users className="w-7 h-7" />
          </div>
          <h4 className="text-xl font-bold text-slate-900 mb-3">Community Hub</h4>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">Share breakdown tips, modification inspiration, and connect with fellow enthusiasts.</p>
          <button onClick={() => onNavigate('community')} className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
            Join Discussion <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 border hover:shadow-2xl transition-all group">
          <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
            <Gavel className="w-7 h-7" />
          </div>
          <h4 className="text-xl font-bold text-slate-900 mb-3">Second-Hand Bidding</h4>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">The safest place to bid on rare half-cut parts and secondhand accessories at great prices.</p>
          <button onClick={() => onNavigate('bidding')} className="flex items-center gap-2 text-orange-600 font-bold text-sm">
            See Live Auctions <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-10 border-t flex flex-col items-center text-center gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <CarIcon className="text-white w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-slate-900">JomBaiki</span>
        </div>
        <p className="text-slate-500 text-sm max-w-sm">
          Built for Malaysians, by car enthusiasts. Your trusted partner for automotive care. Mahalil Aisha Jamaluddin
        </p>
        <div className="flex gap-6 mt-4">
           {['Terms', 'Privacy', 'Help Center', 'Workshop Login'].map(link => (
             <a key={link} href="#" className="text-xs text-slate-400 hover:text-blue-600 font-medium transition-colors">{link}</a>
           ))}
        </div>
      </footer>
    </div>
  );
};

export default Home;