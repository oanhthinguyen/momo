import { Baby } from 'lucide-react';
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
            <span>Momo<span className="text-primary">Review</span></span>
          </div>
          <p className="footer-description">
            {t('footer_desc')}
          </p>
        </div>
        
        <div className="footer-links">
          <h4>{t('footer_cat')}</h4>
          <ul>
            <li><a href="#">{t('nav_diapers')}</a></li>
            <li><a href="#">{t('nav_milk')}</a></li>
            <li><a href="#">{t('nav_toys')}</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>{t('footer_about')}</h4>
          <ul>
            <li><a href="#">Giới thiệu</a></li>
            <li><a href="#">Liên hệ</a></li>
            <li><a href="#">Chính sách bảo mật</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Momo Review. All rights reserved.</p>
      </div>
    </footer>
  );
}
