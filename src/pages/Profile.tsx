import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { User, Mail, Shield, Calendar, MapPin, Edit3 } from 'lucide-react';
import './Profile.css';

export default function Profile() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header glass animate-fade-in">
          <div className="profile-avatar-large">
            {user.substring(0, 2).toUpperCase()}
          </div>
          <div className="profile-info">
            <h1>{user.split('@')[0]}</h1>
            <p className="profile-email">
              <Mail size={16} /> {user}
            </p>
            <span className="profile-badge">
              <Shield size={14} /> Thành viên
            </span>
          </div>
          <div className="profile-actions">
            <Link to="/profile/edit" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Edit3 size={18} /> {t('nav_edit_profile')}
            </Link>
          </div>
        </div>

        <div className="profile-content glass animate-slide-up">
          <h2>Thông tin cá nhân</h2>
          <div className="profile-details">
            <div className="detail-item">
              <div className="detail-icon"><User size={20} /></div>
              <div className="detail-text">
                <span className="detail-label">Tên hiển thị</span>
                <span className="detail-value">{user.split('@')[0]}</span>
              </div>
            </div>
            
            <div className="detail-item">
              <div className="detail-icon"><Mail size={20} /></div>
              <div className="detail-text">
                <span className="detail-label">Email / Số điện thoại</span>
                <span className="detail-value">{user}</span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon"><Calendar size={20} /></div>
              <div className="detail-text">
                <span className="detail-label">Ngày tham gia</span>
                <span className="detail-value">Hôm nay</span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-icon"><MapPin size={20} /></div>
              <div className="detail-text">
                <span className="detail-label">Địa chỉ</span>
                <span className="detail-value text-muted">Chưa cập nhật</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
