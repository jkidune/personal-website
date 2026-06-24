# Medium Article JSON Import Pack

This folder contains 10 website-ready article JSON files prepared from Joseph Masonda’s Medium profile.

## Files

- `articles/`: one JSON file per article.
- `articles-index.json`: article card/index data for an articles page.
- `article.schema.json`: optional validation schema for the article format.

## Content model

Each article file includes:

- `title`, `slug`, `summary`, publication date and estimated reading time
- author, category, tags and SEO metadata
- a structured `content` array using `paragraph`, `heading`, `quote` and `list` blocks
- original Medium link under `source.originalUrl`
- optional `externalLinks`
- a `coverImage` object with `src: null`

## Before publishing

1. Add a cover image to `coverImage.src`, ideally using a local website path such as:
   `/images/articles/your-article-slug.jpg`
2. Add meaningful `coverImage.alt` text.
3. Keep the `source.originalUrl` if you want to preserve the original publication reference; remove it if your website should show only the portfolio version.
4. Render `content` by checking its `type`:
   - `paragraph` → paragraph text
   - `heading` → heading using `level`
   - `quote` → blockquote with optional attribution
   - `list` → ordered or unordered list, using `style`

The content has been organised for website display, with headings, lists and quotes separated into renderable blocks.
