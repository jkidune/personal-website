import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  metadataBase: new URL("https://josephmasonda.qzz.io"),
  title: {
    default: "Joseph Masonda — Communications & Digital Design",
    template: "%s | Joseph Masonda",
  },
  description:
    "Strategic communications, digital design, and stories that connect people. Explore the work and ideas of Joseph Masonda, based in Dar es Salaam, Tanzania.",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
      </body>
    </html>
  );
}
