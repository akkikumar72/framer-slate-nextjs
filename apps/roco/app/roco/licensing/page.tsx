import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import styles from "./licensing.module.css";

export const metadata: Metadata = {
  title: "Roco Portfolio Template",
  alternates: { canonical: "/roco/licensing" },
};
const iconPaths = [
  "M152,32H72a8,8,0,0,0-8,8V168a80.09,80.09,0,0,0,80,80,8,8,0,0,0,8-8V176a72,72,0,0,0,0-144ZM136,231.5A64.14,64.14,0,0,1,80.51,176H136Zm0-94L85.68,48H136ZM152,160V48a56,56,0,0,1,0,112Z",
  "M128,24A104,104,0,1,0,232,128,104,104,0,0,0,128,24Zm0,184A80,80,0,1,1,181.34,68.37a8,8,0,0,1-10.67,11.92A64,64,0,1,0,191.5,136H128a8,8,0,0,1,0-16h72a8,8,0,0,1,8,8A80.09,80.09,0,0,1,128,208Z",
  "M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM156,88a12,12,0,1,1-12,12A12,12,0,0,1,156,88Zm60,112H40V160.69l46.34-46.35a8,8,0,0,1,11.32,0h0L165,181.66a8,8,0,0,0,11.32-11.32l-17.66-17.65L173,138.34a8,8,0,0,1,11.31,0L216,170.07V200Z",
];
const credits = [
  { heading: "Icons", label: "Phosphor", url: "https://phosphoricons.com/" },
  { heading: "Typography", label: "Google Fonts", url: "https://fonts.google.com/" },
  { heading: "Photos", label: "Unsplash", url: "https://unsplash.com/collections/vDcSZySbrSI/portfolios/435b3457b2c8c956f9244bd8df8d8f7a" },
];

export default function LicensingPage() {
  return <div className={styles.page}>
    <section className={styles.hero}><Reveal><h1>Licensing</h1></Reveal></section>
    <section className={styles.credits} aria-label="Template asset credits">
      {credits.map((credit, index) => <Reveal className={styles.credit} key={credit.heading}>
        <h3>{credit.heading}</h3>
        <a href={credit.url} target="_blank" rel="noreferrer"><svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d={iconPaths[index]} /></svg>{credit.label}</a>
      </Reveal>)}
    </section>
  </div>;
}
