import { ArrowRight, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './Hero.css';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero">
      <div className="container hero-container animate-fade-in">
        <div className="hero-content">
          <div className="badge">
            <Star size={16} fill="var(--accent)" color="var(--accent)" />
            <span>{t('hero_badge')}</span>
          </div>
          <h1 className="hero-title">
            {t('hero_title_1')} <br />
            <span className="text-gradient">{t('hero_title_2')}</span>{t('hero_title_3')}
          </h1>
          <p className="hero-description">
            {t('hero_desc')}
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary">
              {t('btn_explore')} <ArrowRight size={20} />
            </button>
            <button className="btn btn-outline">
              {t('btn_review')}
            </button>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <div className="blob-shape"></div>
          <div className="hero-image-placeholder glass">
            <div className="floating-card card-1">
              <Star size={24} fill="#fbc668" color="#fbc668" />
              <div>
                <strong>Bỉm Merries</strong>
                <p>Siêu mềm mại</p>
              </div>
            </div>
            <div className="floating-card card-2">
              <Star size={24} fill="#fbc668" color="#fbc668" />
              <div>
                <strong>Sữa Meiji</strong>
                <p>Phát triển trí não</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
