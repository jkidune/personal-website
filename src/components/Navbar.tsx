"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { label: "About Me", href: "/about" },
  { label: "Services", href: "/work" },
  { label: "Projects", href: "/archive" },
  { label: "Contact", href: "/contact" },
];

function MenuDotsIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="4"
      viewBox="0 0 18 4"
      fill="none"
    >
      <circle cx="2" cy="2" r="2" fill="currentColor" />
      <circle cx="9" cy="2" r="2" fill="currentColor" />
      <circle cx="16" cy="2" r="2" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M3 3L15 15M15 3L3 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOnOutsideClick);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOnOutsideClick);
    };
  }, []);

  return (
    <header
      ref={menuRef}
      className="fixed left-1/2 top-5 z-50 -translate-x-1/2"
    >
      <nav
        aria-label="Primary navigation"
        className={`relative w-[320px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[20px] bg-[#111111] shadow-[0_16px_45px_rgba(0,0,0,0.22)] transition-[height] duration-300 ease-out ${open ? "h-[260px]" : "h-[60px]"
          }`}
      >
        <div className="flex h-[60px] items-center justify-between px-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-[22px] font-semibold tracking-[-0.06em] text-[#f5f3ee] outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-[#f5f3ee] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111]"
          >
            Masonda
          </Link>

          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((current) => !current)}
            className="grid h-9 w-11 place-items-center rounded-[8px] bg-[#f5f3ee] text-[#111111] outline-none transition-transform duration-200 hover:scale-[0.96] focus-visible:ring-2 focus-visible:ring-[#f5f3ee] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111]"
          >
            {open ? <CloseIcon /> : <MenuDotsIcon />}
          </button>
        </div>

        <div
          id="site-menu"
          className={`px-4 pb-4 pt-2 transition-all duration-200 ${open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
            }`}
        >
          <div className="flex flex-col items-start gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[8px] bg-[#f5f3ee] px-4 py-[8px] text-[15px] font-medium leading-[18px] tracking-[-0.03em] text-[#111111] outline-none transition-transform duration-200 hover:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#f5f3ee] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}