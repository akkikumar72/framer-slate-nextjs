import {
  GradientText,
  PrimaryButton,
} from "@/components/saazai/shared/SaazaiSections";
import styles from "./company.module.css";

export function NotFoundContent() {
  return (
    <>
      <section className={styles.error}>
        <p className={styles.crumb}>Home / Error</p>
        <h1>
          <GradientText>404</GradientText>
        </h1>
        <h2>Sorry this page is not available.</h2>
        <p>We are taken a note to solve this error as soon as possible.</p>
        <PrimaryButton href="/saazai">Back to home</PrimaryButton>
      </section>
      <div aria-hidden="true" className={styles.errorBand}>
        Omni·Agent · Omni·Agent · Omni·Agent · Omni·Agent
      </div>
    </>
  );
}
