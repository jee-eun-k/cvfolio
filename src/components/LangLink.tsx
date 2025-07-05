import { useEffect, useState } from 'react';
import { getLanguageFromURL, type LanguageCode } from '@/lib/languages';

interface LangLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function LangLink({ href, children, className = '' }: LangLinkProps) {
  const [currentLang, setCurrentLang] = useState<LanguageCode | null>(null);

  useEffect(() => {
    // Get current language from URL
    const lang = getLanguageFromURL();
    const storedLang = localStorage.getItem('language') as LanguageCode;
    setCurrentLang(lang || storedLang || 'en');
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!currentLang) return;
    
    // Create language-aware URL
    let targetPath = href;
    if (currentLang !== 'en') {
      targetPath = href === '/' ? `/${currentLang}` : `${href}/${currentLang}`;
    }
    
    window.location.href = targetPath;
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}