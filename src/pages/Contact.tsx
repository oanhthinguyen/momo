import { SEO } from '../components/SEO';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="page-transition container contact-page-container">
      <SEO title="Liên Hệ" description="Liên hệ với Momo Review để gửi ý kiến đóng góp, phản hồi hoặc hợp tác." />
      <div className="glass contact-glass-box">
        <h1 className="contact-title">
          {t('contact_title')}
        </h1>
        <p className="contact-subtitle">
          {t('contact_content')}
        </p>

        <div className="contact-container">
          {/* Contact Information */}
          <div className="contact-left">
            <h2 className="contact-column-title">{t('contact_our_info')}</h2>
            <div className="contact-info">
              <div className="info-card">
                <div className="info-icon">
                  <Mail size={24} />
                </div>
                <div className="info-content">
                  <h3>{t('contact_email')}</h3>
                  <p>maruchan280519@gmail.com</p>
                </div>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <Phone size={24} />
                </div>
                <div className="info-content">
                  <h3>{t('contact_phone')}</h3>
                  <p>0906386947</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-right">
            <h2 className="contact-column-title">{t('contact_your_feedback')}</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="success-message">
                {t('contact_form_success')}
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="name">{t('contact_form_name')}</label>
                  <input type="text" id="name" required placeholder="Nguyễn Văn A" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">{t('contact_form_email')}</label>
                  <input type="email" id="email" required placeholder="email@example.com" />
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t('contact_form_message')}</label>
                  <textarea id="message" required placeholder="Nhập tin nhắn của bạn ở đây..."></textarea>
                </div>

                <button type="submit" className="btn btn-primary contact-submit-btn">
                  {t('contact_form_submit')}
                </button>
              </>
            )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
