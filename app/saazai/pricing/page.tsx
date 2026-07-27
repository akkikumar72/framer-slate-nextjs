import type { Metadata } from "next";
import Link from "next/link";
import {
  CtaSection,
  GradientText,
  PatternBand,
} from "@/components/saazai/shared/SaazaiSections";
import {
  FaqList,
  PricingContent,
} from "@/components/saazai/product/ProductInteractions";
import styles from "@/components/saazai/product/ProductPages.module.css";

export const metadata: Metadata = {
  title: "Pricing | Saazai",
  description: "Choose a Saazai plan and compare AI agent features.",
};

export default function PricingPage() {
  return (
    <div className={styles.productPage}>
      <section className={styles.pricingHero}>
        <h1>
          Start with a plan.
          <br />
          <GradientText>Get started fast</GradientText>
        </h1>
        <p>We’re a team of creators, engineers, and thinkers building.</p>
      </section>
      <PricingContent />
      <PatternBand />
      <section className={styles.faqSection}>
        <div>
          <p className={styles.eyebrow}>✣ &nbsp; FAQ</p>
          <h2>Competitive benefits designed for your growth.</h2>
        </div>
        <FaqList />
      </section>
      <div className={styles.supportBanner}>
        <div>
          <h3>Still have questions?</h3>
          <p>Our support team can help you out.</p>
        </div>
        <Link className={styles.purpleButton} href="/saazai/contact">
          Book a Demo <span aria-hidden="true">→</span>
        </Link>
      </div>
      <PatternBand />
      <CtaSection />
    </div>
  );
}
