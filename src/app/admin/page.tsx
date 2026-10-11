import Link from "next/link";
import { redirect } from "next/navigation";
import AdminHeader from "@/components/AdminHeader";
import Icon from "@/components/Icon";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getContactDb } from "@/lib/cloudflare-runtime";
import { client } from "@/sanity/lib/client";

export const dynamic = "force-dynamic";

type ContentSummary = {
  projects: number;
  posts: number;
  drafts: number;
};

async function getContentSummary(): Promise<ContentSummary | null> {
  try {
    return await client.withConfig({ useCdn: false, maxRetries: 0 }).fetch(
      `{
        "projects": count(*[_type == "project"]),
        "posts": count(*[_type == "article" && published != false]),
        "drafts": count(*[_type == "article" && published == false])
      }`,
      {},
      { timeout: 5000 },
    );
  } catch {
    return null;
  }
}

async function getMessageCount() {
  const db = getContactDb();
  if (!db) return null;

  const result = await db
    .prepare(
      `SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS new_count
      FROM contact_messages`,
    )
    .first<{ total: number; new_count: number }>();

  return {
    total: Number(result?.total ?? 0),
    new: Number(result?.new_count ?? 0),
  };
}

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const [content, messages] = await Promise.all([
    getContentSummary(),
    getMessageCount(),
  ]);

  return (
    <main className="admin-page">
      <AdminHeader active="overview" />
      <section className="admin-dashboard">
        <div className="admin-welcome">
          <div>
            <p className="eyebrow">Portfolio control centre</p>
            <h1>Welcome back, Joseph.</h1>
            <p>
              Publish work, write posts, upload imagery, and manage enquiries
              from one place.
            </p>
          </div>
          <Link className="button button-light" href="/">
            View live portfolio <Icon name="arrow" width="16" height="16" />
          </Link>
        </div>

        <div className="admin-overview-stats" aria-label="Portfolio summary">
          <DashboardStat
            label="Projects"
            value={content?.projects}
            detail="in Sanity"
          />
          <DashboardStat
            label="Published posts"
            value={content?.posts}
            detail={content?.drafts ? `${content.drafts} unpublished` : "in Sanity"}
          />
          <DashboardStat
            label="Messages"
            value={messages?.total}
            detail={messages ? `${messages.new} new` : "database unavailable"}
          />
        </div>

        <section className="admin-section-block" aria-labelledby="content-heading">
          <div className="admin-section-heading">
            <div>
              <p className="eyebrow">Create and manage</p>
              <h2 id="content-heading">Your portfolio content</h2>
            </div>
            <Link href="/admin/content">Open full content studio →</Link>
          </div>
          <div className="admin-action-grid">
            <AdminAction
              icon="work"
              title="Work & projects"
              description="Add case studies, edit project details, upload covers and galleries, and choose featured work."
              primaryLabel="Add new project"
              primaryHref="/admin/content/intent/create/template=project;type=project"
              secondaryLabel="Manage projects"
              secondaryHref="/admin/content/structure/project"
            />
            <AdminAction
              icon="article"
              title="Posts & writing"
              description="Write, edit, publish, or unpublish posts and upload an image for each story."
              primaryLabel="Write new post"
              primaryHref="/admin/content/intent/create/template=article;type=article"
              secondaryLabel="Manage posts"
              secondaryHref="/admin/content/structure/article"
            />
            <AdminAction
              icon="mail"
              title="Contact messages"
              description="Read enquiries, reply by email, and track each message from new to closed."
              primaryLabel="Open messages"
              primaryHref="/admin/messages"
              secondaryLabel="View new messages"
              secondaryHref="/admin/messages?status=new"
            />
          </div>
        </section>

        <aside className="admin-note card">
          <Icon name="spark" width="20" height="20" />
          <div>
            <strong>Changes made in Content Studio power the public site.</strong>
            <p>
              Publish a document when it is ready. New projects appear under
              Work, and published posts appear under Writing & ideas.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

function DashboardStat({
  label,
  value,
  detail,
}: {
  label: string;
  value: number | undefined;
  detail: string;
}) {
  return (
    <div className="admin-overview-stat card">
      <span>{label}</span>
      <strong>{value ?? "—"}</strong>
      <small>{detail}</small>
    </div>
  );
}

function AdminAction({
  icon,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  icon: "work" | "article" | "mail";
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
  return (
    <article className="admin-action card">
      <span className="admin-action-icon">
        <Icon name={icon} width="22" height="22" />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="admin-action-buttons">
        <Link href={primaryHref} className="button button-dark">
          {primaryLabel}
        </Link>
        <Link href={secondaryHref} className="text-link">
          {secondaryLabel} →
        </Link>
      </div>
    </article>
  );
}
