import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { MessageSquare, Plus, User, Clock, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { db, isFirebaseConfigured } from '../config/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import './Community.css';

export interface Topic {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  commentsCount: number;
}

export const mockTopics: Topic[] = [
  {
    id: 't1',
    title: 'Các mẹ tư vấn giúp em bỉm nào mềm cho bé da nhạy cảm với ạ',
    content: 'Bé nhà em 3 tháng, hay bị hăm tã. Em đang dùng Bobby mà có vẻ hơi cứng. Các mẹ tư vấn giúp em nên đổi sang loại nào mềm hơn ạ? (Merries, Moony hay Huggies Platinum?)',
    author: 'Mẹ Su Su',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    commentsCount: 5
  },
  {
    id: 't2',
    title: 'Review sữa Aptamil Úc số 2 - Bé nhà mình output cực đẹp',
    content: 'Từ lúc đổi sang Aptamil Úc, trộm vía bé nhà mình tiêu hóa tốt hơn hẳn, không còn bị bón nữa. Có mẹ nào cũng đang cho con dùng loại này không, vào chia sẻ kinh nghiệm nhé!',
    author: 'Mẹ Ken',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    commentsCount: 12
  },
  {
    id: 't3',
    title: 'Bao lâu thì nên bắt đầu cho bé ăn dặm BLW?',
    content: 'Bé nhà mình được 5.5 tháng, cổ đã cứng cáp và rất hứng thú khi nhìn người lớn ăn. Mình có nên bắt đầu cho bé tự chỉ huy (BLW) luôn không hay đợi tròn 6 tháng ạ?',
    author: 'Mẹ Đậu Đậu',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    commentsCount: 8
  }
];

export default function Community() {
  const { t, language } = useLanguage();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New topic state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (isFirebaseConfigured && db) {
      // Real-time listener for topics from Firestore
      const q = query(collection(db, 'topics'), orderBy('createdAt', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedTopics: Topic[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          fetchedTopics.push({
            id: doc.id,
            title: data.title,
            content: data.content,
            author: data.author,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
            commentsCount: data.commentsCount || 0
          });
        });
        setTopics([...fetchedTopics, ...mockTopics]);
      });
      return () => unsubscribe();
    } else {
      // Fallback to localStorage if Firebase is not configured
      const savedTopics = JSON.parse(localStorage.getItem('momo_topics') || '[]');
      setTopics([...savedTopics, ...mockTopics]);
    }
  }, []);

  const handleCreateTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const currentUser = localStorage.getItem('user');
    const authorName = currentUser ? currentUser.split('@')[0] : t('author_anonymous');

    if (isFirebaseConfigured && db) {
      try {
        await addDoc(collection(db, 'topics'), {
          title: newTitle,
          content: newContent,
          author: authorName,
          createdAt: serverTimestamp(),
          commentsCount: 0
        });
        // onSnapshot will automatically update the list
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Lỗi khi đăng bài. Vui lòng thử lại!");
      }
    } else {
      // Fallback to localStorage
      const newTopic: Topic = {
        id: `t_${Date.now()}`,
        title: newTitle,
        content: newContent,
        author: authorName,
        createdAt: new Date().toISOString(),
        commentsCount: 0
      };

      const savedTopics = JSON.parse(localStorage.getItem('momo_topics') || '[]');
      const updatedTopics = [newTopic, ...savedTopics];
      localStorage.setItem('momo_topics', JSON.stringify(updatedTopics));
      
      setTopics([newTopic, ...topics]);
    }

    setNewTitle('');
    setNewContent('');
    setIsModalOpen(false);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    if (language === 'vi') {
      return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="page-transition community-page">
      <SEO 
        title={t('community_title')} 
        description={t('community_subtitle')} 
      />
      
      <div className="community-header">
        <div className="container">
          <h1 className="community-title">{t('community_title')}</h1>
          <p className="community-subtitle">{t('community_subtitle')}</p>
          <button className="btn btn-primary create-topic-btn" onClick={() => setIsModalOpen(true)}>
            <Plus size={20} /> {t('create_topic')}
          </button>
        </div>
      </div>

      <div className="container community-content">
        <div className="topics-list glass">
          {topics.map(topic => (
            <Link to={`/community/${topic.id}`} key={topic.id} className="topic-card">
              <div className="topic-main">
                <h3 className="topic-card-title">{topic.title}</h3>
                <p className="topic-card-excerpt">{topic.content.substring(0, 120)}{topic.content.length > 120 ? '...' : ''}</p>
                <div className="topic-meta">
                  <span className="topic-author"><User size={14} /> {topic.author}</span>
                  <span className="topic-date"><Clock size={14} /> {formatDate(topic.createdAt)}</span>
                </div>
              </div>
              <div className="topic-stats">
                <div className="stat-item">
                  <MessageSquare size={18} />
                  <span>{topic.commentsCount}</span>
                </div>
                <ChevronRight className="topic-arrow" size={20} />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {isModalOpen && createPortal(
        <div className="modal-overlay" onClick={(e) => {
          if ((e.target as HTMLElement).className === 'modal-overlay') setIsModalOpen(false);
        }}>
          <div className="modal-content glass animate-scale-up">
            <h2>{t('create_topic')}</h2>
            <form onSubmit={handleCreateTopic}>
              <div className="form-group">
                <label>{t('topic_title_label')}</label>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  placeholder={t('topic_title_placeholder')}
                  required
                />
              </div>
              <div className="form-group">
                <label>{t('topic_content_label')}</label>
                <textarea 
                  value={newContent} 
                  onChange={(e) => setNewContent(e.target.value)} 
                  placeholder={t('topic_content_placeholder')}
                  rows={6}
                  required
                ></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>
                  {t('btn_cancel')}
                </button>
                <button type="submit" className="btn btn-primary">
                  {t('btn_post')}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
