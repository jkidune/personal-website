import Link from "next/link";
import Icon from "@/components/Icon";
export default function NotFound() {
  return (
    <main className="page">
      <div className="card empty-card">
        <span className="eyebrow">404 · A little off the path</span>
        <h1>This page isn’t here.</h1>
        <p>Explore my work, read a story, or head back to the overview.</p>
        <Link href="/" className="button button-dark">
          <Icon name="back" />
          Back to overview
        </Link>
      </div>
    </main>
  );
}
