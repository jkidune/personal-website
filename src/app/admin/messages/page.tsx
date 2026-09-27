import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  getContactDb,
  type ContactMessage,
  type ContactMessageStatus,
} from "@/lib/cloudflare-runtime";

export const dynamic = "force-dynamic";

const allowedStatuses: ContactMessageStatus[] = ["new", "contacted", "closed"];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Dar_es_Salaam",
  }).format(new Date(value));
}

export default async function AdminMessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const db = getContactDb();
  if (!db) {
    return (
      <main className="admin-page">
        <AdminHeader />
        <section className="admin-empty card">
          <p className="eyebrow">Setup required</p>
          <h1>Connect the D1 database</h1>
          <p>
            The dashboard is ready, but the Worker does not have a <code>DB</code>{" "}
            binding yet. Follow <code>docs/contact-inbox-setup.md</code> after
            creating the D1 database.
          </p>
        </section>
      </main>
    );
  }

  const { status: requestedStatus } = await searchParams;
  const status = allowedStatuses.includes(requestedStatus as ContactMessageStatus)
    ? (requestedStatus as ContactMessageStatus)
    : null;

  const query = status
    ? "SELECT * FROM contact_messages WHERE status = ? ORDER BY created_at DESC LIMIT 200"
    : "SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 200";
  const statement = db.prepare(query);
  const result = status
    ? await statement.bind(status).all<ContactMessage>()
    : await statement.all<ContactMessage>();
  const messages = result.results ?? [];

  const statsResult = await db
    .prepare(
      `SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) AS new_count,
        SUM(CASE WHEN status = 'contacted' THEN 1 ELSE 0 END) AS contacted_count,
        SUM(CASE WHEN status = 'closed' THEN 1 ELSE 0 END) AS closed_count
      FROM contact_messages`,
    )
    .first<{
      total: number;
      new_count: number;
      contacted_count: number;
      closed_count: number;
    }>();

  const stats = {
    total: Number(statsResult?.total ?? 0),
    new: Number(statsResult?.new_count ?? 0),
    contacted: Number(statsResult?.contacted_count ?? 0),
    closed: Number(statsResult?.closed_count ?? 0),
  };

  return (
    <main className="admin-page">
      <AdminHeader />
      <section className="admin-toolbar">
        <div>
          <p className="eyebrow">Contact management</p>
          <h1>Messages</h1>
          <p>Every valid website enquiry is stored here before email notification.</p>
        </div>
        <div className="admin-stats">
          <Stat label="All" value={stats.total} href="/admin/messages" active={!status} />
          <Stat
            label="New"
            value={stats.new}
            href="/admin/messages?status=new"
            active={status === "new"}
          />
          <Stat
            label="Contacted"
            value={stats.contacted}
            href="/admin/messages?status=contacted"
            active={status === "contacted"}
          />
          <Stat
            label="Closed"
            value={stats.closed}
            href="/admin/messages?status=closed"
            active={status === "closed"}
          />
        </div>
      </section>

      {messages.length === 0 ? (
        <section className="admin-empty card">
          <h2>No messages here yet.</h2>
          <p>New enquiries will appear automatically after the D1 binding is active.</p>
        </section>
      ) : (
        <section className="admin-message-list">
          {messages.map((message) => (
            <article className="admin-message card" key={message.id}>
              <div className="admin-message-head">
                <div>
                  <span className={`message-status status-${message.status}`}>
                    {message.status}
                  </span>
                  <h2>{message.name}</h2>
                  <p>
                    <a href={`mailto:${message.email}`}>{message.email}</a>
                    {message.company ? <> · {message.company}</> : null}
                  </p>
                </div>
                <time dateTime={message.created_at}>{formatDate(message.created_at)}</time>
              </div>

              <div className="admin-message-meta">
                <span>{message.project_type || "General enquiry"}</span>
                <span>
                  {message.notification_sent ? "Email notification sent" : "Stored in D1"}
                </span>
              </div>

              <p className="admin-message-body">{message.message}</p>

              <div className="admin-message-actions">
                <a
                  className="button button-light"
                  href={`mailto:${message.email}?subject=Re: Portfolio enquiry`}
                >
                  Reply by email ↗
                </a>
                <form action={`/api/admin/messages/${message.id}`} method="post">
                  <select name="status" defaultValue={message.status} aria-label="Message status">
                    {allowedStatuses.map((item) => (
                      <option key={item} value={item}>
                        {item[0].toUpperCase() + item.slice(1)}
                      </option>
                    ))}
                  </select>
                  <button className="button button-light" type="submit">
                    Update
                  </button>
                </form>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

function AdminHeader() {
  return (
    <header className="admin-header">
      <a href="/" className="admin-brand">
        Joseph Masonda <span>Admin</span>
      </a>
      <nav>
        <a href="/admin/messages">Messages</a>
        <form action="/api/admin/logout" method="post">
          <button type="submit">Sign out</button>
        </form>
      </nav>
    </header>
  );
}

function Stat({
  label,
  value,
  href,
  active,
}: {
  label: string;
  value: number;
  href: string;
  active: boolean;
}) {
  return (
    <a className={`admin-stat ${active ? "active" : ""}`} href={href}>
      <strong>{value}</strong>
      <span>{label}</span>
    </a>
  );
}
