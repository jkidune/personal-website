# Dashboard portfolio redesign

## Design

The supplied references guide a single design system: warm grey canvas (#f5f5f4), slightly darker sidebar (#eeedeb), white cards, charcoal text (#202020), and a restrained lavender selection state (#e7e3f4). Inter Variable is packaged locally; the screenshots do not identify their original typeface, so Inter is a close visual match rather than a claim of exact font identification. Shared components cover navigation, headings, project cards, article cards, and filters. The sidebar becomes a collapsible navigation panel on small screens.

Overview, projects, project detail, about, writing, article detail, contact, error, and 404 surfaces use the same system. Existing /works and /insights URLs redirect to the canonical routes. Calendly, CV download, email, and external portfolio links remain available.

## Content

Sanity remains the primary project source. If the dataset is empty or unreachable, `src/data/portfolio-projects.json` provides five curated personal projects/concepts from the existing `public/Joseph_Masonda_Portfolio_Content_System.xlsx` (records PT-003, PT-004, PT-008, PT-006, PT-007). These records have N/A in the spreadsheet's client-permission column. Planning scores, unconfirmed client work, outcomes, metrics, and unverified roles are not published. Descriptions are condensed from the source. Concepts remain explicitly labelled as concepts. When Sanity has projects, it replaces the fallback collection.

Writing continues to use the ten existing local JSON articles. Filters operate on actual content; there are no invented project statuses, clients, testimonials, or dashboard activity metrics.

## Generated imagery

Generated with the built-in image generation tool, then losslessly retained as originals outside the repository and encoded as WebP for delivery. All three assets total approximately 245 KiB. These are decorative editorial artworks, not screenshots or evidence of client deliverables. Existing CMS cover images take priority over abstract fallback artwork.

- `public/images/paper-flow.webp`: "Create a refined macro 3D sculpture of flowing white paper layers, sculpted ribbons and delicate topographic folds. Full bleed, gently diagonal rhythmic curves, soft studio lighting with subtle grey shadows, almost monochromatic porcelain white. Landscape 3:2. No text, logos, frames, UI, watermark."
- `public/images/pastel-orbit.webp`: "Create a premium abstract 3D composition: a smooth floating lavender sphere encircled by one sweeping translucent icy blue orbital ribbon, smaller pearl nearby, soft lilac and pale cyan background with tiny pale butter yellow highlights. Dreamy diffuse studio lighting, satin surfaces, minimal airy composition. Landscape 3:2, full bleed. No text, logos, UI, frames, watermark."
- `public/images/editorial-desk.webp`: "Photorealistic still life of a small stack of neutral cream and pale sage books, a single translucent sculptural glass object on top and a closed cream notebook with black pen beside it, arranged on a warm grey plinth. Soft afternoon sunlight, sculptural shadows, warm off-white background. Landscape 3:2. Blank book covers, no lettering, logos, UI, people, or watermark."

## Contact

Native form validation and server-side validation cover field types, lengths, email format, malformed JSON, and oversized requests. The endpoint escapes HTML, retains the honeypot, and verifies the Resend result before claiming success. No real email is sent during automated verification. `RESEND_API_KEY` is required; `CONTACT_FROM_EMAIL` can optionally specify a verified sender. The existing onboarding sender remains the default. When email is unavailable, visitors see a direct-email fallback.

## Build and deployment

The existing OpenNext / Cloudflare Workers configuration and production route are preserved. A lockfile repair adds missing nested @emnapi entries required for clean installation without upgrading existing dependency versions. Inter is the sole new application dependency.

See the pull request for verification results and the status of remote build/deployment checks. This branch is for review; opening a PR does not itself prove production deployment.
