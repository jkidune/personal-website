import Link from "next/link";
import { formatArchiveDate, type ArchiveArticle } from "@/lib/archive";

export default function Insights({ articles }: { articles: ArchiveArticle[] }) {
  return (
    <section className="bg-night px-4 py-24 md:py-32">
      <div className="site-shell">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.34fr_1fr]">
          <p className="section-label">Archive</p>
          <h2 className="max-w-4xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.07em] md:text-7xl">
            Notes on communication, AI, design, and learning.
          </h2>
        </div>
        <div className="border-t border-line">
          {articles.slice(0, 3).map((article) => (
            <Link
              key={article.slug}
              href={`/archive/${article.slug}`}
              className="group grid gap-4 border-b border-line py-6 md:grid-cols-[0.18fr_1fr_0.28fr]"
            >
              <span className="section-label">{formatArchiveDate(article.publishedAt)}</span>
              <span className="text-2xl font-bold leading-tight text-ink transition-colors group-hover:text-accent md:text-4xl">
                {article.title}
              </span>
              <span className="text-sm leading-relaxed text-muted">{article.summary}</span>
            </Link>
          ))}
        </div>
        <Link href="/archive" className="editorial-link mt-8 inline-block font-bold">
          View archive
        </Link>
      </div>
    </section>
  );
}
