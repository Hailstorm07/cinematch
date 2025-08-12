import React, { useState } from 'react';
import Header from './components/Header';
import MovieSearch from './components/MovieSearch';
import Recommendations from './components/Recommendations';
import Watchlist from './components/Watchlist';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('search');

  const renderContent = () => {
    switch (activeTab) {
      case 'search':
        return <MovieSearch />;
      case 'recommendations':
        return <Recommendations />;
      case 'watchlist':
        return <Watchlist />;
      default:
        return <MovieSearch />;
    }
  };

  return (
    <div className="App">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <div className="container">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;