import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ReviewCard from './ReviewCard';
import { useMockData } from '../data/useMockData';
import './Categories.css';

export default function Categories() {
  const { t } = useLanguage();
  const { allProducts } = useMockData();
  const [approvedReviews, setApprovedReviews] = useState<any[]>([]);

  useEffect(() => {
    const reviews = JSON.parse(localStorage.getItem('momo_approved_reviews') || '[]');
    setApprovedReviews(reviews);
  }, []);
  
  
  // Lấy 3 sản phẩm đầu tiên làm nổi bật (dữ liệu tĩnh)
  const staticFeaturedReviews = [
    allProducts.find(p => p.id === 1),
    allProducts.find(p => p.id === 5),
    allProducts.find(p => p.id === 9)
  ].filter(Boolean);

  // Kết hợp đánh giá mới duyệt và đánh giá tĩnh (ưu tiên mới duyệt trước)
  const displayReviews = [...approvedReviews, ...staticFeaturedReviews].slice(0, 3);

  return (
    <section id="categories-section" className="categories-section">
      <div className="container">
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', color: '#b45309', fontSize: '2.5rem' }}>
            <Sparkles size={36} color="#f59e0b" fill="#f59e0b" /> {t('cat_title')}
          </h2>
          <p className="section-subtitle" style={{ fontSize: '1.1rem', color: '#64748b' }}>
            <MessageCircle size={20} style={{ display: 'inline', marginRight: '8px' }} />
            {t('cat_subtitle')}
          </p>
        </div>
        
        <div className="category-grid">
          {displayReviews.map((review) => (
            <ReviewCard 
              key={review!.id} 
              id={review!.id}
              category={review!.category}
              title={review!.title || review!.productName}
              rating={review!.rating}
              summary={review!.summary}
              imageColor={review!.imageColor || '#f87171'}
              imageUrl={review!.imageUrl}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link to="/reviews" className="btn btn-outline" style={{ padding: '12px 40px', borderRadius: '30px', fontSize: '1.05rem', fontWeight: 600 }}>
            Xem thêm đánh giá
          </Link>
        </div>
      </div>
    </section>
  );
}
