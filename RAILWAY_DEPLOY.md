# 🚂 Deploy to Railway - Step by Step

Railway is perfect for this project because it offers:
- Free tier with 500 hours/month
- Automatic HTTPS
- Free PostgreSQL database
- Easy GitHub integration

## 📋 Prerequisites

1. **GitHub Account** - Your code needs to be on GitHub
2. **API Keys Ready:**
   - OpenAI API Key: Get from [platform.openai.com](https://platform.openai.com/api-keys)
   - OMDb API Key: Get from [omdbapi.com](http://www.omdbapi.com/apikey.aspx)

## 🚀 Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### Step 2: Deploy to Railway

1. **Go to [railway.app](https://railway.app)**
2. **Sign up/Login** with your GitHub account
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your cinematch repository**
6. **Railway will automatically:**
   - Detect it's a Node.js app
   - Install dependencies
   - Start building

### Step 3: Add Environment Variables

1. **In your Railway project dashboard:**
   - Click on your service
   - Go to "Variables" tab
   - Add these variables:

```
OPENAI_API_KEY=your_openai_api_key_here
OMDB_API_KEY=your_omdb_api_key_here
NODE_ENV=production
```

**Important:** Don't add `PORT` - Railway sets this automatically!

### Step 4: Get Your Deployment URL

1. **Go to "Settings" tab**
2. **Click "Generate Domain"** 
3. **Copy the URL** (e.g., `https://your-app-name.railway.app`)

### Step 5: Update Frontend Configuration

1. **Update `client/.env.production`:**
```
REACT_APP_API_URL=https://your-app-name.railway.app
```

2. **Commit and push:**
```bash
git add client/.env.production
git commit -m "Update API URL for production"
git push origin main
```

## ✅ Verify Deployment

Test your API endpoints:
- Health check: `https://your-app-name.railway.app/api/health`
- Should return: `{"status":"OK","message":"Cinematch API is running"}`

## 🔧 Troubleshooting

### Common Issues:

**Build Fails:**
- Check Railway logs in the "Deployments" tab
- Ensure all dependencies are in `package.json`

**Database Issues:**
- Railway uses ephemeral storage for SQLite
- For production, consider upgrading to PostgreSQL (see below)

**Environment Variables:**
- Double-check API keys are correct
- No quotes needed around values in Railway

## 🗄️ Upgrade to PostgreSQL (Recommended)

For a production app, upgrade from SQLite to PostgreSQL:

### Step 1: Add PostgreSQL to Railway
1. In your project, click "New Service"
2. Select "PostgreSQL"
3. Railway will create a database and provide connection details

### Step 2: Update Your Code
1. Install PostgreSQL driver:
```bash
npm install pg
```

2. Update `server/index.js` to use PostgreSQL:
```javascript
// Replace SQLite code with:
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Use pool.query() instead of db.run()
```

### Step 3: Add DATABASE_URL Variable
Railway automatically adds `DATABASE_URL` when you add PostgreSQL.

## 📊 Railway Dashboard Features

- **Metrics**: Monitor CPU, memory, network usage
- **Logs**: Real-time application logs
- **Deployments**: History of all deployments
- **Settings**: Custom domains, environment variables

## 💰 Pricing

- **Starter Plan**: $0/month
  - 500 execution hours
  - 1GB RAM
  - 1GB disk
  - Perfect for development/small projects

- **Pro Plan**: $20/month
  - Unlimited execution hours
  - More resources
  - Priority support

## 🔄 Automatic Deployments

Railway automatically redeploys when you push to GitHub:
```bash
git add .
git commit -m "Update feature"
git push origin main
# Railway automatically deploys! 🎉
```

## 🌐 Custom Domain (Optional)

1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Update DNS records as instructed
4. SSL certificate automatically provisioned

## 📝 Final Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created and deployed
- [ ] Environment variables added
- [ ] API health check works
- [ ] Frontend updated with Railway URL
- [ ] All features tested

Your backend is now live on Railway! 🎉

Next step: Deploy your frontend to Netlify using the Railway URL.