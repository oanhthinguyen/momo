import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Clock, MessageSquare, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { mockTopics } from './Community';
import type { Topic } from './Community';
import './TopicDetail.css';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export default function TopicDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Find topic from localStorage or mock data
    const savedTopics: Topic[] = JSON.parse(localStorage.getItem('momo_topics') || '[]');
    const allTopics = [...savedTopics, ...mockTopics];
    const found = allTopics.find(t => t.id === id);
    if (found) {
      setTopic(found);
    }

    // Load comments
    const savedComments: Comment[] = JSON.parse(localStorage.getItem(`momo_comments_${id}`) || '[]');
    
    // Add mock comments if empty and it's a mock topic
    if (savedComments.length === 0 && id === 't1') {
      const initialComments = [
        {
          id: 'c1',
          author: 'Mẹ Bơ',
          content: 'Bé nhà mình cũng từng bị hăm khi dùng Bobby. Chuyển sang Merries thì đỡ hẳn nhưng hơi đau ví. Mẹ thử dùng Huggies Platinum xem sao nhé, giá mềm hơn Merries chút mà cực mềm.',
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
        }
      ];
      setComments(initialComments);
      localStorage.setItem(`momo_comments_${id}`, JSON.stringify(initialComments));
    } else {
      setComments(savedComments);
    }
  }, [id]);

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !topic) return;

    const currentUser = localStorage.getItem('user');
    
    const comment: Comment = {
      id: `c_${Date.now()}`,
      author: currentUser ? currentUser.split('@')[0] : t('author_anonymous'),
      content: newComment,
      createdAt: new Date().toISOString()
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem(`momo_comments_${id}`, JSON.stringify(updatedComments));
    
    // Update comments count on the topic (mock behavior, normally done on backend)
    const savedTopics: Topic[] = JSON.parse(localStorage.getItem('momo_topics') || '[]');
    const topicIndex = savedTopics.findIndex(t => t.id === id);
    if (topicIndex !== -1) {
      savedTopics[topicIndex].commentsCount = updatedComments.length;
      localStorage.setItem('momo_topics', JSON.stringify(savedTopics));
    }
    
    setNewComment('');
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    if (language === 'vi') {
      return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (!topic) {
    return (
      <div className="container" style={{ paddingTop: '160px', textAlign: 'center', minHeight: '60vh' }}>
        <h2>Không tìm thấy chủ đề</h2>
        <Link to="/community" className="btn btn-primary" style={{ marginTop: '20px' }}>Quay lại Cộng đồng</Link>
      </div>
    );
  }

  return (
    <div className="page-transition topic-detail-page">
      <SEO 
        title={`${topic.title} - ${t('nav_community')}`}
        description={topic.content.substring(0, 150)} 
      />
      
      <div className="topic-header">
        <div className="container">
          <Link to="/community" className="back-btn">
            <ArrowLeft size={20} /> {t('back') || 'Quay lại'}
          </Link>
          <h1 className="topic-title">{topic.title}</h1>
          <div className="topic-meta">
            <span className="topic-author"><User size={16} /> {topic.author}</span>
            <span className="meta-divider">•</span>
            <span className="topic-date"><Clock size={16} /> {formatDate(topic.createdAt)}</span>
            <span className="meta-divider">•</span>
            <span className="topic-comments-count"><MessageSquare size={16} /> {comments.length} {t('comments_count')}</span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="topic-content-box glass">
          <p>{topic.content}</p>
        </div>

        <div className="comments-section">
          <h3>{comments.length} {t('comments_count')}</h3>
          
          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment-card">
                <div className="comment-header">
                  <div className="comment-avatar">
                    {comment.author.substring(0, 1).toUpperCase()}
                  </div>
                  <div className="comment-meta">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-date">{formatDate(comment.createdAt)}</span>
                  </div>
                </div>
                <div className="comment-body">
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="comment-form-box glass">
            <form onSubmit={handlePostComment}>
              <div className="form-group">
                <textarea 
                  value={newComment} 
                  onChange={(e) => setNewComment(e.target.value)} 
                  placeholder={t('write_comment')}
                  rows={4}
                  required
                ></textarea>
              </div>
              <div className="form-actions text-right">
                <button type="submit" className="btn btn-primary btn-submit-comment">
                  <Send size={18} /> {t('submit_comment')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
