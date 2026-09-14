import { Button } from "@/components/shared";
import styles from "./utility.module.css";

export function NotFoundContent() {
  return (
    <section className={styles.notFound} aria-labelledby="not-found-title">
      <div className={`container ${styles.notFoundInner}`}>
        <div className={styles.text}>
          <h1 id="not-found-title" className={styles.title}>404!</h1>
          <p className={styles.description}>
            You’ve reached a page that doesn’t exist {"\u2014"} let’s guide you home.
          </p>
        </div>
        <Button href="/alytics">Let&apos;s Go Home</Button>
      </div>
    </section>
  );
}
