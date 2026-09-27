import type { Metadata } from "next";
import { getArchiveIndex } from "@/lib/archive";
import PageHeader from "@/components/PageHeader";
import ArticleCollection from "@/components/ArticleCollection";
export const metadata: Metadata = { title: "Writing & ideas" };
export default function ArchivePage() {
  return (
    <main className="page">
      <PageHeader
        eyebrow="From the notebook"
        title="Writing & ideas"
        description="Notes on communication, creativity, and a changing world. A few things I’ve learned, noticed, and wanted to share."
      />
      <ArticleCollection articles={getArchiveIndex()} />
    </main>
  );
}
