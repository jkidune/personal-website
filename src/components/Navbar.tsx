"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon, { type IconName } from "./Icon";

const links: { label: string; href: string; icon: IconName }[] = [
  { label: "Overview", href: "/", icon: "home" },
  { label: "Projects", href: "/work", icon: "work" },
  { label: "About me", href: "/about", icon: "user" },
  { label: "Writing & ideas", href: "/archive", icon: "article" },
  { label: "Get in touch", href: "/contact", icon: "chat" },
];

export default function Navbar() {
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <>
      <header className="mobile-bar">
        <Link href="/" onClick={() => setOpen(false)}>
          Joseph Masonda<span>Portfolio</span>
        </Link>
        <button
          ref={triggerRef}
          className="icon-button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="portfolio-sidebar"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </header>
      {open && (
        <button
          className="sidebar-backdrop"
          aria-label="Dismiss navigation"
          onClick={() => setOpen(false)}
        />
      )}
      <aside
        id="portfolio-sidebar"
        className={`sidebar ${open ? "is-open" : ""}`}
        aria-label="Portfolio navigation"
      >
        <Link href="/" className="identity" onClick={() => setOpen(false)}>
          <Image
            src="/Masonda-profile.jpg"
            alt=""
            width={44}
            height={44}
            priority
          />
          <span>
            <strong>Joseph Masonda</strong>
            <small>Communications & design</small>
          </span>
        </Link>
        <p className="nav-label">Explore</p>
        <nav aria-label="Main navigation" className="nav-list">
          {links.map(({ label, href, icon }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`nav-link ${active ? "active" : ""}`}
                onClick={() => setOpen(false)}
              >
                <Icon name={icon} />
                <span>{label}</span>
                {active && <span className="nav-active-mark" />}
              </Link>
            );
          })}
        </nav>
        <p className="nav-label">Elsewhere</p>
        <nav aria-label="Social profiles" className="nav-list">
          <a
            className="nav-link"
            href="https://medium.com/@kidunejoseph91"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="pen" />
            <span>Medium</span>
            <Icon name="arrow" className="external-icon" />
          </a>
          <a
            className="nav-link"
            href="https://bento.me/joseph-masonda"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="globe" />
            <span>Bento</span>
            <Icon name="arrow" className="external-icon" />
          </a>
          <a
            className="nav-link"
            href="/JOSEPH%20MASONDA%20RESUME%202026.docx"
            download
          >
            <Icon name="download" />
            <span>Download CV</span>
          </a>
        </nav>
        <Link
          href="/archive/how-can-communication-experts-incorporate-ai-into-their-daily-work"
          className="pinned-card"
          onClick={() => setOpen(false)}
        >
          <span className="nav-label">From the notebook</span>
          <div className="pinned-image">
            <Image
              src="/images/editorial-desk.webp"
              alt="Books and a notebook in afternoon light"
              fill
              sizes="220px"
            />
          </div>
          <strong>
            Where communication
            <br />
            meets AI.
          </strong>
          <Icon name="arrow" />
        </Link>
        <div className="sidebar-bottom">
          <span className="availability">
            <span />
            Open to collaboration
          </span>
          <p>Dar es Salaam, Tanzania</p>
          <a href="mailto:kidunejoseph91@gmail.com">
            Let’s make something meaningful{" "}
            <Icon name="arrow" width="15" height="15" />
          </a>
        </div>
      </aside>
    </>
  );
}
