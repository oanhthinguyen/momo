import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { User, Lock, UserPlus, Eye, EyeOff, AlertCircle, KeyRound, ArrowLeft } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Login.css'; // Reusing Login CSS for same layout

export default function Register() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  
  // OTP States
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [isSending, setIsSending] = useState(false);

  const validateIdentifier = (id: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    return emailRegex.test(id) || phoneRegex.test(id);
  };

  const handleRegisterStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Vui lòng nhập họ và tên');
      return;
    }
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
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    // Sinh mã OTP 6 số ngẫu nhiên
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);

    // Xử lý gửi OTP
    if (identifier.includes('@')) {
      // Dùng EmailJS để gửi email thật
      setIsSending(true);
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const otpTemplateId = import.meta.env.VITE_EMAILJS_OTP_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && otpTemplateId && publicKey) {
        try {
          await emailjs.send(serviceId, otpTemplateId, {
            to_email: identifier,
            to_name: name,
            otp_code: newOtp
          }, publicKey);
          setStep(2);
        } catch (err) {
          console.error(err);
          setError('Lỗi khi gửi email OTP. Vui lòng thử lại sau.');
        }
      } else {
        setError('Hệ thống EmailJS chưa được cấu hình (thiếu API Key). Vui lòng cấu hình file .env.');
      }
      setIsSending(false);
    } else {
      // Số điện thoại - Giả lập gửi SMS
      setGeneratedOtp('123456'); // Cố định mã 123456 để test cho dễ
      alert('ĐÂY LÀ MÔI TRƯỜNG THỬ NGHIỆM: Do không có hệ thống nhắn tin SMS thật, mã OTP của Số điện thoại này mặc định là 123456.');
      setStep(2);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp !== generatedOtp) {
      setError('Mã OTP không chính xác. Vui lòng kiểm tra lại.');
      return;
    }

    // OTP đúng -> Đăng ký thành công
    console.log('Register successful:', { name, identifier, password });
    
    // Lưu tài khoản mẫu vào localStorage để có thể đăng nhập thử
    const mockUsers = JSON.parse(localStorage.getItem('momo_mock_users') || '[]');
    mockUsers.push({ name, identifier, password });
    localStorage.setItem('momo_mock_users', JSON.stringify(mockUsers));

    alert('Đăng ký tài khoản thành công!');
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

          {error && (
            <div className="error-message animate-fade-in">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {step === 1 ? (
            <form className="auth-form animate-fade-in" onSubmit={handleRegisterStep1}>
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
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">{t('auth_confirm_password')}</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary auth-submit" disabled={isSending}>
                {isSending ? 'Đang gửi mã OTP...' : t('nav_register')}
              </button>
            </form>
          ) : (
            <form className="auth-form animate-fade-in" onSubmit={handleVerifyOtp}>
              <div style={{ textAlign: 'center', marginBottom: '24px', color: 'var(--text-light)' }}>
                <p>Một mã xác nhận (OTP) 6 chữ số đã được gửi tới:<br/><strong>{identifier}</strong></p>
              </div>

              <div className="form-group">
                <label htmlFor="otp">Nhập mã OTP</label>
                <div className="input-wrapper">
                  <KeyRound className="input-icon" size={20} />
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Ví dụ: 123456"
                    maxLength={6}
                    required
                    style={{ letterSpacing: '4px', fontSize: '18px', textAlign: 'center' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="btn btn-outline" style={{ padding: '14px' }} onClick={() => setStep(1)}>
                  <ArrowLeft size={20} />
                </button>
                <button type="submit" className="btn btn-primary auth-submit" style={{ flex: 1 }}>
                  Xác nhận Đăng ký
                </button>
              </div>
            </form>
          )}

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
