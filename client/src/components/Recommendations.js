import React, { useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import API_BASE_URL from '../config/api';

const Recommendations = () => {
  const [preferences, setPreferences] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getRecommendations = async () => {
    if (!preferences.trim()) {
      alert('Please enter your movie preferences');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get user's watched movies for better recommendations
      const watchlistResponse = await axios.get(`${API_BASE_URL}/api/watchlist`);
      const watchedMovies = watchlistResponse.data
        .filter(item => item.watched)
        .map(item => item.title);

      const response = await axios.post(`${API_BASE_URL}/api/movies/recommendations`, {
        preferences,
        watchedMovies
      });

      setRecommendations(response.data);
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      console.error('Recommendations error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="section-title">AI Movie Recommendations</h2>
      
      <div className="preferences-section">
        <h3>Tell us what you like</h3>
        <textarea
          className="preferences-input"
          placeholder="Describe your movie preferences... (e.g., 'I love sci-fi movies with complex plots, action films from the 90s, and psychological thrillers')"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          rows={4}
        />
        <button className="btn btn-primary" onClick={getRecommendations}>
          Get AI Recommendations
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {loading && <div className="loading">Getting personalized recommendations...</div>}

      {recommendations.length > 0 && (
        <>
          <h3 style={{ marginBottom: '1rem', color: '#667eea' }}>
            Recommended for you:
          </h3>
          <div className="movie-grid">
            {recommendations.map((movie) => (
              <MovieCard key={movie.id} movie={movie} showActions={true} />
            ))}
          </div>
        </>
      )}

      {!loading && recommendations.length === 0 && preferences && (
        <div className="empty-state">
          <h3>No recommendations yet</h3>
          <p>Try describing your preferences in more detail</p>
        </div>
      )}
    </div>
  );
};

export default Recommendations;