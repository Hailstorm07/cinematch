import React, { useState } from 'react';
import axios from 'axios';
import RatingModal from './RatingModal';
import API_BASE_URL from '../config/api';

const MovieCard = ({ movie, showActions = false, onWatchlistUpdate }) => {
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [addingToWatchlist, setAddingToWatchlist] = useState(false);

  const addToWatchlist = async () => {
    setAddingToWatchlist(true);
    try {
      await axios.post(`${API_BASE_URL}/api/watchlist`, {
        movie_id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        year: movie.release_date || movie.year,
        imdb_rating: movie.imdb_rating
      });
      alert('Movie added to watchlist!');
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert('Failed to add movie to watchlist');
      }
    } finally {
      setAddingToWatchlist(false);
    }
  };

  const posterUrl = movie.poster_path && movie.poster_path !== 'N/A'
    ? movie.poster_path
    : null;

  return (
    <>
      <div className="movie-card">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            className="movie-poster"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQ1MCIgdmlld0JveD0iMCAwIDMwMCA0NTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDUwIiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjI1IiBmaWxsPSIjNjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
            }}
          />
        ) : (
          <div className="movie-poster" style={{
            background: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '14px'
          }}>
            No Image
          </div>
        )}
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          {movie.overview && (
            <p className="movie-overview">
              {movie.overview.length > 150 
                ? `${movie.overview.substring(0, 150)}...` 
                : movie.overview}
            </p>
          )}
          {(movie.release_date || movie.year) && (
            <p className="movie-release-date">
              Year: {movie.year || new Date(movie.release_date).getFullYear()}
            </p>
          )}
          {movie.imdb_rating && movie.imdb_rating !== 'N/A' && (
            <p className="movie-imdb-rating" style={{ color: '#ffd700', fontSize: '0.9rem' }}>
              ⭐ IMDb: {movie.imdb_rating}/10
            </p>
          )}
          
          {showActions && (
            <div className="movie-actions">
              <button
                className="btn btn-secondary btn-small"
                onClick={addToWatchlist}
                disabled={addingToWatchlist}
              >
                {addingToWatchlist ? 'Adding...' : '+ Watchlist'}
              </button>
              <button
                className="btn btn-primary btn-small"
                onClick={() => setShowRatingModal(true)}
              >
                Rate Movie
              </button>
            </div>
          )}
        </div>
      </div>

      {showRatingModal && (
        <RatingModal
          movie={movie}
          onClose={() => setShowRatingModal(false)}
        />
      )}
    </>
  );
};

export default MovieCard;