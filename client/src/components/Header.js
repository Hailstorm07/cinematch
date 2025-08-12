import React from 'react';

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="header">
      <div className="container">
        <h1>🎬 Cinematch</h1>
        <nav className="nav">
          <button
            className={activeTab === 'search' ? 'active' : ''}
            onClick={() => setActiveTab('search')}
          >
            Search Movies
          </button>
          <button
            className={activeTab === 'recommendations' ? 'active' : ''}
            onClick={() => setActiveTab('recommendations')}
          >
            AI Recommendations
          </button>
          <button
            className={activeTab === 'watchlist' ? 'active' : ''}
            onClick={() => setActiveTab('watchlist')}
          >
            My Watchlist
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;