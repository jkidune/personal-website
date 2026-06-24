'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/lib/profile";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Archive", href: "/archive" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <nav
        className={`mx-auto flex w-full max-w-[1480px] items-center justify-between transition-colors duration-300 ${
          scrolled ? "bg-night/82 px-4 py-3 backdrop-blur-md" : "py-2"
        }`}
        aria-label="Primary navigation"
      >
        <Link
          href="/"
          className="text-sm font-bold uppercase tracking-[0.02em] text-ink transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          JOSEPH MASONDA
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink/82 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
          className="text-sm text-ink transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Menu
        </button>
      </nav>

      <div
        id="site-menu"
        className={`mx-auto mt-3 w-full max-w-[1480px] overflow-hidden bg-graphite/96 backdrop-blur-md transition-all duration-300 ${
          open ? "max-h-[560px] border border-line" : "max-h-0 border border-transparent"
        }`}
      >
        <div className="grid gap-10 p-6 md:grid-cols-[1fr_0.7fr] md:p-10">
          <div className="grid gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-4xl font-black uppercase leading-none tracking-[-0.06em] text-ink transition-colors hover:text-accent md:text-6xl"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col justify-between gap-8 text-sm text-muted">
            <p className="max-w-sm leading-relaxed">{profile.shortLine}</p>
            <div className="grid gap-3">
              {profile.portfolioLinks.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="editorial-link">
                  {link.label}
                </a>
              ))}
              <a className="editorial-link" href={`mailto:${profile.email}`}>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
