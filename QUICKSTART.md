# 🚀 Quick Start Guide - Upepo Labs

Welcome to Upepo Labs! This guide will get you up and running in minutes.

---

## ✅ What's Been Built

### Complete MVP Website
- ✅ **Homepage** with hero, features, stats, and CTAs
- ✅ **Projects Page** with searchable project directory
- ✅ **Research Page** with publications and whitepapers
- ✅ **Events Page** with hackathons and workshops
- ✅ **About Page** with mission, vision, and values
- ✅ **Responsive Design** (mobile, tablet, desktop)
- ✅ **Dark Mode Support** (automatic based on system preference)

### Documentation
- ✅ `README.md` - Project overview and setup
- ✅ `CONTRIBUTING.md` - Contribution guidelines
- ✅ `LICENSE` - Apache 2.0 license
- ✅ `ARCHITECTURE.md` - Technical architecture
- ✅ `DEPLOYMENT.md` - Deployment guide

### Infrastructure & CI/CD
- ✅ GitHub Actions workflow for CI
- ✅ ESLint + Prettier configuration
- ✅ TypeScript type checking
- ✅ Tailwind CSS theming
- ✅ Issue templates (bug, feature, project submission)

---

## 🎯 Next Steps (For You)

### 1. Run the Development Server (Already Running!)

The server is live at: **http://localhost:3000**

```powershell
# If you need to restart:
npm run dev
```

### 2. Explore the Site

Navigate to:
- **Homepage:** http://localhost:3000
- **Projects:** http://localhost:3000/projects
- **Research:** http://localhost:3000/research
- **Events:** http://localhost:3000/events
- **About:** http://localhost:3000/about

### 3. Customize Content

**Update the homepage stats:**
- Edit `src/app/page.tsx` (lines 15-36)

**Add real projects:**
- Edit `src/app/projects/page.tsx` (SAMPLE_PROJECTS array)

**Add research papers:**
- Edit `src/app/research/page.tsx` (RESEARCH_PAPERS array)

**Add events:**
- Edit `src/app/events/page.tsx` (UPCOMING_EVENTS, PAST_EVENTS)

### 4. Customize Branding

**Colors (Upepo theme):**
- Edit `tailwind.config.js` (upepo colors: 50-950)

**Fonts:**
- Edit `src/app/layout.tsx` (currently: Inter + JetBrains Mono)

**Logo:**
- Replace 🧪 emoji with your logo in:
  - `src/components/Header.tsx`
  - `src/components/Footer.tsx`
  - `src/app/layout.tsx` (metadata)

### 5. Push to GitHub

```powershell
# Initialize git (if not already)
git init
git add .
git commit -m "feat: initial Upepo Labs website"

# Add remote and push
git remote add origin https://github.com/LizaImmax/Upepo-Labs.git
git branch -M main
git push -u origin main
```

### 6. Deploy to Vercel (Recommended)

**Option A: Vercel CLI**
```powershell
npm i -g vercel
vercel login
vercel --prod
```

**Option B: Vercel Dashboard**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repo
3. Click "Deploy" (Vercel auto-detects Next.js!)

Your site will be live at: `https://upepo-labs.vercel.app`

---

## 📂 Project Structure

```
Upepo-Labs/
├── src/
│   ├── app/                    # Pages (Next.js App Router)
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── projects/page.tsx   # Projects page
│   │   ├── research/page.tsx   # Research page
│   │   ├── events/page.tsx     # Events page
│   │   ├── about/page.tsx      # About page
│   │   └── globals.css         # Global styles
│   └── components/             # Reusable components
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── Hero.tsx
│       ├── Features.tsx
│       ├── ProjectShowcase.tsx
│       └── CallToAction.tsx
├── public/                     # Static assets (add images here)
├── docs/                       # Documentation
│   ├── ARCHITECTURE.md
│   └── DEPLOYMENT.md
├── .github/                    # GitHub config
│   ├── workflows/ci.yml
│   └── ISSUE_TEMPLATE/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

---

## 🛠️ Common Tasks

### Add a New Page

```powershell
# Create new folder in src/app/
mkdir src\app\new-page
# Create page.tsx
New-Item src\app\new-page\page.tsx
```

### Add a New Component

```powershell
# Create component in src/components/
New-Item src\components\MyComponent.tsx
```

### Build for Production

```powershell
npm run build
npm start
```

### Run Tests (Future)

```powershell
npm test
```

### Lint & Format

```powershell
npm run lint
npm run format
```

---

## 🎨 Customization Ideas

### 1. Add Your Logo
- Replace 🧪 emoji with `<Image>` component
- Add logo files to `public/logo.png`

### 2. Update Meta Tags
- Edit `src/app/layout.tsx` (metadata object)
- Add Open Graph images

### 3. Add a Blog
- Create `src/app/blog/page.tsx`
- Use MDX for markdown content

### 4. Add Contact Form
- Create `src/app/contact/page.tsx`
- Use React Hook Form + serverless function

### 5. Integrate CMS (Future)
- Contentful, Sanity, or Strapi
- For dynamic content management

---

## 📊 Analytics & Monitoring (Optional)

### Vercel Analytics
```javascript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

<body>
  {children}
  <Analytics />
</body>
```

### Google Analytics
Add to `src/app/layout.tsx`:
```html
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
```

---

## 🐛 Troubleshooting

**TypeScript errors:**
```powershell
npm run type-check
```

**Styling issues:**
```powershell
# Rebuild Tailwind
npm run dev
```

**Port 3000 in use:**
```powershell
$env:PORT=3001; npm run dev
```

---

## 📞 Get Help

- **Documentation:** See `docs/` folder
- **GitHub Issues:** Report bugs or request features
- **GitHub Discussions:** Ask questions

---

## 🎯 Roadmap

### Phase 1: MVP (Current - Week 1-2)
- [x] Core website pages
- [x] Responsive design
- [x] Documentation
- [x] CI/CD pipeline
- [ ] Deploy to production

### Phase 2: Dynamic Features (Week 3-4)
- [ ] Project submission API
- [ ] PostgreSQL database
- [ ] Admin dashboard
- [ ] User authentication

### Phase 3: Community (Month 2)
- [ ] GitHub integration
- [ ] Event registration
- [ ] Email notifications
- [ ] Newsletter

### Phase 4: Advanced (Month 3+)
- [ ] Real-time collaboration
- [ ] AI-powered project matching
- [ ] Multi-language support
- [ ] Advanced analytics

---

## ✨ What Makes This Special

✅ **Production-Ready:** Not just a template — a complete, deployable website  
✅ **Modern Stack:** Next.js 14, TypeScript, Tailwind CSS  
✅ **Best Practices:** ESLint, Prettier, GitHub Actions, semantic commits  
✅ **Multi-Cloud Ready:** Terraform-friendly architecture  
✅ **Well-Documented:** Comprehensive guides and inline comments  
✅ **Community-First:** Built for collaboration and open source  

---

## 🌬️ Let's Build Something Amazing!

Your Upepo Labs website is ready to take flight. Start customizing, add your content, and deploy it to the world.

**Questions?** Check the docs or open a GitHub Discussion.

**Happy building! 🚀**
