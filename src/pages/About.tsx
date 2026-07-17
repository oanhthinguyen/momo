import { SEO } from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import babyImage from '../assets/baby.jpg';
import './About.css';

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="page-transition container about-page-container">
      <SEO title="Giới Thiệu" description="Tìm hiểu về Momo Review - Sứ mệnh và cam kết mang lại những đánh giá trung thực nhất cho cộng đồng bỉm sữa." />
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title">{t('about_title')}</h1>
        </div>
        
        <div className="about-content-wrapper">
          <div className="about-image-frame">
            <img src={babyImage} alt="Momo Review Baby" className="about-image" />
          </div>
          
          <div className="about-text-content glass">
            <p>{t('about_content')}</p>
            {/* Split the content visually if we want, but for now just use the translated string */}
            <div className="about-highlight">
              ✨ {t('footer_about_us')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
