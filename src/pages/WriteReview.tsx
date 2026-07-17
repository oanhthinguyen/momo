import { SEO } from '../components/SEO';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, Star, UploadCloud, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import './WriteReview.css';

export default function WriteReview() {
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // Check login status
    if (localStorage.getItem('user')) {
      setIsLoggedIn(true);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
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
        <Link to="/" className="btn btn-primary wr-return-btn">
          {t('search_results_for') === 'Search results for' ? 'Return to Home' : 'Về Trang Chủ'}
        </Link>
      </div>
    );
  }

  return (
    <div className="page-transition container wr-container">
      <SEO title="Viết Đánh Giá" description="Chia sẻ trải nghiệm và đánh giá của bạn về các sản phẩm mẹ và bé với cộng đồng Momo Review." />
      <div className="wr-header">
        <h1>{t('wr_title')}</h1>
        <p>{t('wr_subtitle')}</p>
      </div>

      <form className="wr-form glass animate-fade-in" onSubmit={handleSubmit}>
        {!isLoggedIn && (
          <div className="form-group">
            <label>{t('auth_email_phone') || 'Email / Số điện thoại'}</label>
            <input type="text" placeholder="Để chúng tôi có thể liên hệ khi cần thiết..." required />
          </div>
        )}

        <div className="form-group">
          <label>{t('wr_prod_name')}</label>
          <input type="text" placeholder={t('wr_prod_ph')} required />
        </div>

        <div className="form-group custom-select-wrapper" ref={dropdownRef}>
          <label>{t('wr_category')}</label>
          <div 
            className={`custom-select ${isDropdownOpen ? 'open' : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="custom-select-trigger">
              <span>
                {selectedCategory === 'diapers' && t('nav_diapers')}
                {selectedCategory === 'milk' && t('nav_milk')}
                {selectedCategory === 'toys' && t('nav_toys')}
                {!selectedCategory && 'Chọn chuyên mục...'}
              </span>
              <ChevronDown size={20} color="var(--text-light)" />
            </div>
            
            {isDropdownOpen && (
              <div className="custom-select-options glass">
                <div 
                  className={`custom-option ${selectedCategory === 'diapers' ? 'selected' : ''}`}
                  onClick={() => { setSelectedCategory('diapers'); setIsDropdownOpen(false); }}
                >
                  {t('nav_diapers')}
                </div>
                <div 
                  className={`custom-option ${selectedCategory === 'milk' ? 'selected' : ''}`}
                  onClick={() => { setSelectedCategory('milk'); setIsDropdownOpen(false); }}
                >
                  {t('nav_milk')}
                </div>
                <div 
                  className={`custom-option ${selectedCategory === 'toys' ? 'selected' : ''}`}
                  onClick={() => { setSelectedCategory('toys'); setIsDropdownOpen(false); }}
                >
                  {t('nav_toys')}
                </div>
              </div>
            )}
          </div>
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
              className="wr-file-input"
              accept="image/*"
              onChange={handleFileChange}
            />
            <UploadCloud size={32} color={selectedFile ? "var(--primary)" : "var(--text-light)"} />
            <p>
              {selectedFile ? (
                <strong className="wr-file-selected">Đã chọn: {selectedFile.name}</strong>
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
