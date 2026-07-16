import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ReviewCard from '../components/ReviewCard';
import './Diapers.css'; // Tái sử dụng CSS từ Diapers

type FilterType = 'all' | 'newborn' | 'motor' | 'puzzle';

export default function Toys() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<FilterType>('all');

  const toysList = [
    {
      id: 9,
      type: 'newborn',
      category: t('filter_newborn'),
      title: t('ty_9_title'),
      rating: 5,
      summary: t('ty_9_sum'),
      imageColor: '#fcd34d'
    },
    {
      id: 10,
      type: 'motor',
      category: t('filter_motor'),
      title: t('ty_10_title'),
      rating: 4,
      summary: t('ty_10_sum'),
      imageColor: '#34d399'
    },
    {
      id: 11,
      type: 'puzzle',
      category: t('filter_puzzle'),
      title: t('ty_11_title'),
      rating: 5,
      summary: t('ty_11_sum'),
      imageColor: '#60a5fa'
    },
    {
      id: 12,
      type: 'puzzle',
      category: t('filter_puzzle'),
      title: t('ty_12_title'),
      rating: 5,
      summary: t('ty_12_sum'),
      imageColor: '#f472b6'
    }
  ];

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
          />
        ))}
      </div>
    </div>
  );
}
