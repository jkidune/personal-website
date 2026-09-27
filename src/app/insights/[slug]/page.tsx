import { permanentRedirect } from "next/navigation";
export default async function LegacyArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  permanentRedirect(`/archive/${(await params).slug}`);
}
