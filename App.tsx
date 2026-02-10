
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
  LayoutDashboard
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
import { Tab, Vehicle } from './types.ts';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Shared state for User's Garage
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    { id: 'v1', brand: 'Perodua', model: 'Myvi 1.5 AV', year: '2022', mileage: 24500, plate: 'VHY 8821', lastService: '2024-01-15' }
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
      case 'parts': return <SpareParts userVehicles={vehicles} />;
      case 'lubricants': return <Lubricants />;
      case 'car-bidding': return <CarBidding />;
      case 'community': return <Community />;
      case 'bidding': return <Bidding />;
      case 'maintenance': return <MaintenanceGuide activeVehicle={vehicles[0]} />;
      case 'ai': return <AIChat />;
      default: return <Home onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white border-b sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Car className="text-blue-600 w-8 h-8" />
          <span className="font-bold text-xl tracking-tight text-slate-800">JomBaiki</span>
        </div>
        <button onClick={toggleSidebar} className="p-2 text-slate-600">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 h-full flex flex-col">
          <div className="hidden md:flex items-center gap-3 mb-10">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Car className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-2xl text-slate-900">JomBaiki</span>
          </div>

          <nav className="flex-1 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as Tab);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${activeTab === item.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}
                `}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-4 rounded-2xl text-white shadow-lg">
              <h4 className="font-semibold text-sm mb-1">Premium Member</h4>
              <p className="text-xs text-blue-100 mb-3">Early access to fresh car auctions & lower buyer fees.</p>
              <button className="w-full py-2 bg-white text-blue-700 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors">
                Join VIP
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="hidden md:flex items-center justify-between p-6 bg-white border-b sticky top-0 z-30">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 capitalize">
              {navigation.find(n => n.id === activeTab)?.name}
            </h1>
            <p className="text-slate-500 text-sm">Automotive management for Malaysia.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search news, parts..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500 w-64 transition-all"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-2 border-l pl-4 cursor-pointer hover:bg-slate-50 p-1 rounded-lg transition-all" onClick={() => setActiveTab('garage')}>
              <img src="https://picsum.photos/32/32" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
              <div className="text-sm">
                <p className="font-medium text-slate-900 leading-none">Azman Ali</p>
                <p className="text-[10px] text-blue-600 font-bold mt-1 uppercase">Gold Member</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-8">
          {renderContent()}
        </div>
      </main>

      <button className="md:hidden fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-2xl z-50">
        <PlusCircle className="w-6 h-6" />
      </button>
    </div>
  );
};

export default App;
