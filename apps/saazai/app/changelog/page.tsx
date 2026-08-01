import type { Metadata } from "next";
import {
  CtaSection,
  PatternBand,
} from "@/components/saazai/shared/SaazaiSections";
import styles from "@/components/saazai/product/ProductPages.module.css";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Follow Saazai product improvements, feature drops, and fixes.",
  alternates: { canonical: "/changelog" },
};

const entries = [
  {
    date: "Jun 25, 2025",
    type: "Bug Fixes",
    title: "Figma file or more help?",
  },
  {
    date: "Jun 22, 2025",
    type: "New Feature",
    title: "Latest Enhancements & Feature Drops",
  },
  {
    date: "Jul 24, 2025",
    type: "New Feature",
    title: "Release Notes & System Improvements",
  },
  {
    date: "Sep 13, 2025",
    type: "Bug Fixes",
    title: "Fresh Upgrades for Your AI Agents",
  },
];

export default function ChangelogPage() {
  return (
    <div className={styles.productPage}>
      <section className={styles.changelogHero}>
        <p className={styles.eyebrow}>Home / Changelog</p>
        <h1>Changelog</h1>
      </section>
      <PatternBand />
      <section className={styles.timeline}>
        {entries.map((entry) => (
          <article className={styles.timelineItem} key={entry.title}>
            <p className={styles.timelineMeta}>
              {entry.date} - {entry.type}
            </p>
            <div className={styles.timelineCard}>
              <h2>{entry.title}</h2>
              <p>
                If you have any questions or need additional assistance, please
                do not hesitate to reach out. We are here to help and support
                you every step of the way. If you would like a closer look at
                the design, send us a request and we will be happy to share it.
              </p>
            </div>
          </article>
        ))}
      </section>
      <PatternBand />
      <CtaSection />
    </div>
  );
}
