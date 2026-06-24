import fs from "node:fs";
import path from "node:path";

export type ArchiveBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: number }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; style?: "ordered" | "unordered"; items: string[] };

export type ArchiveArticle = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  readTimeMinutes?: number;
  category?: string;
  tags?: string[];
  featured?: boolean;
  coverImage?: { src?: string | null; alt?: string };
  content?: ArchiveBlock[];
  source?: { originalUrl?: string };
};

const archiveRoot = path.join(process.cwd(), "public", "medium_articles_json");

export function getArchiveIndex() {
  const indexPath = path.join(archiveRoot, "articles-index.json");
  const json = JSON.parse(fs.readFileSync(indexPath, "utf8")) as {
    articles: Array<ArchiveArticle & { file: string }>;
  };

  return json.articles.sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getArchiveArticles() {
  return getArchiveIndex().map((item) => getArchiveArticle(item.slug) || item);
}

export function getArchiveArticle(slug: string) {
  const filePath = path.join(archiveRoot, "articles", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as ArchiveArticle;
}

export function formatArchiveDate(date?: string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
