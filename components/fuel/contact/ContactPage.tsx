"use client";

import {
  FuelFooter,
  FuelHeader,
  fuelPageClassName,
} from "@/components/fuel/FuelShell";
import { FuelRouteFaq } from "@/components/fuel/about/FuelRouteFaq";

import { ContactForm } from "./ContactForm";
import styles from "./ContactPage.module.css";

export function ContactPage() {
  return (
    <main className={`${fuelPageClassName} ${styles.page}`}>
      <section className={styles.hero}>
        <FuelHeader />
        <div className={styles.heroContent}>
          <div className={styles.portrait}>
            <img
              alt="Men Orange BG"
              className={styles.portraitImage}
              src="/fuel/routes/c2319a79d95cb227.avif"
            />
            <img
              alt=""
              className={styles.portraitMark}
              src="/fuel/routes/237cf1bbfc220c09.avif"
            />
          </div>
          <ContactForm />
        </div>
      </section>
      <FuelRouteFaq contact number="01" />
      <FuelFooter />
    </main>
  );
}
