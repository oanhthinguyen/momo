import { useState, useEffect } from 'react';

import ReviewCard from './ReviewCard';
import { useMockData } from '../data/useMockData';
import { Award, TrendingUp } from 'lucide-react';

export default function TopRated() {
  const { allProducts } = useMockData();
  const [topProducts, setTopProducts] = useState<any[]>([]);

  useEffect(() => {
    const approvedReviews = JSON.parse(localStorage.getItem('momo_approved_reviews') || '[]');
    
    // Group all reviews by product title
    const productStats: Record<string, { product: any, count: number, totalRating: number }> = {};
    
    // Process mock products first
    allProducts.forEach(p => {
      const mockCount = (p.id * 7) % 50 + 10; // Deterministic pseudo-random based on id
      productStats[p.title] = { product: p, count: mockCount, totalRating: p.rating ? p.rating * mockCount : 5 * mockCount };
    });
    
    // Process user reviews
    approvedReviews.forEach((r: any) => {
      const title = r.productName || r.title;
      if (!title) return;
      if (productStats[title]) {
        productStats[title].count += 1;
        productStats[title].totalRating += (r.rating || 5);
      } else {
        productStats[title] = { product: r, count: 1, totalRating: r.rating || 5 };
      }
    });

    // Calculate average and sort
    const sorted = Object.values(productStats)
      .map(stat => ({
        ...stat.product,
        averageRating: Math.round((stat.totalRating / stat.count) * 10) / 10,
        reviewCount: stat.count
      }))
      .sort((a, b) => {
        if (b.averageRating !== a.averageRating) {
          return b.averageRating - a.averageRating;
        }
        return b.reviewCount - a.reviewCount;
      });

    setTopProducts(sorted.slice(0, 3));
  }, [allProducts]);

  return (
    <section className="categories-section" style={{ position: 'relative', backgroundColor: 'transparent', paddingTop: '64px', paddingBottom: '64px' }}>
      {/* Background blobs to match Hero */}
      <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--primary-light) 0%, transparent 70%)', opacity: 0.4, borderRadius: '50%', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--secondary-light) 0%, transparent 70%)', opacity: 0.4, borderRadius: '50%', zIndex: 0 }}></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header" style={{ marginBottom: '40px' }}>
          <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', color: '#b45309', fontSize: '2.5rem' }}>
            <Award size={36} color="#f59e0b" fill="#f59e0b" /> Sản phẩm được đánh giá cao
          </h2>
          <p className="section-subtitle" style={{ fontSize: '1.1rem', color: '#64748b' }}>
            <TrendingUp size={20} style={{ display: 'inline', marginRight: '8px' }} />
            Top những sản phẩm đạt nhiều sao và được bình chọn nhiều nhất từ cộng đồng
          </p>
        </div>
        
        <div className="category-grid">
          {topProducts.map((review, i) => (
            <div style={{ position: 'relative' }} key={review.id || i}>
              {/* Highlight badge for #1, #2, #3 */}
              <div style={{ 
                position: 'absolute', 
                top: '-15px', 
                right: '-15px', 
                background: i === 0 ? 'linear-gradient(135deg, #f59e0b, #fbbf24)' : i === 1 ? 'linear-gradient(135deg, #94a3b8, #cbd5e1)' : 'linear-gradient(135deg, #d97706, #f59e0b)', 
                color: '#fff', 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 900, 
                fontSize: '1.5rem', 
                zIndex: 10, 
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                border: '3px solid #fff'
              }}>
                #{i + 1}
              </div>
              <ReviewCard 
                id={review.id}
                category={review.category}
                title={review.title || review.productName}
                rating={review.averageRating}
                summary={review.summary}
                imageColor={review.imageColor || '#f87171'}
                imageUrl={review.imageUrl}
                reviewCount={review.reviewCount}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
