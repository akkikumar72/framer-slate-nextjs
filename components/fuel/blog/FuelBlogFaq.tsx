"use client";

import { useState } from "react";

import { FuelArrowLink } from "@/components/fuel/FuelShell";

import { fuelFaqs } from "./articleData";
import styles from "./FuelBlogPage.module.css";

export function FuelBlogFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.faqGrid}>
      <div className={styles.showreel}>
        <FuelArrowLink href="https://www.youtube.com/">
          <img
            alt="Curly Woman"
            src="/fuel/75480d4610cb4757.avif"
          />
          <span className={styles.showreelMeta}>
            <strong>▶ Play</strong>
            <em>Showreel</em>
          </span>
        </FuelArrowLink>
      </div>
      <div className={styles.faqList}>
        {fuelFaqs.map((item, index) => {
          const open = index === openIndex;

          return (
            <article
              className={`${styles.faqItem} ${
                open ? styles.faqItemOpen : ""
              }`}
              key={item.question}
            >
              <button
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? null : index)}
                type="button"
              >
                <span>{item.question}</span>
                <span aria-hidden="true">⌄</span>
              </button>
              <div className={styles.faqAnswer}>
                <p>{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
