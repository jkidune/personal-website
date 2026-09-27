import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatArchiveDate,
  getArchiveArticle,
  getArchiveIndex,
} from "@/lib/archive";
import { articleArtwork } from "@/components/ArticleCard";
import Icon from "@/components/Icon";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return getArchiveIndex().map((article) => ({ slug: article.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArchiveArticle((await params).slug);
  return { title: article?.title || "Story", description: article?.summary };
}
export default async function ArchiveArticlePage({ params }: Props) {
  const article = getArchiveArticle((await params).slug);
  if (!article) notFound();
  const articles = getArchiveIndex();
  const next =
    articles[
      (articles.findIndex((item) => item.slug === article.slug) + 1) %
        articles.length
    ];
  return (
    <main className="page">
      <Link href="/archive" className="detail-back">
        <Icon name="back" width="16" height="16" />
        All stories
      </Link>
      <article className="reading-card card">
        <header className="detail-header">
          <span className="eyebrow">{article.category}</span>
          <h1>{article.title}</h1>
          <div className="card-meta">
            <span>Joseph Masonda</span>
            <span>·</span>
            <span>{formatArchiveDate(article.publishedAt)}</span>
            <span>·</span>
            <span>{article.readTimeMinutes} min read</span>
          </div>
          <p style={{ marginTop: 20 }}>{article.summary}</p>
        </header>
        <div className="detail-cover">
          <Image
            src={articleArtwork(article)}
            alt=""
            fill
            priority
            sizes="(min-width: 960px) 700px, 100vw"
          />
        </div>
        <div className="prose-editorial">
          {article.content?.map((block, index) => {
            if (block.type === "heading") {
              const Tag = block.level === 3 ? "h3" : "h2";
              return <Tag key={index}>{block.text}</Tag>;
            }
            if (block.type === "quote")
              return (
                <blockquote key={index}>
                  {block.text}
                  {block.attribution && <cite> {block.attribution}</cite>}
                </blockquote>
              );
            if (block.type === "list") {
              const List = block.style === "ordered" ? "ol" : "ul";
              return (
                <List key={index}>
                  {block.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </List>
              );
            }
            return <p key={index}>{block.text}</p>;
          })}
        </div>
        <footer className="article-end">
          {article.source?.originalUrl && (
            <a
              href={article.source.originalUrl}
              className="text-link"
              target="_blank"
              rel="noreferrer"
            >
              Originally on Medium
              <Icon name="arrow" width="16" height="16" />
            </a>
          )}
          {next && (
            <Link href={`/archive/${next.slug}`} className="text-link">
              Next story
              <Icon name="right" width="16" height="16" />
            </Link>
          )}
        </footer>
      </article>
    </main>
  );
}
