"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "home" },
  { href: "/admin/messages", label: "Messages", icon: "message" },
  { href: "/admin/projects", label: "Projects", icon: "folder" },
  { href: "/admin/articles", label: "Articles", icon: "file" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  if (pathname === "/admin/login") return <>{children}</>;

  const active = (href: string) =>
    href === "/admin" ? pathname === href : pathname.startsWith(href);

  return (
    <div className="admin-shell">
      <button
        className={`admin-backdrop ${open ? "is-open" : ""}`}
        aria-label="Close admin navigation"
        onClick={() => setOpen(false)}
      />
      <aside className={`admin-sidebar ${open ? "is-open" : ""}`}>
        <Link href="/admin" className="admin-identity">
          <Image
            src="/Masonda-profile.jpg"
            alt=""
            width={42}
            height={42}
            priority
          />
          <span>
            <strong>Joseph Masonda</strong>
            <small>Portfolio admin</small>
          </span>
        </Link>

        <div className="admin-nav-group">
          <span className="admin-nav-label">Workspace</span>
          <nav className="admin-nav">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={active(item.href) ? "active" : ""}
              >
                <Icon name={item.icon} width="17" height="17" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="admin-nav-group">
          <span className="admin-nav-label">Content system</span>
          <nav className="admin-nav">
            <Link href="/studio" target="_blank">
              <Icon name="edit" width="17" height="17" />
              <span>Sanity Studio</span>
              <span className="admin-nav-arrow">↗</span>
            </Link>
            <Link href="/" target="_blank">
              <Icon name="globe" width="17" height="17" />
              <span>View website</span>
              <span className="admin-nav-arrow">↗</span>
            </Link>
          </nav>
        </div>

        <div className="admin-sidebar-foot">
          <div className="admin-system-status">
            <span />
            Production workspace
          </div>
          <form action="/api/admin/logout" method="post">
            <button type="submit">
              <Icon name="arrow" width="15" height="15" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-button"
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle admin navigation"
          >
            ☰
          </button>
          <div>
            <strong>Portfolio Control Center</strong>
            <span>Manage enquiries and content</span>
          </div>
          <Link href="/" target="_blank" className="button button-light">
            View site ↗
          </Link>
        </header>
        {children}
      </section>
    </div>
  );
}
