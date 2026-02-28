import React, { useState } from 'react';
import { Language } from './types';
import Layout from './components/Layout';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import EligibilityCalculator from './components/EligibilityCalculator';
import WorldMap from './components/WorldMap';
import Chatbot from './components/Chatbot';
import Blog from './components/Blog';
import { motion } from 'framer-motion';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [isDark, setIsDark] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'blog'>('home');

  return (
    <Layout 
      lang={lang} 
      setLang={setLang} 
      isDark={isDark} 
      setIsDark={setIsDark}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    >
      <motion.div
        key={currentPage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {currentPage === 'home' ? (
          <div id="home">
            <Hero lang={lang} />
            
            <div id="guides">
              <CategoryGrid lang={lang} />
            </div>

            <WorldMap lang={lang} />

            <div id="community">
              <EligibilityCalculator lang={lang} />
            </div>

            {/* Stories Section (Brief) */}
            <section className="py-20 bg-slate-50 dark:bg-navy-900" id="about">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      {lang === 'ar' ? 'قصص النجاح' : 'Success Stories'}
                    </h2>
                    <p className="text-slate-500">
                      {lang === 'ar' ? 'تجارب حقيقية من مجتمعنا' : 'Real experiences from our community'}
                    </p>
                  </div>
                  <button className="text-gold font-bold hover:underline">
                    {lang === 'ar' ? 'عرض الكل' : 'View All'}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { name: 'Ahmed Mansour', initial: 'A', text_en: '"My journey to Germany was full of challenges, but thanks to the information available here, I was able to get the visa in record time."', text_ar: '"كانت رحلتي إلى ألمانيا مليئة بالتحديات، ولكن بفضل المعلومات المتاحة هنا، تمكنت من الحصول على التأشيرة في وقت قياسي."' },
                    { name: 'Sarah Al-Farsi', initial: 'S', text_en: '"Ziizi helped me understand the legal requirements for marriage in Italy. The checklist was a lifesaver!"', text_ar: '"ساعدني زيزي في فهم المتطلبات القانونية للزواج في إيطاليا. كانت قائمة المراجعة منقذة للحياة!"' },
                    { name: 'Omar Khalid', initial: 'O', text_en: '"Finding a tech job in Canada seemed impossible until I used the work abroad guide here. Highly recommended!"', text_ar: '"بدا العثور على وظيفة تقنية في كندا مستحيلاً حتى استخدمت دليل العمل في الخارج هنا. موصى به بشدة!"' }
                  ].map((user, i) => (
                    <div key={i} className="glass p-6 rounded-3xl border-black/5 dark:border-white/5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                          {user.initial}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{user.name}</h4>
                          <span className="text-xs text-slate-400">{i + 1} week ago</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                        {lang === 'ar' ? user.text_ar : user.text_en}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : (
          <Blog lang={lang} />
        )}

        <Chatbot lang={lang} />
      </motion.div>
    </Layout>
  );
}
