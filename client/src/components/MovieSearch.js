import React, { useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import API_BASE_URL from '../config/api';

const MovieSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchMovies = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${API_BASE_URL}/api/movies/search?query=${encodeURIComponent(searchQuery)}`);
      setMovies(response.data.results || []);
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchMovies();
    }
  };

  return (
    <div>
      <h2 className="section-title">Search Movies</h2>
      
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary" onClick={searchMovies}>
          Search
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {loading && <div className="loading">Searching movies...</div>}

      {movies.length > 0 && (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} showActions={true} />
          ))}
        </div>
      )}

      {!loading && movies.length === 0 && searchQuery && (
        <div className="empty-state">
          <h3>No movies found</h3>
          <p>Try searching with different keywords</p>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;