import ReviewCard from './ReviewCard';
import { useLanguage } from '../context/LanguageContext';
import './Categories.css';

export default function Categories() {
  const { t } = useLanguage();

  const reviews = [
    {
      id: 1,
      category: t('nav_diapers'),
      title: 'Đánh giá bỉm Merries nội địa Nhật',
      rating: 5,
      summary: 'Bỉm mềm mại, thấm hút tốt, không gây hăm tã cho bé sơ sinh. Đáng đồng tiền bát gạo.',
      imageColor: 'var(--primary-light)'
    },
    {
      id: 2,
      category: t('nav_milk'),
      title: 'Sữa Meiji số 0 có tốt không?',
      rating: 4,
      summary: 'Sữa nhạt thanh giống sữa mẹ, bé dễ hấp thu, tiêu hóa tốt, không bị táo bón.',
      imageColor: 'var(--secondary-light)'
    },
    {
      id: 3,
      category: t('nav_toys'),
      title: 'Xếp hình Lego Duplo cho bé 2 tuổi',
      rating: 5,
      summary: 'Giúp bé phát triển tư duy sáng tạo, khối to an toàn không sợ bé nuốt phải.',
      imageColor: 'var(--accent-light)'
    }
  ];

  return (
    <section className="categories" id="reviews">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('cat_title')}</h2>
          <p className="section-subtitle">{t('cat_subtitle')}</p>
        </div>
        
        <div className="category-grid">
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      </div>
    </section>
  );
}
