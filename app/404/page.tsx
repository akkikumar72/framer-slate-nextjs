import Link from "next/link";

export default function NotFoundRoute() {
  return (
    <main className="not-found-page">
      <p>404</p>
      <h1>This note got away.</h1>
      <span>The page you’re looking for does not exist.</span>
      <Link className="primary-button" href="/">
        Return home
      </Link>
    </main>
  );
}
