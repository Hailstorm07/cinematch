# Cinematch - AI Movie Recommendation System

A smart movie recommendation system that uses AI to suggest personalized movies and manage your watchlist.

## Features

- AI-powered movie recommendations based on preferences
- Personal watchlist management
- Movie search and details
- Rating and review system
- Genre-based filtering
- Watched movies tracking

## Tech Stack

- Frontend: React with modern UI/UX
- Backend: Node.js with Express
- Database: SQLite (for simplicity)
- AI: OpenAI API for recommendations
- Movie Data: OMDb API (IMDb database)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

- `GET /api/movies/recommendations` - Get AI recommendations
- `GET /api/movies/search` - Search movies
- `POST /api/watchlist` - Add to watchlist
- `GET /api/watchlist` - Get user watchlist
- `POST /api/movies/rate` - Rate a movie