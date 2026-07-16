import { Baby } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="logo footer-logo">
            <Baby size={32} color="var(--primary)" />
            <span>Memo<span className="text-primary">Review</span></span>
          </div>
          <p className="footer-description">
            {t('footer_desc')}
          </p>
        </div>
        
        <div className="footer-links">
          <h4>{t('footer_cat')}</h4>
          <ul>
            <li><Link to="/diapers">{t('nav_diapers')}</Link></li>
            <li><Link to="/milk">{t('nav_milk')}</Link></li>
            <li><Link to="/toys">{t('nav_toys')}</Link></li>
            <li><Link to="/parenting">{t('nav_parenting')}</Link></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>{t('footer_about')}</h4>
          <ul>
            <li><Link to="/about">{t('footer_about_us')}</Link></li>
            <li><Link to="/contact">{t('footer_contact')}</Link></li>
            <li><Link to="/privacy">{t('footer_privacy')}</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Memo Review. All rights reserved.</p>
      </div>
    </footer>
  );
}
