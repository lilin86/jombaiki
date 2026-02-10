
import React, { useState } from 'react';
import { 
  Car, 
  ShoppingBag, 
  Users, 
  Gavel, 
  Wrench, 
  MessageSquare, 
  Search, 
  Menu, 
  X, 
  PlusCircle,
  Bell,
  Droplet,
  Home as HomeIcon,
  Tag,
  Newspaper,
  LayoutDashboard,
  Settings
} from 'lucide-react';
import Home from './components/Home.tsx';
import SpareParts from './components/SpareParts.tsx';
import Community from './components/Community.tsx';
import Bidding from './components/Bidding.tsx';
import CarBidding from './components/CarBidding.tsx';
import MaintenanceGuide from './components/MaintenanceGuide.tsx';
import AIChat from './components/AIChat.tsx';
import Lubricants from './components/Lubricants.tsx';
import AutoNews from './components/AutoNews.tsx';
import MyGarage from './components/MyGarage.tsx';
import Management from './components/Management.tsx';
import { Tab, Vehicle, SparePart, AuctionItem } from './types.ts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab | 'management'>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Dynamic State for Content
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 'v1', brand: 'Perodua', model: 'Myvi 1.5 AV', year: '2022', mileage: 24500, plate: 'VHY 8821', lastService: '2024-01-15' }
  ]);

  const [parts, setParts] = useState<SparePart[]>([
    { id: '1', name: 'Perodua Myvi Front Brake Pad', brand: 'Akebono', price: 85, image: 'https://picsum.photos/400/300?random=1', category: 'Suspension', condition: 'New', compatibility: ['Perodua Myvi'] },
    { id: '2', name: 'Proton Saga VVT Oil Filter', brand: 'Proton Genuine', price: 18, image: 'https://picsum.photos/400/300?random=2', category: 'Engine', condition: 'New', compatibility: ['Proton Saga'] },
  ]);

  const [auctions, setAuctions] = useState<any[]>([
    { id: 'a1', title: 'Perodua Myvi Gen 3 Steering Rack', currentBid: 320, timeLeft: '04h 22m', image: 'https://picsum.photos/500/350?random=21', bids: 18, location: 'Cheras, Selangor' },
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navigation = [
    { id: 'home', name: 'Home', icon: HomeIcon },
    { id: 'garage', name: 'My Garage', icon: LayoutDashboard },
    { id: 'news', name: 'Auto News', icon: Newspaper },
    { id: 'parts', name: 'Spare Parts', icon: ShoppingBag },
    { id: 'lubricants', name: 'Lubricants', icon: Droplet },
    { id: 'car-bidding', name: 'Car Auctions', icon: Tag },
    { id: 'bidding', name: 'Part Bidding', icon: Gavel },
    { id: 'community', name: 'Community Hub', icon: Users },
    { id: 'maintenance', name: 'Maintenance Guide', icon: Wrench },
    { id: 'ai', name: 'AI Mechanic', icon: MessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Home onNavigate={setActiveTab} />;
      case 'garage': return <MyGarage vehicles={vehicles} onAdd={(v) => setVehicles([...vehicles, v])} onNavigate={setActiveTab} />;
      case 'news': return <AutoNews />;
      case 'parts': return <SpareParts userVehicles={vehicles} parts={parts} />;
      case 'lubricants': return <Lubricants />;
      case 'car-bidding': return <CarBidding />;
      case 'community': return <Community />;
      case 'bidding': return <Bidding auctions={auctions} onBid={(id, amt) => setAuctions(auctions.map(a => a.id === id ? {...a, currentBid: amt, bids: a.bids + 1} : a))} />;
      case 'maintenance': return <MaintenanceGuide activeVehicle={vehicles[0]} />;
      case 'ai': return <AIChat />;
      case 'management': return (
        <Management 
          onAddPart={(p) => setParts([p, ...parts])} 
          onAddAuction={(a) => setAuctions([a, ...auctions])} 
        />
      );
      default: return <Home onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <header className="md:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Car className="text-blue-600 w-8 h-8" />
          <span className="font-bold text-xl tracking-tight text-slate-800">JomBaiki</span>
        </div>
        <button onClick={toggleSidebar} className="p-2 text-slate-600">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 h-full flex flex-col">
          <div className="hidden md:flex items-center gap-3 mb-10">
            <div className="bg-blue-600 p-2 rounded-lg"><Car className="text-white w-6 h-6" /></div>
            <span className="font-bold text-2xl text-slate-900">JomBaiki</span>
          </div>

          <nav className="flex-1 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id as Tab); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}
                `}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </button>
            ))}
            
            <div className="pt-4 mt-4 border-t border-slate-100">
               <button
                  onClick={() => { setActiveTab('management'); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${activeTab === 'management' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-900'}
                  `}
                >
                  <Settings className="w-5 h-5" />
                  Manage Portal
                </button>
            </div>
          </nav>

          <div className="mt-auto pt-6 border-t">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-4 rounded-2xl text-white shadow-lg">
              <h4 className="font-semibold text-sm mb-1">Premium Member</h4>
              <p className="text-xs text-blue-100 mb-3">Early access to fresh car auctions.</p>
              <button className="w-full py-2 bg-white text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors">Join VIP</button>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="hidden md:flex items-center justify-between p-6 bg-white border-b sticky top-0 z-30">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 capitalize">
              {activeTab === 'management' ? 'Portal Management' : navigation.find(n => n.id === activeTab)?.name}
            </h1>
            <p className="text-slate-500 text-sm">Automotive management for Malaysia.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search news, parts..." className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 w-64 transition-all" />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </div>

        <div className="p-4 md:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
