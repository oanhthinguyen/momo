import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { User, Mail, Camera, Save, ArrowLeft, Phone, MapPin } from 'lucide-react';
import './Profile.css';

export default function EditProfile() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="container">
        <Link to="/profile" className="back-link">
          <ArrowLeft size={18} /> Quay lại Hồ sơ
        </Link>
        
        <div className="profile-content glass animate-slide-up" style={{ marginTop: '24px' }}>
          <h2>{t('nav_edit_profile')}</h2>
          
          <div className="edit-avatar-section">
            <div className="profile-avatar-large">
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="avatar-image" />
              ) : (
                user.substring(0, 2).toUpperCase()
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
              <button 
                className="avatar-edit-btn" 
                title="Đổi ảnh đại diện" 
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera size={16} />
              </button>
            </div>
          </div>

          {isSaved && (
            <div className="success-message animate-fade-in" style={{ marginBottom: '24px', background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', padding: '12px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Cập nhật thông tin thành công!</span>
            </div>
          )}

          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Tên hiển thị</label>
              <div className="input-wrapper">
                <User className="input-icon" size={20} />
                <input type="text" defaultValue={user.split('@')[0]} className="profile-input" required />
              </div>
            </div>
            
            <div className="form-group">
              <label>Email (Không thể thay đổi)</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input type="text" defaultValue={user} disabled className="profile-input disabled" />
              </div>
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <div className="input-wrapper">
                <Phone className="input-icon" size={20} />
                <input type="tel" placeholder="Nhập số điện thoại" className="profile-input" />
              </div>
            </div>

            <div className="form-group">
              <label>Địa chỉ</label>
              <div className="input-wrapper">
                <MapPin className="input-icon" size={20} />
                <input type="text" placeholder="Nhập địa chỉ" className="profile-input" />
              </div>
            </div>

            <div className="form-actions" style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
              <button type="button" className="btn profile-cancel-btn" onClick={() => navigate('/profile')}>
                Hủy
              </button>
              <button type="submit" className="btn btn-primary profile-save-btn">
                <Save size={18} /> Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
