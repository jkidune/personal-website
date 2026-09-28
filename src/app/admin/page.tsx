import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getContactDb } from "@/lib/cloudflare-runtime";
import { getProjects } from "@/lib/projects";
import { getArchiveIndex } from "@/lib/archive";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const db = getContactDb();
  const messageStats = db
    ? await db
        .prepare(
          `SELECT
            COUNT(*) AS total,
            SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS new_count
          FROM contact_messages`,
        )
        .first<{ total: number; new_count: number }>()
    : null;

  const { projects } = await getProjects();
  const articles = getArchiveIndex();

  return (
    <main className="admin-content">
      <section className="admin-dashboard-head">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Control center</h1>
          <p>
            Manage enquiries, keep projects current, and maintain your publishing workflow.
          </p>
        </div>
      </section>

      <section className="admin-overview-grid">
        <Link href="/admin/messages" className="admin-overview-card card">
          <span className="admin-overview-kicker">Inbox</span>
          <strong>{Number(messageStats?.new_count ?? 0)}</strong>
          <h2>New messages</h2>
          <p>{Number(messageStats?.total ?? 0)} total enquiries stored in D1.</p>
          <span className="admin-card-link">Open inbox →</span>
        </Link>

        <Link href="/admin/projects" className="admin-overview-card card">
          <span className="admin-overview-kicker">Sanity CMS</span>
          <strong>{projects.length}</strong>
          <h2>Projects</h2>
          <p>Projects are live CMS-managed and update from Sanity.</p>
          <span className="admin-card-link">Manage projects →</span>
        </Link>

        <Link href="/admin/articles" className="admin-overview-card card">
          <span className="admin-overview-kicker">Publishing</span>
          <strong>{articles.length}</strong>
          <h2>Articles</h2>
          <p>The public archive currently uses the local Medium JSON collection.</p>
          <span className="admin-card-link">Review articles →</span>
        </Link>
      </section>

      <section className="admin-control-panel card">
        <div>
          <p className="eyebrow">Content studio</p>
          <h2>Edit structured content in Sanity</h2>
          <p>
            Use Studio for project fields, images, case-study details, and prepared article documents.
          </p>
        </div>
        <Link href="/studio" target="_blank" className="button button-dark">
          Open Sanity Studio ↗
        </Link>
      </section>
    </main>
  );
}
