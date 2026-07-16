import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ReviewCard from '../components/ReviewCard';
import { useMockData } from '../data/useMockData';
import './Diapers.css';

type FilterType = 'all' | 'newborn' | 'motor' | 'puzzle';

export default function Toys() {
  const { t } = useLanguage();
  const { toysList } = useMockData();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredList = filter === 'all' ? toysList : toysList.filter(t => t.type === filter);

  return (
    <div className="page-transition container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
      <div className="section-header">
        <h1 className="section-title">{t('toy_title')}</h1>
        <p className="section-subtitle">{t('toy_desc')}</p>
      </div>

      <div className="filter-bar glass">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          {t('filter_all')}
        </button>
        <button 
          className={`filter-btn ${filter === 'newborn' ? 'active' : ''}`}
          onClick={() => setFilter('newborn')}
        >
          {t('filter_newborn')}
        </button>
        <button 
          className={`filter-btn ${filter === 'motor' ? 'active' : ''}`}
          onClick={() => setFilter('motor')}
        >
          {t('filter_motor')}
        </button>
        <button 
          className={`filter-btn ${filter === 'puzzle' ? 'active' : ''}`}
          onClick={() => setFilter('puzzle')}
        >
          {t('filter_puzzle')}
        </button>
      </div>

      <div className="category-grid animate-fade-in" key={filter}>
        {filteredList.map((toy) => (
          <ReviewCard 
            key={toy.id} 
            id={toy.id}
            category={toy.category}
            title={toy.title}
            rating={toy.rating}
            summary={toy.summary}
            imageColor={toy.imageColor}
            imageUrl={toy.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
