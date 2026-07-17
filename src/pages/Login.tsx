import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { User, Lock, LogIn } from 'lucide-react';
import './Login.css';

export default function Login() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual login logic here
    console.log('Login attempt:', { identifier, password });
    localStorage.setItem('user', identifier); // Mock successful login
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container glass animate-fade-in">
          <div className="auth-header">
            <div className="auth-icon-wrapper">
              <LogIn className="auth-icon" size={32} />
            </div>
            <h1>{t('nav_login')}</h1>
            <p>MomoReview - Cộng đồng mẹ bỉm sữa</p>
          </div>

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

            <div className="auth-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>Ghi nhớ đăng nhập</span>
              </label>
              <Link to="/forgot-password" className="forgot-password">{t('auth_forgot')}</Link>
            </div>

            <button type="submit" className="btn btn-primary auth-submit">
              {t('nav_login')}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              {t('auth_no_account')} <Link to="/register">{t('nav_register')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
