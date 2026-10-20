"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Blog.module.css";

export function BlogReveal({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = root.current;
    if (!node || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove(styles.waiting);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    const observeNewTargets = () => {
      node.querySelectorAll<HTMLElement>("[data-blog-reveal]").forEach((target) => {
        if (seen.has(target)) return;
        seen.add(target);
        target.classList.add(styles.waiting);
        observer.observe(target);
      });
    };
    observeNewTargets();
    const changes = new MutationObserver(observeNewTargets);
    changes.observe(node, { childList: true, subtree: true });
    return () => { observer.disconnect(); changes.disconnect(); };
  }, []);
  return <div ref={root}>{children}</div>;
}
