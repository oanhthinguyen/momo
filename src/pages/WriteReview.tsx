import { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, Star, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import './WriteReview.css';

export default function WriteReview() {
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="page-transition container wr-success-container">
        <CheckCircle2 size={80} color="var(--success)" className="success-icon" />
        <h2>{t('wr_success')}</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '24px' }}>
          {t('search_results_for') === 'Search results for' ? 'Return to Home' : 'Về Trang Chủ'}
        </Link>
      </div>
    );
  }

  return (
    <div className="page-transition container wr-container">
      <div className="wr-header">
        <h1>{t('wr_title')}</h1>
        <p>{t('wr_subtitle')}</p>
      </div>

      <form className="wr-form glass animate-fade-in" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('wr_prod_name')}</label>
          <input type="text" placeholder={t('wr_prod_ph')} required />
        </div>

        <div className="form-group">
          <label>{t('wr_category')}</label>
          <select required>
            <option value="diapers">{t('nav_diapers')}</option>
            <option value="milk">{t('nav_milk')}</option>
            <option value="toys">{t('nav_toys')}</option>
          </select>
        </div>

        <div className="form-group">
          <label>{t('wr_rating')}</label>
          <div className="rating-select">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
                className="star-icon"
                fill={(hoverRating || rating) >= star ? "var(--accent)" : "transparent"}
                color={(hoverRating || rating) >= star ? "var(--accent)" : "#cbd5e1"}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t('wr_pros')}</label>
            <textarea placeholder={t('wr_pros_ph')} rows={3} required></textarea>
          </div>
          <div className="form-group">
            <label>{t('wr_cons')}</label>
            <textarea placeholder={t('wr_cons_ph')} rows={3} required></textarea>
          </div>
        </div>

        <div className="form-group">
          <label>{t('wr_summary')}</label>
          <textarea placeholder={t('wr_summary_ph')} rows={4} required></textarea>
        </div>

        <div className="form-group">
          <label>Hình ảnh (Tùy chọn)</label>
          <div className="upload-box" onClick={handleUploadClick}>
            <input 
              type="file" 
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />
            <UploadCloud size={32} color={selectedFile ? "var(--primary)" : "var(--text-light)"} />
            <p>
              {selectedFile ? (
                <strong style={{ color: 'var(--primary)' }}>Đã chọn: {selectedFile.name}</strong>
              ) : (
                'Nhấp để tải ảnh lên (hoặc kéo thả vào đây)'
              )}
            </p>
          </div>
        </div>

        <button type="submit" className="btn btn-primary submit-btn">
          {t('wr_submit')}
        </button>
      </form>
    </div>
  );
}
