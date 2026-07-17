import { SEO } from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Database, Lock, EyeOff } from 'lucide-react';
import './Privacy.css';

export default function Privacy() {
  const { t } = useLanguage();

  return (
    <div className="page-transition container privacy-page-container">
      <SEO title="Chính Sách Bảo Mật" description="Cam kết bảo vệ quyền riêng tư và thông tin cá nhân của người dùng tại Momo Review." />
      <div className="privacy-container">
        <div className="privacy-header">
          <h1 className="privacy-title">{t('privacy_title')}</h1>
          <p className="privacy-intro">
            {t('privacy_content')}
          </p>
        </div>

        <div className="privacy-grid">
          <div className="privacy-card glass">
            <div className="privacy-icon-wrapper privacy-icon-db">
              <Database size={32} />
            </div>
            <h3>{t('privacy_item1_title')}</h3>
            <p>{t('privacy_item1_desc')}</p>
          </div>

          <div className="privacy-card glass">
            <div className="privacy-icon-wrapper privacy-icon-shield">
              <ShieldCheck size={32} />
            </div>
            <h3>{t('privacy_item2_title')}</h3>
            <p>{t('privacy_item2_desc')}</p>
          </div>

          <div className="privacy-card glass">
            <div className="privacy-icon-wrapper privacy-icon-lock">
              <Lock size={32} />
            </div>
            <h3>{t('privacy_item3_title')}</h3>
            <p>{t('privacy_item3_desc')}</p>
          </div>

          <div className="privacy-card glass">
            <div className="privacy-icon-wrapper privacy-icon-eye">
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
