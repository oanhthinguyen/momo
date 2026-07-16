import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import './ReviewCard.css';

interface ReviewCardProps {
  id: number;
  category: string;
  title: string;
  rating: number;
  summary: string;
  imageColor: string;
  imageUrl?: string;
}

export default function ReviewCard({ id, category, title, rating, summary, imageColor, imageUrl }: ReviewCardProps) {
  const { t } = useLanguage();

  return (
    <div className="review-card glass">
      <div className="card-image-placeholder" style={{ backgroundColor: imageUrl ? 'transparent' : imageColor }}>
        {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
      </div>
      <div className="card-content">
        <span className="card-category">{category}</span>
        <h3 className="card-title">{title}</h3>
        <div className="card-rating">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < rating ? "var(--accent)" : "transparent"} color="var(--accent)" />
          ))}
        </div>
        <p className="card-summary">{summary}</p>

        <div className="card-affiliate">
          <a href="https://shopee.vn" target="_blank" rel="noopener noreferrer" className="mini-aff-btn shopee">Shopee</a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="mini-aff-btn tiktok">TikTok</a>
          <a href="https://lazada.vn" target="_blank" rel="noopener noreferrer" className="mini-aff-btn lazada">Lazada</a>
        </div>

        <Link to={`/review/${id}`} className="read-more">{t('read_more')}</Link>
      </div>
    </div>
  );
}
