import { groq } from "next-sanity";

const projectFields = groq`
  _id,
  title,
  "slug": slug.current,
  category,
  client,
  industry,
  description,
  fullDescription,
  "coverUrl": coverImage.asset->url,
  "coverAlt": coverImage.alt,
  liveUrl,
  githubUrl,
  behanceUrl,
  vimeoUrl,
  techStack,
  services,
  challenge,
  approach,
  deliverables,
  outcome,
  "gallery": gallery[]{
    "url": asset->url,
    "alt": alt,
    "caption": caption,
    "metadata": asset->metadata
  },
  featured,
  sortOrder,
  role,
  year,
  location,
  publishedAt,
  _createdAt
`;

const articleFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  tag,
  tags,
  category,
  readTimeMinutes,
  originalUrl,
  "coverUrl": coverImage.asset->url,
  "coverAlt": coverImage.alt,
  publishedAt,
  _createdAt
`;

export const projectsQuery = groq`
  *[_type == "project" && defined(slug.current)] | order(coalesce(sortOrder, 9999) asc, coalesce(publishedAt, _createdAt) desc) {
    ${projectFields}
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && defined(slug.current)] | order(coalesce(featured, false) desc, coalesce(sortOrder, 9999) asc, coalesce(publishedAt, _createdAt) desc)[0...4] {
    ${projectFields}
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    ${projectFields}
  }
`;

export const relatedProjectsQuery = groq`
  *[_type == "project" && slug.current != $slug && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)[0...2] {
    ${projectFields}
  }
`;

export const articlesQuery = groq`
  *[_type == "article" && defined(slug.current) && published != false] | order(coalesce(publishedAt, _createdAt) desc) {
    ${articleFields}
  }
`;

export const latestArticlesQuery = groq`
  *[_type == "article" && defined(slug.current) && published != false] | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
    ${articleFields}
  }
`;

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug && published != false][0] {
    ${articleFields}
  }
`;

export const relatedArticlesQuery = groq`
  *[_type == "article" && slug.current != $slug && defined(slug.current) && published != false] | order(coalesce(publishedAt, _createdAt) desc)[0...3] {
    ${articleFields}
  }
`;
