import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../types';

interface BlogProps {
  lang: Language;
}

const blogPosts = [
  {
    id: 1,
    title: {
      en: 'How to Secure a Job in Germany: A Complete Guide',
      ar: 'كيفية تأمين وظيفة في ألمانيا: دليل كامل'
    },
    excerpt: {
      en: 'Discover the essential steps to finding work in Germany, from visa requirements to interview tips.',
      ar: 'اكتشف الخطوات الأساسية للعثور على عمل في ألمانيا، من متطلبات التأشيرة إلى نصائح المقابلة.'
    },
    image: 'https://picsum.photos/seed/germany-job/800/500',
    date: '2024-03-15',
    author: 'Ahmed Mansour'
  },
  {
    id: 2,
    title: {
      en: 'Marriage Laws in Italy for Foreigners',
      ar: 'قوانين الزواج في إيطاليا للأجانب'
    },
    excerpt: {
      en: 'Everything you need to know about getting married in Italy as an Arab expatriate.',
      ar: 'كل ما تحتاج لمعرفته حول الزواج في إيطاليا كمغترب عربي.'
    },
    image: 'https://picsum.photos/seed/italy-marriage/800/500',
    date: '2024-03-10',
    author: 'Sarah Al-Farsi'
  },
  {
    id: 3,
    title: {
      en: 'Top 5 Student Cities in Canada for 2024',
      ar: 'أفضل 5 مدن طلابية في كندا لعام 2024'
    },
    excerpt: {
      en: 'Looking to study in Canada? Here are the best cities for international students.',
      ar: 'هل تبحث عن الدراسة في كندا؟ إليك أفضل المدن للطلاب الدوليين.'
    },
    image: 'https://picsum.photos/seed/canada-study/800/500',
    date: '2024-03-05',
    author: 'Omar Khalid'
  }
];

export default function Blog({ lang }: BlogProps) {
  const isRtl = lang === 'ar';

  return (
    <div className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {isRtl ? 'مدونة زيزي' : 'Ziizi Blog'}
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto">
          {isRtl 
            ? 'اكتشف أحدث المقالات والنصائح حول الحياة والعمل والدراسة في الخارج.' 
            : 'Discover the latest articles and tips about living, working, and studying abroad.'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-[2rem] overflow-hidden border-2 border-black/5 dark:border-white/5 hover:border-gold transition-all group"
          >
            <div className="h-56 overflow-hidden relative">
              <img 
                src={post.image} 
                alt={post.title[lang]} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{post.author}</span>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-4 group-hover:text-gold transition-colors">
                {post.title[lang]}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 line-clamp-3">
                {post.excerpt[lang]}
              </p>
              <button className="flex items-center gap-2 text-gold font-bold text-sm hover:underline">
                <span>{isRtl ? 'اقرأ المزيد' : 'Read More'}</span>
                {isRtl ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
