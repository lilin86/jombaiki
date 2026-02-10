
import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Fuel, 
  Zap, 
  ChevronRight, 
  Flame,
  Sparkles,
  Info,
  Loader2,
  X
} from 'lucide-react';
import { getNewsSummary } from '../services/gemini.ts';

const NEWS_ARTICLES = [
  {
    id: 'n1',
    title: 'Perodua D01D SUV Spotted Testing: A New Challenger to the Ativa?',
    category: 'New Launch',
    excerpt: 'Latest spy shots suggest Perodua is readying a larger sibling to the Ativa, possibly featuring a hybrid powertrain for the first time...',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=800&auto=format&fit=crop',
    date: 'May 12, 2024',
    readTime: '5 min read',
    hot: true
  },
  {
    id: 'n2',
    title: 'Weekly Fuel Price Update: RON97 Drops by 5 Cents',
    category: 'Fuel Update',
    excerpt: 'The Ministry of Finance has announced the latest fuel prices. RON95 remains capped at RM2.05, while Diesel prices see a slight hike...',
    image: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?q=80&w=800&auto=format&fit=crop',
    date: 'May 10, 2024',
    readTime: '2 min read',
    hot: false
  },
  {
    id: 'n3',
    title: 'Digital Road Tax: JPJ Reminds Drivers to Update MyJPJ App',
    category: 'Regulations',
    excerpt: 'Transitioning to physical road tax phase-out? Here is everything you need to know about the latest JPJ digital enforcement measures...',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=800&auto=format&fit=crop',
    date: 'May 08, 2024',
    readTime: '4 min read',
    hot: false
  },
  {
    id: 'n4',
    title: 'BYD M6 Electric MPV to Launch in Malaysia This Quarter',
    category: 'EV News',
    excerpt: 'The electric MPV segment is heating up as BYD confirms the M6 arrival. Expect competitive pricing aimed at families looking for green tech...',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop',
    date: 'May 05, 2024',
    readTime: '6 min read',
    hot: true
  }
];

