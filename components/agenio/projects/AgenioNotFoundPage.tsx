import Link from "next/link";
import {
  AgenioHeader,
  CornerMarkers,
  PixelSteps,
  SectionLabel,
  Wordmark,
} from "@/components/agenio/shared/AgenioShell";
import styles from "./AgenioNotFoundPage.module.css";

export function AgenioNotFoundPage() {
  return (
    <main>
      <AgenioHeader />
      <section className={styles.notFound}>
        <CornerMarkers />
        <PixelSteps />
        <PixelSteps flip />
        <div>
          <SectionLabel>404 Error</SectionLabel>
          <h1>Sorry! Page Not Found</h1>
          <p>
            The page you’re looking for doesn’t exist. It may have been moved,
            deleted, or never existed in the first place
          </p>
          <Link href="/agenio">Back to home</Link>
        </div>
      </section>
      <footer className={styles.footer}>
        <CornerMarkers />
        <nav aria-label="Agenio footer navigation">
          <Link href="/agenio/about-us">About us</Link>
          <Link href="/agenio/services">Services</Link>
          <Link href="/agenio/projects">Project</Link>
          <Link href="/agenio#pricing-plan">Pricing Plan</Link>
        </nav>
        <div className={styles.footerBrand}>
          <PixelSteps />
          <Wordmark large />
        </div>
        <div className={styles.footerMeta}>
          <p>© 2026 Agenio. All Rights Reserved</p>
          <div>
            <a href="https://www.instagram.com/accounts/login/?hl=en">Instagram</a>
            <a href="https://www.linkedin.com/login">Linkedin</a>
            <a href="https://dribbble.com/">Dribble</a>
            <a href="https://www.behance.net/">Behance</a>
          </div>
          <Link href="/agenio">Back to Home ↑</Link>
        </div>
      </footer>
    </main>
  );
}
