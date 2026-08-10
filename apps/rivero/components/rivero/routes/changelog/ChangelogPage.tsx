import { type CSSProperties } from "react";
import { RiveroPageFrame } from "../../RiveroShell";
import type { ChangelogEntry } from "./data";
import styles from "./ChangelogPage.module.css";

export function ChangelogPage({ entry }: { entry: ChangelogEntry }) {
  return (
    <RiveroPageFrame>
      <main>
        <section className={styles.section}>
          <div className={styles.container}>
            <header className={styles.title}>
              <h1 data-rivero-reveal="hero">Changelog</h1>
              <p data-rivero-reveal style={{ "--rivero-delay": "100ms" } as CSSProperties}>
                Stay up-to-date with the latest updates, features, and improvements in our HR Management platform.
              </p>
            </header>
            <div className={styles.entries}>
              <article
                className={styles.featured}
                data-rivero-reveal="card"
                style={{ "--rivero-delay": "0ms" } as CSSProperties}
              >
                <time>{entry.date}</time>
                <div className={styles.entryCopy}>
                  <span>{entry.version}</span>
                  <h2>{entry.title}</h2>
                  <p>{entry.body}</p>
                  {entry.subheading ? <><h3>{entry.subheading}</h3><p>{entry.detail}</p></> : null}
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
    </RiveroPageFrame>
  );
}
