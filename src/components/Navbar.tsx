import { Baby, Menu, Search, Globe, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../locales/translations';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const location = useLocation();
  const { language, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLangSelect = (lang: Language) => {
    changeLanguage(lang);
    setDropdownOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? 'glass scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <Baby size={32} color="var(--primary)" />
          <span>Memo<span className="text-primary">Review</span></span>
        </Link>
        
        <nav className="nav-links">
          <Link to="/diapers" className={`nav-link ${location.pathname === '/diapers' ? 'active' : ''}`}>{t('nav_diapers')}</Link>
          <Link to="/milk" className={`nav-link ${location.pathname === '/milk' ? 'active' : ''}`}>{t('nav_milk')}</Link>
          <Link to="/toys" className={`nav-link ${location.pathname === '/toys' ? 'active' : ''}`}>{t('nav_toys')}</Link>
        </nav>

        <div className="nav-actions">
          {/* Language Dropdown */}
          <div className="lang-dropdown-container" ref={dropdownRef}>
            <button 
              className="icon-btn lang-btn" 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              title={language === 'vi' ? 'Chọn ngôn ngữ' : 'Select language'}
            >
              <Globe size={20} />
              <span className="lang-text">{language.toUpperCase()}</span>
              <ChevronDown size={14} className={`dropdown-icon ${dropdownOpen ? 'open' : ''}`} />
            </button>
            
            {dropdownOpen && (
              <div className="lang-dropdown-menu glass animate-fade-in">
                <button 
                  className={`dropdown-item ${language === 'vi' ? 'active' : ''}`}
                  onClick={() => handleLangSelect('vi')}
                >
                  🇻🇳 Tiếng Việt
                </button>
                <button 
                  className={`dropdown-item ${language === 'en' ? 'active' : ''}`}
                  onClick={() => handleLangSelect('en')}
                >
                  🇬🇧 English
                </button>
              </div>
            )}
          </div>
          
          <button className="icon-btn"><Search size={20} /></button>
          <button className="icon-btn"><Menu size={24} className="mobile-menu" /></button>
        </div>
      </div>
    </header>
  );
}
