
import React, { useState, useEffect } from 'react';
import { getPartChecklist } from '../services/gemini';
// Added ChevronRight to the import list from lucide-react
import { CheckCircle2, AlertCircle, Clock, Loader2, BookOpen, RefreshCw, ChevronRight } from 'lucide-react';
import { Vehicle } from '../App';

interface MaintenanceGuideProps {
  activeVehicle?: Vehicle;
}

const MaintenanceGuide: React.FC<MaintenanceGuideProps> = ({ activeVehicle }) => {
  const [model, setModel] = useState(activeVehicle ? `${activeVehicle.brand} ${activeVehicle.model} (${activeVehicle.year})` : 'Perodua Myvi 1.5 AV (2022)');
  const [mileage, setMileage] = useState(activeVehicle ? activeVehicle.mileage.toString() : '20000');
  const [loading, setLoading] = useState(false);
  const [checklist, setChecklist] = useState<any[]>([]);

  useEffect(() => {
    if (activeVehicle) {
      setModel(`${activeVehicle.brand} ${activeVehicle.model} (${activeVehicle.year})`);
      setMileage(activeVehicle.mileage.toString());
    }
  }, [activeVehicle]);

  const generateChecklist = async () => {
    setLoading(true);
    const data = await getPartChecklist(model, parseInt(mileage));
    setChecklist(data.items || []);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-[2.5rem] p-8 border shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-xl">
                <BookOpen className="text-blue-600 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">AI Service Schedule</h2>
            </div>
            {activeVehicle && (
              <div className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase">
                <RefreshCw className="w-3 h-3" />
                Synced with Garage
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Car Model</label>
              <select 
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-slate-50 border rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
              >
                <option>Perodua Myvi 1.5 AV (2022)</option>
                <option>Proton Saga 1.3 Premium</option>
                <option>Honda City 1.5 RS</option>
                <option>Toyota Vios 1.5G</option>
                <option>Perodua Bezza 1.3 Advance</option>
                <option>Proton X50 TGDI</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Current Mileage (km)</label>
              <input 
                type="number"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="e.g., 20000"
                className="w-full bg-slate-50 border rounded-2xl px-5 py-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <button 
            onClick={generateChecklist}
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Analyze Service Needs
                <RefreshCw className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {checklist.length > 0 && (
        <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-slate-50 p-8 border-b flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-900 uppercase">Service Checklist: {model}</h3>
              <p className="text-xs text-slate-500 mt-1">Personalized advice for {mileage}km journey.</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Confidence Score</p>
              <p className="text-xl font-black text-blue-600">98%</p>
            </div>
          </div>
          <div className="divide-y border-slate-100">
            {checklist.map((item, idx) => (
              <div key={idx} className="p-8 flex items-start gap-6 hover:bg-blue-50/30 transition-all group">
                <div className={`mt-1 p-3 rounded-2xl 
                  ${item.urgency === 'High' ? 'bg-red-50 text-red-600' : 
                    item.urgency === 'Medium' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}
                `}>
                  {item.urgency === 'High' ? <AlertCircle className="w-6 h-6" /> : 
                   item.urgency === 'Medium' ? <Clock className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-black text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{item.partName}</h4>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm
                      ${item.urgency === 'High' ? 'bg-red-600 text-white' : 
                        item.urgency === 'Medium' ? 'bg-orange-400 text-white' : 'bg-green-500 text-white'}
                    `}>
                      {item.urgency} Priority
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-4 leading-relaxed font-medium">{item.action}</p>
                  <div className="flex gap-3">
                    <button className="text-blue-600 text-xs font-black uppercase tracking-widest hover:underline flex items-center gap-1.5">
                      Buy Genuine Part
                      <ChevronRight className="w-3 h-3" />
                    </button>
                    <button className="text-slate-400 text-xs font-black uppercase tracking-widest hover:text-slate-900 flex items-center gap-1.5">
                      DIY Guide
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-8 bg-blue-600 text-white">
             <div className="flex gap-6 items-center">
                <div className="bg-white/20 p-4 rounded-[1.5rem] backdrop-blur-md">
                   <AlertCircle className="w-8 h-8" />
                </div>
                <div className="flex-1">
                   <h4 className="font-black uppercase text-sm mb-1 tracking-widest">JomBaiki Pro Insight</h4>
                   <p className="text-blue-100 text-sm leading-relaxed">Regularly check your transmission fluid for {model} as local humidity levels often affect viscosity earlier than manufacturer estimates.</p>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceGuide;
