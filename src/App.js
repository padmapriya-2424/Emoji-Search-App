import React, { useState, useEffect } from 'react';
import './App.css';

const EmojiSearchApp = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [recentEmojis, setRecentEmojis] = useState([]);

  // Sample emoji data organized by categories
  const emojis = [
    { symbol: '😀', name: 'grinning face', category: 'Smileys' },
    { symbol: '😃', name: 'grinning face with big eyes', category: 'Smileys' },
    { symbol: '😄', name: 'grinning face with smiling eyes', category: 'Smileys' },
    { symbol: '😁', name: 'beaming face with smiling eyes', category: 'Smileys' },
    { symbol: '😆', name: 'grinning squinting face', category: 'Smileys' },
    { symbol: '😅', name: 'grinning face with sweat', category: 'Smileys' },
    { symbol: '🤣', name: 'rolling on the floor laughing', category: 'Smileys' },
    { symbol: '😂', name: 'face with tears of joy', category: 'Smileys' },
    { symbol: '🙂', name: 'slightly smiling face', category: 'Smileys' },
    { symbol: '🙃', name: 'upside down face', category: 'Smileys' },
    { symbol: '😉', name: 'winking face', category: 'Smileys' },
    { symbol: '😇', name: 'smiling face with halo', category: 'Smileys' },
    { symbol: '😍', name: 'smiling face with heart eyes', category: 'Smileys' },
    { symbol: '🐶', name: 'dog face', category: 'Animals' },
    { symbol: '🐱', name: 'cat face', category: 'Animals' },
    { symbol: '🦁', name: 'lion', category: 'Animals' },
    { symbol: '🐯', name: 'tiger face', category: 'Animals' },
    { symbol: '🦊', name: 'fox', category: 'Animals' },
    { symbol: '🦝', name: 'raccoon', category: 'Animals' },
    { symbol: '🐮', name: 'cow face', category: 'Animals' },
    { symbol: '🐷', name: 'pig face', category: 'Animals' },
    { symbol: '🐭', name: 'mouse face', category: 'Animals' },
    { symbol: '🐹', name: 'hamster', category: 'Animals' },
    { symbol: '🐰', name: 'rabbit face', category: 'Animals' },
    { symbol: '🍕', name: 'pizza', category: 'Food' },
    { symbol: '🍔', name: 'hamburger', category: 'Food' },
    { symbol: '🍟', name: 'french fries', category: 'Food' },
    { symbol: '🌭', name: 'hot dog', category: 'Food' },
    { symbol: '🍦', name: 'ice cream', category: 'Food' },
    { symbol: '🍩', name: 'doughnut', category: 'Food' },
    { symbol: '🍎', name: 'red apple', category: 'Food' },
    { symbol: '🍉', name: 'watermelon', category: 'Food' },
    { symbol: '🍇', name: 'grapes', category: 'Food' },
    { symbol: '🥐', name: 'croissant', category: 'Food' },
    { symbol: '🧀', name: 'cheese wedge', category: 'Food' },
    { symbol: '❤️', name: 'red heart', category: 'Symbols' },
    { symbol: '💛', name: 'yellow heart', category: 'Symbols' },
    { symbol: '💚', name: 'green heart', category: 'Symbols' },
    { symbol: '💙', name: 'blue heart', category: 'Symbols' },
    { symbol: '💜', name: 'purple heart', category: 'Symbols' },
    { symbol: '🖤', name: 'black heart', category: 'Symbols' },
    { symbol: '💔', name: 'broken heart', category: 'Symbols' },
    { symbol: '💕', name: 'two hearts', category: 'Symbols' },
    { symbol: '💞', name: 'revolving hearts', category: 'Symbols' },
    { symbol: '⭐', name: 'star', category: 'Symbols' },
    { symbol: '✨', name: 'sparkles', category: 'Symbols' },
    { symbol: '🎉', name: 'party popper', category: 'Symbols' },
    { symbol: '🎊', name: 'confetti ball', category: 'Symbols' },
  ];

  const categories = ['All', 'Smileys', 'Animals', 'Food', 'Symbols'];

  // Load recent emojis and preferred color scheme on mount
  useEffect(() => {
    const savedRecentEmojis = localStorage.getItem('recentEmojis');
    if (savedRecentEmojis) {
      setRecentEmojis(JSON.parse(savedRecentEmojis));
    }

    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDarkMode);
  }, []);

  // Save recent emojis to localStorage when they change
  useEffect(() => {
    localStorage.setItem('recentEmojis', JSON.stringify(recentEmojis));
  }, [recentEmojis]);

  // Update <body> class for dark mode
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Filter emojis by search term and category
  const filteredEmojis = emojis.filter(emoji => {
    const matchesSearch = emoji.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || emoji.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Copy emoji to clipboard and update recent emojis
  const copyToClipboard = (emoji) => {
    navigator.clipboard.writeText(emoji.symbol)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);

        setRecentEmojis(prev => {
          const filtered = prev.filter(item => item.symbol !== emoji.symbol);
          return [emoji, ...filtered].slice(0, 5);
        });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen">
      <div className="container">
        <header>
          <h1>Emoji Search App 😀🔍</h1>
          <button className="toggle-theme" onClick={toggleDarkMode}>
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </header>

        <div>
          <input
            type="text"
            placeholder="Search emojis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? 'active' : ''}
            >
              {category}
            </button>
          ))}
        </div>

        {copied && <div className="copy-feedback">✅ Copied!</div>}

        {recentEmojis.length > 0 && (
          <div className="recent-emojis">
            <h2>Recently Used</h2>
            <div className="recent-list">
              {recentEmojis.map((emoji, index) => (
                <div
                  key={index}
                  className="recent-item"
                  onClick={() => copyToClipboard(emoji)}
                >
                  <span className="emoji">{emoji.symbol}</span>
                  <span className="name">{emoji.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="results-count">
          {filteredEmojis.length} emoji{filteredEmojis.length !== 1 ? 's' : ''} found
        </div>

        <div className="emoji-grid">
          {filteredEmojis.map((emoji, index) => (
            <div
              key={index}
              className="emoji-item"
              onClick={() => copyToClipboard(emoji)}
              title={emoji.name}
            >
              <span className="emoji">{emoji.symbol}</span>
              <span className="name">{emoji.name}</span>
            </div>
          ))}
        </div>

        {filteredEmojis.length === 0 && (
          <div className="empty-state">
            No emojis found. Try a different search term or category.
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiSearchApp;