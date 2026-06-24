import type { PortableTextBlock } from "next-sanity";

export type Project = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  client?: string;
  industry?: string;
  description?: string;
  fullDescription?: string;
  coverUrl?: string;
  coverAlt?: string;
  liveUrl?: string;
  githubUrl?: string;
  behanceUrl?: string;
  vimeoUrl?: string;
  techStack?: string[];
  services?: string[];
  challenge?: string;
  approach?: string;
  deliverables?: string[];
  outcome?: string;
  gallery?: Array<{
    url?: string;
    alt?: string;
    caption?: string;
    metadata?: unknown;
  }>;
  featured?: boolean;
  sortOrder?: number;
  role?: string;
  year?: number;
  location?: string;
  publishedAt?: string;
  _createdAt?: string;
};

export type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: PortableTextBlock[];
  tag?: string;
  tags?: string[];
  category?: string;
  readTimeMinutes?: number;
  originalUrl?: string;
  coverUrl?: string;
  coverAlt?: string;
  publishedAt?: string;
  _createdAt?: string;
};
