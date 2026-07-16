import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ReviewCard from '../components/ReviewCard';
import { useMockData } from '../data/useMockData';
import './Diapers.css';

type FilterType = 'all' | 'stage1' | 'stage2' | 'stage3';

export default function Milk() {
  const { t } = useLanguage();
  const { milkList } = useMockData();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredList = filter === 'all' ? milkList : milkList.filter(m => m.type === filter);

  return (
    <div className="page-transition container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
      <div className="section-header">
        <h1 className="section-title">{t('milk_title')}</h1>
        <p className="section-subtitle">{t('milk_desc')}</p>
      </div>

      <div className="filter-bar glass">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          {t('filter_all')}
        </button>
        <button 
          className={`filter-btn ${filter === 'stage1' ? 'active' : ''}`}
          onClick={() => setFilter('stage1')}
        >
          {t('filter_stage1')}
        </button>
        <button 
          className={`filter-btn ${filter === 'stage2' ? 'active' : ''}`}
          onClick={() => setFilter('stage2')}
        >
          {t('filter_stage2')}
        </button>
        <button 
          className={`filter-btn ${filter === 'stage3' ? 'active' : ''}`}
          onClick={() => setFilter('stage3')}
        >
          {t('filter_stage3')}
        </button>
      </div>

      <div className="category-grid animate-fade-in" key={filter}>
        {filteredList.map((milk) => (
          <ReviewCard 
            key={milk.id} 
            id={milk.id}
            category={milk.category}
            title={milk.title}
            rating={milk.rating}
            summary={milk.summary}
            imageColor={milk.imageColor}
            imageUrl={milk.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
