# WrestleGPT Deployment Guide

## Environment Variables Required

You'll need to set these environment variables on both platforms:

```
MONGO_URI=your_mongodb_connection_string
MONGO_SECRET=your_session_secret_key
OPENAI_API_KEY=your_openai_api_key
PORT=3000
```

---

## Deploy to Railway 🚂

### Method 1: GitHub Integration (Recommended)
1. Push your code to a GitHub repository
2. Go to [Railway.app](https://railway.app)
3. Click "Start a New Project"
4. Select "Deploy from GitHub repo"
5. Connect your GitHub account and select the WrestleGPT repository
6. Railway will automatically detect it's a Node.js app

### Method 2: Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

### Setting Environment Variables on Railway:
1. Go to your project dashboard
2. Click on "Variables" tab
3. Add each environment variable:
   - `MONGO_URI`
   - `MONGO_SECRET` 
   - `OPENAI_API_KEY`
   - `PORT` (Railway will auto-assign if not set)

### Custom Domain (Optional):
1. Go to "Settings" tab
2. Click "Domains"
3. Add your custom domain

---

## Deploy to Vercel ▲

### Method 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: wrestlegpt
# - In which directory is your code located? ./
```

### Method 2: GitHub Integration
1. Push your code to GitHub
2. Go to [Vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect settings

### Setting Environment Variables on Vercel:
1. Go to your project dashboard
2. Click "Settings" tab
3. Click "Environment Variables"
4. Add each variable:
   - `MONGO_URI`
   - `MONGO_SECRET`
   - `OPENAI_API_KEY`

### Important Vercel Notes:
- Vercel automatically handles the PORT variable
- Static files are served from `/public` directory
- The `vercel.json` file configures routing

---

## Post-Deployment Checklist ✅

1. **Test the app**: Visit your deployed URL
2. **Check environment variables**: Ensure all are set correctly
3. **Test API endpoints**: Try generating a match review
4. **Monitor logs**: Check for any deployment errors
5. **Set up custom domain** (optional)

---

## MongoDB Setup 🍃

If you don't have a MongoDB database:

### MongoDB Atlas (Free Tier Available)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Whitelist `0.0.0.0/0` for IP addresses (or specific deployment IPs)

### Connection String Format:
```
mongodb+srv://username:password@cluster.mongodb.net/database_name
```

---

## OpenAI API Setup 🤖

1. Go to [OpenAI Platform](https://platform.openai.com)
2. Create an account or sign in
3. Go to API Keys section
4. Create a new API key
5. Copy the key (it starts with `sk-`)

---

## Troubleshooting 🔧

### Common Issues:

**App won't start:**
- Check that `NODE_ENV` is not required in your code
- Ensure all environment variables are set
- Check the logs for specific error messages

**Database connection fails:**
- Verify MongoDB connection string
- Check IP whitelist settings
- Ensure username/password are correct

**OpenAI API errors:**
- Verify API key is correct and active
- Check if you have remaining credits
- Ensure the API key has proper permissions

**Static files not loading:**
- Verify `/public` directory structure
- Check file paths in HTML/EJS files
- Ensure files are included in deployment

### Platform-Specific Issues:

**Railway:**
- Check the "Deployments" tab for build logs
- Verify the start command in `railway.toml`
- Check resource usage if app is slow

**Vercel:**
- Check function logs in dashboard
- Verify `vercel.json` configuration
- Ensure all routes are properly configured

---

## Success! 🎉

Your WrestleGPT app should now be live! Share the URL and let people generate epic wrestling match reviews.

### Example URLs:
- Railway: `https://your-app-name.railway.app`
- Vercel: `https://your-app-name.vercel.app`