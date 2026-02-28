export type Language = 'en' | 'ar';

export interface Translation {
  title: string;
  description: string;
  hero: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
  };
  categories: {
    marriage: string;
    work: string;
    travel: string;
    tech: string;
  };
  tools: {
    calculator: string;
    map: string;
    chatbot: string;
  };
  nav: {
    home: string;
    guides: string;
    community: string;
    about: string;
  };
}

export interface CategoryCard {
  id: string;
  icon: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  tags: { en: string[]; ar: string[] };
  color: string;
  image: string;
}

export interface Story {
  id: string;
  author: string;
  content: { en: string; ar: string };
  date: string;
  category: string;
}
