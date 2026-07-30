import Link from "next/link";
import styles from "./not-found.module.css";

export default function GroviaNotFound() {
  return (
    <main className={styles.page}>
      <img alt="Grovia" src="/grovia/grovia-logo.avif" />
      <p>404</p>
      <h1>That page is out of reach.</h1>
      <span>The link may be outdated, but your next growth step is close.</span>
      <Link href="/">Return home</Link>
    </main>
  );
}
