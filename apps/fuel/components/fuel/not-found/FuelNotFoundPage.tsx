import sharedStyles from "../../FuelPage.module.css";
import {
  FuelFooter,
  FuelHeader,
  FuelPlus,
} from "../FuelShell";

import { FuelNotFoundFaq } from "./FuelNotFoundFaq";
import styles from "./FuelNotFoundPage.module.css";

export function FuelNotFoundPage() {
  return (
    <main className={`${sharedStyles.page} ${styles.page}`}>
      <section className={styles.hero}>
        <FuelHeader />
        <div className={styles.heroCard}>
          <img
            alt="Woman lit by a deep orange glow"
            src="/fuel/routes/2f78e863509fa09a.avif"
          />
          <div className={styles.shade} />
          <FuelPlus className={styles.plusOne} />
          <FuelPlus className={styles.plusTwo} />
          <FuelPlus className={styles.plusThree} />
          <FuelPlus className={styles.plusFour} />
          <h1>
            <span className={styles.desktopTitle}>404 Error</span>
            <span className={styles.mobileTitle}>404</span>
          </h1>
          <a className={styles.backLink} href="/">
            <span>Back To Home</span>
            <span aria-hidden="true">⌝</span>
          </a>
        </div>
        <div className={styles.meta}>
          <span>#404</span>
          <p>
            A curated selection of refined digital
            <br />
            work shaped through structure.
          </p>
          <span>© 2025</span>
        </div>
      </section>

      <FuelNotFoundFaq className={styles.faq} />

      <FuelFooter />
    </main>
  );
}
