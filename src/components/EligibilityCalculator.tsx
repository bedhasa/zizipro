import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, ChevronLeft, RefreshCcw } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface EligibilityCalculatorProps {
  lang: Language;
}

const steps = [
  {
    id: 'destination',
    question: { en: 'Where do you want to go?', ar: 'إلى أين تريد الذهاب؟' },
    options: [
      { id: 'germany', label: { en: 'Germany', ar: 'ألمانيا' } },
      { id: 'canada', label: { en: 'Canada', ar: 'كندا' } },
      { id: 'uae', label: { en: 'UAE', ar: 'الإمارات' } },
      { id: 'other', label: { en: 'Other', ar: 'أخرى' } },
    ]
  },
  {
    id: 'purpose',
    question: { en: 'What is your primary purpose?', ar: 'ما هو هدفك الأساسي؟' },
    options: [
      { id: 'work', label: { en: 'Work', ar: 'العمل' } },
      { id: 'study', label: { en: 'Study', ar: 'الدراسة' } },
      { id: 'marriage', label: { en: 'Marriage', ar: 'الزواج' } },
      { id: 'tourism', label: { en: 'Tourism', ar: 'السياحة' } },
    ]
  },
  {
    id: 'education',
    question: { en: 'What is your education level?', ar: 'ما هو مستواك التعليمي؟' },
    options: [
      { id: 'bachelor', label: { en: 'Bachelor Degree', ar: 'بكالوريوس' } },
      { id: 'master', label: { en: 'Master/PhD', ar: 'ماجستير/دكتوراه' } },
      { id: 'diploma', label: { en: 'Diploma', ar: 'دبلوم' } },
      { id: 'highschool', label: { en: 'High School', ar: 'ثانوية عامة' } },
    ]
  }
];

export default function EligibilityCalculator({ lang }: EligibilityCalculatorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const handleSelect = (optionId: string) => {
    const newAnswers = { ...answers, [steps[currentStep].id]: optionId };
    setAnswers(newAnswers);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setIsFinished(false);
  };

  return (
    <section className="py-20" id="calculator">
      <div className="max-w-4xl mx-auto px-4">
        <div className="glass p-8 md:p-12 rounded-[2rem] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-black/5 dark:bg-white/5">
            <motion.div 
              className="h-full bg-gold"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + (isFinished ? 1 : 0)) / steps.length) * 100}%` }}
            />
          </div>

          {!isFinished ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gold uppercase tracking-widest">
                    {isRtl ? `الخطوة ${currentStep + 1} من ${steps.length}` : `Step ${currentStep + 1} of ${steps.length}`}
                  </span>
                  {currentStep > 0 && (
                    <button 
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-gold transition-colors"
                    >
                      {isRtl ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                      {isRtl ? 'السابق' : 'Previous'}
                    </button>
                  )}
                </div>

                <h2 className="text-3xl font-bold">
                  {steps[currentStep].question[lang]}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {steps[currentStep].options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(option.id)}
                      className="p-6 rounded-2xl border-2 border-black/5 dark:border-white/5 hover:border-gold hover:bg-gold/5 transition-all text-left rtl:text-right group flex justify-between items-center"
                    >
                      <span className="text-lg font-medium">{option.label[lang]}</span>
                      <div className="w-6 h-6 rounded-full border-2 border-black/10 dark:border-white/10 group-hover:border-gold flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-3xl font-bold">
                {isRtl ? 'لقد انتهيت!' : 'You are all set!'}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {isRtl 
                  ? 'بناءً على إجاباتك، يبدو أنك مؤهل للتقديم على تأشيرة البحث عن عمل في ألمانيا. لقد أعد زيزي لك دليلاً مخصصاً.' 
                  : 'Based on your answers, you seem eligible for a Job Seeker Visa in Germany. Ziizi has prepared a custom guide for you.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <button className="bg-gold text-navy-900 px-8 py-4 rounded-xl font-bold hover:bg-gold-light transition-colors">
                  {isRtl ? 'تحميل الدليل المخصص' : 'Download Custom Guide'}
                </button>
                <button 
                  onClick={reset}
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border-2 border-black/5 dark:border-white/5 font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <RefreshCcw size={20} />
                  {isRtl ? 'إعادة المحاولة' : 'Start Over'}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
