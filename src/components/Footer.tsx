import Link from "next/link";
import { profile } from "@/lib/profile";

export default function Footer() {
  return (
    <footer className="bg-night px-4 pb-8 pt-16">
      <div className="site-shell">
        <div className="border-t border-line pt-8">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <Link href="/" className="text-5xl font-black uppercase leading-[0.82] tracking-[-0.075em] text-ink md:text-8xl">
              JOSEPH
              <br />
              MASONDA
            </Link>
            <div className="grid gap-2 text-sm text-muted md:text-right">
              <a href={`mailto:${profile.email}`} className="editorial-link">{profile.email}</a>
              <span>{profile.location}</span>
              <span>(c) 2026 Joseph Masonda</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
