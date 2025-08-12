const express = require('express');
const router = express.Router();

// Add or update movie rating
router.post('/', (req, res) => {
  const { user_id = 1, movie_id, rating, review } = req.body;
  const db = req.app.locals.db;
  
  // Check if rating already exists
  db.get(
    `SELECT id FROM ratings WHERE user_id = ? AND movie_id = ?`,
    [user_id, movie_id],
    (err, row) => {
      if (err) {
        console.error('Rating check error:', err);
        return res.status(500).json({ error: 'Failed to check existing rating' });
      }
      
      if (row) {
        // Update existing rating
        db.run(
          `UPDATE ratings SET rating = ?, review = ? WHERE id = ?`,
          [rating, review, row.id],
          function(err) {
            if (err) {
              console.error('Rating update error:', err);
              return res.status(500).json({ error: 'Failed to update rating' });
            }
            
            res.json({ message: 'Rating updated successfully' });
          }
        );
      } else {
        // Insert new rating
        db.run(
          `INSERT INTO ratings (user_id, movie_id, rating, review) VALUES (?, ?, ?, ?)`,
          [user_id, movie_id, rating, review],
          function(err) {
            if (err) {
              console.error('Rating insert error:', err);
              return res.status(500).json({ error: 'Failed to add rating' });
            }
            
            res.json({ 
              id: this.lastID, 
              message: 'Rating added successfully' 
            });
          }
        );
      }
    }
  );
});

// Get user's ratings
router.get('/:userId?', (req, res) => {
  const userId = req.params.userId || 1;
  const db = req.app.locals.db;
  
  db.all(
    `SELECT * FROM ratings WHERE user_id = ? ORDER BY created_date DESC`,
    [userId],
    (err, rows) => {
      if (err) {
        console.error('Ratings get error:', err);
        return res.status(500).json({ error: 'Failed to get ratings' });
      }
      
      res.json(rows);
    }
  );
});

// Get rating for specific movie
router.get('/movie/:movieId/:userId?', (req, res) => {
  const { movieId } = req.params;
  const userId = req.params.userId || 1;
  const db = req.app.locals.db;
  
  db.get(
    `SELECT * FROM ratings WHERE user_id = ? AND movie_id = ?`,
    [userId, movieId],
    (err, row) => {
      if (err) {
        console.error('Movie rating get error:', err);
        return res.status(500).json({ error: 'Failed to get movie rating' });
      }
      
      res.json(row || null);
    }
  );
});

module.exports = router;