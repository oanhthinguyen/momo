import { SEO } from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { Hospital, MapPin, CheckCircle, AlertTriangle, Utensils, ChefHat, Info, Sparkles } from 'lucide-react';
import './ParentingTips.css';

export default function ParentingTips() {
  const { t } = useLanguage();

  return (
    <div className="page-transition container pt-container">
      <SEO title="Mẹo Nuôi Con" description="Cẩm nang chăm sóc bé, dinh dưỡng, cách làm đồ ăn dặm và danh sách các phòng khám uy tín." />
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
          <div className="pt-age-card glass pt-nutri-orange">
            <div className="age-badge">0-6T</div>
            <h3><Utensils size={20} className="nutri-icon"/> {t('pt_nutri_0_6_title')}</h3>
            <p className="nutri-desc">{t('pt_nutri_0_6_desc')}</p>
          </div>

          {/* 6-12 Months */}
          <div className="pt-age-card glass pt-nutri-yellow">
            <div className="age-badge">6-12T</div>
            <h3><Utensils size={20} className="nutri-icon"/> {t('pt_nutri_6_12_title')}</h3>
            <p className="nutri-desc">{t('pt_nutri_6_12_desc')}</p>
          </div>

          {/* 1-3 Years */}
          <div className="pt-age-card glass pt-nutri-green">
            <div className="age-badge">1-3Y</div>
            <h3><Utensils size={20} className="nutri-icon"/> {t('pt_nutri_1_3_title')}</h3>
            <p className="nutri-desc">{t('pt_nutri_1_3_desc')}</p>
          </div>
        </div>
      </div>

      {/* Recipes Section */}
      <div className="pt-section">
        <h2 className="section-heading">{t('pt_recipe_title')}</h2>
        <div className="pt-recipe-grid">
          {[1, 2, 3].map((num) => (
            <div key={num} className="pt-recipe-card glass">
              <div className="recipe-header">
                <div className="recipe-icon-wrapper">
                  <ChefHat size={28} />
                </div>
                <div>
                  <h3 className="recipe-name">{t(`pt_recipe_${num}_name` as any)}</h3>
                  <div className="recipe-age-badge">{t(`pt_recipe_${num}_age` as any)}</div>
                </div>
              </div>
              <div className="recipe-content">
                <div className="recipe-block ingredients">
                  <div className="block-title">
                    <Sparkles size={16} /> Nguyên liệu
                  </div>
                  <p>{t(`pt_recipe_${num}_ing` as any).replace('Nguyên liệu: ', '').replace('Ingredients: ', '')}</p>
                </div>
                <div className="recipe-block steps">
                  <div className="block-title">
                    <Info size={16} /> Cách làm
                  </div>
                  <p>{t(`pt_recipe_${num}_step` as any).replace('Cách làm: ', '').replace('Steps: ', '')}</p>
                </div>
              </div>
            </div>
          ))}
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
