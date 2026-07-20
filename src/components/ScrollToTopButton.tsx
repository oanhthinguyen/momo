import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import './ScrollToTopButton.css';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className={`scroll-to-top ${isVisible ? 'visible' : ''}`}>
      <button onClick={scrollToTop} aria-label="Lên đầu trang" title="Lên đầu trang">
        <ArrowUp size={24} />
      </button>
    </div>
  );
}
