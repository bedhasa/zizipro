import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { Sun, Moon, Languages, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
  lang: Language;
  setLang: (lang: Language) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  currentPage: 'home' | 'blog';
  setCurrentPage: (page: 'home' | 'blog') => void;
}

export default function Layout({ 
  children, 
  lang, 
  setLang, 
  isDark, 
  setIsDark,
  currentPage,
  setCurrentPage
}: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [lang, isDark]);

  const navLinks = [
    { id: 'home', label: t.nav.home, type: 'page' },
    { id: 'guides', label: t.nav.guides, type: 'section' },
    { id: 'blog', label: isRtl ? 'المدونة' : 'Blog', type: 'page' },
    { id: 'community', label: t.nav.community, type: 'section' },
    { id: 'about', label: t.nav.about, type: 'section' },
  ];

  const handleNavClick = (link: any) => {
    setIsMenuOpen(false);
    if (link.type === 'page') {
      setCurrentPage(link.id as any);
      window.scrollTo(0, 0);
    } else {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          const element = document.getElementById(link.id);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(link.id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={cn(
      "min-h-screen font-sans transition-colors duration-300",
      lang === 'ar' ? 'rtl' : 'ltr'
    )}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => handleNavClick({ id: 'home', type: 'page' })}
            >
              <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center text-navy-900 font-bold text-xl group-hover:scale-110 transition-transform">
                Z
              </div>
              <span className="text-xl font-bold tracking-tight hidden sm:block">
                {t.title}
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link)}
                  className={cn(
                    "text-sm font-medium hover:text-gold transition-colors",
                    currentPage === link.id ? "text-gold" : "text-slate-600 dark:text-slate-300"
                  )}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 hover:bg-gold/10 transition-colors text-sm font-medium"
              >
                <Languages size={18} />
                <span>{lang === 'en' ? 'العربية' : 'English'}</span>
              </button>

              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link)}
                    className={cn(
                      "block w-full text-left rtl:text-right px-3 py-2 rounded-md text-base font-medium hover:bg-gold/10",
                      currentPage === link.id ? "text-gold bg-gold/5" : "text-slate-600 dark:text-slate-300"
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-navy-900 text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div 
                className="flex items-center gap-2 mb-4 cursor-pointer group w-fit"
                onClick={() => handleNavClick({ id: 'home', type: 'page' })}
              >
                <div className="w-8 h-8 bg-gold rounded flex items-center justify-center text-navy-900 font-bold group-hover:scale-110 transition-transform">
                  Z
                </div>
                <span className="text-xl font-bold">{t.title}</span>
              </div>
              <p className="text-slate-400 max-w-md">
                {t.description}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gold">{t.nav.guides}</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="cursor-pointer hover:text-gold" onClick={() => handleNavClick({ id: 'marriage', type: 'section' })}>{t.categories.marriage}</li>
                <li className="cursor-pointer hover:text-gold" onClick={() => handleNavClick({ id: 'work', type: 'section' })}>{t.categories.work}</li>
                <li className="cursor-pointer hover:text-gold" onClick={() => handleNavClick({ id: 'travel', type: 'section' })}>{t.categories.travel}</li>
                <li className="cursor-pointer hover:text-gold" onClick={() => handleNavClick({ id: 'tech', type: 'section' })}>{t.categories.tech}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gold">{isRtl ? 'المزيد' : 'More'}</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="cursor-pointer hover:text-gold" onClick={() => handleNavClick({ id: 'blog', type: 'page' })}>{isRtl ? 'المدونة' : 'Blog'}</li>
                <li className="cursor-pointer hover:text-gold" onClick={() => handleNavClick({ id: 'community', type: 'section' })}>{t.nav.community}</li>
                <li className="cursor-pointer hover:text-gold" onClick={() => handleNavClick({ id: 'about', type: 'section' })}>{t.nav.about}</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/5 text-center text-slate-500 text-xs">
            © {new Date().getFullYear()} {t.title}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
