"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isControlArea =
    pathname.startsWith("/admin") || pathname.startsWith("/studio");

  if (isControlArea) {
    return <>{children}</>;
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="portfolio-shell">
        <Navbar />
        <div className="main-column">
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
