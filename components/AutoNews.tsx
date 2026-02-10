

import React, { useState, useEffect } from 'react';
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
  X,
  RefreshCw,
  Globe
} from 'lucide-react';
import { getNewsSummary, fetchLiveAutoNews } from '../services/gemini.ts';

const AutoNews: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [showFullHeroReport, setShowFullHeroReport] = useState(false);
  const [news, setNews] = useState<any[]>([]);

  const categories = ['All', 'New Launch', 'Fuel Update', 'Regulations', 'EV News', 'Industry'];

  useEffect(() => {
    // Initial fetch of live news
    handleRefreshLiveNews();
  }, []);

  const handleRefreshLiveNews = async () => {
    setIsRefreshing(true);
    const liveNews = await fetchLiveAutoNews();
    if (liveNews) {
      setNews(liveNews);
    }
    setIsRefreshing(false);
  };

  const filteredNews = activeCategory === 'All' 
    ? news 
    : news.filter(n => n.category === activeCategory);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    const titles = news.map(a => a.title);
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
            <span className="bg-red-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full animate-pulse">Live</span>
            <span className="text-blue-300 text-xs font-bold uppercase tracking-widest">Industry Update</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight max-w-3xl">
            Proton e.MAS 7: Malaysia's First National Electric Vehicle Revealed.
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <button 
              onClick={() => setShowFullHeroReport(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 self-start shadow-xl"
            >
              Read Full Report
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={handleRefreshLiveNews}
              disabled={isRefreshing}
              className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-bold border border-white/20"
            >
              {isRefreshing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              Fetch Live News
            </button>
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
            <h3 className="text-2xl font-black text-slate-900 mb-6">Proton e.MAS 7 Details</h3>
            <div className="prose text-slate-600 space-y-4">
              <p>Fetched live from the latest Malaysian industry reports, the e.MAS 7 marks Proton's aggressive entry into the EV market.</p>
              <p>Key specs: C-segment SUV, 400V architecture, estimated pricing around RM150k-180k.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-black text-slate-900">Latest Stories</h3>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border
                    ${activeCategory === cat ? 'bg-slate-900 text-white' : 'bg-white text-slate-500'}
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isRefreshing && news.length === 0 ? (
              <div className="col-span-2 flex flex-col items-center py-20 bg-white rounded-3xl border border-dashed">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
                <p className="text-slate-500 font-bold">Grounding with Google Search...</p>
              </div>
            ) : (
              filteredNews.map((article, idx) => (
                <article key={idx} className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-2xl transition-all group">
                  <div className="relative h-48 overflow-hidden bg-slate-100 flex items-center justify-center">
                    <Globe className="w-12 h-12 text-blue-100" />
                    {article.hot && (
                      <div className="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-black uppercase px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                        <Flame className="w-3 h-3" /> Hot
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-black uppercase px-3 py-1.5 rounded-lg">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="text-lg font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600">
                      {article.title}
                    </h4>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    {/* Display Grounded Source URL for Compliance */}
                    {article.url && (
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-2 text-blue-600 text-xs font-bold mb-4 hover:underline"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        View Source
                      </a>
                    )}
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{article.date}</span>
                      <button className="p-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2rem] p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-blue-200">
                <Sparkles className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">AI Insights</span>
              </div>
              <h4 className="text-xl font-black mb-3">Daily Auto Digest</h4>
              <p className="text-blue-100/70 text-sm leading-relaxed mb-6">
                Let our AI Mechanic summarize today's live search results.
              </p>
              
              {summary ? (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 mb-6 animate-in fade-in">
                  <p className="text-xs text-blue-50 leading-relaxed whitespace-pre-wrap">{summary}</p>
                  <button onClick={() => setSummary(null)} className="text-[10px] font-bold text-blue-300 uppercase mt-2">Clear</button>
                </div>
              ) : null}

              <button 
                onClick={handleGenerateSummary}
                disabled={isGenerating || news.length === 0}
                className="w-full py-4 bg-white text-blue-700 rounded-2xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                Generate AI Summary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoNews;