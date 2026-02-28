import React from 'react';
import { Search, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const handleSearch = () => {
    if (searchQuery.trim()) {
      alert(isRtl ? `البحث عن: ${searchQuery}` : `Searching for: ${searchQuery}`);
      // In a real app, this would navigate to a search results page
    }
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <img 
          src="https://picsum.photos/seed/travel-world/1920/1080?blur=10" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-10"
          alt="Background"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-navy-900 via-navy-700 to-gold dark:from-white dark:via-slate-200 dark:to-gold">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            {t.hero.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-3xl mx-auto relative"
        >
          <div className="glass p-2 rounded-2xl flex items-center gap-2">
            <div className="flex-1 relative">
              <Search className={isRtl ? "absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" : "absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"} size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder={t.hero.searchPlaceholder}
                className={isRtl 
                  ? "w-full bg-transparent py-4 pr-12 pl-4 focus:outline-none text-lg" 
                  : "w-full bg-transparent py-4 pl-12 pr-4 focus:outline-none text-lg"}
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-gold hover:bg-gold-light text-navy-900 px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2"
            >
              <span>{isRtl ? 'بحث' : 'Search'}</span>
              {isRtl ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
            </button>
          </div>
          
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {['Germany', 'Canada', 'Italy', 'Dubai', 'Student', 'Study', 'Marriage'].map((tag) => (
              <span 
                key={tag} 
                onClick={() => setSearchQuery(tag)}
                className="text-xs font-medium px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 cursor-pointer hover:border-gold transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
