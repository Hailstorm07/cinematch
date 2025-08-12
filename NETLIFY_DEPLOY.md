# Quick Netlify Deployment Guide

## 🚀 Deploy in 3 Steps

### 1. Deploy Your Backend First
Your React app needs a backend API. Deploy to one of these platforms:

**Railway (Recommended - Free):**
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repo
3. Add environment variables:
   - `OPENAI_API_KEY=your_openai_key`
   - `OMDB_API_KEY=your_omdb_key`
4. Deploy automatically

**Other options:** Heroku, Render, Vercel

### 2. Update Frontend Configuration
1. Copy your backend URL (e.g., `https://your-app.railway.app`)
2. Update `client/.env.production`:
   ```
   REACT_APP_API_URL=https://your-backend-url-here.railway.app
   ```

### 3. Deploy to Netlify
**Option A - Git Deploy (Recommended):**
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. "New site from Git" → Select your repo
4. Netlify auto-detects settings from `netlify.toml`
5. Deploy!

**Option B - Drag & Drop:**
1. Run: `cd client && npm run build`
2. Drag `client/build` folder to Netlify

## ✅ Verification
After deployment, test:
- Movie search works
- AI recommendations work  
- Watchlist functionality works

## 🔧 Troubleshooting
- **API errors**: Check your backend URL in environment variables
- **CORS issues**: Add your Netlify domain to backend CORS settings
- **Build fails**: Ensure Node.js version compatibility

## 📝 Environment Variables Needed

**Backend:**
- `OPENAI_API_KEY` - Get from OpenAI
- `OMDB_API_KEY` - Get from OMDb API

**Frontend (Netlify):**
- `REACT_APP_API_URL` - Your deployed backend URL

That's it! Your movie recommendation app should be live. 🎬