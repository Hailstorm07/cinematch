const express = require('express');
const axios = require('axios');
const OpenAI = require('openai');
const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Search movies using OMDb API (IMDb data)
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(`http://www.omdbapi.com/`, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        s: query,
        type: 'movie'
      }
    });
    
    if (response.data.Response === 'True') {
      // Transform OMDb format to match our frontend expectations
      const movies = response.data.Search.map(movie => ({
        id: movie.imdbID,
        title: movie.Title,
        release_date: movie.Year,
        poster_path: movie.Poster !== 'N/A' ? movie.Poster : null,
        overview: '', // OMDb search doesn't include plot
        imdb_id: movie.imdbID
      }));
      
      res.json({ results: movies });
    } else {
      res.json({ results: [] });
    }
  } catch (error) {
    console.error('Movie search error:', error);
    res.status(500).json({ error: 'Failed to search movies' });
  }
});

// Get movie details by IMDb ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`http://www.omdbapi.com/`, {
      params: {
        apikey: process.env.OMDB_API_KEY,
        i: id,
        plot: 'full'
      }
    });
    
    if (response.data.Response === 'True') {
      // Transform OMDb format to match our frontend expectations
      const movie = {
        id: response.data.imdbID,
        title: response.data.Title,
        overview: response.data.Plot,
        release_date: response.data.Released,
        poster_path: response.data.Poster !== 'N/A' ? response.data.Poster : null,
        runtime: response.data.Runtime,
        genre: response.data.Genre,
        director: response.data.Director,
        actors: response.data.Actors,
        imdb_rating: response.data.imdbRating,
        imdb_votes: response.data.imdbVotes,
        year: response.data.Year,
        rated: response.data.Rated,
        imdb_id: response.data.imdbID
      };
      
      res.json(movie);
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    console.error('Movie details error:', error);
    res.status(500).json({ error: 'Failed to get movie details' });
  }
});

// Get AI recommendations
router.post('/recommendations', async (req, res) => {
  try {
    const { preferences, watchedMovies = [] } = req.body;
    
    const prompt = `Based on these preferences: ${preferences}
    And considering these watched movies: ${watchedMovies.join(', ')}
    
    Recommend 10 movies that would be perfect for this user. 
    Return only a JSON array with movie titles, no additional text.
    Format: ["Movie Title 1", "Movie Title 2", ...]`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const recommendations = JSON.parse(completion.choices[0].message.content);
    
    // Get movie details for each recommendation using OMDb
    const movieDetails = await Promise.all(
      recommendations.map(async (title) => {
        try {
          const searchResponse = await axios.get(`http://www.omdbapi.com/`, {
            params: {
              apikey: process.env.OMDB_API_KEY,
              t: title,
              type: 'movie',
              plot: 'short'
            }
          });
          
          if (searchResponse.data.Response === 'True') {
            return {
              id: searchResponse.data.imdbID,
              title: searchResponse.data.Title,
              overview: searchResponse.data.Plot,
              release_date: searchResponse.data.Year,
              poster_path: searchResponse.data.Poster !== 'N/A' ? searchResponse.data.Poster : null,
              imdb_rating: searchResponse.data.imdbRating,
              imdb_id: searchResponse.data.imdbID
            };
          }
          return null;
        } catch (error) {
          console.error(`Error fetching details for ${title}:`, error);
          return null;
        }
      })
    );
    
    res.json(movieDetails.filter(movie => movie !== null));
  } catch (error) {
    console.error('AI recommendation error:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

module.exports = router;