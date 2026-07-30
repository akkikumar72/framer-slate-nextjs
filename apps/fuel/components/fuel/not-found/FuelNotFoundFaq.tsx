"use client";

import { useState } from "react";

import sharedStyles from "../../FuelPage.module.css";
import { FuelSectionLabel } from "../FuelShell";

const questions = [
  "What distinguishes us from other agencies?",
  "Why not hire an in-house designer or freelancer?",
  "Are creative requests truly unlimited?",
  "How fast will I receive my work?",
  "What if I have a single project?",
] as const;

export function FuelNotFoundFaq({ className }: { className: string }) {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <section className={`${sharedStyles.faq} ${className}`}>
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
  );
}
