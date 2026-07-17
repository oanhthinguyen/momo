import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import ReviewCard from '../components/ReviewCard';
import { useMockData } from '../data/useMockData';
import { SEO } from '../components/SEO';

export default function AllReviews() {
  const { allProducts } = useMockData();
  const [approvedReviews, setApprovedReviews] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reviews = JSON.parse(localStorage.getItem('momo_approved_reviews') || '[]');
    setApprovedReviews(reviews);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Kết hợp đánh giá mới duyệt và toàn bộ đánh giá tĩnh (ưu tiên mới duyệt trước)
  const allReviews = [...approvedReviews, ...allProducts];
  
  const displayReviews = allReviews.filter(review => {
    if (activeFilter === 'all') return true;
    
    const cat = review.mainCategory || review.category;
    if (activeFilter === 'diapers') return cat === 'diaper' || cat === 'diapers';
    if (activeFilter === 'milk') return cat === 'milk';
    if (activeFilter === 'toys') return cat === 'toy' || cat === 'toys';
    
    return true;
  });

  return (
    <div className="page-transition">
      <SEO title="Tất cả đánh giá" description="Xem tất cả các đánh giá sản phẩm mẹ và bé từ cộng đồng Momo Review." />
      <div className="container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: 'calc(100vh - 80px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>Tất cả đánh giá</h1>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Tổng hợp {displayReviews.length} bài đánh giá chân thực từ cộng đồng</p>
          </div>
          
          <div className="filter-dropdown-wrapper" ref={dropdownRef} style={{ position: 'relative', width: '220px' }}>
            <div 
              className={`filter-dropdown-trigger ${isDropdownOpen ? 'open' : ''}`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{ padding: '12px 16px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '12px', border: `2px solid ${isDropdownOpen ? 'var(--primary)' : 'rgba(255, 126, 179, 0.2)'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(236, 72, 153, 0.05)' }}
            >
              <span style={{ fontWeight: 600, color: 'var(--text)' }}>
                {activeFilter === 'all' && 'Tất cả danh mục'}
                {activeFilter === 'diapers' && 'Bỉm dán / Bỉm quần'}
                {activeFilter === 'milk' && 'Sữa công thức'}
                {activeFilter === 'toys' && 'Đồ chơi giáo dục'}
              </span>
              <ChevronDown size={20} color="var(--primary)" style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </div>
            
            {isDropdownOpen && (
              <div className="filter-dropdown-options glass" style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px', zIndex: 10, borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)' }}>
                {['all', 'diapers', 'milk', 'toys'].map((filter) => (
                  <div 
                    key={filter}
                    className="filter-option"
                    style={{ padding: '14px 16px', cursor: 'pointer', background: activeFilter === filter ? 'var(--primary-light)' : 'transparent', color: activeFilter === filter ? 'var(--primary-dark)' : 'var(--text)', fontWeight: activeFilter === filter ? 600 : 400, transition: 'background 0.2s' }}
                    onClick={() => { setActiveFilter(filter); setIsDropdownOpen(false); }}
                    onMouseEnter={(e) => { if (activeFilter !== filter) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)' }}
                    onMouseLeave={(e) => { if (activeFilter !== filter) e.currentTarget.style.background = 'transparent' }}
                  >
                    {filter === 'all' && 'Tất cả danh mục'}
                    {filter === 'diapers' && 'Bỉm dán / Bỉm quần'}
                    {filter === 'milk' && 'Sữa công thức'}
                    {filter === 'toys' && 'Đồ chơi giáo dục'}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {displayReviews.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {displayReviews.map((review, index) => (
            <ReviewCard 
              key={review.id || index} 
              id={review.id}
              category={review.category}
              title={review.title || review.productName}
              rating={review.rating}
              summary={review.summary}
              imageColor={review.imageColor || '#f87171'}
              imageUrl={review.imageUrl}
            />
          ))}
        </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'rgba(255,255,255,0.5)', borderRadius: '16px' }}>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Không có bài đánh giá nào trong danh mục này.</p>
          </div>
        )}
      </div>
    </div>
  );
}
