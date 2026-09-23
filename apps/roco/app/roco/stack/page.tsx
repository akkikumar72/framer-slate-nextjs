import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import stack from "./stack-data.json";
import styles from "./stack.module.css";

export const metadata: Metadata = {
  title: "Roco Portfolio Template",
  alternates: { canonical: "/roco/stack" },
};

export default function StackPage() {
  return <div className={styles.page}>
    <section className={styles.hero}><Reveal><h1>My Tech Toolbox</h1></Reveal></section>
    <section className={styles.stack} aria-label="My technology stack">
      {stack.map((tool) => <Reveal key={tool.name}><a className={styles.card} href={tool.url} target="_blank" rel="noreferrer">
        <div className={styles.cardHeading}>
          <img src={tool.icon} alt="" width={48} height={48} />
          <div><h3>{tool.name}</h3><p className={styles.category}>{tool.category}</p></div>
        </div>
        <div className={styles.description}><span className={styles.dots} aria-hidden="true" /><p>{tool.description}</p></div>
      </a></Reveal>)}
    </section>
  </div>;
}
