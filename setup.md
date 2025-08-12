# Cinematch Setup Guide

## Prerequisites

1. **Node.js** (v16 or higher)
2. **OpenAI API Key** - Get from https://platform.openai.com/api-keys
3. **OMDb API Key** - Get from http://www.omdbapi.com/apikey.aspx (Free tier available)

## Installation Steps

1. **Clone and install dependencies:**
   ```bash
   npm run install-all
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API keys:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   OMDB_API_KEY=your_omdb_api_key_here
   PORT=3001
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on http://localhost:3001
   - Frontend React app on http://localhost:3000

## Features Overview

### 🔍 Movie Search
- Search movies using OMDb API (IMDb data)
- View movie details, posters, IMDb ratings, and descriptions
- Add movies to watchlist directly from search results

### 🤖 AI Recommendations
- Get personalized movie recommendations using OpenAI
- Based on your preferences and viewing history
- Considers movies you've already watched

### 📝 Watchlist Management
- Add movies to your personal watchlist
- Mark movies as watched/unwatched
- Remove movies from watchlist
- Separate sections for watched and unwatched movies

### ⭐ Rating System
- Rate movies from 1-5 stars
- Write optional reviews
- View and edit your previous ratings

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/movies/search?query=` - Search movies
- `GET /api/movies/:id` - Get movie details
- `POST /api/movies/recommendations` - Get AI recommendations
- `GET /api/watchlist/:userId?` - Get user watchlist
- `POST /api/watchlist` - Add to watchlist
- `PUT /api/watchlist/:id/watched` - Update watched status
- `DELETE /api/watchlist/:id` - Remove from watchlist
- `POST /api/ratings` - Add/update rating
- `GET /api/ratings/:userId?` - Get user ratings
- `GET /api/ratings/movie/:movieId/:userId?` - Get movie rating

## Database Schema

The app uses SQLite with these tables:
- `users` - User information and preferences
- `watchlist` - User's movie watchlist
- `ratings` - Movie ratings and reviews

## Troubleshooting

1. **API Key Issues**: Make sure your OpenAI and OMDb API keys are valid
2. **Port Conflicts**: Change the PORT in .env if 3001 is already in use
3. **Database Issues**: Delete `cinematch.db` to reset the database
4. **OMDb Limits**: Free tier has 1000 requests/day limit

## Future Enhancements

- User authentication and profiles
- Social features (share watchlists, see friends' ratings)
- Advanced filtering and sorting
- Movie trailers and streaming availability
- Export watchlist functionality