
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Camera } from 'lucide-react';
import { getMaintenanceAdvice } from '../services/gemini';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', type: 'bot', text: 'Hello! I am your JomBaiki AI Mechanic. How can I help you with your car today? I specialize in Malaysian favorites like Proton, Perodua, and major Japanese brands.', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { id: Date.now().toString(), type: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Call AI Service
    const botText = await getMaintenanceAdvice("Popular Malaysian Car", userMsg.text);
    
    const botMsg: Message = { id: (Date.now() + 1).toString(), type: 'bot', text: botText || "Sorry, I couldn't process that.", timestamp: new Date() };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-250px)] bg-white rounded-3xl border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </div>
          <div>
            <h3 className="font-bold">AI Mechanic</h3>
            <p className="text-[10px] text-blue-100 font-medium uppercase tracking-widest">Active • Malaysian Expert</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Camera className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 
                ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white border text-slate-600 shadow-sm'}
              `}>
                {msg.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm
                ${msg.type === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 border rounded-tl-none'}
              `}>
                {msg.text}
                <p className={`text-[10px] mt-2 opacity-60 ${msg.type === 'user' ? 'text-right' : ''}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-3 items-center bg-white border px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              <span className="text-xs font-medium text-slate-500">Analysing car health...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything: 'Why is my aircond not cold?'"
            className="flex-1 bg-slate-100 border-none rounded-xl px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all active:scale-90"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-3">
          AI advice is for reference. Always consult a certified mechanic for critical repairs.
        </p>
      </div>
    </div>
  );
};

export default AIChat;
