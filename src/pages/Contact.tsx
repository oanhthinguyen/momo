import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <div className="page-transition container" style={{ paddingTop: '140px', paddingBottom: '80px', minHeight: '70vh', maxWidth: '800px' }}>
      <div className="glass" style={{ padding: '40px', borderRadius: '24px' }}>
        <h1 style={{ marginBottom: '24px', fontSize: '2.5rem', color: 'var(--text)' }}>{t('contact_title')}</h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-light)' }}>
          {t('contact_content')}
        </p>
      </div>
    </div>
  );
}
