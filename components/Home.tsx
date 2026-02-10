
import React from 'react';
import { 
  ArrowRight, 
  ShoppingBag, 
  Users, 
  Gavel, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp,
  MapPin,
  Car as CarIcon,
  CheckCircle
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
    { id: '1', title: 'Civic FC Headlamp', price: 'RM 450', bids: 12, image: 'https://picsum.photos/200/200?random=101' },
    { id: '2', title: 'Myvi G3 Spoiler', price: 'RM 120', bids: 8, image: 'https://picsum.photos/200/200?random=102' },
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

      {/* Main Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border hover:shadow-2xl transition-all group">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h4 className="text-xl font-bold text-slate-900 mb-3">Parts Marketplace</h4>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">Millions of new and used parts for every Malaysian car model. Genuine quality guaranteed.</p>
          <button 
            onClick={() => onNavigate('parts')}
            className="flex items-center gap-2 text-blue-600 font-bold text-sm"
          >
            Explore Store <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 border hover:shadow-2xl transition-all group">
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <Users className="w-7 h-7" />
          </div>
          <h4 className="text-xl font-bold text-slate-900 mb-3">Community Hub</h4>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">Share breakdown tips, modification inspiration, and connect with fellow enthusiasts.</p>
          <button 
            onClick={() => onNavigate('community')}
            className="flex items-center gap-2 text-indigo-600 font-bold text-sm"
          >
            Join Discussion <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 border hover:shadow-2xl transition-all group">
          <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">
            <Gavel className="w-7 h-7" />
          </div>
          <h4 className="text-xl font-bold text-slate-900 mb-3">Second-Hand Bidding</h4>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">The safest place to bid on rare half-cut parts and secondhand accessories at great prices.</p>
          <button 
            onClick={() => onNavigate('bidding')}
            className="flex items-center gap-2 text-orange-600 font-bold text-sm"
          >
            See Live Auctions <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* AI mechanic promo banner */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[2rem] p-10 md:p-16 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-blue-200 font-bold uppercase tracking-tighter text-sm mb-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            Powered by Gemini AI
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Got a car problem? Ask our AI Mechanic.</h2>
          <p className="text-blue-100/70 text-lg mb-8">No more scratching your head. Snap a photo or describe the sound, and get instant professional advice tailored for Malaysia.</p>
          <button 
            onClick={() => onNavigate('ai')}
            className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-bold hover:bg-blue-50 transition-all flex items-center gap-2"
          >
            Start Diagnosis
            <Sparkles className="w-5 h-5 text-blue-600" />
          </button>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-10 hidden lg:block">
           <CarIcon className="w-80 h-80 text-white/5 -rotate-12" />
        </div>
      </section>

      {/* Trust Badges / Stats */}
      <section className="bg-white rounded-3xl border p-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-black text-slate-900 mb-2">12k+</div>
            <p className="text-slate-500 text-sm">Spare Parts Available</p>
          </div>
          <div>
            <div className="text-4xl font-black text-slate-900 mb-2">5.0</div>
            <p className="text-slate-500 text-sm">Average Rating</p>
          </div>
          <div>
            <div className="text-4xl font-black text-slate-900 mb-2">100%</div>
            <p className="text-slate-500 text-sm">Genuine Parts</p>
          </div>
          <div>
            <div className="text-4xl font-black text-slate-900 mb-2">24/7</div>
            <p className="text-slate-500 text-sm">AI Support</p>
          </div>
        </div>
      </section>

      {/* Featured Bidding Snippet */}
      <section className="bg-slate-100 rounded-3xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Trending Auctions</h3>
            <p className="text-slate-500 text-sm">Ending soon! Don't miss out.</p>
          </div>
          <button 
            onClick={() => onNavigate('bidding')}
            className="px-6 py-2 bg-white border rounded-xl font-bold text-sm hover:shadow-md transition-all"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredBids.map(bid => (
            <div key={bid.id} className="bg-white p-4 rounded-2xl border flex gap-4 hover:border-blue-500 transition-colors">
              <img src={bid.image} alt={bid.title} className="w-24 h-24 rounded-xl object-cover" />
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h4 className="font-bold text-slate-900">{bid.title}</h4>
                  <p className="text-blue-600 font-black text-lg">{bid.price}</p>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                  <span>{bid.bids} Bids</span>
                  <span className="text-red-500">Ending Soon</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Branding */}
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
