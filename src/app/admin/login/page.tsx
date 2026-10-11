import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) redirect("/admin");

  const { error } = await searchParams;
  const message =
    error === "config"
      ? "Admin access is not configured yet."
      : error === "invalid"
        ? "That password is not correct."
        : "";

  return (
    <main className="admin-login-page">
      <section className="admin-login-card card">
        <Link href="/" className="admin-back-link">
          ← Back to portfolio
        </Link>
        <p className="eyebrow">Private dashboard</p>
        <h1>Portfolio admin</h1>
        <p>
          Sign in to manage your projects, posts, uploaded images, and contact
          messages.
        </p>
        <form action="/api/admin/login" method="post" className="admin-login-form">
          <label className="form-field">
            <span>Admin password</span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="Enter password"
            />
          </label>
          {message && (
            <p className="form-status error" role="alert">
              {message}
            </p>
          )}
          <button className="button button-dark" type="submit">
            Open dashboard
          </button>
        </form>
      </section>
    </main>
  );
}
