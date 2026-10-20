"use client";

import { type ReactNode, useEffect, useRef } from "react";
import styles from "./CaseStudies.module.css";

export function CaseStudyMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-case-visible", "true");
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.05 });
    const selector = [`.${styles.listHero} h1`, `.${styles.detailTitle}`, `.${styles.facts} > div`, `.${styles.article} > *`, `.${styles.relatedTitle}`, `.${styles.card}`, `.${styles.cta} > *`].join(",");
    for (const element of root.current.querySelectorAll(selector)) {
      if (element.getAttribute("data-case-visible") === "true") continue;
      element.setAttribute("data-case-reveal", "true");
      observer.observe(element);
    }
    return () => observer.disconnect();
  }, [children]);

  return <main ref={root}>{children}</main>;
}
