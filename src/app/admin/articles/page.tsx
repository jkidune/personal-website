import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getArchiveIndex, formatArchiveDate } from "@/lib/archive";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  const articles = getArchiveIndex();

  return (
    <main className="admin-content">
      <section className="admin-dashboard-head admin-dashboard-head-row">
        <div>
          <p className="eyebrow">Publishing</p>
          <h1>Articles</h1>
          <p>
            The live archive still reads the local Medium JSON collection. Sanity contains an
            article schema, but Studio edits are not yet the live source.
          </p>
        </div>
        <Link href="/studio" target="_blank" className="button button-light">
          Open prepared CMS ↗
        </Link>
      </section>

      <div className="admin-source-note card">
        <strong>Current publishing source: local JSON</strong>
        <p>
          This page is intentionally read-only until the public archive is switched to
          Sanity with JSON fallback.
        </p>
      </div>

      <section className="admin-content-list">
        {articles.map((article) => (
          <article className="admin-content-row card" key={article.slug}>
            <div>
              <span className="admin-content-type">{article.category || "Article"}</span>
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
            </div>
            <div className="admin-content-row-meta">
              <span>{formatArchiveDate(article.publishedAt)}</span>
              <Link href={`/archive/${article.slug}`} target="_blank">
                Read ↗
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
