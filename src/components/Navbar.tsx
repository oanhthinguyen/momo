import { Baby, Search, Globe, ChevronDown, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../locales/translations';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<string | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { language, changeLanguage, t } = useLanguage();
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Đóng menu/dropdown khi chuyển trang
  useEffect(() => {
    setIsLangDropdownOpen(false);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
    setUser(localStorage.getItem('user'));
  }, [location]);

  // Click outside để đóng dropdown ngôn ngữ và user
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    changeLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsUserDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className={`navbar ${isScrolled ? 'glass scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <Baby size={32} color="var(--primary)" />
          <span>Memo<span className="text-primary">Review</span></span>
        </Link>
        
        <nav className="nav-links">
          <Link to="/diapers" className={`nav-link ${location.pathname === '/diapers' ? 'active' : ''}`}>{t('nav_diapers')}</Link>
          <Link to="/milk" className={`nav-link ${location.pathname === '/milk' ? 'active' : ''}`}>{t('nav_milk')}</Link>
          <Link to="/toys" className={`nav-link ${location.pathname === '/toys' ? 'active' : ''}`}>{t('nav_toys')}</Link>
          <Link to="/parenting" className={`nav-link ${location.pathname === '/parenting' ? 'active' : ''}`}>{t('nav_parenting')}</Link>
          <Link to="/community" className={`nav-link ${location.pathname.startsWith('/community') ? 'active' : ''}`}>{t('nav_community')}</Link>
        </nav>

        <div className="nav-actions">
          <div className="lang-dropdown-container" ref={langDropdownRef}>
            <button 
              className="icon-btn lang-btn" 
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
            >
              <Globe size={20} />
              <span className="lang-text">{language === 'vi' ? 'VI' : 'EN'}</span>
              <ChevronDown size={16} />
            </button>
            
            {isLangDropdownOpen && (
              <div className="lang-dropdown-menu">
                <button 
                  className={`lang-option ${language === 'vi' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('vi')}
                >
                  🇻🇳 Tiếng Việt
                </button>
                <button 
                  className={`lang-option ${language === 'en' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('en')}
                >
                  🇬🇧 English
                </button>
              </div>
            )}
          </div>

          <div className="search-container">
            <form onSubmit={handleSearchSubmit} className={`search-form ${isSearchOpen ? 'open' : ''}`}>
              <input 
                type="text" 
                placeholder={t('search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                onBlur={() => !searchQuery && setIsSearchOpen(false)}
              />
              <button type="button" className="icon-btn search-toggle-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <Search size={20} />
              </button>
            </form>
          </div>

          {user ? (
            <div className="user-dropdown-container" ref={userDropdownRef}>
              <button 
                className="user-avatar-btn" 
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <div className="avatar-circle">
                  {user.substring(0, 2).toUpperCase()}
                </div>
              </button>
              
              {isUserDropdownOpen && (
                <div className="lang-dropdown-menu user-menu">
                  <Link to="/profile" className="lang-option" onClick={() => setIsUserDropdownOpen(false)}>
                    <UserIcon size={16} /> {t('nav_profile')}
                  </Link>
                  <div className="mobile-nav-divider"></div>
                  <button className="lang-option" onClick={handleLogout}>
                    <LogOut size={16} /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="icon-btn login-btn" title={t('nav_login')}>
              <UserIcon size={20} />
              <span className="login-text">{t('nav_login')}</span>
            </Link>
          )}
          
          <button 
            className="icon-btn mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-overlay glass animate-fade-in">
          <nav className="mobile-nav-links">
            <Link to="/diapers" className={`nav-link ${location.pathname === '/diapers' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>{t('nav_diapers')}</Link>
            <Link to="/milk" className={`nav-link ${location.pathname === '/milk' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>{t('nav_milk')}</Link>
            <Link to="/toys" className={`nav-link ${location.pathname === '/toys' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>{t('nav_toys')}</Link>
            <Link to="/parenting" className={`nav-link ${location.pathname === '/parenting' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>{t('nav_parenting')}</Link>
            <Link to="/community" className={`nav-link ${location.pathname.startsWith('/community') ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>{t('nav_community')}</Link>
            
            {user ? (
              <>
                <div className="mobile-nav-divider"></div>
                <Link to="/profile" className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
                  <UserIcon size={18} style={{ display: 'inline', marginRight: '8px' }} />
                  {t('nav_profile')}
                </Link>
                <button className="nav-link text-left text-danger" onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}>
                  <LogOut size={18} style={{ display: 'inline', marginRight: '8px' }} />
                  Đăng xuất
                </button>
              </>
            ) : (
              <>
                <div className="mobile-nav-divider"></div>
                <Link to="/login" className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>{t('nav_login')}</Link>
                <Link to="/register" className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>{t('nav_register')}</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
