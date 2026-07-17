import { SEO } from '../components/SEO';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ReviewCard from '../components/ReviewCard';
import { useMockData } from '../data/useMockData';
import './Diapers.css';

type FilterType = 'all' | 'tape' | 'pants';

export default function Diapers() {
  const { t } = useLanguage();
  const { diapersList } = useMockData();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredList = filter === 'all' ? diapersList : diapersList.filter(d => d.type === filter);

  return (
    <div className="page-transition container category-page-container">
      <SEO title="Đánh Giá Bỉm" description="Review chi tiết các loại bỉm (tã dán, tã quần) phổ biến và an toàn nhất hiện nay cho bé." />
      <div className="section-header">
        <h1 className="section-title">{t('diaper_title')}</h1>
        <p className="section-subtitle">{t('diaper_desc')}</p>
      </div>

      <div className="filter-bar glass">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          {t('filter_all')}
        </button>
        <button 
          className={`filter-btn ${filter === 'tape' ? 'active' : ''}`}
          onClick={() => setFilter('tape')}
        >
          {t('filter_tape')}
        </button>
        <button 
          className={`filter-btn ${filter === 'pants' ? 'active' : ''}`}
          onClick={() => setFilter('pants')}
        >
          {t('filter_pants')}
        </button>
      </div>

      <div className="category-grid animate-fade-in" key={filter}>
        {filteredList.map((diaper) => (
          <ReviewCard 
            key={diaper.id} 
            id={diaper.id}
            category={diaper.category}
            title={diaper.title}
            rating={diaper.rating}
            summary={diaper.summary}
            imageColor={diaper.imageColor}
            imageUrl={diaper.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
