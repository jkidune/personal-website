import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import { isAdminAuthenticated } from "@/lib/admin-auth";
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
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await isAdminAuthenticated();

  return (
    <html lang="en">
      <body>
        <SiteShell isAdmin={isAdmin}>{children}</SiteShell>
      </body>
    </html>
  );
}
