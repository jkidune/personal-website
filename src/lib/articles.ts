import { cache } from "react";
import { unstable_cache } from "next/cache";
import {
  getArchiveArticles,
  type ArchiveArticle,
} from "@/lib/archive";
import { client } from "@/sanity/lib/client";
import { articlesQuery } from "@/sanity/lib/queries";
import type { Article } from "@/sanity/types";

function toWebsiteArticle(article: Article): ArchiveArticle {
  return {
    id: article._id,
    slug: article.slug,
    title: article.title,
    summary: article.excerpt || "",
    publishedAt: article.publishedAt || article._createdAt || "",
    readTimeMinutes: article.readTimeMinutes,
    category: article.category || article.tag || article.tags?.[0],
    tags: article.tags,
    coverImage: {
      src: article.coverUrl,
      alt: article.coverAlt || article.title,
    },
    content: article.content,
    source: { originalUrl: article.originalUrl },
  };
}

const loadPublishedArticles = unstable_cache(
  async (): Promise<ArchiveArticle[]> => {
    const localArticles = getArchiveArticles();

    try {
      const cmsArticles = await client
        .withConfig({ maxRetries: 0 })
        .fetch<Article[]>(articlesQuery, {}, { timeout: 5000 });
      const articlesBySlug = new Map(
        localArticles.map((article) => [article.slug, article]),
      );

      for (const article of cmsArticles) {
        articlesBySlug.set(article.slug, toWebsiteArticle(article));
      }

      return [...articlesBySlug.values()].sort(
        (left, right) =>
          new Date(right.publishedAt).getTime() -
          new Date(left.publishedAt).getTime(),
      );
    } catch {
      console.warn("Sanity articles are unavailable; serving the local archive.");
      return localArticles;
    }
  },
  ["published-portfolio-articles"],
  { revalidate: 60 },
);

export const getPublishedArticles = cache(loadPublishedArticles);

export async function getPublishedArticle(slug: string) {
  const articles = await getPublishedArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}
