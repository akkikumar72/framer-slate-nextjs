import Link from "next/link";
import { type CSSProperties, type ReactNode } from "react";
import { DASHFLUENCE_BASE } from "@/components/dashfluence/shared/routes";
import { legalSections } from "./data";
import styles from "./Legal.module.css";

const intro =
  "Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.";

function LegalBlock({
  children,
  heading,
  level = 3,
}: {
  children: ReactNode;
  heading: string;
  level?: 3 | 4;
}) {
  const Heading = level === 3 ? "h2" : "h3";
  return (
    <section className={styles.legalBlock} data-dash-reveal="rise">
      <Heading>{heading}</Heading>
      {children}
    </section>
  );
}

const faqItems = [
  {
    question: "What types of businesses do you work with?",
    answer:
      "Our standard engagements include strategy, creative, campaign setup, analytics, and ongoing optimization. You’ll also get access to a dedicated team, weekly reports, and real-time performance dashboards.",
  },
  {
    question: "What’s your pricing model?",
    answer:
      "We offer flexible monthly partnerships and focused project scopes shaped around your goals.",
  },
  {
    question: "What’s included in a typical engagement?",
    answer:
      "Strategy, creative production, campaign management, measurement, and ongoing optimization.",
  },
  {
    question: "How quickly can we launch?",
    answer:
      "Most partnerships begin with a short discovery sprint and can launch within a few weeks.",
  },
  {
    question:
      "How do you ensure the website is mobile-friendly and optimized for all devices?",
    answer:
      "We design responsively, test core breakpoints, and review performance and accessibility.",
  },
] as const;

function LegalFaq() {
  return (
    <section className={styles.faqSection}>
      <div className={styles.faqIntro} data-dash-reveal="left">
        <p className={styles.eyebrow}><span aria-hidden="true">⌜</span> FAQ</p>
        <h2>Got Questions? We’ve Got Answers.</h2>
        <p>Here are some of the most common queries to help you get started.</p>
        <Link href={DASHFLUENCE_BASE + "/contact-us"}>Contact us</Link>
      </div>
      <div className={styles.accordion} data-dash-reveal="rise">
        {faqItems.map((item, index) => (
          <details key={item.question} open={index === 0}>
            <summary>
              <span>{item.question}</span>
              <span aria-hidden="true" className={styles.disclosureIcon} />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function LegalPage({ title }: { title: string }) {
  return (
    <div className={styles.page}>
      <section className={styles.legalHero}>
        <h1 data-dash-reveal="rise">{title}</h1>
        <p
          data-dash-reveal="rise"
          style={{ "--dash-delay": "80ms" } as CSSProperties}
        >
          {intro}
        </p>
      </section>
      <article className={styles.legalArticle}>
        {legalSections.map((section) => (
          <LegalBlock
            heading={section.heading}
            key={section.heading}
            level={section.level}
          >
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.items ? (
              <ul>
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : null}
          </LegalBlock>
        ))}
      </article>
      <LegalFaq />
    </div>
  );
}
