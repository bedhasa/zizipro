import { Translation, CategoryCard } from './types';

export const TRANSLATIONS: Record<'en' | 'ar', Translation> = {
  en: {
    title: 'Ziizi',
    description: 'Your premium guide to life abroad',
    hero: {
      title: 'Navigate Your Future Abroad',
      subtitle: 'Comprehensive guides for immigration, marriage, and work opportunities.',
      searchPlaceholder: 'Search for "Work in Germany" or "Marriage in Canada"...',
    },
    categories: {
      marriage: 'Marriage & Dating',
      work: 'Work Abroad',
      travel: 'Travel & Tourism',
      tech: 'Tech & Science',
    },
    tools: {
      calculator: 'Eligibility Calculator',
      map: 'Interactive World Map',
      chatbot: 'AI Assistant',
    },
    nav: {
      home: 'Home',
      guides: 'Guides',
      community: 'Community',
      about: 'About Us',
    },
  },
  ar: {
    title: 'زيزي',
    description: 'دليلك المتميز للحياة في الخارج',
    hero: {
      title: 'خطط لمستقبلك في الخارج',
      subtitle: 'أدلة شاملة للهجرة والزواج وفرص العمل.',
      searchPlaceholder: 'ابحث عن "العمل في ألمانيا" أو "الزواج في كندا"...',
    },
    categories: {
      marriage: 'الزواج والتعارف',
      work: 'العمل في الخارج',
      travel: 'السفر والسياحة',
      tech: 'التقنية والعلوم',
    },
    tools: {
      calculator: 'حاسبة الأهلية',
      map: 'خريطة العالم التفاعلية',
      chatbot: 'المساعد الذكي',
    },
    nav: {
      home: 'الرئيسية',
      guides: 'الأدلة',
      community: 'المجتمع',
      about: 'من نحن',
    },
  },
};

export const CATEGORIES: CategoryCard[] = [
  {
    id: 'marriage',
    icon: 'Heart',
    title: { en: 'Marriage & Dating', ar: 'الزواج والتعارف' },
    description: { 
      en: 'Legal guides and interactive checklists for marriage procedures abroad.', 
      ar: 'أدلة قانونية وقوائم مراجعة تفاعلية لإجراءات الزواج في الخارج.' 
    },
    tags: { en: ['Legal', 'Family'], ar: ['قانوني', 'عائلي'] },
    color: 'bg-rose-500',
    image: 'https://picsum.photos/seed/marriage-ziizi/800/600',
  },
  {
    id: 'work',
    icon: 'Briefcase',
    title: { en: 'Work Abroad', ar: 'العمل في الخارج' },
    description: { 
      en: 'Find job opportunities, salary insights, and work visa requirements.', 
      ar: 'ابحث عن فرص العمل، ومعلومات الرواتب، ومتطلبات تأشيرة العمل.' 
    },
    tags: { en: ['Jobs', 'Visa'], ar: ['وظائف', 'تأشيرة'] },
    color: 'bg-blue-500',
    image: 'https://picsum.photos/seed/work-ziizi/800/600',
  },
  {
    id: 'travel',
    icon: 'Plane',
    title: { en: 'Travel & Tourism', ar: 'السفر والسياحة' },
    description: { 
      en: 'Explore visa-free destinations and travel requirements for Arab citizens.', 
      ar: 'استكشف الوجهات بدون تأشيرة ومتطلبات السفر للمواطنين العرب.' 
    },
    tags: { en: ['Visa-Free', 'Guide'], ar: ['بدون تأشيرة', 'دليل'] },
    color: 'bg-emerald-500',
    image: 'https://picsum.photos/seed/travel-ziizi/800/600',
  },
  {
    id: 'tech',
    icon: 'Cpu',
    title: { en: 'Tech & Science', ar: 'التقنية والعلوم' },
    description: { 
      en: 'Latest news and opportunities in the global tech and science sectors.', 
      ar: 'آخر الأخبار والفرص في قطاعات التقنية والعلوم العالمية.' 
    },
    tags: { en: ['Innovation', 'News'], ar: ['ابتكار', 'أخبار'] },
    color: 'bg-amber-500',
    image: 'https://picsum.photos/seed/tech-ziizi/800/600',
  },
  {
    id: 'study',
    icon: 'GraduationCap',
    title: { en: 'Study Abroad', ar: 'الدراسة في الخارج' },
    description: { 
      en: 'Find the best universities, scholarships, and student visa guides.', 
      ar: 'ابحث عن أفضل الجامعات، والمنح الدراسية، وأدلة تأشيرة الطالب.' 
    },
    tags: { en: ['University', 'Scholarship'], ar: ['جامعة', 'منحة'] },
    color: 'bg-purple-500',
    image: 'https://picsum.photos/seed/study-ziizi/800/600',
  },
];
