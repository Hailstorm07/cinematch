const express = require('express');
const router = express.Router();

// Add movie to watchlist
router.post('/', (req, res) => {
  const { user_id = 1, movie_id, title, poster_path, year, imdb_rating } = req.body;
  
  const db = req.app.locals.db;
  
  // Check if movie already exists in watchlist
  db.get(
    `SELECT id FROM watchlist WHERE user_id = ? AND movie_id = ?`,
    [user_id, movie_id],
    (err, row) => {
      if (err) {
        console.error('Watchlist check error:', err);
        return res.status(500).json({ error: 'Failed to check watchlist' });
      }
      
      if (row) {
        return res.status(400).json({ error: 'Movie already in watchlist' });
      }
      
      db.run(
        `INSERT INTO watchlist (user_id, movie_id, title, poster_path, year, imdb_rating) VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, movie_id, title, poster_path, year, imdb_rating],
        function(err) {
          if (err) {
            console.error('Watchlist add error:', err);
            return res.status(500).json({ error: 'Failed to add to watchlist' });
          }
          
          res.json({ 
            id: this.lastID, 
            message: 'Movie added to watchlist successfully' 
          });
        }
      );
    }
  );
});

// Get user's watchlist
router.get('/:userId?', (req, res) => {
  const userId = req.params.userId || 1;
  const db = req.app.locals.db;
  
  db.all(
    `SELECT * FROM watchlist WHERE user_id = ? ORDER BY added_date DESC`,
    [userId],
    (err, rows) => {
      if (err) {
        console.error('Watchlist get error:', err);
        return res.status(500).json({ error: 'Failed to get watchlist' });
      }
      
      res.json(rows);
    }
  );
});

// Mark movie as watched
router.put('/:id/watched', (req, res) => {
  const { id } = req.params;
  const { watched } = req.body;
  const db = req.app.locals.db;
  
  db.run(
    `UPDATE watchlist SET watched = ? WHERE id = ?`,
    [watched, id],
    function(err) {
      if (err) {
        console.error('Watchlist update error:', err);
        return res.status(500).json({ error: 'Failed to update watchlist' });
      }
      
      res.json({ message: 'Watchlist updated successfully' });
    }
  );
});

// Remove from watchlist
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const db = req.app.locals.db;
  
  db.run(
    `DELETE FROM watchlist WHERE id = ?`,
    [id],
    function(err) {
      if (err) {
        console.error('Watchlist delete error:', err);
        return res.status(500).json({ error: 'Failed to remove from watchlist' });
      }
      
      res.json({ message: 'Movie removed from watchlist' });
    }
  );
});

module.exports = router;