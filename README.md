# josephmasonda.qzz.io — Personal Portfolio

Personal portfolio and digital presence of Joseph Masonda — communications professional, digital marketer, and conservation tech advocate based in Dar es Salaam, Tanzania.

**Live site:** [josephmasonda.qzz.io](https://josephmasonda.qzz.io)

---

## About

This portfolio showcases 7+ years of work across digital marketing, communications, web development, and conservation technology. Built as a CMS-driven site where projects and articles are managed directly from a database — no code changes needed to publish new content.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + inline styles |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase RLS |
| Email | Resend |
| Hosting | Vercel |
| Domain | Cloudflare DNS |

---

## Features

- **Dynamic Projects** — Works pulled from Supabase with individual project pages
- **Dynamic Articles** — Insights with full article pages at `/insights/[slug]`
- **Contact Form** — Saves to Supabase and sends email notification via Resend
- **CMS-driven** — Add new projects and articles directly from Supabase table editor
- **Scroll animations** — IntersectionObserver-powered reveal effects
- **Custom favicon** — Branded J. icon across all devices

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, works, about, testimonials, insights, CTA |
| `/works` | All projects with category filtering |
| `/works/[slug]` | Individual project page with tech stack and related projects |
| `/insights` | All articles with tag filtering |
| `/insights/[slug]` | Full article page |
| `/contact` | Contact form with service and budget selection |

---

## Database Schema

### `projects`
```sql
id, title, slug, category, description, full_description,
cover_url, live_url, github_url, tech_stack, featured, created_at
```

### `articles`
```sql
id, title, slug, excerpt, content, tag,
cover_url, published, created_at
```

### `contacts`
```sql
id, name, email, service, budget, message, created_at
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Supabase project
- A Resend account

### Installation
```bash
git clone https://github.com/jkidune/personal-website.git
cd personal-website
npm install
```

### Environment Variables

Create a `.env.local` file in the root:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
RESEND_API_KEY=re_your-resend-key
```

### Run locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Deploy

Push to `main` — Vercel auto-deploys on every commit.

Make sure your environment variables are added in **Vercel → Project Settings → Environment Variables**.

---

## Content Management

All content is managed through the Supabase table editor — no code changes needed.

**To publish a new article:**
1. Go to Supabase → Table Editor → `articles`
2. Insert a new row with `published = true`
3. The article appears live immediately

**To add a new project:**
1. Go to Supabase → Table Editor → `projects`
2. Insert a new row with `featured = true` to show on homepage

---

## Project Structure
```
src/
  app/
    page.tsx                  # Homepage
    contact/page.tsx          # Contact page
    works/page.tsx            # All projects
    works/[slug]/page.tsx     # Individual project
    insights/page.tsx         # All articles
    insights/[slug]/page.tsx  # Individual article
    api/contact/route.ts      # Email API route
    layout.tsx                # Root layout + fonts
    globals.css               # Design tokens + global styles
  components/
    Navbar.tsx
    Hero.tsx
    Marquee.tsx
    Works.tsx
    About.tsx
    Testimonials.tsx
    Insights.tsx
    CTA.tsx
    Footer.tsx
  lib/
    supabase.ts               # Supabase client
```

---

## License

All rights reserved © 2026 Joseph Masonda.  
Code is open for reference but not for reuse or redistribution without permission.

---

## Contact

**Joseph Masonda**  
kidunejoseph91@gmail.com  
[josephmasonda.qzz.io](https://josephmasonda.qzz.io)