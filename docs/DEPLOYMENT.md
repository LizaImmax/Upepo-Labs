# 🚀 Deployment Guide - Upepo Labs

This guide covers deploying the Upepo Labs website to various platforms.

---

## Quick Start (Local Development)

```powershell
# Clone the repository
git clone https://github.com/LizaImmax/Upepo-Labs.git
cd Upepo-Labs

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the site.

---

## Deployment Options

### 1. Vercel (Recommended for MVP)

**Why Vercel?**
- Zero-config deployment for Next.js
- Built-in CDN and edge network
- Automatic HTTPS
- Preview deployments for PRs
- Free tier for open-source projects

**Steps:**

1. **Push to GitHub:**
   ```powershell
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy via Vercel CLI:**
   ```powershell
   # Install Vercel CLI
   npm i -g vercel

   # Login
   vercel login

   # Deploy
   vercel

   # Deploy to production
   vercel --prod
   ```

3. **Or Deploy via Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repo
   - Vercel auto-detects Next.js and deploys!

**Environment Variables (if needed):**
```
# .env.local (for local dev)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Production (set in Vercel dashboard)
NEXT_PUBLIC_SITE_URL=https://upepo-labs.vercel.app
```

---

### 2. Netlify

**Steps:**

1. **Create `netlify.toml`:**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy:**
   ```powershell
   # Install Netlify CLI
   npm i -g netlify-cli

   # Login
   netlify login

   # Deploy
   netlify deploy --prod
   ```

---

### 3. AWS (S3 + CloudFront)

**For static export:**

1. **Update `next.config.js`:**
   ```javascript
   module.exports = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   }
   ```

2. **Build and export:**
   ```powershell
   npm run build
   ```

3. **Deploy to S3:**
   ```powershell
   aws s3 sync out/ s3://upepo-labs-website --delete
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

**Terraform (Infrastructure as Code):**
```hcl
# infrastructure/aws/main.tf
resource "aws_s3_bucket" "website" {
  bucket = "upepo-labs-website"
}

resource "aws_cloudfront_distribution" "website" {
  # ... CloudFront config
}
```

---

### 4. Azure (Static Web Apps)

**Steps:**

1. **Install Azure CLI:**
   ```powershell
   winget install Microsoft.AzureCLI
   ```

2. **Login and deploy:**
   ```powershell
   az login
   az staticwebapp create \
     --name upepo-labs \
     --resource-group upepo-rg \
     --source https://github.com/LizaImmax/Upepo-Labs \
     --location "East US" \
     --branch main \
     --app-location "/" \
     --output-location ".next"
   ```

---

### 5. Google Cloud (Cloud Run)

**Containerized deployment:**

1. **Create `Dockerfile`:**
   ```dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   COPY --from=builder /app/package*.json ./
   COPY --from=builder /app/.next ./.next
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/node_modules ./node_modules
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Deploy:**
   ```powershell
   gcloud run deploy upepo-labs \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

---

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) automatically runs on every push and PR:

1. **Linting** (ESLint)
2. **Type Checking** (TypeScript)
3. **Tests** (Jest)
4. **Build** (Next.js)

**To enable auto-deployment to Vercel:**

Add this to `.github/workflows/ci.yml`:

```yaml
  deploy:
    needs: lint-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## Environment Variables

**Required for Production:**

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site | `https://upepo-labs.com` |

**Optional (Future):**

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `GITHUB_TOKEN` | For GitHub API integration |
| `NEXTAUTH_SECRET` | For authentication |

---

## Custom Domain Setup

### Vercel

1. Go to Vercel Dashboard → Project Settings → Domains
2. Add your domain: `upepo-labs.com`
3. Update DNS:
   ```
   A     @       76.76.21.21
   CNAME www     cname.vercel-dns.com
   ```

### Cloudflare (Recommended for DNS)

1. Add site to Cloudflare
2. Point to Vercel:
   ```
   CNAME upepo-labs  cname.vercel-dns.com
   CNAME www         cname.vercel-dns.com
   ```
3. Enable SSL/TLS (Full)

---

## Performance Checklist

- [x] Image optimization (Next.js Image component)
- [x] Font optimization (Google Fonts with display: swap)
- [x] Code splitting (automatic with Next.js)
- [ ] Enable compression (gzip/brotli) - automatic on Vercel
- [ ] Set up CDN caching headers
- [ ] Enable HTTP/2 - automatic on Vercel
- [ ] Monitor Core Web Vitals (Vercel Analytics)

---

## Monitoring & Analytics

**Vercel Analytics (Free):**
```javascript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Google Analytics:**
```javascript
// Add to app/layout.tsx
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

---

## Troubleshooting

**Build fails with TypeScript errors:**
```powershell
npm run type-check
```

**Styling not loading:**
```powershell
npm run build
# Check for Tailwind CSS issues
```

**Port 3000 already in use:**
```powershell
# Use a different port
PORT=3001 npm run dev
```

---

## Multi-Cloud Deployment (Advanced)

For true multi-cloud redundancy:

1. **Primary:** Vercel (global edge network)
2. **Backup:** AWS S3 + CloudFront (static export)
3. **Failover:** Use Cloudflare Load Balancing

**Terraform setup:**
```hcl
# Deploy to all three providers
module "vercel" {
  source = "./infrastructure/vercel"
}

module "aws" {
  source = "./infrastructure/aws"
}

module "azure" {
  source = "./infrastructure/azure"
}
```

---

## Security Best Practices

- [x] HTTPS enforced
- [x] CSP headers configured
- [ ] Rate limiting on API routes (future)
- [ ] DDoS protection via Cloudflare
- [ ] Regular dependency updates (Dependabot)
- [ ] Security scanning (Snyk, GitHub Security)

---

## Support

- **Issues:** [GitHub Issues](https://github.com/LizaImmax/Upepo-Labs/issues)
- **Discussions:** [GitHub Discussions](https://github.com/LizaImmax/Upepo-Labs/discussions)

---

**🌬️ Happy Deploying!**
