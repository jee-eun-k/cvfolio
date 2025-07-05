import { useEffect } from 'react';
import { getLanguageFromURL, getLanguageFromPath } from '@/lib/languages';

export default function LanguageAwareNav() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const handleNavigation = () => {
      const currentPath = window.location.pathname;
      const currentLang = getLanguageFromURL();
      const storedLang = localStorage.getItem('language');
      
      // If user is on a base path (like /toy-projects) and has a stored language preference
      if (!currentLang && storedLang && storedLang !== 'en') {
        const newPath = `${currentPath}/${storedLang}`;
        window.history.replaceState({}, '', newPath);
        window.location.reload();
      }
    };

    // Run on initial load
    handleNavigation();

    // Listen for navigation events (back/forward)
    window.addEventListener('popstate', handleNavigation);
    
    return () => {
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  return null; // This component doesn't render anything
}