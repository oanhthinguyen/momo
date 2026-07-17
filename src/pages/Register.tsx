import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import './Login.css'; // Reusing Login CSS for same layout

export default function Register() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // TODO: Implement actual register logic here
    console.log('Register attempt:', { name, identifier, password });
    // Mock successful registration
    navigate('/login');
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container glass animate-fade-in">
          <div className="auth-header">
            <div className="auth-icon-wrapper">
              <UserPlus className="auth-icon" size={32} />
            </div>
            <h1>{t('nav_register')}</h1>
            <p>Tham gia cộng đồng MomoReview</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t('auth_fullname')}</label>
              <div className="input-wrapper">
                <User className="input-icon" size={20} />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
            </div>

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

            <div className="form-group">
              <label htmlFor="password">{t('auth_password')}</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">{t('auth_confirm_password')}</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={20} />
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary auth-submit">
              {t('nav_register')}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {t('auth_has_account')} <Link to="/login">{t('nav_login')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
