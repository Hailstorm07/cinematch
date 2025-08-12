import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/watchlist`);
      setWatchlist(response.data);
    } catch (err) {
      setError('Failed to load watchlist');
      console.error('Watchlist error:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleWatched = async (id, currentStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/api/watchlist/${id}/watched`, {
        watched: !currentStatus
      });
      loadWatchlist(); // Reload the list
    } catch (error) {
      console.error('Error updating watched status:', error);
      alert('Failed to update watched status');
    }
  };

  const removeFromWatchlist = async (id) => {
    if (!window.confirm('Remove this movie from your watchlist?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/watchlist/${id}`);
      loadWatchlist(); // Reload the list
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      alert('Failed to remove movie from watchlist');
    }
  };

  if (loading) return <div className="loading">Loading watchlist...</div>;
  if (error) return <div className="error">{error}</div>;

  const unwatchedMovies = watchlist.filter(movie => !movie.watched);
  const watchedMovies = watchlist.filter(movie => movie.watched);

  return (
    <div>
      <h2 className="section-title">My Watchlist</h2>

      {watchlist.length === 0 ? (
        <div className="empty-state">
          <h3>Your watchlist is empty</h3>
          <p>Start adding movies from the search or recommendations page</p>
        </div>
      ) : (
        <>
          {unwatchedMovies.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>
                To Watch ({unwatchedMovies.length})
              </h3>
              {unwatchedMovies.map((movie) => (
                <WatchlistItem
                  key={movie.id}
                  movie={movie}
                  onToggleWatched={toggleWatched}
                  onRemove={removeFromWatchlist}
                />
              ))}
            </div>
          )}

          {watchedMovies.length > 0 && (
            <div>
              <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>
                Watched ({watchedMovies.length})
              </h3>
              {watchedMovies.map((movie) => (
                <WatchlistItem
                  key={movie.id}
                  movie={movie}
                  onToggleWatched={toggleWatched}
                  onRemove={removeFromWatchlist}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const WatchlistItem = ({ movie, onToggleWatched, onRemove }) => {
  const posterUrl = movie.poster_path && movie.poster_path !== 'N/A'
    ? movie.poster_path
    : null;

  return (
    <div className="watchlist-item">
      {posterUrl && (
        <img
          src={posterUrl}
          alt={movie.title}
          className="watchlist-poster"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      )}
      <div className="watchlist-info">
        <h4>{movie.title}</h4>
        {movie.year && (
          <p style={{ color: '#ccc', fontSize: '0.9rem' }}>
            Year: {movie.year}
          </p>
        )}
        {movie.imdb_rating && movie.imdb_rating !== 'N/A' && (
          <p style={{ color: '#ffd700', fontSize: '0.9rem' }}>
            ⭐ IMDb: {movie.imdb_rating}/10
          </p>
        )}
        <p style={{ color: '#888', fontSize: '0.9rem' }}>
          Added: {new Date(movie.added_date).toLocaleDateString()}
        </p>
        <p style={{ color: movie.watched ? '#4CAF50' : '#FFA726' }}>
          {movie.watched ? '✓ Watched' : '⏱ To Watch'}
        </p>
      </div>
      <div className="watchlist-actions">
        <button
          className="btn btn-secondary btn-small"
          onClick={() => onToggleWatched(movie.id, movie.watched)}
        >
          {movie.watched ? 'Mark Unwatched' : 'Mark Watched'}
        </button>
        <button
          className="btn btn-secondary btn-small"
          onClick={() => onRemove(movie.id)}
          style={{ background: '#ff4444' }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default Watchlist;