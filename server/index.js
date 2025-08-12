const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const OpenAI = require('openai');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://localhost:3000',
    /\.netlify\.app$/,
    /\.railway\.app$/
  ],
  credentials: true
}));
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./cinematch.db');

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    preferences TEXT
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS watchlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    movie_id TEXT,
    title TEXT,
    poster_path TEXT,
    year TEXT,
    imdb_rating TEXT,
    added_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    watched BOOLEAN DEFAULT FALSE
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    movie_id TEXT,
    rating INTEGER,
    review TEXT,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Make db available to routes
app.locals.db = db;

// Import routes
const moviesRouter = require('./routes/movies');
const watchlistRouter = require('./routes/watchlist');
const ratingsRouter = require('./routes/ratings');

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Cinematch API is running' });
});

app.use('/api/movies', moviesRouter);
app.use('/api/watchlist', watchlistRouter);
app.use('/api/ratings', ratingsRouter);

module.exports = { app, db };

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Cinematch server running on port ${PORT}`);
  });
}