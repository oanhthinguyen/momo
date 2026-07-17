import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { User, Mail, Camera, Save, ArrowLeft, Phone, MapPin, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import './Profile.css';

export default function EditProfile() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [error, setError] = useState('');

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
    setError('');

    if (currentPassword || newPassword || confirmNewPassword) {
      if (!currentPassword) {
        setError('Vui lòng nhập mật khẩu hiện tại');
        return;
      }
      if (newPassword.length < 6) {
        setError('Mật khẩu mới phải có ít nhất 6 ký tự');
        return;
      }
      if (newPassword !== confirmNewPassword) {
        setError('Mật khẩu xác nhận không khớp');
        return;
      }
      const savedPassword = localStorage.getItem('rememberedPassword');
      if (savedPassword && currentPassword !== savedPassword) {
        setError('Mật khẩu hiện tại không đúng');
        return;
      }
      
      localStorage.setItem('rememberedPassword', newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }

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

          {error && (
            <div className="error-message animate-fade-in" style={{ marginBottom: '24px' }}>
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

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

            <hr style={{ margin: '16px 0', borderColor: 'rgba(255, 126, 179, 0.2)' }} />
            
            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>Đổi mật khẩu</h3>

            <div className="form-group">
              <label>Mật khẩu hiện tại</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input 
                  type={showCurrentPassword ? "text" : "password"} 
                  className="profile-input" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button type="button" className="toggle-password" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                  {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Mật khẩu mới</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input 
                  type={showNewPassword ? "text" : "password"} 
                  className="profile-input" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button type="button" className="toggle-password" onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Xác nhận mật khẩu mới</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input 
                  type={showConfirmNewPassword ? "text" : "password"} 
                  className="profile-input" 
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button type="button" className="toggle-password" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
                  {showConfirmNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
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
