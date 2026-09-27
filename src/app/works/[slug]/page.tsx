import { permanentRedirect } from "next/navigation";
export default async function LegacyProject({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  permanentRedirect(`/work/${(await params).slug}`);
}
