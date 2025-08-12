# 🚀 Deployment Checklist

## Backend (Railway) ✅

### 1. Prepare for Railway
- [ ] Code is on GitHub
- [ ] Have OpenAI API key
- [ ] Have OMDb API key

### 2. Deploy to Railway
- [ ] Go to [railway.app](https://railway.app)
- [ ] Sign up with GitHub
- [ ] Create new project from GitHub repo
- [ ] Add environment variables:
  - `OPENAI_API_KEY`
  - `OMDB_API_KEY`
- [ ] Wait for deployment to complete

### 3. Test Backend
- [ ] Copy Railway URL (e.g., `https://your-app.railway.app`)
- [ ] Test health endpoint: `https://your-app.railway.app/api/health`
- [ ] Should return: `{"status":"OK","message":"Cinematch API is running"}`

## Frontend (Netlify) ✅

### 4. Update Frontend Config
- [ ] Update `client/.env.production` with Railway URL:
  ```
  REACT_APP_API_URL=https://your-app.railway.app
  ```
- [ ] Commit and push changes

### 5. Deploy to Netlify
- [ ] Go to [netlify.com](https://netlify.com)
- [ ] New site from Git
- [ ] Select your GitHub repo
- [ ] Netlify auto-detects `netlify.toml` settings
- [ ] Deploy!

### 6. Test Full Application
- [ ] Movie search works
- [ ] AI recommendations work
- [ ] Watchlist functionality works
- [ ] Rating system works

## 🎉 You're Live!

Your movie recommendation app should now be fully deployed and working!

## 📝 URLs to Save
- **Backend (Railway):** `https://your-app.railway.app`
- **Frontend (Netlify):** `https://your-site.netlify.app`

## 🔧 If Something Goes Wrong

**Backend Issues:**
- Check Railway logs in dashboard
- Verify environment variables are set
- Test API endpoints individually

**Frontend Issues:**
- Check browser console for errors
- Verify `REACT_APP_API_URL` is correct
- Check Netlify build logs

**CORS Issues:**
- Backend already configured for `.netlify.app` domains
- If using custom domain, update CORS in `server/index.js`