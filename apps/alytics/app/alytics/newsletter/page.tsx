import type { Metadata } from "next";
import { NewsletterForm } from "@/components/utility/NewsletterForm";
import styles from "@/components/utility/utility.module.css";

export const metadata: Metadata = {
  title: { absolute: "Alytics - Newsletter" },
  description: "Alytics is an all-in-one analytics platform made to convert, turning your data into clear, actionable insights\u2014helping you track performance, spot trends, and make smarter decisions faster.",
  alternates: { canonical: "/alytics/newsletter" },
};

export default function NewsletterPage() {
  return (
    <main id="main-content">
    <section className={styles.newsletter} aria-labelledby="newsletter-title">
      <div className={`container ${styles.newsletterInner}`}>
        <div className={styles.intro}>
          <span className={styles.badge}>Get Notified</span>
          <div className={styles.text}>
            <h1 id="newsletter-title" className={styles.title}>Join Our Newsletter and Grow With Us</h1>
            <p className={styles.description}>
              Get the latest insights, tips, and product news delivered straight to your email inbox.
            </p>
          </div>
        </div>
        <div className={styles.formFrame}>
          <span className={styles.envelopeFrame}>
          <img
            className={styles.envelope}
            src="/alytics/OXyYHX9MW2fCN7IDYfVvNCAqUX0.png"
            width={84}
            height={58}
            alt="Stylized white envelope icon tilted at an angle, representing a message or notification."
          />
          </span>
          <NewsletterForm />
        </div>
      </div>
    </section>
    </main>
  );
}
