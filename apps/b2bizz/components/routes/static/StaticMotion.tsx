"use client";

import { useEffect } from "react";
import styles from "./StaticPages.module.css";

export function StaticMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const main = document.querySelector("main");
    if (!main) return;
    const selectors = [
      "h1", "form", ":scope > article", `.${styles.strategy} > h2`,
      `.${styles.strategyGrid} > video`, `.${styles.stats} > div`,
      `.${styles.inlineCta}`, `.${styles.sectionIntro}`, `.${styles.principles} article`,
      `.${styles.vision}`, `.${styles.clientBand}`, `.${styles.aboutTestimonials}`,
      `.${styles.team} > h2`, `.${styles.team} article`, `.${styles.awardsCta} > h2`,
      `.${styles.awardsCta} > a`, `.${styles.awardsCta} > div`, `.${styles.faq} > h2`,
      `.${styles.faqColumns} > div`, `.${styles.faqColumns} > img`, `.${styles.changelog} article`,
    ];
    const targets = main.querySelectorAll(selectors.join(","));
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.remove(styles.waiting);
        observer.unobserve(entry.target);
      }
    }, { threshold: .08 });
    targets.forEach(target => {
      target.classList.add(styles.reveal, styles.waiting);
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
