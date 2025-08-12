# Cinematch Deployment Guide

This guide covers deploying the Cinematch application to production using Netlify for the frontend and a backend service.

## Architecture Overview

- **Frontend**: React app deployed to Netlify
- **Backend**: Node.js/Express API (needs separate deployment)
- **Database**: SQLite (for development) - consider PostgreSQL for production

## Frontend Deployment (Netlify)

### Prerequisites
- GitHub/GitLab repository with your code
- Netlify account
- Backend API deployed and accessible

### Step 1: Deploy Backend First
Your backend needs to be deployed before the frontend. Recommended options:
- **Railway**: Easy deployment with PostgreSQL
- **Heroku**: Popular platform (requires credit card)
- **Render**: Free tier available
- **Vercel**: Good for Node.js APIs

### Step 2: Update Environment Variables
1. Update `client/.env.production` with your actual backend URL:
   ```
   REACT_APP_API_URL=https://your-actual-backend-url.com
   ```

### Step 3: Deploy to Netlify

#### Option A: Connect Git Repository
1. Go to [Netlify](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Connect your GitHub/GitLab account
4. Select your repository
5. Netlify will automatically detect the `netlify.toml` configuration
6. Click "Deploy site"

#### Option B: Manual Deploy
1. Build the project locally:
   ```bash
   cd client
   npm run build
   ```
2. Drag and drop the `client/build` folder to Netlify

### Step 4: Configure Environment Variables in Netlify
1. Go to Site settings > Environment variables
2. Add: `REACT_APP_API_URL` with your backend URL

## Backend Deployment Options

### Option 1: Railway (Recommended)
1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Select the root directory (not client)
4. Add environment variables:
   - `OPENAI_API_KEY`
   - `OMDB_API_KEY`
   - `PORT` (Railway will set this automatically)
5. Railway will automatically deploy

### Option 2: Render
1. Go to [Render](https://render.com)
2. Create new Web Service
3. Connect your repository
4. Set build command: `npm install`
5. Set start command: `node server/index.js`
6. Add environment variables

### Option 3: Heroku
1. Install Heroku CLI
2. Create new app: `heroku create your-app-name`
3. Set environment variables:
   ```bash
   heroku config:set OPENAI_API_KEY=your_key
   heroku config:set OMDB_API_KEY=your_key
   ```
4. Deploy: `git push heroku main`

## Database Considerations

For production, consider upgrading from SQLite:

### PostgreSQL (Recommended)
- Railway provides free PostgreSQL
- Update database connection in `server/index.js`
- Install `pg` package: `npm install pg`

### Example PostgreSQL connection:
```javascript
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});
```

## Environment Variables Summary

### Backend (.env)
```
OPENAI_API_KEY=your_openai_key
OMDB_API_KEY=your_omdb_key
PORT=3001
DATABASE_URL=your_postgres_url (if using PostgreSQL)
```

### Frontend (Netlify Environment Variables)
```
REACT_APP_API_URL=https://your-backend-url.com
```

## Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure backend allows your Netlify domain
2. **API Not Found**: Check `REACT_APP_API_URL` is correct
3. **Build Failures**: Check Node.js version compatibility

### CORS Configuration
Add your Netlify domain to backend CORS:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-netlify-site.netlify.app']
}));
```

## Post-Deployment Checklist

- [ ] Backend API is accessible
- [ ] Frontend can connect to backend
- [ ] Movie search works
- [ ] AI recommendations work
- [ ] Watchlist functionality works
- [ ] Rating system works
- [ ] All environment variables are set
- [ ] CORS is properly configured

## Custom Domain (Optional)

1. In Netlify: Site settings > Domain management
2. Add custom domain
3. Configure DNS records as instructed
4. SSL certificate will be automatically provisioned