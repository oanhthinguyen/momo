import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../locales/translations';
import type { Language, TranslationKey } from '../locales/translations';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('vi');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('momo_lang') as Language;
    if (savedLang && (savedLang === 'vi' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    if (newLang === language) return;
    
    // Bắt đầu hiệu ứng mờ dần
    setIsTransitioning(true);
    
    // Đợi 300ms rồi mới đổi ngôn ngữ thực sự để khớp với CSS transition
    setTimeout(() => {
      setLanguage(newLang);
      localStorage.setItem('momo_lang', newLang);
      
      // Xóa class mờ để hiện lại
      setIsTransitioning(false);
    }, 300);
  };

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, isTransitioning }}>
      <div className={`lang-transition-wrapper ${isTransitioning ? 'lang-fade-out' : 'lang-fade-in'}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
