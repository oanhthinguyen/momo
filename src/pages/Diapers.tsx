import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ReviewCard from '../components/ReviewCard';
import './Diapers.css';

type FilterType = 'all' | 'tape' | 'pants';

export default function Diapers() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<FilterType>('all');

  const diapersList = [
    {
      id: 1,
      type: 'tape',
      category: t('filter_tape'),
      title: t('dp_1_title'),
      rating: 5,
      summary: t('dp_1_sum'),
      imageColor: '#ffb8c5'
    },
    {
      id: 2,
      type: 'pants',
      category: t('filter_pants'),
      title: t('dp_2_title'),
      rating: 4,
      summary: t('dp_2_sum'),
      imageColor: '#a4d3e2'
    },
    {
      id: 3,
      type: 'tape',
      category: t('filter_tape'),
      title: t('dp_3_title'),
      rating: 5,
      summary: t('dp_3_sum'),
      imageColor: '#fde4a9'
    },
    {
      id: 4,
      type: 'pants',
      category: t('filter_pants'),
      title: t('dp_4_title'),
      rating: 4,
      summary: t('dp_4_sum'),
      imageColor: '#e2e8f0'
    }
  ];

  const filteredList = filter === 'all' ? diapersList : diapersList.filter(d => d.type === filter);

  return (
    <div className="page-transition container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
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
          />
        ))}
      </div>
    </div>
  );
}
