import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import ReviewCard from '../components/ReviewCard';
import { useMockData } from '../data/useMockData';
import './Diapers.css'; // Tái sử dụng CSS của trang danh mục

export default function Search() {
  const { t } = useLanguage();
  const { allProducts } = useMockData();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const lowerQuery = query.toLowerCase();
  
  // Lọc sản phẩm theo query
  const filteredList = allProducts.filter(p => {
    return p.title.toLowerCase().includes(lowerQuery) || 
           p.summary.toLowerCase().includes(lowerQuery) ||
           p.category.toLowerCase().includes(lowerQuery);
  });

  return (
    <div className="page-transition container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
      <div className="section-header">
        <h1 className="section-title">
          {t('search_results_for')} "<span style={{ color: 'var(--primary)' }}>{query}</span>"
        </h1>
        <p className="section-subtitle">
          {filteredList.length > 0 
            ? `Tìm thấy ${filteredList.length} kết quả phù hợp.` 
            : t('no_results')}
        </p>
      </div>

      <div className="category-grid animate-fade-in">
        {filteredList.map((product) => (
          <ReviewCard 
            key={product.id} 
            id={product.id}
            category={product.category}
            title={product.title}
            rating={product.rating}
            summary={product.summary}
            imageColor={product.imageColor}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
