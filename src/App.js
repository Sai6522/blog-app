import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiEdit2, FiTrash2, FiSun, FiMoon, FiPlus, FiVolume2, FiVolumeX, FiRefreshCw } from 'react-icons/fi';
import './App.css';
import './i18n';

function App() {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [translatedPosts, setTranslatedPosts] = useState([]);
  const [speaking, setSpeaking] = useState(null);
  const [translating, setTranslating] = useState(false);
  const [translationCache, setTranslationCache] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const saved = localStorage.getItem('posts');
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      // Seed data - default blog posts
      const seedPosts = [
        {
          id: 1,
          title: "React Hooks",
          content: "This blog uses useState for state management and useEffect for side effects like localStorage sync and translations.",
          date: new Date().toLocaleDateString()
        },
        {
          id: 2,
          title: "Browser Storage",
          content: "All blog posts are stored in localStorage. No backend or database needed. Data persists across sessions.",
          date: new Date().toLocaleDateString()
        },
        {
          id: 3,
          title: "i18next Translation",
          content: "Multi-language support using react-i18next library. UI translates to 10 languages including Hindi, Tamil, Telugu, and more.",
          date: new Date().toLocaleDateString()
        },
        {
          id: 4,
          title: "Web Speech API",
          content: "Text-to-speech screen reader using browser's built-in Speech Synthesis API. Reads content in selected language.",
          date: new Date().toLocaleDateString()
        },
        {
          id: 5,
          title: "CSS Theming",
          content: "Dark and light mode implemented with CSS classes and theme persistence in localStorage.",
          date: new Date().toLocaleDateString()
        }
      ];
      setPosts(seedPosts);
      localStorage.setItem('posts', JSON.stringify(seedPosts));
    }
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const translateText = async (text, targetLang) => {
      if (!text || targetLang === 'en') return text;
      
      const cacheKey = `${text}_${targetLang}`;
      if (translationCache[cacheKey]) return translationCache[cacheKey];
      
      try {
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
        const data = await res.json();
        const translated = data[0]?.map(item => item[0]).join('') || text;
        setTranslationCache(prev => ({ ...prev, [cacheKey]: translated }));
        return translated;
      } catch {
        return text;
      }
    };

    const lang = i18n.language;
    
    if (lang === 'en') {
      setTranslatedPosts(posts);
      setTranslating(false);
      return;
    }

    if (posts.length === 0) {
      setTranslatedPosts([]);
      setTranslating(false);
      return;
    }

    let isCancelled = false;
    setTranslating(true);
    
    const translate = async () => {
      const translated = [];
      for (const post of posts) {
        if (isCancelled) break;
        const [translatedTitle, translatedContent] = await Promise.all([
          translateText(post.title, lang),
          translateText(post.content, lang)
        ]);
        translated.push({
          ...post,
          title: translatedTitle,
          content: translatedContent
        });
      }
      if (!isCancelled) {
        setTranslatedPosts(translated);
        setTranslating(false);
      }
    };
    
    translate();
    
    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts, i18n.language]);

  const handleSave = () => {
    if (!title || !content) return;
    if (editId) {
      setPosts(posts.map(p => p.id === editId ? { ...p, title, content } : p));
      setEditId(null);
    } else {
      setPosts([...posts, { id: Date.now(), title, content, date: new Date().toLocaleDateString() }]);
    }
    setTitle('');
    setContent('');
    setShowForm(false);
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditId(post.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const resetToSeedData = () => {
    const seedPosts = [
      {
        id: Date.now() + 1,
        title: "React Hooks",
        content: "This blog uses useState for state management and useEffect for side effects like localStorage sync and translations.",
        date: new Date().toLocaleDateString()
      },
      {
        id: Date.now() + 2,
        title: "Browser Storage",
        content: "All blog posts are stored in localStorage. No backend or database needed. Data persists across sessions.",
        date: new Date().toLocaleDateString()
      },
      {
        id: Date.now() + 3,
        title: "i18next Translation",
        content: "Multi-language support using react-i18next library. UI translates to 10 languages including Hindi, Tamil, Telugu, and more.",
        date: new Date().toLocaleDateString()
      },
      {
        id: Date.now() + 4,
        title: "Web Speech API",
        content: "Text-to-speech screen reader using browser's built-in Speech Synthesis API. Reads content in selected language.",
        date: new Date().toLocaleDateString()
      },
      {
        id: Date.now() + 5,
        title: "CSS Theming",
        content: "Dark and light mode implemented with CSS classes and theme persistence in localStorage.",
        date: new Date().toLocaleDateString()
      }
    ];
    setPosts(seedPosts);
    localStorage.setItem('posts', JSON.stringify(seedPosts));
  };

  const speakPost = (post) => {
    if (speaking === post.id) {
      window.speechSynthesis.cancel();
      setSpeaking(null);
      return;
    }
    
    window.speechSynthesis.cancel();
    const text = `${post.title}. ${post.content}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = i18n.language;
    utterance.onend = () => setSpeaking(null);
    utterance.onerror = () => setSpeaking(null);
    window.speechSynthesis.speak(utterance);
    setSpeaking(post.id);
  };

  return (
    <div className="app">
      <header className="header">
        <h1 className="logo">{t('title')}</h1>
        <div className="controls">
          <select className="lang-select" onChange={(e) => i18n.changeLanguage(e.target.value)} defaultValue="en">
            <option value="en">English</option>
            <option value="ja">日本語</option>
            <option value="zh">中文</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="ta">தமிழ்</option>
            <option value="te">తెలుగు</option>
            <option value="bn">বাংলা</option>
            <option value="mr">मराठी</option>
            <option value="gu">ગુજરાતી</option>
          </select>
          <button className="icon-btn" onClick={() => setDarkMode(!darkMode)} title={darkMode ? t('lightMode') : t('darkMode')}>
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <button className="icon-btn primary" onClick={() => setShowForm(!showForm)}>
            <FiPlus /> {t('newPost')}
          </button>
          <button className="icon-btn success" onClick={resetToSeedData} title="Load Demo Posts">
            <FiRefreshCw />
          </button>
        </div>
      </header>

      {showForm && (
        <div className="form-overlay" onClick={() => setShowForm(false)}>
          <div className="form" onClick={(e) => e.stopPropagation()}>
            <h2>{editId ? t('edit') : t('newPost')}</h2>
            <input
              type="text"
              placeholder={t('postTitle')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder={t('postContent')}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="form-actions">
              <button className="btn-save" onClick={handleSave}>{t('save')}</button>
              <button className="btn-cancel" onClick={() => { setShowForm(false); setTitle(''); setContent(''); setEditId(null); }}>
                {t('cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="posts-container">
        {translating && <p className="loading">Translating...</p>}
        {!translating && translatedPosts.length === 0 ? (
          <p className="empty">{t('noPosts')}</p>
        ) : (
          <>
            <div className="posts">
              {translatedPosts
                .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
                .map(post => (
                  <div key={post.id} className="post">
                    <h2>{post.title}</h2>
                    <p className="date">{post.date}</p>
                    <p className="content">{post.content}</p>
                    <div className="actions">
                      <button className="btn-icon" onClick={() => speakPost(post)} title="Read aloud">
                        {speaking === post.id ? <FiVolumeX /> : <FiVolume2 />}
                      </button>
                      <button className="btn-icon edit" onClick={() => handleEdit(posts.find(p => p.id === post.id))} title={t('edit')}>
                        <FiEdit2 />
                      </button>
                      <button className="btn-icon delete" onClick={() => handleDelete(post.id)} title={t('delete')}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            {translatedPosts.length > postsPerPage && (
              <div className="pagination">
                {Array.from({ length: Math.ceil(translatedPosts.length / postsPerPage) }, (_, i) => (
                  <button
                    key={i + 1}
                    className={currentPage === i + 1 ? 'active' : ''}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
