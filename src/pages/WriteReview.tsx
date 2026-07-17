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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
      const newUrls = newFiles.map(f => URL.createObjectURL(f));
      setPreviewUrls(prev => [...prev, ...newUrls]);
    }
    // Reset file input so user can select the same file again if they cleared it
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory || rating === 0) {
      alert('Vui lòng chọn chuyên mục và đánh giá sao.');
      return;
    }

    const currentUser = localStorage.getItem('user');
    const authorEmail = currentUser || email || 'Anonymous';

    let base64Images: string[] = [];
    if (selectedFiles.length > 0) {
      for (const file of selectedFiles) {
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        base64Images.push(base64);
      }
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
      imageUrl: base64Images.length > 0 ? base64Images[0] : null,
      imageUrls: base64Images
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
          <label>Hình ảnh (Tùy chọn - Có thể chọn nhiều)</label>
          <div className="upload-box" style={{ padding: previewUrls.length > 0 ? '16px' : '40px', overflow: 'hidden' }}>
            <input 
              type="file" 
              multiple
              ref={fileInputRef}
              className="wr-file-input"
              accept="image/*"
              onChange={handleFileChange}
            />
            {previewUrls.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px', width: '100%' }}>
                {previewUrls.map((url, i) => (
                  <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <img src={url} alt={`Preview ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
                <div onClick={handleUploadClick} style={{ border: '2px dashed var(--border)', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', aspectRatio: '1', background: 'rgba(255,255,255,0.5)' }}>
                  <UploadCloud color="var(--primary)" size={24} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary)', marginTop: '4px' }}>Thêm ảnh</span>
                </div>
              </div>
            ) : (
              <div onClick={handleUploadClick} style={{ cursor: 'pointer', width: '100%' }}>
                <UploadCloud size={32} color="var(--text-light)" />
                <p>Nhấp để tải ảnh lên (hoặc kéo thả nhiều ảnh vào đây)</p>
              </div>
            )}
          </div>
          {previewUrls.length > 0 && (
            <div style={{ textAlign: 'right', marginTop: '8px' }}>
              <button type="button" onClick={() => { setSelectedFiles([]); setPreviewUrls([]); }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 }}>
                Xóa tất cả ảnh
              </button>
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary submit-btn">
          {t('wr_submit')}
        </button>
      </form>
    </div>
  );
}
