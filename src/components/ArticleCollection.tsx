"use client";
import { useState } from "react";
import type { ArchiveArticle } from "@/lib/archive";
import ArticleCard from "./ArticleCard";
const filters = [
  "All stories",
  "AI & technology",
  "Learning & community",
  "Design",
  "Agriculture",
];
function group(article: ArchiveArticle) {
  if (/AI/i.test(article.category || "")) return "AI & technology";
  if (/Design/i.test(article.category || "")) return "Design";
  if (/Agriculture/i.test(article.category || "")) return "Agriculture";
  return "Learning & community";
}
export default function ArticleCollection({
  articles,
}: {
  articles: ArchiveArticle[];
}) {
  const [filter, setFilter] = useState("All stories");
  const filtered =
    filter === "All stories"
      ? articles
      : articles.filter((article) => group(article) === filter);
  return (
    <>
      <div className="filter-row">
        <div className="filter-tabs" role="group" aria-label="Filter stories">
          {filters.map((value) => (
            <button
              key={value}
              aria-pressed={value === filter}
              onClick={() => setFilter(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <span className="filter-count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "story" : "stories"}
        </span>
      </div>
      <div className="article-grid collection-grid">
        {filtered.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </>
  );
}
