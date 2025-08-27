# GitHub Pages Deployment Instructions

Your Sonoma Wellness therapy site is now ready for deployment to GitHub Pages!

## Current Status ✅
- ✅ Project consolidated and cleaned up (removed Vite, kept Next.js)
- ✅ Next.js configured for static export with GitHub Pages support
- ✅ GitHub Actions workflow created for automated deployment
- ✅ Git repository initialized with initial commit
- ✅ Build tested and working locally

## Step-by-Step Deployment Guide

### 1. Create GitHub Repository
```bash
# Go to GitHub.com and create a new repository named: theropist-site
# Make it PUBLIC (required for GitHub Pages free tier)
# DO NOT initialize with README, .gitignore, or license
```

### 2. Add Remote and Push Code
Run these commands in your terminal:

```bash
# Navigate to your project
cd "/Users/charwinvanryckdegroot/Github/Theropist Site"

# Add the remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/theropist-site.git

# Push the code
git push -u origin main
```

### 3. Enable GitHub Pages
1. Go to your repository on GitHub: https://github.com/YOUR_USERNAME/theropist-site
2. Click on **Settings** (in the repository navigation)
3. Scroll down to **Pages** in the left sidebar
4. Under "Build and deployment":
   - Source: Select **GitHub Actions**
   - The workflow will automatically handle deployment

### 4. Wait for Deployment
1. Go to the **Actions** tab in your repository
2. You should see the deployment workflow running
3. Wait for it to complete (usually takes 2-5 minutes)
4. Once complete, your site will be live!

### 5. Access Your Site
Your site will be available at:
```
https://YOUR_USERNAME.github.io/theropist-site/
```

## Important Configuration Notes

### Base Path Configuration
The site is configured to work at `/theropist-site` path. If you want to change the repository name:

1. Update `next.config.ts`:
   ```typescript
   basePath: isProd ? '/your-new-repo-name' : '',
   assetPrefix: isProd ? '/your-new-repo-name/' : '',
   ```

2. Rename the GitHub repository to match

### Custom Domain (Optional)
To use a custom domain like `sonomawellness.com`:

1. In GitHub repository Settings > Pages:
   - Add your custom domain
   - GitHub will create a CNAME file

2. Configure your domain's DNS:
   - Add CNAME record pointing to `YOUR_USERNAME.github.io`
   - Or A records to GitHub's IPs

3. Update `next.config.ts`:
   ```typescript
   basePath: '', // Remove basePath for custom domain
   assetPrefix: '', // Remove assetPrefix for custom domain
   ```

## Troubleshooting

### If deployment fails:
1. Check the Actions tab for error messages
2. Ensure repository is PUBLIC
3. Verify GitHub Pages is enabled with GitHub Actions source
4. Check that all dependencies install correctly

### If site shows 404:
1. Wait a few more minutes (initial deployment can take up to 10 minutes)
2. Clear browser cache
3. Check the exact URL including the `/theropist-site` path

### To test locally:
```bash
npm run dev     # Development server at http://localhost:3000
npm run build   # Build for production
npm run start   # Test production build locally
```

## Making Updates

After the initial deployment, any push to the `main` branch will automatically trigger a new deployment:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push origin main
```

The GitHub Actions workflow will automatically build and deploy your changes.

## Support

If you encounter any issues:
1. Check the GitHub Actions logs for detailed error messages
2. Ensure all configurations match the repository name
3. Verify the repository visibility is set to PUBLIC

Your site is production-ready and will automatically deploy with each push to main!