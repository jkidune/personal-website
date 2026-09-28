import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

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
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
