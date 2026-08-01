import Link from "next/link";
import { type CSSProperties } from "react";
import { RiveroPageFrame } from "../../RiveroShell";
import { articleSections, caseStudies, type CaseStudy, tableOfContents } from "./data";
import styles from "./CaseStudyPages.module.css";

export function CaseStudyIndexPage() {
  return (
    <RiveroPageFrame>
      <main>
        <section className={styles.indexSection}>
          <div className={styles.indexContainer}>
            <header className={styles.indexTitle}>
              <h1 data-rivero-reveal="hero">Our Success Stories</h1>
              <p data-rivero-reveal style={{ "--rivero-delay": "100ms" } as CSSProperties}>
                Discover how businesses like yours transformed their HR operations with our all-in-one management like yoursplatform.
              </p>
            </header>
            <div className={styles.caseGrid}>
              {caseStudies.map((study, index) => (
                <Link
                  className={styles.caseCard}
                  data-rivero-reveal="card"
                  href={`/rivero/case-study/${study.slug}`}
                  key={study.slug}
                  style={{ "--rivero-delay": `${(index % 2) * 80}ms` } as CSSProperties}
                >
                  <span className={styles.caseImage}>
                    <img alt={study.title} src={study.cover} />
                  </span>
                  <span className={styles.caseInfo}>
                    <strong>{study.title}</strong>
                    <span>{study.description}</span>
                    <i>Continue Reading <b aria-hidden="true">↗</b></i>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </RiveroPageFrame>
  );
}

export function CaseStudyDetailPage({ study }: { study: CaseStudy }) {
  return (
    <RiveroPageFrame>
      <main>
        <section className={styles.detailSection}>
          <div className={styles.detailContainer}>
            <div className={styles.detailTop}>
              <div className={styles.detailIntro}>
                <div>
                  <h1 data-rivero-reveal="hero">{study.title}</h1>
                  <p data-rivero-reveal style={{ "--rivero-delay": "100ms" } as CSSProperties}>{study.description}</p>
                </div>
                <div className={styles.profile} data-rivero-reveal style={{ "--rivero-delay": "190ms" } as CSSProperties}>
                  <img alt={study.author} src={study.avatar} />
                  <span><strong>{study.author}</strong><small>{study.role}</small></span>
                </div>
              </div>
              <div className={styles.heroImage} data-rivero-reveal="card" style={{ "--rivero-delay": "130ms" } as CSSProperties}>
                <img alt={study.title} src={study.cover} />
              </div>
            </div>
            <div className={styles.detailBottom}>
              <article className={styles.article}>
                {articleSections.map((section, index) => (
                  <section data-rivero-reveal key={section.title} style={{ "--rivero-delay": `${(index % 2) * 70}ms` } as CSSProperties}>
                    <h2>{section.title}</h2>
                    <p>{section.body}</p>
                    {section.afterImage ? <img alt="HR operations dashboard" src={section.afterImage} /> : null}
                  </section>
                ))}
              </article>
              <aside className={styles.tableOfContents} data-rivero-reveal="card">
                <h2>Table of content</h2>
                <ol>{tableOfContents.map((item) => <li key={item}>{item}</li>)}</ol>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </RiveroPageFrame>
  );
}
