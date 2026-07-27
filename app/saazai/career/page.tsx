import type { Metadata } from "next";
import Link from "next/link";
import {
  CtaSection,
  GradientText,
  PageHero,
  PatternBand,
} from "@/components/saazai/shared/SaazaiSections";
import {
  CareerBoard,
  FaqList,
} from "@/components/saazai/product/ProductInteractions";
import styles from "@/components/saazai/product/ProductPages.module.css";

export const metadata: Metadata = {
  title: "Careers | Saazai",
  description: "Explore remote design, engineering, and marketing roles at Saazai.",
};

const values = [
  {
    icon: "◎",
    title: "Mastery",
    copy: "We pursue excellence through continuous learning.",
  },
  {
    icon: "✣",
    title: "Integrity",
    copy: "We’re open. We’re honest. And we earn the trust.",
  },
  {
    icon: "◇",
    title: "Ambition",
    copy: "We tackle big challenges. No matter what.",
  },
  {
    icon: "♧",
    title: "Teamwork",
    copy: "We create momentum by working together, at the same time.",
  },
];

const benefits = [
  {
    icon: "⌁",
    title: "Remote Policy",
    copy: "We offer partial and fully remote options to all of our employees.",
  },
  {
    icon: "▰",
    title: "Lunch Card",
    copy: "Monthly lunch cards to employees that join us in our SF office.",
  },
  {
    icon: "▤",
    title: "Career Tracks",
    copy: "We help our employees with their goals and track their progress.",
  },
  {
    icon: "◉",
    title: "Salary Package",
    copy: "We pay the top 90th-percentile of the salary band to everyone.",
  },
  {
    icon: "♥",
    title: "Well-being",
    copy: "Monthly stipend for therapy, or activities that enhance your mental well-being.",
  },
];

export default function CareerPage() {
  return (
    <div className={styles.productPage}>
      <PageHero
        breadcrumb="Home / Career"
        description="We’re a team of creators, engineers, and thinkers building."
        metrics={[
          "1,000+ Employees",
          "12 Locations",
          "Over $550M Funding",
          "2M+ Websites built",
        ]}
      >
        Drive your career
        <br />
        <GradientText>forward with Omni</GradientText>
      </PageHero>

      <section className={styles.careerValues}>
        <div className={styles.careerValuesTitle}>
          <p className={styles.eyebrow}>✣ &nbsp; What Drives Us</p>
          <h2>
            Guided by purpose,
            <br />
            fueled by people
          </h2>
        </div>
        {values.map((value) => (
          <article className={styles.valueCard} key={value.title}>
            <span aria-hidden="true" className={styles.iconTile}>
              {value.icon}
            </span>
            <h3>{value.title}</h3>
            <p>{value.copy}</p>
          </article>
        ))}
      </section>

      <section className={styles.careerOpenings}>
        <div className={styles.careerOpeningsHeader}>
          <div>
            <p className={styles.eyebrow}>✣ &nbsp; Open roles</p>
            <h2>
              A growing team behind
              <br />
              every intelligent move.
            </h2>
          </div>
        </div>
        <CareerBoard />
      </section>
      <PatternBand />

      <section className={styles.careerBenefits}>
        <p className={styles.eyebrow}>✣ &nbsp; Why Join Us</p>
        <h2>
          Competitive benefits designed
          <br />
          for your growth.
        </h2>
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit) => (
            <article className={styles.benefitCard} key={benefit.title}>
              <span aria-hidden="true" className={styles.iconTile}>
                {benefit.icon}
              </span>
              <h3>{benefit.title}</h3>
              <p>{benefit.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.faqSection}>
        <div>
          <p className={styles.eyebrow}>✣ &nbsp; FAQ</p>
          <h2>Answers to common questions about Omni!</h2>
        </div>
        <FaqList />
      </section>
      <div className={styles.supportBanner}>
        <div>
          <h3>Still have questions?</h3>
          <p>Our support team can help you out.</p>
        </div>
        <Link className={styles.purpleButton} href="/saazai/contact">
          Get a Demo <span aria-hidden="true">→</span>
        </Link>
      </div>
      <PatternBand />
      <CtaSection />
    </div>
  );
}
