import { useEffect } from 'react';
import { getLanguageFromURL } from '@/lib/languages';

export default function LanguageAwareLinks() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleLinkClicks = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      
      // Only handle navigation links
      if (target.tagName === 'A' && (
        target.href.endsWith('/') ||
        target.href.endsWith('/writing') ||
        target.href.endsWith('/toy-projects')
      )) {
        e.preventDefault();
        
        const currentLang = getLanguageFromURL();
        const storedLang = localStorage.getItem('language');
        const preferredLang = currentLang || storedLang || 'en';
        
        let targetPath = new URL(target.href).pathname;
        
        // Add language suffix for non-English languages
        if (preferredLang !== 'en') {
          targetPath = targetPath === '/' ? `/${preferredLang}` : `${targetPath}/${preferredLang}`;
        }
        
        window.location.href = targetPath;
      }
    };

    // Add event listener for all clicks
    document.addEventListener('click', handleLinkClicks);
    
    return () => {
      document.removeEventListener('click', handleLinkClicks);
    };
  }, []);

  return null; // This component doesn't render anything
}