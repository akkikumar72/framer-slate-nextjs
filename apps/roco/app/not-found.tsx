import Link from "next/link";
export default function NotFound() { return <div className="roco-not-found"><h1>404</h1><div><p>OOPS!</p><p>The page you are looking for wasn&apos;t found!</p></div><Link className="roco-button" href="/roco">Back Home</Link></div>; }
