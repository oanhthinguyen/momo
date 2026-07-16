import { useLanguage } from '../context/LanguageContext';

export default function Toys() {
  const { t } = useLanguage();

  return (
    <div className="page-transition container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
      <h1 className="section-title">{t('toy_title')}</h1>
      <p className="section-subtitle">{t('toy_desc')}</p>
      <div style={{ marginTop: '40px', padding: '40px', background: 'white', borderRadius: 'var(--radius)' }} className="glass">
        <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>{t('updating')}</p>
      </div>
    </div>
  );
}
