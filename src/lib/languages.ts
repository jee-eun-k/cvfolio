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
  
  // Check for blog post URLs with Korean prefix
  if (pathname.startsWith('/writing/ko/')) {
    return 'ko';
  }
  
  // Check for regular page language suffixes
  if (pathname.endsWith('/ko')) {
    return 'ko';
  }
  if (pathname.endsWith('/en')) {
    return 'en';
  }
  
  // For blog posts without /ko/ prefix, assume English
  if (pathname.startsWith('/writing/') && !pathname.startsWith('/writing/ko/')) {
    return 'en';
  }
  
  return null;
};

export const updateURLWithLanguage = (language: LanguageCode) => {
  if (typeof window === 'undefined') return;
  
  const currentPath = window.location.pathname;
  
  // Handle blog post URLs specially
  if (currentPath.startsWith('/writing/')) {
    let newPath: string;
    
    if (language === 'ko') {
      // Convert English post to Korean post
      if (currentPath.startsWith('/writing/ko/')) {
        // Already a Korean post, no change needed
        newPath = currentPath;
      } else {
        // English post: /writing/post_xxx -> /writing/ko/post_xxx
        const postSlug = currentPath.replace('/writing/', '');
        newPath = `/writing/ko/${postSlug}`;
      }
    } else {
      // Convert Korean post to English post
      if (currentPath.startsWith('/writing/ko/')) {
        // Korean post: /writing/ko/post_xxx -> /writing/post_xxx
        const postSlug = currentPath.replace('/writing/ko/', '');
        newPath = `/writing/${postSlug}`;
      } else {
        // Already an English post, no change needed
        newPath = currentPath;
      }
    }
    
    window.location.href = newPath;
    return;
  }
  
  // Handle regular pages with language suffixes
  // Remove existing language suffix
  const basePath = currentPath.replace(/\/(ko|en)$/, '');
  
  // Add new language suffix
  const newPath = basePath === '/' ? `/${language}` : `${basePath}/${language}`;
  
  // Direct navigation to the new path
  window.location.href = newPath;
};

// Content fetching utilities
export const getCollectionName = (baseCollection: string, language: LanguageCode): string => {
  return `${baseCollection}-${language}`;
};

export const getCurrentLanguage = (): LanguageCode => {
  // Check URL first
  const urlLang = getLanguageFromURL();
  if (urlLang) return urlLang;
  
  // Check localStorage
  if (typeof window !== 'undefined') {
    const storedLang = localStorage.getItem('language') as LanguageCode;
    if (storedLang && LANGUAGES[storedLang]) return storedLang;
  }
  
  // Check browser preference
  const browserLang = getLanguageFromNavigator();
  if (browserLang) return browserLang;
  
  // Default fallback
  return DEFAULT_LANGUAGE;
};

export const getLanguageFromPath = (path: string): LanguageCode => {
  if (path.endsWith('/ko') || path.includes('/ko/')) {
    return 'ko';
  }
  if (path.endsWith('/en') || path.includes('/en/')) {
    return 'en';
  }
  return DEFAULT_LANGUAGE;
};