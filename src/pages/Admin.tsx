import { useState, useEffect } from 'react';
import { Check, X, Star, Trash2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Admin.css';

interface Review {
  id: number;
  productName: string;
  category: string;
  rating: number;
  pros: string;
  cons: string;
  summary: string;
  ingredients?: string;
  author: string;
  date: string;
  imageUrl: string | null;
  imageUrls?: string[];
}

export default function Admin() {
  const [pendingReviews, setPendingReviews] = useState<Review[]>([]);
  const [approvedReviews, setApprovedReviews] = useState<Review[]>([]);

  useEffect(() => {
    const reviews = JSON.parse(localStorage.getItem('momo_pending_reviews') || '[]');
    setPendingReviews(reviews);
    
    const approved = JSON.parse(localStorage.getItem('momo_approved_reviews') || '[]');
    setApprovedReviews(approved);
  }, []);

  const handleApprove = (review: Review) => {
    try {
      // Xóa khỏi pending trước để giải phóng dung lượng (tránh lỗi QuotaExceeded do ảnh Base64 lớn)
      const updatedPending = pendingReviews.filter(r => r.id !== review.id);
      localStorage.setItem('momo_pending_reviews', JSON.stringify(updatedPending));
      setPendingReviews(updatedPending);
      
      // Sau đó thêm vào approved
      const approved = JSON.parse(localStorage.getItem('momo_approved_reviews') || '[]');
      const newApprovedList = [...approved, { ...review, status: 'approved' }];
      localStorage.setItem('momo_approved_reviews', JSON.stringify(newApprovedList));
      setApprovedReviews(newApprovedList);

      // Gửi email thông báo cho tác giả
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const approvalTemplateId = import.meta.env.VITE_EMAILJS_APPROVAL_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && approvalTemplateId && publicKey && review.author && review.author.includes('@')) {
        const templateParams = {
          to_email: review.author,
          product_name: review.productName
        };
        emailjs.send(serviceId, approvalTemplateId, templateParams, publicKey)
          .then(() => console.log('Đã gửi email thông báo duyệt bài cho', review.author))
          .catch(err => console.error('Lỗi khi gửi email duyệt bài:', err));
      }
    } catch (error) {
      console.error('Lỗi khi duyệt bài:', error);
      alert('Lỗi: Không thể lưu bài viết. Có thể dung lượng ảnh quá lớn làm đầy bộ nhớ trình duyệt.');
      
      // Khôi phục lại trạng thái cũ nếu lỗi
      localStorage.setItem('momo_pending_reviews', JSON.stringify(pendingReviews));
      setPendingReviews(pendingReviews);
    }
  };

  const handleReject = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn từ chối đánh giá này?")) {
      const updatedPending = pendingReviews.filter(r => r.id !== id);
      setPendingReviews(updatedPending);
      localStorage.setItem('momo_pending_reviews', JSON.stringify(updatedPending));
    }
  };

  const handleDeleteApproved = (id: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa bài đánh giá này?")) {
      const updatedApproved = approvedReviews.filter(r => r.id !== id);
      setApprovedReviews(updatedApproved);
      localStorage.setItem('momo_approved_reviews', JSON.stringify(updatedApproved));
    }
  };

  return (
    <div className="admin-page container">
      <div className="admin-header glass animate-fade-in">
        <h1>Admin Dashboard</h1>
        <p>Kiểm duyệt đánh giá của người dùng</p>
      </div>

      <div className="admin-content animate-slide-up">
        <h2>Đánh giá chờ duyệt ({pendingReviews.length})</h2>
        {pendingReviews.length === 0 ? (
          <div className="glass empty-state">Không có đánh giá nào đang chờ duyệt.</div>
        ) : (
          <div className="review-list">
            {pendingReviews.map(review => (
              <div key={review.id} className="review-item glass">
                <div className="review-item-header">
                  <h3>{review.productName}</h3>
                  <span className="review-category">{review.category}</span>
                </div>
                <div className="review-author-date">
                  <strong>Người gửi:</strong> {review.author} | <strong>Ngày:</strong> {new Date(review.date).toLocaleDateString('vi-VN')}
                </div>
                <div className="review-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < review.rating ? "var(--accent)" : "none"} color={i < review.rating ? "var(--accent)" : "#cbd5e1"} />
                  ))}
                </div>
                <div className="review-details">
                  <p><strong>Ưu điểm:</strong> {review.pros}</p>
                  <p><strong>Nhược điểm:</strong> {review.cons}</p>
                  {review.category === 'milk' && review.ingredients && (
                    <p><strong>Thành phần:</strong> {review.ingredients}</p>
                  )}
                  <p><strong>Tóm tắt:</strong> {review.summary}</p>
                </div>
                {review.imageUrls && review.imageUrls.length > 0 ? (
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '16px 0' }}>
                    {review.imageUrls.map((url, idx) => (
                      <img key={idx} src={url} alt={`Attachment ${idx}`} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }} />
                    ))}
                  </div>
                ) : review.imageUrl && (
                  <div className="review-image">
                    <img src={review.imageUrl} alt="Review attachment" />
                  </div>
                )}
                <div className="review-actions">
                  <button className="btn btn-primary" onClick={() => handleApprove(review)}>
                    <Check size={16} /> Duyệt
                  </button>
                  <button className="btn btn-outline" style={{ borderColor: '#ef4444', color: '#ef4444' }} onClick={() => handleReject(review.id)}>
                    <X size={16} /> Từ chối
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="admin-content animate-slide-up" style={{ marginTop: '48px' }}>
        <h2>Đánh giá đã duyệt ({approvedReviews.length})</h2>
        {approvedReviews.length === 0 ? (
          <div className="glass empty-state">Không có đánh giá nào đã được duyệt.</div>
        ) : (
          <div className="review-list">
            {approvedReviews.map(review => (
              <div key={review.id} className="review-item glass">
                <div className="review-item-header">
                  <h3>{review.productName}</h3>
                  <span className="review-category">{review.category}</span>
                </div>
                <div className="review-author-date">
                  <strong>Người gửi:</strong> {review.author} | <strong>Ngày:</strong> {new Date(review.date).toLocaleDateString('vi-VN')}
                </div>
                <div className="review-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill={i < review.rating ? "var(--accent)" : "none"} color={i < review.rating ? "var(--accent)" : "#cbd5e1"} />
                  ))}
                </div>
                <div className="review-details">
                  <p><strong>Ưu điểm:</strong> {review.pros}</p>
                  <p><strong>Nhược điểm:</strong> {review.cons}</p>
                  {review.category === 'milk' && review.ingredients && (
                    <p><strong>Thành phần:</strong> {review.ingredients}</p>
                  )}
                  <p><strong>Tóm tắt:</strong> {review.summary}</p>
                </div>
                {review.imageUrls && review.imageUrls.length > 0 ? (
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', margin: '16px 0' }}>
                    {review.imageUrls.map((url, idx) => (
                      <img key={idx} src={url} alt={`Attachment ${idx}`} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }} />
                    ))}
                  </div>
                ) : review.imageUrl && (
                  <div className="review-image">
                    <img src={review.imageUrl} alt="Review attachment" />
                  </div>
                )}
                <div className="review-actions">
                  <button className="btn btn-outline" style={{ borderColor: '#ef4444', color: '#ef4444' }} onClick={() => handleDeleteApproved(review.id)}>
                    <Trash2 size={16} /> Xóa bài đăng
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
