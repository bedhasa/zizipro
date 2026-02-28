import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import Markdown from 'react-markdown';
import { Language } from '../types';
import { getChatResponse } from '../services/geminiService';

interface ChatbotProps {
  lang: Language;
}

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export default function Chatbot({ lang }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      text: lang === 'ar' 
        ? 'مرحباً! أنا مساعدك الذكي في زيزي. كيف يمكنني مساعدتك اليوم في معلومات الهجرة أو العمل أو الزواج؟' 
        : 'Hello! I am your Ziizi AI assistant. How can I help you today with immigration, work, or marriage information?' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isRtl = lang === 'ar';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const botResponse = await getChatResponse(userMessage, lang);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass w-[350px] sm:w-[400px] h-[500px] rounded-3xl mb-4 flex flex-col overflow-hidden shadow-2xl border-gold/20"
          >
            {/* Header */}
            <div className="bg-navy-900 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center text-navy-900">
                  <Bot size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{lang === 'ar' ? 'المساعد الذكي' : 'AI Assistant'}</h4>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    {lang === 'ar' ? 'متصل الآن' : 'Online Now'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-gold text-navy-900' : 'bg-navy-700 text-white'}`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-gold text-navy-900 rounded-tr-none' 
                        : 'bg-white dark:bg-navy-700 shadow-sm rounded-tl-none'
                    }`}>
                      <div className="markdown-body">
                        <Markdown>{msg.text}</Markdown>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-center bg-white dark:bg-navy-700 p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <Loader2 size={16} className="animate-spin text-gold" />
                    <span className="text-xs text-slate-500">{lang === 'ar' ? 'يفكر...' : 'Thinking...'}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-black/5 dark:border-white/5 bg-white/50 dark:bg-navy-800/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={lang === 'ar' ? 'اكتب سؤالك هنا...' : 'Type your question...'}
                  className="flex-1 bg-white dark:bg-navy-900 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-gold"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-gold text-navy-900 p-2 rounded-xl hover:bg-gold-light transition-colors disabled:opacity-50"
                >
                  <Send size={20} className={isRtl ? "rotate-180" : ""} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gold text-navy-900 rounded-full flex items-center justify-center shadow-2xl border-4 border-white dark:border-navy-800"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>
    </div>
  );
}
