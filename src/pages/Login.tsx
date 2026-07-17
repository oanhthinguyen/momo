import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { User, Lock, LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import './Login.css';

export default function Login() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');
    if (savedEmail) {
      setIdentifier(savedEmail);
      if (savedPassword) {
        setPassword(savedPassword);
      }
      setRememberMe(true);
    }
  }, []);

  const validateIdentifier = (id: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    return emailRegex.test(id) || phoneRegex.test(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier) {
      setError('Vui lòng nhập Email hoặc Số điện thoại');
      return;
    }
    if (!validateIdentifier(identifier)) {
      setError('Email hoặc Số điện thoại không hợp lệ');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (rememberMe) {
      localStorage.setItem('rememberedEmail', identifier);
      localStorage.setItem('rememberedPassword', password);
    } else {
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
    }

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

          {error && (
            <div className="error-message animate-fade-in">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="auth-options">
              <label className="remember-me">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
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
