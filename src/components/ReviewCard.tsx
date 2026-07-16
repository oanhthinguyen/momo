import { Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './ReviewCard.css';

interface ReviewCardProps {
  category: string;
  title: string;
  rating: number;
  summary: string;
  imageColor: string;
}

export default function ReviewCard({ category, title, rating, summary, imageColor }: ReviewCardProps) {
  const { t } = useLanguage();

  return (
    <div className="review-card glass">
      <div className="card-image-placeholder" style={{ backgroundColor: imageColor }}>
      </div>
      <div className="card-content">
        <span className="card-category">{category}</span>
        <h3 className="card-title">{title}</h3>
        <div className="card-rating">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill={i < rating ? "var(--accent)" : "transparent"} color="var(--accent)" />
          ))}
        </div>
        <p className="card-summary">{summary}</p>
        <button className="read-more">{t('read_more')}</button>
      </div>
    </div>
  );
}
