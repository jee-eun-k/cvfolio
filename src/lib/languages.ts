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