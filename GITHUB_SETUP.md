# 📝 GitHub Setup Instructions

## Step 1: Create Repository on GitHub

1. Go to [github.com](https://github.com)
2. Click the "+" icon in top right → "New repository"
3. Repository name: `cinematch`
4. Description: "AI-powered movie recommendation system"
5. Make it **Public** (required for free Railway deployment)
6. **Don't check** "Add a README file" (we already have one)
7. **Don't check** "Add .gitignore" (we already have one)
8. Click "Create repository"

## Step 2: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/cinematch.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Step 3: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. Check that these key files are there:
   - `README.md`
   - `package.json`
   - `server/index.js`
   - `client/package.json`
   - `railway.json`
   - `netlify.toml`

## 🎉 Ready for Deployment!

Once your code is on GitHub, you can:
1. Deploy backend to Railway
2. Deploy frontend to Netlify

Follow the guides:
- `RAILWAY_DEPLOY.md` for backend
- `NETLIFY_DEPLOY.md` for frontend