const AutoNews: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [showFullHeroReport, setShowFullHeroReport] = useState(false);

  const categories = ['All', 'New Launch', 'Fuel Update', 'Regulations', 'EV News', 'Industry'];

  const filteredNews = activeCategory === 'All' 
    ? NEWS_ARTICLES 
    : NEWS_ARTICLES.filter(n => n.category === activeCategory);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    const titles = NEWS_ARTICLES.map(a => a.title);
    const result = await getNewsSummary(titles);
    setSummary(result || "Could not generate summary.");
    setIsGenerating(false);
  };

  return (
    <div className="space-y-10 pb-20 max-w-7xl mx-auto">
      {/* Featured Breaking News */}
      <section className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 group">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop" 
            alt="Breaking News" 
            className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="relative p-8 md:p-16 flex flex-col justify-end h-[500px]">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full animate-pulse">Breaking News</span>
            <span className="text-blue-300 text-xs font-bold uppercase tracking-widest">Industry Update</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight max-w-3xl">
            Proton e.MAS 7: Malaysia's First National Electric Vehicle Revealed.
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <button 
              onClick={() => setShowFullHeroReport(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 self-start active:scale-95 shadow-xl shadow-blue-500/20"
            >
              Read Full Report
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4 text-slate-300 text-sm font-medium">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> May 15, 2024</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 8 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Modal Placeholder */}
      {showFullHeroReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={() => setShowFullHeroReport(false)}></div>
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl relative z-10 shadow-2xl overflow-y-auto max-h-[90vh] p-8 md:p-12">
            <button onClick={() => setShowFullHeroReport(false)} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full">
              <X className="w-6 h-6 text-slate-400" />
            </button>
            <span className="text-blue-600 font-black uppercase text-[10px] tracking-widest mb-2 block">Special Feature</span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">Proton e.MAS 7: Everything we know so far.</h3>
            <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
              <p>The Proton e.MAS 7 marks a significant milestone in Malaysia's automotive history. Developed on the Geely-derived GMA platform, this C-segment SUV is built from the ground up to be an electric vehicle.</p>
              <p>With an estimated range of 450km (WLTP) and support for 150kW DC fast charging, Proton aims to compete directly with current market leaders like BYD and Tesla, while maintaining its competitive price advantage for the local market.</p>
              <p>Pre-orders are expected to open in Q3 2024, with deliveries starting shortly after. Stay tuned to JomBaiki for exclusive test drive reviews coming soon!</p>
            </div>
            <button onClick={() => setShowFullHeroReport(false)} className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold">Close Report</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-black text-slate-900">Latest Stories</h3>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide max-w-[200px] md:max-w-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border
                    ${activeCategory === cat 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                      : 'bg-white text-slate-500 hover:bg-slate-50 border-slate-200'}
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredNews.map(article => (
              <article key={article.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-2xl transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {article.hot && (
                    <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                      <Flame className="w-3 h-3" />
                      Hot
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shadow-sm">
                    {article.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h4 className="text-lg font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      <span>{article.date}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                      <span>{article.readTime}</span>
                    </div>
                    <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-4 space-y-8">
          {/* Fuel Price Widget */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-black text-slate-900 uppercase tracking-tighter flex items-center gap-2">
                <Fuel className="w-5 h-5 text-blue-600" />
                Malaysian Fuel Prices
              </h4>
              <span className="text-[10px] font-bold text-slate-400">MAY 15 - 21</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-10 bg-yellow-400 rounded-full"></div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">RON 95</p>
                    <p className="text-xl font-black text-slate-900">RM 2.05</p>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-slate-400">NO CHANGE</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-10 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">RON 97</p>
                    <p className="text-xl font-black text-slate-900">RM 3.47</p>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg">-0.05</div>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-10 bg-slate-900 rounded-full"></div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase">Diesel</p>
                    <p className="text-xl font-black text-slate-900">RM 2.15</p>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-slate-400">NO CHANGE</div>
              </div>
            </div>
            <button className="w-full mt-6 py-3 border border-dashed border-slate-300 rounded-2xl text-slate-500 text-xs font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <Info className="w-4 h-4" />
              Price Forecast Logic
            </button>
          </div>

          {/* AI News Digest */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2rem] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-blue-200">
                <Sparkles className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">AI Insights</span>
              </div>
              <h4 className="text-xl font-black mb-3">Daily Auto Digest</h4>
              <p className="text-blue-100/70 text-sm leading-relaxed mb-6">
                Let our AI Mechanic summarize today's top automotive trends in Malaysia based on the current news.
              </p>
              
              {summary ? (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-6 animate-in fade-in slide-in-from-top-2">
                  <div className="prose prose-invert prose-sm">
                    {summary.split('\n').map((line, i) => (
                      <p key={i} className="text-xs text-blue-50 leading-relaxed mb-2">{line}</p>
                    ))}
                  </div>
                  <button onClick={() => setSummary(null)} className="text-[10px] font-bold text-blue-300 uppercase mt-2 hover:text-white">Clear Summary</button>
                </div>
              ) : null}

              <button 
                onClick={handleGenerateSummary}
                disabled={isGenerating}
                className="w-full py-4 bg-white text-blue-700 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate AI Summary
                  </>
                )}
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          {/* Trending Brands */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200">
            <h4 className="font-black text-slate-900 uppercase tracking-tighter mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Trending Brands
            </h4>
            <div className="space-y-4">
              {[
                { name: 'Perodua', growth: '+12%', color: 'text-green-600' },
                { name: 'Proton', growth: '+8.5%', color: 'text-green-600' },
                { name: 'Tesla', growth: '+24%', color: 'text-blue-600' },
                { name: 'BYD', growth: '+19%', color: 'text-blue-600' },
              ].map(brand => (
                <div key={brand.name} className="flex items-center justify-between group cursor-pointer">
                  <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{brand.name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black ${brand.color}`}>{brand.growth}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoNews;
