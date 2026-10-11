import Link from "next/link";

export type AdminSection = "overview" | "messages" | "content";

export default function AdminHeader({ active }: { active: AdminSection }) {
  return (
    <header className="admin-header">
      <Link href="/admin" className="admin-brand">
        Joseph Masonda <span>Admin</span>
      </Link>
      <nav aria-label="Admin navigation">
        <Link
          href="/admin"
          aria-current={active === "overview" ? "page" : undefined}
        >
          Overview
        </Link>
        <Link
          href="/admin/messages"
          aria-current={active === "messages" ? "page" : undefined}
        >
          Messages
        </Link>
        <Link
          href="/admin/content"
          aria-current={active === "content" ? "page" : undefined}
        >
          Content
        </Link>
        <Link href="/">View site ↗</Link>
        <form action="/api/admin/logout" method="post">
          <button type="submit">Sign out</button>
        </form>
      </nav>
    </header>
  );
}
