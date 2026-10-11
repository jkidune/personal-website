"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  // Checked client-side so public pages stay static and cacheable.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/session", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : { admin: false }))
      .then((data: { admin?: boolean }) => {
        if (!cancelled) setIsAdmin(Boolean(data.admin));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (pathname.startsWith("/admin")) return children;

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="portfolio-shell">
        <Navbar />
        <div className="main-column">
          {isAdmin ? (
            <div className="admin-mode-bar" role="status">
              <span>
                <span className="admin-mode-dot" />
                Admin mode
              </span>
              <Link href="/admin">Back to dashboard →</Link>
            </div>
          ) : null}
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
