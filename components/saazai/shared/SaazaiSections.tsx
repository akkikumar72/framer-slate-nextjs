import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import styles from "../SaazaiShell.module.css";

export function PatternBand({ compact = false }: { compact?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`${styles.patternBand} ${compact ? styles.patternBandCompact : ""}`}
    />
  );
}

export function GradientText({ children }: { children: ReactNode }) {
  return <span className={styles.gradientText}>{children}</span>;
}

export function PageHero({
  breadcrumb,
  children,
  description,
  metrics,
}: {
  breadcrumb: string;
  children: ReactNode;
  description?: string;
  metrics?: string[];
}) {
  return (
    <>
      <section className={styles.pageHero}>
        <p className={styles.breadcrumb}>{breadcrumb}</p>
        <h1>{children}</h1>
        {description && <p className={styles.pageHeroCopy}>{description}</p>}
        {metrics && (
          <ul className={styles.heroMetrics}>
            {metrics.map((metric) => (
              <li key={metric}>✓ {metric}</li>
            ))}
          </ul>
        )}
      </section>
      <PatternBand />
    </>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className={styles.sectionLabel}>✣ <span>{children}</span></p>;
}

export function PrimaryButton({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Link className={styles.primaryButton} href={href}>
      {children} <span aria-hidden="true">→</span>
    </Link>
  );
}

export function CtaSection() {
  return (
    <>
      <PatternBand compact />
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>
            <span className={styles.ctaTitleLine}>Ready to do more with</span>
            <span className={styles.ctaTitleLine}>
              <span>your personal</span>
              <GradientText>AI assistant?</GradientText>
            </span>
          </h2>
          <p>When no tool fits the need, that’s when our AI agent shines.</p>
          <PrimaryButton href="/saazai/contact">Get Template</PrimaryButton>
          <div className={styles.ctaChecks}>
            <span><i>✓</i> Collaborate with your team</span>
            <span><i>✓</i> Organize projects at a glance</span>
          </div>
        </div>
        <div aria-hidden="true" className={styles.ctaScene}>
          <span className={`${styles.ctaRail} ${styles.ctaRailOne}`} />
          <span className={`${styles.ctaRail} ${styles.ctaRailTwo}`} />
          <span className={`${styles.ctaRail} ${styles.ctaRailThree}`} />
          <i className={`${styles.ctaBadge} ${styles.ctaBadgeGreen}`}>
            <Image alt="" height={33} src="/saazai/assets/c2b31b6030585db3.svg" width={33} />
          </i>
          <i className={`${styles.ctaBadge} ${styles.ctaBadgeCoral}`}>
            <Image alt="" height={31} src="/saazai/assets/435536d5e2a43882.svg" width={31} />
          </i>
          <i className={`${styles.ctaBadge} ${styles.ctaBadgeRed}`}>
            <Image alt="" height={47} src="/saazai/assets/b319cfa1e0749cf6.svg" width={47} />
          </i>
          <span className={`${styles.ctaChevron} ${styles.ctaChevronOne}`}>⌁</span>
          <span className={`${styles.ctaChevron} ${styles.ctaChevronTwo}`}>⌁</span>
          <div className={styles.ctaPrism}>
            <span className={styles.ctaPrismTop}><i /></span>
            <span className={styles.ctaPrismLeft} />
            <span className={styles.ctaPrismRight} />
          </div>
        </div>
      </section>
    </>
  );
}

export function FeatureCard({
  children,
  icon,
  title,
}: {
  children: ReactNode;
  icon?: ReactNode;
  title: string;
}) {
  return (
    <article className={styles.featureCard}>
      {icon && <span className={styles.cardIcon}>{icon}</span>}
      <h3>{title}</h3>
      <div className={styles.featureCopy}>{children}</div>
    </article>
  );
}

export function StandardSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`${styles.section} ${className}`}>{children}</section>
  );
}
