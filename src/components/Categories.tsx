import { useLanguage } from '../context/LanguageContext';
import ReviewCard from './ReviewCard';
import { useMockData } from '../data/useMockData';
import './Categories.css';

export default function Categories() {
  const { t } = useLanguage();
  const { allProducts } = useMockData();
  
  // Lấy 3 sản phẩm đầu tiên làm nổi bật
  const featuredReviews = [
    allProducts.find(p => p.id === 1),
    allProducts.find(p => p.id === 5),
    allProducts.find(p => p.id === 9)
  ].filter(Boolean);

  return (
    <section id="categories-section" className="categories-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('cat_title')}</h2>
          <p className="section-subtitle">{t('cat_subtitle')}</p>
        </div>
        
        <div className="category-grid">
          {featuredReviews.map((review) => (
            <ReviewCard 
              key={review!.id} 
              id={review!.id}
              category={review!.category}
              title={review!.title}
              rating={review!.rating}
              summary={review!.summary}
              imageColor={review!.imageColor}
              imageUrl={review!.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
