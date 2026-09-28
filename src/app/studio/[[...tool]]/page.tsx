import type { Metadata } from "next";
import SanityStudioClient from "@/components/SanityStudioClient";

export const metadata: Metadata = {
  title: "Content Studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  return <SanityStudioClient />;
}
