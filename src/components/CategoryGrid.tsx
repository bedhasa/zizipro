import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Briefcase, Plane, Cpu, GraduationCap, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../types';
import { CATEGORIES } from '../constants';

interface CategoryGridProps {
  lang: Language;
}

const iconMap: Record<string, any> = {
  Heart,
  Briefcase,
  Plane,
  Cpu,
  GraduationCap,
};

export default function CategoryGrid({ lang }: CategoryGridProps) {
  const isRtl = lang === 'ar';

  return (
    <section className="py-20 bg-slate-100/50 dark:bg-navy-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((cat, index) => {
            const Icon = iconMap[cat.icon];
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass p-6 rounded-3xl group cursor-pointer relative overflow-hidden"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={cat.image} 
                    alt={cat.title[lang]} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} w-10 h-10 ${cat.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                    <Icon size={20} />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">
                    {cat.title[lang]}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                    {cat.description[lang]}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cat.tags[lang].map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-black/5 dark:bg-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-gold font-bold text-sm">
                    <span>{isRtl ? 'اقرأ المزيد' : 'Read More'}</span>
                    {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                  </div>
                </div>

                {/* Decorative background number */}
                <span className="absolute -bottom-4 -right-4 text-8xl font-black text-black/5 dark:text-white/5 select-none">
                  0{index + 1}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
