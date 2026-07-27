"use client";

import { useState } from "react";

import { FuelSectionLabel } from "@/components/fuel/FuelShell";

import styles from "./FuelRouteFaq.module.css";

const faqs = [
  {
    question: "What distinguishes us from other agencies?",
    answer:
      "Fuel combines fast, structured delivery with a highly art-directed visual system. Every engagement is handled as a cohesive brand experience, not a collection of disconnected design requests.",
  },
  {
    question: "Why not hire an in-house designer or freelancer?",
    answer:
      "You get a flexible senior creative team without the long hiring process, fixed overhead, or limited specialty range of a single role.",
  },
  {
    question: "Are creative requests truly unlimited?",
    answer:
      "Yes. You can maintain an active request queue and we work through it in priority order with clear, predictable communication.",
  },
  {
    question: "How fast will I receive my work?",
    answer:
      "Most requests receive a first pass in two to three business days. Larger brand systems and production work are scoped transparently.",
  },
  {
    question: "What if I have a single project?",
    answer:
      "Single-project engagements are welcome. We will recommend a focused scope and timeline based on what will create the strongest result.",
  },
] as const;

export function FuelRouteFaq({
  number,
  contact = false,
}: {
  number: string;
  contact?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className={`${styles.faq} ${contact ? styles.contact : ""}`}>
      <FuelSectionLabel
        number={number}
        title="Frequently Asked Questions"
      />
      <div className={styles.grid}>
        <a
          aria-label="Play Showreel"
          className={styles.showreel}
          href="https://www.youtube.com/"
        >
          <img alt="Curly Woman" src="/fuel/75480d4610cb4757.avif" />
          <span>
            <span>▶ Play</span>
            <em>Showreel</em>
          </span>
        </a>
        <div className={styles.list}>
          {faqs.map((item, index) => {
            const open = openIndex === index;

            return (
              <div
                className={`${styles.item} ${open ? styles.itemOpen : ""}`}
                key={item.question}
              >
                <button
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                  type="button"
                >
                  <span>{item.question}</span>
                  <span aria-hidden="true">{open ? "−" : "+"}</span>
                </button>
                <div className={styles.answer} inert={!open ? true : undefined}>
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
