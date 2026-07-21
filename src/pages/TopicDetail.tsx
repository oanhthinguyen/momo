import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Clock, MessageSquare, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SEO } from '../components/SEO';
import { mockTopics } from './Community';
import type { Topic } from './Community';
import { db, isFirebaseConfigured } from '../config/firebase';
import { doc, collection, onSnapshot, addDoc, query, orderBy, serverTimestamp, updateDoc, increment } from 'firebase/firestore';
import './TopicDetail.css';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

const avatarColors = [
  '#ff8ca3', // primary
  '#6cb0c7', // secondary
  '#fbc668', // accent
  '#a390e4', // purple
  '#48bb78', // green
  '#ed8936', // orange
  '#f56565', // red
  '#38b2ac', // teal
];

const getAvatarColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % avatarColors.length;
  return avatarColors[index];
};

export default function TopicDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (!id) return;
    
    if (isFirebaseConfigured && db) {
      // Real-time listener for the topic
      const topicRef = doc(db, 'topics', id);
      const unsubscribeTopic = onSnapshot(topicRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTopic({
            id: docSnap.id,
            title: data.title,
            content: data.content,
            author: data.author,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
            commentsCount: data.commentsCount || 0
          });
        } else {
          // If not in Firebase, try mock data (for the initial seeded ones)
          const foundMock = mockTopics.find(t => t.id === id);
          if (foundMock) setTopic(foundMock);
        }
      });

      // Real-time listener for comments
      const q = query(collection(db, `topics/${id}/comments`), orderBy('createdAt', 'asc'));
      const unsubscribeComments = onSnapshot(q, (snapshot) => {
        const fetchedComments: Comment[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          fetchedComments.push({
            id: docSnap.id,
            author: data.author,
            content: data.content,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString()
          });
        });
        setComments(fetchedComments);
      });

      return () => {
        unsubscribeTopic();
        unsubscribeComments();
      };
    } else {
      // Fallback to localStorage logic
      const savedTopics: Topic[] = JSON.parse(localStorage.getItem('momo_topics') || '[]');
      const allTopics = [...savedTopics, ...mockTopics];
      const found = allTopics.find(t => t.id === id);
      if (found) {
        setTopic(found);
      }

      // Load comments
      const savedComments: Comment[] = JSON.parse(localStorage.getItem(`momo_comments_${id}`) || '[]');
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
    }
  }, [id]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !topic || !id) return;

    const currentUser = localStorage.getItem('user');
    const authorName = currentUser ? currentUser.split('@')[0] : t('author_anonymous');

    if (isFirebaseConfigured && db) {
      try {
        await addDoc(collection(db, `topics/${id}/comments`), {
          author: authorName,
          content: newComment,
          createdAt: serverTimestamp()
        });
        
        // Update comments count on the topic document
        const topicRef = doc(db, 'topics', id);
        await updateDoc(topicRef, {
          commentsCount: increment(1)
        });
      } catch (error) {
        console.error("Error adding comment: ", error);
        alert("Lỗi khi gửi bình luận. Vui lòng thử lại!");
      }
    } else {
      // Fallback to localStorage
      const comment: Comment = {
        id: `c_${Date.now()}`,
        author: authorName,
        content: newComment,
        createdAt: new Date().toISOString()
      };

      const updatedComments = [...comments, comment];
      setComments(updatedComments);
      localStorage.setItem(`momo_comments_${id}`, JSON.stringify(updatedComments));
      
      const savedTopics: Topic[] = JSON.parse(localStorage.getItem('momo_topics') || '[]');
      const topicIndex = savedTopics.findIndex(t => t.id === id);
      if (topicIndex !== -1) {
        savedTopics[topicIndex].commentsCount = updatedComments.length;
        localStorage.setItem('momo_topics', JSON.stringify(savedTopics));
      }
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
                  <div 
                    className="comment-avatar"
                    style={{ backgroundColor: getAvatarColor(comment.author) }}
                  >
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
