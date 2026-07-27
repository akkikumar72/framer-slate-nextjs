"use client";

import { useState } from "react";

import sharedStyles from "../../FuelPage.module.css";
import {
  FuelFooter,
  FuelHeader,
  FuelPlus,
  FuelSectionLabel,
  fuelPageClassName,
} from "../FuelShell";

import styles from "./FuelNotFoundPage.module.css";

const questions = [
  "What distinguishes us from other agencies?",
  "Why not hire an in-house designer or freelancer?",
  "Are creative requests truly unlimited?",
  "How fast will I receive my work?",
  "What if I have a single project?",
] as const;

export function FuelNotFoundPage() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <main className={`${fuelPageClassName} ${styles.page}`}>
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
          <a className={styles.backLink} href="/fuel">
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

      <section className={`${sharedStyles.faq} ${styles.faq}`}>
        <FuelSectionLabel
          number="01"
          title="Frequently Asked Questions"
        />
        <div className={sharedStyles.faqGrid}>
          <a
            aria-label="Play Fuel showreel on YouTube"
            className={sharedStyles.showreel}
            href="https://www.youtube.com/"
            rel="noreferrer"
            target="_blank"
          >
            <img
              alt="Curly woman in the Fuel showreel"
              src="/fuel/75480d4610cb4757.avif"
            />
            <span>
              <strong>▶ Play</strong>
              <em>Showreel</em>
            </span>
          </a>
          <div className={sharedStyles.faqList}>
            {questions.map((question, index) => {
              const open = openQuestion === index;
              return (
                <div
                  className={`${sharedStyles.faqItem} ${
                    open ? sharedStyles.faqItemOpen : ""
                  }`}
                  key={question}
                >
                  <button
                    aria-expanded={open}
                    onClick={() =>
                      setOpenQuestion((current) =>
                        current === index ? null : index,
                      )
                    }
                    type="button"
                  >
                    <span>{question}</span>
                    <span aria-hidden="true">{open ? "−" : "+"}</span>
                  </button>
                  <div
                    className={sharedStyles.faqAnswer}
                    inert={!open ? true : undefined}
                  >
                    <p>
                      Fuel combines structured delivery with an art-directed
                      visual system, adapting every engagement to the brand and
                      its goals.
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FuelFooter />
    </main>
  );
}
