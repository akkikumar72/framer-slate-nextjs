import Link from "next/link";
import { jaydenAssets } from "@/components/jayden/shared/assets";
import styles from "./JaydenNotFoundPage.module.css";

export function JaydenNotFoundPage() {
  return (
    <section
      aria-labelledby="jayden-not-found-heading"
      className={styles.notFoundPage}
      id="jayden-not-found"
    >
      <div className={styles.inner}>
        <video
          aria-hidden="true"
          autoPlay
          className={styles.media}
          loop
          muted
          playsInline
          preload="metadata"
          src={jaydenAssets.notFoundVideo}
        />
        <div className={styles.scrim} aria-hidden="true" />
        <div className={styles.number} aria-hidden="true">
          404
        </div>
        <div className={styles.content}>
          <h1 id="jayden-not-found-heading">
            <span>Oops</span> ! Page Not Found
          </h1>
          <p>The page you&apos;re looking for no longer exists. Let us take you back</p>
          <Link className={styles.homeLink} href="/">
            <span>Go Back Home</span>
            <b aria-hidden="true">↗</b>
          </Link>
        </div>
        <i className={styles.leftDot} aria-hidden="true" />
        <i className={styles.rightDot} aria-hidden="true" />
      </div>
    </section>
  );
}
