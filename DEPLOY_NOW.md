# 🚀 Ready-to-Deploy Commands

Copy and paste these commands to deploy Upepo Labs to production.

---

## Option 1: Deploy to Vercel (Recommended - Easiest)

### Method A: Vercel CLI (Fastest)

```powershell
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel (opens browser)
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**Result:** Your site will be live at `https://upepo-labs.vercel.app`

### Method B: GitHub + Vercel Integration

1. Push code to GitHub:
```powershell
git add .
git commit -m "feat: initial Upepo Labs website"
git push origin main
```

2. Go to https://vercel.com/new
3. Click "Import Project"
4. Select your GitHub repo: `LizaImmax/Upepo-Labs`
5. Click "Deploy" (no config needed!)

---

## Option 2: Deploy to Netlify

```powershell
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize site
netlify init

# Deploy to production
netlify deploy --prod
```

---

## Option 3: Deploy to AWS (Static Site)

### Prerequisites
- AWS account
- AWS CLI installed

```powershell
# Build static export
npm run build

# Create S3 bucket (if not exists)
aws s3 mb s3://upepo-labs-website --region us-east-1

# Enable static website hosting
aws s3 website s3://upepo-labs-website --index-document index.html --error-document 404.html

# Sync files
aws s3 sync out/ s3://upepo-labs-website --delete

# Make public (optional - use CloudFront instead for production)
aws s3api put-bucket-policy --bucket upepo-labs-website --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::upepo-labs-website/*"
  }]
}'
```

---

## Push to GitHub First

If you haven't already:

```powershell
# Initialize git (if needed)
git init

# Add all files
git add .

# Commit
git commit -m "feat: initial Upepo Labs website"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/LizaImmax/Upepo-Labs.git

# Push to main branch
git branch -M main
git push -u origin main
```

---

## Post-Deployment Checklist

After deploying, do these:

1. **Test the live site**
   - Check all pages load
   - Test mobile responsiveness
   - Verify dark mode works
   - Click all navigation links

2. **Configure Custom Domain** (if you have one)
   
   **For Vercel:**
   - Go to Vercel Dashboard → Project Settings → Domains
   - Add domain: `upepo-labs.com`
   - Update DNS records as instructed
   
   **DNS Records:**
   ```
   A     @       76.76.21.21
   CNAME www     cname.vercel-dns.com
   ```

3. **Set up Analytics** (optional)
   
   Add to `src/app/layout.tsx`:
   ```typescript
   import { Analytics } from '@vercel/analytics/react'
   
   <body>
     {children}
     <Analytics />
   </body>
   ```

4. **Enable Automatic Deployments**
   - Already configured! Every push to `main` deploys automatically
   - Pull requests get preview deployments

---

## Quick Health Check

After deployment, verify:

✅ Homepage loads at your URL  
✅ All navigation links work  
✅ Projects page displays  
✅ Research page displays  
✅ Events page displays  
✅ About page displays  
✅ Dark mode toggles correctly  
✅ Mobile menu works  
✅ Footer links work  

---

## Share Your Site

Once deployed, share it:

```
🌬️ Upepo Labs is live!

Where Innovation Takes Flight — A research, innovation, and 
experimentation hub for cloud, AI, and open-source projects.

🔗 https://upepo-labs.vercel.app (or your custom domain)

#UpepoLabs #CloudComputing #OpenSource #Innovation
```

---

## Need Help?

**Deployment issues?**
- Check `docs/DEPLOYMENT.md` for detailed guides
- Review build logs in Vercel dashboard
- Ensure all dependencies installed: `npm install`

**Build errors?**
```powershell
npm run type-check
npm run lint
npm run build
```

---

**🎉 You're ready to deploy! Choose your platform and run the commands above.**
