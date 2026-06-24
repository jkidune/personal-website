import Link from "next/link";
import { notFound } from "next/navigation";
import { formatArchiveDate, getArchiveArticle, getArchiveIndex } from "@/lib/archive";

type ArchivePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getArchiveIndex().map((article) => ({ slug: article.slug }));
}

export default async function ArchiveArticlePage({ params }: ArchivePageProps) {
  const { slug } = await params;
  const article = getArchiveArticle(slug);
  if (!article) notFound();
  const all = getArchiveIndex();
  const index = all.findIndex((item) => item.slug === slug);
  const next = all[(index + 1) % all.length];

  return (
    <main className="min-h-screen bg-night px-4 pb-24 pt-32">
      <article className="mx-auto max-w-4xl">
        <Link href="/archive" className="editorial-link mb-10 inline-block text-sm font-bold">Back to archive</Link>
        <header className="mb-12">
          <p className="section-label mb-5">
            {[formatArchiveDate(article.publishedAt), article.category, article.readTimeMinutes ? `${article.readTimeMinutes} min read` : ""].filter(Boolean).join(" / ")}
          </p>
          <h1 className="text-5xl font-black uppercase leading-[0.92] tracking-[-0.06em] md:text-8xl">{article.title}</h1>
          <p className="mt-8 text-2xl font-bold leading-tight text-muted">{article.summary}</p>
        </header>

        <div className="placeholder-media mb-12 aspect-[16/8] min-h-0">
          <span className="section-label">{article.coverImage?.alt || article.category || "Medium article"}</span>
        </div>

        <div className="prose-editorial">
          {article.content?.map((block, idx) => {
            if (block.type === "heading") {
              const Tag = block.level === 3 ? "h3" : "h2";
              return <Tag key={idx}>{block.text}</Tag>;
            }
            if (block.type === "quote") {
              return <blockquote key={idx}>{block.text}{block.attribution ? <cite> {block.attribution}</cite> : null}</blockquote>;
            }
            if (block.type === "list") {
              const List = block.style === "ordered" ? "ol" : "ul";
              return <List key={idx}>{block.items.map((item) => <li key={item}>{item}</li>)}</List>;
            }
            return <p key={idx}>{block.text}</p>;
          })}
        </div>

        <footer className="mt-16 border-t border-line pt-8">
          <div className="flex flex-wrap items-center justify-between gap-6">
            {article.source?.originalUrl ? (
              <a href={article.source.originalUrl} target="_blank" rel="noreferrer" className="editorial-link font-bold">
                Originally published on Medium
              </a>
            ) : <span />}
            {next ? <Link href={`/archive/${next.slug}`} className="editorial-link font-bold">Next article</Link> : null}
          </div>
        </footer>
      </article>
    </main>
  );
}
