import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Database, Lock, EyeOff } from 'lucide-react';
import './Privacy.css';

export default function Privacy() {
  const { t } = useLanguage();

  return (
    <div className="page-transition container" style={{ paddingTop: '140px', paddingBottom: '100px', minHeight: '70vh' }}>
      <div className="privacy-container">
        <div className="privacy-header">
          <h1 className="privacy-title">{t('privacy_title')}</h1>
          <p className="privacy-intro">
            {t('privacy_content')}
          </p>
        </div>

        <div className="privacy-grid">
          <div className="privacy-card glass">
            <div className="privacy-icon-wrapper" style={{ background: '#dbeafe', color: '#3b82f6' }}>
              <Database size={32} />
            </div>
            <h3>{t('privacy_item1_title')}</h3>
            <p>{t('privacy_item1_desc')}</p>
          </div>

          <div className="privacy-card glass">
            <div className="privacy-icon-wrapper" style={{ background: '#fef3c7', color: '#d97706' }}>
              <ShieldCheck size={32} />
            </div>
            <h3>{t('privacy_item2_title')}</h3>
            <p>{t('privacy_item2_desc')}</p>
          </div>

          <div className="privacy-card glass">
            <div className="privacy-icon-wrapper" style={{ background: '#d1fae5', color: '#10b981' }}>
              <Lock size={32} />
            </div>
            <h3>{t('privacy_item3_title')}</h3>
            <p>{t('privacy_item3_desc')}</p>
          </div>

          <div className="privacy-card glass">
            <div className="privacy-icon-wrapper" style={{ background: '#fee2e2', color: '#ef4444' }}>
              <EyeOff size={32} />
            </div>
            <h3>{t('privacy_item4_title')}</h3>
            <p>{t('privacy_item4_desc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
