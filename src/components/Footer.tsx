import Link from "next/link";
export default function Footer() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Joseph Masonda</span>
      <span>Thoughtful work. Meaningful connections.</span>
      <Link href="/contact">Let’s talk ↗</Link>
    </footer>
  );
}
