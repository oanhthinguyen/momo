import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { User, KeyRound, ArrowLeft } from 'lucide-react';
import './Login.css';

export default function ForgotPassword() {
  const { t } = useLanguage();
  const [identifier, setIdentifier] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual password reset logic here
    console.log('Password reset requested for:', identifier);
    setIsSent(true);
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container glass animate-fade-in">
          <div className="auth-header">
            <div className="auth-icon-wrapper">
              <KeyRound className="auth-icon" size={32} />
            </div>
            <h1>{t('auth_reset_password')}</h1>
            <p>{t('auth_reset_desc')}</p>
          </div>

          {!isSent ? (
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="identifier">{t('auth_email_phone')}</label>
                <div className="input-wrapper">
                  <User className="input-icon" size={20} />
                  <input
                    type="text"
                    id="identifier"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Email / Số điện thoại"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary auth-submit" style={{ marginTop: '16px' }}>
                {t('auth_send_link')}
              </button>
            </form>
          ) : (
            <div className="auth-success-message" style={{ textAlign: 'center', margin: '20px 0' }}>
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', padding: '16px', borderRadius: '12px', fontWeight: 500 }}>
                Yêu cầu đã được gửi! Vui lòng kiểm tra email hoặc tin nhắn của bạn để nhận hướng dẫn khôi phục mật khẩu.
              </div>
            </div>
          )}

          <div className="auth-footer" style={{ marginTop: '24px' }}>
            <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-light)', textDecoration: 'none', fontWeight: 500 }}>
              <ArrowLeft size={18} />
              {t('auth_back_to_login')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
