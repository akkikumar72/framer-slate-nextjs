import Link from "next/link";
import { type CSSProperties } from "react";
import { RiveroPageFrame } from "../../RiveroShell";
import { integrations, integrationSteps, type Integration } from "./data";
import styles from "./IntegrationPages.module.css";

export function IntegrationIndexPage() {
  return (
    <RiveroPageFrame>
      <main>
        <section className={styles.indexSection}>
          <div className={styles.indexContainer}>
            <header className={styles.pageTitle}>
              <h1 data-rivero-reveal="hero">Integration</h1>
              <p data-rivero-reveal style={{ "--rivero-delay": "100ms" } as CSSProperties}>
                Connect your favorite tools and bring all your HR data into one place our platform integrates effortlessly.
              </p>
            </header>
            <div className={styles.integrationGrid}>
              {integrations.map((integration, index) => (
                <Link
                  className={styles.integrationCard}
                  data-rivero-reveal="card"
                  href={`/integrations/${integration.slug}`}
                  key={integration.slug}
                  style={{ "--rivero-delay": `${(index % 3) * 70}ms` } as CSSProperties}
                >
                  <span className={styles.logoWrapper}><img alt={`${integration.name} brand icon`} src={integration.icon} /></span>
                  <span className={styles.cardCopy}><strong>{integration.name}</strong><span>{integration.description}</span></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </RiveroPageFrame>
  );
}

export function IntegrationDetailPage({ integration }: { integration: Integration }) {
  return (
    <RiveroPageFrame>
      <main>
        <section className={styles.detailSection}>
          <div className={styles.detailContainer}>
            <header className={styles.detailTitle}>
              <span className={styles.detailIcon} data-rivero-reveal="card"><img alt={`${integration.name} brand icon`} src={integration.icon} /></span>
              <div>
                <h1 data-rivero-reveal="hero">{integration.name}</h1>
                <p data-rivero-reveal style={{ "--rivero-delay": "100ms" } as CSSProperties}>{integration.description}</p>
              </div>
            </header>
            <article className={styles.steps}>
              {integrationSteps.map((step, index) => (
                <section data-rivero-reveal key={step.title} style={{ "--rivero-delay": `${(index % 2) * 70}ms` } as CSSProperties}>
                  <h2>{step.title}</h2>
                  <p>{step.body}</p>
                </section>
              ))}
            </article>
          </div>
        </section>
      </main>
    </RiveroPageFrame>
  );
}
