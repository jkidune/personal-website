import type { PortableTextBlock } from "next-sanity";

export type Project = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  description?: string;
  fullDescription?: string;
  coverUrl?: string;
  coverAlt?: string;
  liveUrl?: string;
  githubUrl?: string;
  techStack?: string[];
  featured?: boolean;
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
  coverUrl?: string;
  coverAlt?: string;
  publishedAt?: string;
  _createdAt?: string;
};
