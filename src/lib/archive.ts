// Static JSON imports — bundled at build time, compatible with Cloudflare Workers edge runtime.
// Do NOT use fs.readFileSync here; Cloudflare Workers cannot read the filesystem at request time.

import articlesIndex from "../../public/medium_articles_json/articles-index.json";

import article_50years from "../../public/medium_articles_json/articles/50-years-of-the-institute-of-adult-education-a-nations-promise-renewed.json";
import article_aiBusiness from "../../public/medium_articles_json/articles/ai-in-business-a-beginners-guide-to-boost-your-income-and-growth.json";
import article_automating from "../../public/medium_articles_json/articles/automating-workflows-from-community-to-ministries-with-ai-as-drivers.json";
import article_cardamom from "../../public/medium_articles_json/articles/cardamom-farming-the-green-gold-of-the-tropics.json";
import article_hobbyToPassion from "../../public/medium_articles_json/articles/from-hobby-to-passion-tanzanian-ui-ux-designer-overcomes-challenges-to-pursue-passion.json";
import article_communicationAI from "../../public/medium_articles_json/articles/how-can-communication-experts-incorporate-ai-into-their-daily-work.json";
import article_mojaplatform from "../../public/medium_articles_json/articles/how-can-we-use-the-moja-platform-in-tanzania.json";
import article_chatgpt4o from "../../public/medium_articles_json/articles/how-chatgpt-4os-image-generator-is-a-game-changer-for-tanzanias-creative-and-marketing-industries.json";
import article_communityLearning from "../../public/medium_articles_json/articles/how-the-community-learning-centre-is-helping-adult-learners-achieve-sustainable-success.json";
import article_youngWomen from "../../public/medium_articles_json/articles/young-women-striving-in-agriculture-business.json";

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

// Map slug -> article data for O(1) lookup
const articleMap: Record<string, ArchiveArticle> = {
  "50-years-of-the-institute-of-adult-education-a-nations-promise-renewed": article_50years as ArchiveArticle,
  "ai-in-business-a-beginners-guide-to-boost-your-income-and-growth": article_aiBusiness as ArchiveArticle,
  "automating-workflows-from-community-to-ministries-with-ai-as-drivers": article_automating as ArchiveArticle,
  "cardamom-farming-the-green-gold-of-the-tropics": article_cardamom as ArchiveArticle,
  "from-hobby-to-passion-tanzanian-ui-ux-designer-overcomes-challenges-to-pursue-passion": article_hobbyToPassion as ArchiveArticle,
  "how-can-communication-experts-incorporate-ai-into-their-daily-work": article_communicationAI as ArchiveArticle,
  "how-can-we-use-the-moja-platform-in-tanzania": article_mojaplatform as ArchiveArticle,
  "how-chatgpt-4os-image-generator-is-a-game-changer-for-tanzanias-creative-and-marketing-industries": article_chatgpt4o as ArchiveArticle,
  "how-the-community-learning-centre-is-helping-adult-learners-achieve-sustainable-success": article_communityLearning as ArchiveArticle,
  "young-women-striving-in-agriculture-business": article_youngWomen as ArchiveArticle,
};

export function getArchiveIndex(): ArchiveArticle[] {
  return [...(articlesIndex.articles as ArchiveArticle[])].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });
}

export function getArchiveArticles(): ArchiveArticle[] {
  return getArchiveIndex().map((item) => getArchiveArticle(item.slug) || item);
}

export function getArchiveArticle(slug: string): ArchiveArticle | null {
  return articleMap[slug] ?? null;
}

export function formatArchiveDate(date?: string): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
