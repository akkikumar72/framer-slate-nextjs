import type { Metadata } from "next";
import { FAQ, SectionLabel } from "@/components/shared";
import { pageMetadata } from "@/lib/site";
import { ContactForm } from "./contact-form";
import styles from "./page.module.css";

export const metadata: Metadata = pageMetadata(
  "Contact",
  "/contact",
  "Talk to the Orbital team about running AI agents safely, reliably, and at scale.",
);

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section className={`${styles.contact} orb-container`}>
        <SectionLabel number="01" label="Contact" />
        <div className={styles.intro}>
          <h1>Let’s talk about what you’re building.</h1>
          <p>Whether you’re evaluating Orbital for production or just have a question, we usually reply within one business day.</p>
        </div>
        <ContactForm />
      </section>
      <FAQ number="08" />
    </main>
  );
}
