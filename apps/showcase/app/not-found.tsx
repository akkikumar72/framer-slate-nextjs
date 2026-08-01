import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">404 / Template workspace</p>
      <h1>This page is outside the catalog.</h1>
      <Link href="/">Return to all templates</Link>
    </main>
  );
}
