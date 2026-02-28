import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, Info } from 'lucide-react';
import { Language } from '../types';

interface WorldMapProps {
  lang: Language;
}

const regions = [
  { id: 'europe', name: { en: 'Europe', ar: 'أوروبا' }, x: '45%', y: '30%', color: 'bg-blue-500' },
  { id: 'north-america', name: { en: 'North America', ar: 'أمريكا الشمالية' }, x: '20%', y: '35%', color: 'bg-emerald-500' },
  { id: 'middle-east', name: { en: 'Middle East', ar: 'الشرق الأوسط' }, x: '55%', y: '45%', color: 'bg-gold' },
  { id: 'asia', name: { en: 'Asia', ar: 'آسيا' }, x: '75%', y: '40%', color: 'bg-amber-500' },
  { id: 'africa', name: { en: 'Africa', ar: 'أفريقيا' }, x: '50%', y: '60%', color: 'bg-rose-500' },
];

export default function WorldMap({ lang }: WorldMapProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const isRtl = lang === 'ar';

  return (
    <section className="py-20 bg-navy-900 text-white overflow-hidden" id="map">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            {isRtl ? 'استكشف العالم' : 'Explore the World'}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {isRtl 
              ? 'انقر على المنطقة التي تهمك لمعرفة متطلبات التأشيرة وفرص العمل المتاحة.' 
              : 'Click on a region to see visa requirements and available job opportunities.'}
          </p>
        </div>

        <div className="relative aspect-[21/9] w-full max-w-5xl mx-auto glass border-white/5 rounded-[3rem] p-8 overflow-hidden bg-slate-200 dark:bg-navy-800">
          {/* Real Map SVG (Simplified but recognizable) */}
          <svg viewBox="0 0 1000 500" className="w-full h-full opacity-30 dark:opacity-20 fill-navy-900 dark:fill-white">
            {/* North America */}
            <path d="M150,150 L160,140 L180,145 L200,130 L220,140 L240,135 L260,150 L250,170 L230,180 L210,175 L190,190 L170,185 L150,170 Z" />
            {/* South America */}
            <path d="M250,250 L270,240 L290,250 L310,270 L300,300 L280,320 L260,310 L240,280 Z" />
            {/* Europe */}
            <path d="M450,120 L470,110 L500,115 L520,130 L510,150 L480,160 L460,150 Z" />
            {/* Africa */}
            <path d="M480,200 L520,190 L550,200 L560,230 L540,280 L500,300 L470,280 L460,240 Z" />
            {/* Asia */}
            <path d="M550,120 L650,110 L750,130 L800,180 L780,250 L700,280 L600,270 L550,200 Z" />
            {/* Australia */}
            <path d="M750,350 L800,340 L820,360 L810,390 L780,400 L740,380 Z" />
            {/* Greenland */}
            <path d="M350,50 L380,40 L410,50 L400,80 L370,90 Z" />
            {/* Islands */}
            <circle cx="200" cy="100" r="5" />
            <circle cx="850" cy="150" r="5" />
            <circle cx="450" cy="350" r="5" />
          </svg>

          {/* Interactive Points */}
          {regions.map((region) => (
            <motion.button
              key={region.id}
              className="absolute group"
              style={{ left: region.x, top: region.y }}
              whileHover={{ scale: 1.2 }}
              onClick={() => setSelected(region.id)}
            >
              <div className={`w-4 h-4 rounded-full ${region.color} animate-ping absolute inset-0`} />
              <div className={`w-4 h-4 rounded-full ${region.color} relative z-10 border-2 border-white`} />
              
              <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs font-bold text-navy-900 dark:text-white`}>
                {region.name[lang]}
              </div>
            </motion.button>
          ))}

          {/* Info Panel */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? -50 : 50 }}
                className={`absolute ${isRtl ? 'left-8' : 'right-8'} top-8 bottom-8 w-72 glass p-6 rounded-3xl z-20 border-gold/30`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-2 text-gold">
                    <MapPin size={20} />
                    <h3 className="font-bold text-xl">
                      {regions.find(r => r.id === selected)?.name[lang]}
                    </h3>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white">
                    <Info size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-gold block mb-1">Trending</span>
                    <p className="text-sm font-medium">
                      {isRtl ? 'تأشيرة البحث عن عمل في ألمانيا' : 'Job Seeker Visa in Germany'}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] uppercase font-bold text-gold block mb-1">Marriage Laws</span>
                    <p className="text-sm font-medium">
                      {isRtl ? 'إجراءات الزواج في إيطاليا' : 'Marriage procedures in Italy'}
                    </p>
                  </div>
                </div>

                <button className="w-full mt-8 bg-gold text-navy-900 py-3 rounded-xl font-bold hover:bg-gold-light transition-colors text-sm">
                  {isRtl ? 'عرض جميع المقالات' : 'View All Articles'}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {!selected && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-slate-500 text-sm italic">
                {isRtl ? 'اختر منطقة من الخريطة للبدء' : 'Select a region from the map to begin'}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
