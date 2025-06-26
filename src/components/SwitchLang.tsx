import { useEffect, useState } from 'react';
import {
  LANGUAGES,
  DEFAULT_LANGUAGE,
  getLanguageFromNavigator,
  getLanguageFromURL,
  updateURLWithLanguage,
} from '@/lib/languages';
import type { LanguageCode } from '@/lib/languages';

const LANG_KEY = 'language';

export default function SwitchLang() {
  const [language, setLanguage] = useState<LanguageCode | null>(null);

  useEffect(() => {
    // Get language from URL first, then localStorage, then browser preference
    const urlLang = getLanguageFromURL();
    const savedLang = localStorage.getItem(LANG_KEY) as LanguageCode;
    const browserLang = getLanguageFromNavigator();
    
    // Priority: URL > localStorage > browser
    const initialLang = urlLang || savedLang || browserLang;

    // Apply the language to document
    document.documentElement.lang = initialLang;

    setLanguage(initialLang);
    
    // Update URL if it doesn't match the detected language
    if (urlLang === null && initialLang) {
      updateURLWithLanguage(initialLang);
    }
  }, []);

  const toggleLanguage = () => {
    const currentLang = language || DEFAULT_LANGUAGE;
    const newLang: LanguageCode = currentLang === 'en' ? 'ko' : 'en';

    setLanguage(newLang);
    localStorage.setItem(LANG_KEY, newLang);
    document.documentElement.lang = newLang;
    updateURLWithLanguage(newLang);
  };

  // Don't render anything until we know the language
  if (language === null) {
    return null;
  }

  const currentLanguage = LANGUAGES[language];

  return (
    <button
      onClick={toggleLanguage}
      className="hidden md:block h-9 w-9 fixed z-50 top-0 mt-5 mr-16 right-0 p-2 rounded-full bg-muted-foreground/40 hover:bg-muted-foreground/60 text-headings transition-colors cursor-pointer"
      aria-label={`Switch to ${language === 'en' ? '한국어' : 'English'}`}
      title={`Current: ${currentLanguage.name}`}
    >
      <span className="text-sm font-sm justify-center flex items-center">
        {language === 'en' ? 'EN' : 'KO'}
      </span>
    </button>
  );
}
