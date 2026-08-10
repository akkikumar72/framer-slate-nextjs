"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/components/agentik/shared/content";
import styles from "./AgentikStaticPages.module.css";

export function ContactFaq() {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set([0]));

  function toggle(index: number) {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className={styles.contactFaqList}>
      {FAQ_ITEMS.map((item, index) => {
        const open = openItems.has(index);
        const answerId = `agentik-contact-faq-${index}`;
        return (
          <article className={styles.faqItem} data-open={open} key={item.question}>
            <button aria-controls={answerId} aria-expanded={open} onClick={() => toggle(index)} type="button">
              <span>{item.question}</span><i aria-hidden="true" />
            </button>
            <div className={styles.faqAnswer} id={answerId}>
              <div><p>{item.answer}</p></div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
