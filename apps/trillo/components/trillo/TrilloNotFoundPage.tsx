import Link from "next/link";
import { TrilloPageFrame } from "./TrilloShell";
import styles from "./TrilloNotFoundPage.module.css";

export function TrilloNotFoundPage() {
  return (
    <TrilloPageFrame>
      <main className={styles.notFound}>
        <div className={styles.content}>
          <img
            alt="404 illustration"
            className={styles.illustration}
            src="/trillo/assets/not-found.svg"
          />
          <h1>Sorry! Page not found</h1>
          <p>The page you are looking for doesn&apos;t exist or has been moved.</p>
          <Link className={styles.homeLink} href="/">
            Go Back To Home
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </main>
    </TrilloPageFrame>
  );
}
