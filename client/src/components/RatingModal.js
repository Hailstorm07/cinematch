import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const RatingModal = ({ movie, onClose }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Load existing rating if any
    const loadExistingRating = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/ratings/movie/${movie.id}`);
        if (response.data) {
          setRating(response.data.rating);
          setReview(response.data.review || '');
        }
      } catch (error) {
        console.error('Error loading existing rating:', error);
      }
    };

    loadExistingRating();
  }, [movie.id]);

  const submitRating = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API_BASE_URL}/api/ratings`, {
        movie_id: movie.id,
        rating,
        review
      });
      alert('Rating submitted successfully!');
      onClose();
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= (hoveredRating || rating) ? 'filled' : ''}`}
          onClick={() => setRating(i)}
          onMouseEnter={() => setHoveredRating(i)}
          onMouseLeave={() => setHoveredRating(0)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Rate: {movie.title}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="rating-section">
          <h4>Your Rating:</h4>
          <div className="rating-stars">
            {renderStars()}
          </div>
          <p>{rating > 0 ? `${rating} out of 5 stars` : 'Click to rate'}</p>
        </div>

        <div className="review-section">
          <h4>Review (Optional):</h4>
          <textarea
            className="review-textarea"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>

        <div className="modal-actions" style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
          <button
            className="btn btn-primary"
            onClick={submitRating}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Submit Rating'}
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;