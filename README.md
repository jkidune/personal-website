# Joseph Masonda Portfolio

Premium personal portfolio for Joseph Masonda, built with Next.js App Router, Tailwind CSS, Sanity CMS, local Medium JSON archives, and OpenNext for Cloudflare deployment.

## Setup

```bash
npm install
npm run dev
```

Main routes:

- `/` - editorial landing page
- `/work` - Sanity-powered project index
- `/work/[slug]` - Sanity-powered project detail
- `/about` - CV-derived biography, experience, capabilities, and tools
- `/archive` - local Medium JSON article index
- `/archive/[slug]` - local Medium JSON article detail
- `/contact` - accessible contact form with Resend backend fallback behavior

## Environment Variables

Sanity reads these values, with local defaults already present for the current project:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=36x1zm20
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-06-16
SANITY_API_TOKEN=...
```

Contact form email uses:

```bash
RESEND_API_KEY=...
```

If `RESEND_API_KEY` is missing, the API returns an error and the UI prompts visitors to email Joseph directly.

## Import Commands

Dry-run commands are the default package scripts:

```bash
npm run import:projects
npm run import:articles
```

Write-mode commands require `SANITY_API_TOKEN` or `SANITY_WRITE_TOKEN`:

```bash
npm run import:projects:write
npm run import:articles:write
```

The project importer reads:

```text
public/Joseph_Masonda_Portfolio_Content_System.xlsx
```

Expected spreadsheet headers are matched case-insensitively. Useful headers include:

```text
Project / Content Title
Type
Live / Repo / Read URL
Date / Year
Client / Organisation / Sector
Role / Contribution
Capabilities Shown
Tools / Stack
Problem / Goal
Portfolio Story Angle
Public Evidence / Result
Recommended Website Placement
```

The importer creates or updates spreadsheet-owned fields only. It does not overwrite cover images, gallery images, or manually written body content.

The article importer reads:

```text
public/medium_articles_json/articles/*.json
```

It preserves article titles, summaries, dates, tags, reading time, content blocks, and original Medium URLs.

## Content Workflow

Add and edit production projects in Sanity Studio:

```bash
npm run studio
```

For a new project, create a `Project` document with title, slug, category, description, cover image, role, year, services, tools, and any richer case-study fields available. Gallery images can be added later without changing code.

Archive articles currently render from local JSON files for reliability. To sync them into Sanity, run the article import command above.

## Images

Personal images and documents live in `public/`. Keep originals intact. Add optimized project images through Sanity where possible so Next.js can render responsive assets from the CMS image URLs.

## QA

Verified during implementation:

```bash
npm run import:articles
npm run import:projects
npm run build
```
