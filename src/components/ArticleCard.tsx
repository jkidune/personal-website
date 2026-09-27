import Link from "next/link";
import Image from "next/image";
import { type ArchiveArticle, formatArchiveDate } from "@/lib/archive";
import Icon from "./Icon";
export function articleArtwork(article: ArchiveArticle) {
  return /AI/i.test(article.category || "")
    ? "/images/pastel-orbit.webp"
    : /Design/i.test(article.category || "")
      ? "/images/paper-flow.webp"
      : "/images/editorial-desk.webp";
}
export default function ArticleCard({ article }: { article: ArchiveArticle }) {
  return (
    <Link className="article-card" href={`/archive/${article.slug}`}>
      <div className="article-image">
        <Image
          src={articleArtwork(article)}
          alt=""
          fill
          sizes="(min-width: 1000px) 30vw, (min-width: 700px) 45vw, 100vw"
        />
        <span>{article.category}</span>
      </div>
      <div className="article-card-body">
        <div className="card-meta">
          <span>{formatArchiveDate(article.publishedAt)}</span>
          <span>·</span>
          <span>{article.readTimeMinutes || 3} min read</span>
        </div>
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
        <span className="read-link">
          Read the story <Icon name="arrow" width="17" height="17" />
        </span>
      </div>
    </Link>
  );
}
