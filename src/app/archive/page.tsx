import Link from "next/link";
import { formatArchiveDate, getArchiveIndex } from "@/lib/archive";

export default function ArchivePage() {
  const articles = getArchiveIndex();
  const tags = Array.from(new Set(articles.flatMap((article) => article.tags || []))).slice(0, 12);

  return (
    <main className="min-h-screen bg-night px-4 pb-24 pt-32">
      <div className="site-shell">
        <header className="mb-16 grid gap-8 md:grid-cols-[1fr_0.34fr] md:items-end">
          <div>
            <p className="section-label mb-5">Archive / {articles.length} articles</p>
            <h1 className="text-7xl font-black uppercase leading-[0.86] tracking-[-0.075em] md:text-[12rem]">Archive</h1>
          </div>
          <p className="text-sm leading-relaxed text-muted">{tags.join(" / ")}</p>
        </header>

        <div className="border-t border-line">
          {articles.map((article) => (
            <Link key={article.slug} href={`/archive/${article.slug}`} className="group grid gap-4 border-b border-line py-6 md:grid-cols-[0.16fr_1fr_0.28fr_0.08fr]">
              <span className="section-label">{formatArchiveDate(article.publishedAt)}</span>
              <span className="text-3xl font-black leading-[0.96] tracking-[-0.04em] text-ink transition-colors group-hover:text-accent md:text-5xl">
                {article.title}
              </span>
              <span className="text-sm leading-relaxed text-muted">{article.summary}</span>
              <span className="text-right text-2xl text-muted transition-colors group-hover:text-accent">-&gt;</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
