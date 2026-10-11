"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function SiteShell({
  children,
  isAdmin,
}: {
  children: ReactNode;
  isAdmin: boolean;
}) {
  const pathname = usePathname();

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
