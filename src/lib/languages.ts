export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  },
  ko: {
    code: 'ko', 
    name: '한국어',
    flag: '🇰🇷'
  }
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

export const DEFAULT_LANGUAGE: LanguageCode = 'en';

export const getLanguageFromNavigator = (): LanguageCode => {
  if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE;
  
  const browserLang = navigator.language.split('-')[0] as LanguageCode;
  return LANGUAGES[browserLang] ? browserLang : DEFAULT_LANGUAGE;
};

export const getLanguageFromURL = (): LanguageCode | null => {
  if (typeof window === 'undefined') return null;
  
  const pathname = window.location.pathname;
  
  if (pathname.endsWith('/ko')) {
    return 'ko';
  }
  if (pathname.endsWith('/en')) {
    return 'en';
  }
  
  return null;
};

export const updateURLWithLanguage = (language: LanguageCode) => {
  if (typeof window === 'undefined') return;
  
  const currentPath = window.location.pathname;
  
  // Remove existing language suffix
  const basePath = currentPath.replace(/\/(ko|en)$/, '');
  
  // Add new language suffix
  const newPath = basePath === '/' ? `/${language}` : `${basePath}/${language}`;
  
  window.history.replaceState({}, '', newPath);
};