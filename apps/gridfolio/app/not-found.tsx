import Link from "next/link";
export default function NotFound() { return <main className="not-found"><div className="not-found-column"><img src="/gridfolio/assets/not-found.svg" alt="404" width="543" height="222"/><div><h1>Page not found</h1><p>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p></div><Link href="/gridfolio">Back home</Link></div></main>; }
