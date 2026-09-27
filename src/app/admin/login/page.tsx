import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
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
        <h1>Portfolio inbox</h1>
        <p>
          Sign in to review enquiries submitted through the website contact
          form.
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
            Open inbox
          </button>
        </form>
      </section>
    </main>
  );
}
