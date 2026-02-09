
import React, { useState } from 'react';
import { Plus, Car as CarIcon, Gauge, Calendar, ShieldCheck, ChevronRight, Activity, Wrench, Settings } from 'lucide-react';
import { Vehicle } from '../App';

interface MyGarageProps {
  vehicles: Vehicle[];
  onAdd: (v: Vehicle) => void;
  onNavigate: (tab: any) => void;
}

const MyGarage: React.FC<MyGarageProps> = ({ vehicles, onAdd, onNavigate }) => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">My Vehicles</h2>
          <p className="text-slate-500 text-sm">Manage your cars and track their health.</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-500 transition-all">
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[1.5rem] flex items-center justify-center">
                    <CarIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{vehicle.brand} {vehicle.model}</h3>
                    <p className="text-slate-400 font-mono text-sm uppercase">{vehicle.plate} • {vehicle.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1.5 rounded-full text-[10px] font-black uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Health: Good
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Gauge className="w-4 h-4 text-slate-400 mb-2" />
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Mileage</p>
                  <p className="text-sm font-black text-slate-900">{vehicle.mileage.toLocaleString()} KM</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Calendar className="w-4 h-4 text-slate-400 mb-2" />
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Last Service</p>
                  <p className="text-sm font-black text-slate-900">{vehicle.lastService}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <Activity className="w-4 h-4 text-slate-400 mb-2" />
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Status</p>
                  <p className="text-sm font-black text-blue-600">Active</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-blue-50 rounded-2xl p-4 flex items-center justify-between border border-blue-100">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <p className="text-sm font-bold text-blue-900">Next Service in 5,500 KM</p>
                  </div>
                  <button 
                    onClick={() => onNavigate('maintenance')}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => onNavigate('maintenance')}
                    className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Wrench className="w-4 h-4" />
                    Service Logs
                  </button>
                  <button className="p-3 bg-slate-100 text-slate-400 hover:text-slate-900 rounded-xl transition-all">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Background design */}
            <CarIcon className="absolute -bottom-10 -right-10 w-48 h-48 text-slate-50 group-hover:text-blue-50 transition-colors pointer-events-none -rotate-12" />
          </div>
        ))}

        {vehicles.length === 0 && (
          <div className="lg:col-span-2 py-20 bg-white rounded-[2.5rem] border border-dashed border-slate-300 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <CarIcon className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Your garage is empty</h3>
            <p className="text-slate-500 max-w-sm mb-8">Add your car to get personalized maintenance alerts, part matching, and history tracking.</p>
            <button 
               onClick={() => setShowAdd(true)}
               className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-xl transition-all"
            >
              Add Your First Car
            </button>
          </div>
        )}
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAdd(false)}></div>
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg relative z-10 shadow-2xl overflow-hidden p-8">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Add New Vehicle</h3>
            <p className="text-slate-500 text-sm mb-8">Enter your vehicle details for personalized maintenance.</p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Brand</label>
                  <select className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Perodua</option>
                    <option>Proton</option>
                    <option>Honda</option>
                    <option>Toyota</option>
                    <option>Mazda</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Year</label>
                  <input type="text" placeholder="e.g., 2022" className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Model</label>
                <input type="text" placeholder="e.g., Myvi 1.5 AV" className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Plate Number</label>
                  <input type="text" placeholder="VHY 8821" className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 uppercase font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Current Mileage</label>
                  <input type="number" placeholder="24500" className="w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button onClick={() => setShowAdd(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">Cancel</button>
                <button onClick={() => {
                  onAdd({ id: Math.random().toString(), brand: 'Perodua', model: 'Bezza 1.3X', year: '2023', mileage: 12000, plate: 'WYY 1234', lastService: '2024-03-01' });
                  setShowAdd(false);
                }} className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all">Save Vehicle</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGarage;
