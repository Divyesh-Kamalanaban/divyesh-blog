export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  readingTime: string;
  category: 'Devlog' | 'Tutorial' | 'Opinion' | 'Architecture' | 'Frontend' | 'DevOps';
  excerpt: string;
  tags: string[];
  content?: string;
}

export interface Byte {
  id: string;
  type: 'snippet' | 'thought' | 'discovery' | 'devlog' | 'quote';
  title: string;
  subtitle?: string;
  date: string;
  fileName?: string;
  content?: string;
  code?: string;
  link?: string;
  tags?: string[];
  quoteText?: string;
  quoteAuthor?: string;
}

export type ActiveTab = 'home' | 'posts' | 'bytes' | 'about';
