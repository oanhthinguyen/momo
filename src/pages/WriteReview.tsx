import { SEO } from '../components/SEO';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, Star, UploadCloud, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './WriteReview.css';

export default function WriteReview() {
  const { t } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [productName, setProductName] = useState('');
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [summary, setSummary] = useState('');
  const [email, setEmail] = useState('');
  
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory || rating === 0) {
      alert('Vui lòng chọn chuyên mục và đánh giá sao.');
      return;
    }

    const currentUser = localStorage.getItem('user');
    const authorEmail = currentUser || email || 'Anonymous';

    let base64Image = null;
    if (selectedFile) {
      base64Image = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(selectedFile);
      });
    }

    const newReview = {
      id: Date.now(),
      productName,
      category: selectedCategory,
      rating,
      pros,
      cons,
      summary,
      author: authorEmail,
      date: new Date().toISOString(),
      imageUrl: base64Image
    };

    const pendingReviews = JSON.parse(localStorage.getItem('momo_pending_reviews') || '[]');
    pendingReviews.push(newReview);
    localStorage.setItem('momo_pending_reviews', JSON.stringify(pendingReviews));

    // Send Email via EmailJS
    try {
      const templateParams = {
        to_email: 'maruchan280519@gmail.com',
        author_email: authorEmail,
        product_name: productName,
        category: selectedCategory,
        rating: rating,
        summary: summary,
        review_date: new Date().toLocaleDateString('vi-VN')
      };

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        console.log('Email sent successfully via EmailJS!');
      } else {
        console.warn('EmailJS keys not found. Skipping email sending. (Please configure .env)');
      }
    } catch (err) {
      console.error('Failed to send email:', err);
    }

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="page-transition container wr-success-container">
        <CheckCircle2 size={80} color="var(--success)" className="success-icon" />
        <h2>{t('wr_success')}</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '24px', textAlign: 'center' }}>
          Đánh giá của bạn đã được gửi qua email cho Ban Quản Trị để xét duyệt.<br />Cảm ơn bạn đã đóng góp!
        </p>
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
            <input type="text" placeholder="Để chúng tôi có thể liên hệ khi cần thiết..." value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
        )}

        <div className="form-group">
          <label>{t('wr_prod_name')}</label>
          <input type="text" placeholder={t('wr_prod_ph')} value={productName} onChange={(e) => setProductName(e.target.value)} required />
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
            <textarea placeholder={t('wr_pros_ph')} rows={3} value={pros} onChange={(e) => setPros(e.target.value)} required></textarea>
          </div>
          <div className="form-group">
            <label>{t('wr_cons')}</label>
            <textarea placeholder={t('wr_cons_ph')} rows={3} value={cons} onChange={(e) => setCons(e.target.value)} required></textarea>
          </div>
        </div>

        <div className="form-group">
          <label>{t('wr_summary')}</label>
          <textarea placeholder={t('wr_summary_ph')} rows={4} value={summary} onChange={(e) => setSummary(e.target.value)} required></textarea>
        </div>

        <div className="form-group">
          <label>Hình ảnh (Tùy chọn)</label>
          <div className="upload-box" onClick={handleUploadClick} style={{ padding: previewUrl ? '8px' : '40px', overflow: 'hidden' }}>
            <input 
              type="file" 
              ref={fileInputRef}
              className="wr-file-input"
              accept="image/*"
              onChange={handleFileChange}
            />
            {previewUrl ? (
              <div style={{ position: 'relative', width: '100%', height: '220px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={previewUrl} alt="Preview" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: '12px' }} />
                <div 
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0, transition: 'opacity 0.2s', borderRadius: '12px', cursor: 'pointer', gap: '8px' }} 
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'} 
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                >
                  <UploadCloud size={32} color="white" />
                  <span style={{ fontWeight: 500 }}>Nhấp để đổi ảnh khác</span>
                </div>
              </div>
            ) : (
              <>
                <UploadCloud size={32} color="var(--text-light)" />
                <p>Nhấp để tải ảnh lên (hoặc kéo thả vào đây)</p>
              </>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary submit-btn">
          {t('wr_submit')}
        </button>
      </form>
    </div>
  );
}
