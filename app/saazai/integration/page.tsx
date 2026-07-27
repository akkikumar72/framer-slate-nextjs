import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CtaSection,
  GradientText,
  PatternBand,
} from "@/components/saazai/shared/SaazaiSections";
import styles from "@/components/saazai/product/ProductPages.module.css";

export const metadata: Metadata = {
  title: "Integrations | Saazai",
  description: "Connect Saazai with the tools your team already uses.",
};

const integrations = [
  ["Bitfco Enter Ltd.", "integration-01.svg"],
  ["Acme Co.", "integration-02.svg"],
  ["Binford Ltd.", "integration-03.svg"],
  ["First National Trust Co.", "integration-04.svg"],
  ["Ignition Ventures", "integration-05.svg"],
  ["Velocity Ventures", "integration-06.svg"],
];

export default function IntegrationPage() {
  return (
    <div className={styles.productPage}>
      <section className={styles.integrationHero}>
        <div className={styles.integrationHeroContent}>
          <p className={styles.eyebrow}>Home / Integrations</p>
          <h1>
            Smart connections,
            <br />
            <GradientText>smoother work.</GradientText>
          </h1>
          <p>We’re a team of creators, engineers, and thinkers building.</p>
          <Link className={styles.purpleButton} href="/saazai/contact">
            Try Free for 14 Days <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div aria-hidden="true" className={styles.integrationArtwork}>
          <div className={styles.integrationCore}>
            <Image
              alt=""
              height={42}
              src="/saazai/assets/saazai-small-logo.svg"
              width={42}
            />
          </div>
          {integrations.slice(0, 4).map(([, icon]) => (
            <span className={styles.integrationSatellite} key={icon}>
              <Image
                alt=""
                height={28}
                src={`/saazai/assets/${icon}`}
                width={28}
              />
            </span>
          ))}
        </div>
      </section>
      <PatternBand />
      <section className={styles.integrationGrid}>
        {integrations.map(([name, icon]) => (
          <article className={styles.integrationCard} key={name}>
            <Image
              alt=""
              height={52}
              src={`/saazai/assets/${icon}`}
              width={52}
            />
            <h2>{name}</h2>
            <p>
              Diano.py helps developers automate tasks, manage data efficiently,
              and build smarter Python-based workflows.
            </p>
            <Link href="/saazai/contact">Learn More&nbsp; →</Link>
          </article>
        ))}
      </section>
      <PatternBand />
      <CtaSection />
    </div>
  );
}
