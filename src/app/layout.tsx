import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Joseph Masonda - Strategic Communications & Digital Design",
  description:
    "Strategic communication, digital design, and conservation storytelling from Dar es Salaam, Tanzania.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body id="root" suppressHydrationWarning>
        {/* Global grain / noise texture */}
        <div className="site-noise" aria-hidden="true" />

        <div className="site-content">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}