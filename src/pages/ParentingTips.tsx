import { useLanguage } from '../context/LanguageContext';
import { Hospital, MapPin, CheckCircle, AlertTriangle, Utensils } from 'lucide-react';
import './ParentingTips.css';

export default function ParentingTips() {
  const { t } = useLanguage();

  return (
    <div className="page-transition container pt-container">
      {/* Header */}
      <div className="pt-header">
        <h1 className="pt-title">{t('pt_title')}</h1>
        <p className="pt-subtitle">{t('pt_subtitle')}</p>
      </div>

      {/* Age Groups Section */}
      <div className="pt-section">
        <h2 className="section-heading">Giai đoạn phát triển & Cách xử lý</h2>
        <div className="pt-age-grid">
          {/* 0-6 Months */}
          <div className="pt-age-card glass">
            <div className="age-badge">0-6T</div>
            <h3>{t('pt_age_0_6_title')}</h3>
            <div className="pt-prob-sol">
              <div className="pt-prob">
                <AlertTriangle size={18} className="prob-icon" />
                <p>{t('pt_age_0_6_prob')}</p>
              </div>
              <div className="pt-sol">
                <CheckCircle size={18} className="sol-icon" />
                <p>{t('pt_age_0_6_sol')}</p>
              </div>
            </div>
          </div>

          {/* 6-12 Months */}
          <div className="pt-age-card glass">
            <div className="age-badge">6-12T</div>
            <h3>{t('pt_age_6_12_title')}</h3>
            <div className="pt-prob-sol">
              <div className="pt-prob">
                <AlertTriangle size={18} className="prob-icon" />
                <p>{t('pt_age_6_12_prob')}</p>
              </div>
              <div className="pt-sol">
                <CheckCircle size={18} className="sol-icon" />
                <p>{t('pt_age_6_12_sol')}</p>
              </div>
            </div>
          </div>

          {/* 1-3 Years */}
          <div className="pt-age-card glass">
            <div className="age-badge">1-3Y</div>
            <h3>{t('pt_age_1_3_title')}</h3>
            <div className="pt-prob-sol">
              <div className="pt-prob">
                <AlertTriangle size={18} className="prob-icon" />
                <p>{t('pt_age_1_3_prob')}</p>
              </div>
              <div className="pt-sol">
                <CheckCircle size={18} className="sol-icon" />
                <p>{t('pt_age_1_3_sol')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nutrition Section */}
      <div className="pt-section">
        <h2 className="section-heading">{t('pt_nutrition_title')}</h2>
        <div className="pt-age-grid">
          {/* 0-6 Months */}
          <div className="pt-age-card glass" style={{ borderColor: 'rgba(251, 146, 60, 0.3)' }}>
            <div className="age-badge" style={{ background: '#f97316' }}>0-6T</div>
            <h3 style={{ color: '#ea580c' }}><Utensils size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }}/> {t('pt_nutri_0_6_title')}</h3>
            <p style={{ color: 'var(--text)', lineHeight: '1.7' }}>{t('pt_nutri_0_6_desc')}</p>
          </div>

          {/* 6-12 Months */}
          <div className="pt-age-card glass" style={{ borderColor: 'rgba(234, 179, 8, 0.3)' }}>
            <div className="age-badge" style={{ background: '#eab308' }}>6-12T</div>
            <h3 style={{ color: '#ca8a04' }}><Utensils size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }}/> {t('pt_nutri_6_12_title')}</h3>
            <p style={{ color: 'var(--text)', lineHeight: '1.7' }}>{t('pt_nutri_6_12_desc')}</p>
          </div>

          {/* 1-3 Years */}
          <div className="pt-age-card glass" style={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <div className="age-badge" style={{ background: '#10b981' }}>1-3Y</div>
            <h3 style={{ color: '#059669' }}><Utensils size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }}/> {t('pt_nutri_1_3_title')}</h3>
            <p style={{ color: 'var(--text)', lineHeight: '1.7' }}>{t('pt_nutri_1_3_desc')}</p>
          </div>
        </div>
      </div>

      {/* Clinics Section */}
      <div className="pt-section">
        <h2 className="section-heading">{t('pt_clinic_title')}</h2>
        <div className="pt-clinic-grid">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="pt-clinic-card glass">
              <div className="clinic-icon-wrapper">
                <Hospital size={28} />
              </div>
              <div className="clinic-info">
                <h4>{t(`pt_clinic_${num}_name` as any)}</h4>
                <div className="clinic-address">
                  <MapPin size={16} />
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t(`pt_clinic_${num}_name` as any) + ' ' + t(`pt_clinic_${num}_desc` as any))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t(`pt_clinic_${num}_desc` as any)}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
