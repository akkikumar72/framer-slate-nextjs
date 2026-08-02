import Image from "next/image";

import { SectionEyebrow } from "@/components/dashfluence/shared/DashfluenceShell";
import { dashfluenceAsset } from "@/components/dashfluence/shared/assets";
import { ServiceExplorer } from "./ServiceExplorer";
import { ServiceBlogSection, ServiceFaqSection } from "./ServiceSections";
import styles from "./Services.module.css";

const processSteps = [
  {
    icon: "⌕",
    title: "1. Discovery & Strategy",
    text: "We start by understanding your goals, audience, and challenges.",
  },
  {
    icon: "◎",
    title: "2. Creative Exploration",
    text: "We brainstorm and develop concepts and bring ideas to life with precision and creativity.",
  },
  {
    icon: "✺",
    title: "3. Launch & Support",
    text: "We ensure everything runs smoothly and provide ongoing assistance.",
  },
] as const;

export function ServicesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroTop}>
            <h1 data-dash-reveal="rise">Explore our professional services</h1>
            <p data-dash-reveal="rise" style={{ "--dash-delay": "70ms" } as React.CSSProperties}>
              Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.
            </p>
          </div>

          <div className={styles.heroBottom}>
            <div className={styles.heroCopy}>
              <div data-dash-reveal="rise">
                <h2>Our Services. Crafted to Help You Succeed</h2>
                <p>From ideas to execution, we provide everything you need to grow, stand out, and thrive.</p>
              </div>
              <p data-dash-reveal="rise">
                We combine creativity, strategy, and technology to deliver solutions that are tailored to your unique needs. Whether you’re looking for design, branding, or development, our team ensures every detail is crafted to perfection.
              </p>
            </div>

            <div className={styles.heroImages}>
              <div className={styles.heroImageTall} data-dash-reveal="rise">
                <Image
                  alt="Radiical Roast brand packaging"
                  fill
                  priority
                  sizes="(max-width: 767px) calc(100vw - 40px), 386px"
                  src={dashfluenceAsset("c0qU2XtEX3kJg3xoQtsO1783o.png")}
                />
              </div>
              <div
                className={styles.heroImageShort}
                data-dash-reveal="rise"
                style={{ "--dash-delay": "90ms" } as React.CSSProperties}
              >
                <Image
                  alt="Castro Capital visual identity"
                  fill
                  priority
                  sizes="(max-width: 767px) calc(100vw - 40px), 386px"
                  src={dashfluenceAsset("4P2ZA6XJzVl23PauGPN215CueA.png")}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className={styles.sectionInner}>
          <div className={styles.servicesHeading}>
            <div data-dash-reveal="rise">
              <SectionEyebrow tone="light">Services</SectionEyebrow>
              <h2>Performance-Driven Services,<br />Built to Convert</h2>
            </div>
            <p data-dash-reveal="rise">
              Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.
            </p>
          </div>
          <div data-dash-reveal="rise">
            <ServiceExplorer />
          </div>
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.sectionInner}>
          <div className={styles.processHeading} data-dash-reveal="rise">
            <div>
              <SectionEyebrow>Case Studies</SectionEyebrow>
              <h2>Our Working Process</h2>
            </div>
            <p>Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.</p>
          </div>
          <div className={styles.processGrid}>
            {processSteps.map((step, index) => (
              <article
                className={styles.processCard}
                data-dash-reveal="rise"
                key={step.title}
                style={{ "--dash-delay": `${index * 100}ms` } as React.CSSProperties}
              >
                <span aria-hidden="true" className={styles.processIcon}>{step.icon}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.whySection}>
        <div className={styles.whyInner}>
          <div className={styles.whyCopy} data-dash-reveal="left">
            <SectionEyebrow>Core Values</SectionEyebrow>
            <h2>Why Choose Us</h2>
            <p>Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.</p>
            <p>
              We combine creativity, strategy, and technology to deliver solutions tailored to your unique needs. Whether you’re looking for design, branding, or development, our team ensures every detail is crafted to perfection.
            </p>
          </div>
          <div className={styles.whyImage} data-dash-reveal="rise">
            <Image
              alt="Dashfluence team working together"
              fill
              sizes="(max-width: 767px) calc(100vw - 40px), 50vw"
              src={dashfluenceAsset("pOnJekiaH8tFBQqNqAoCiF4w3M.png")}
            />
          </div>
        </div>
      </section>

      <section className={styles.metricsSection}>
        <div className={styles.sectionInner}>
          <SectionEyebrow>Key Metrics</SectionEyebrow>
          <h2 data-dash-reveal="rise">
            Behind every campaign we launch is a strategy rooted in results. Here’s a snapshot of the <span>performance we’ve delivered for brands like yours, and we’re just getting started.</span>
          </h2>
          <div className={styles.metricsGrid}>
            <article className={styles.metricCard} data-dash-reveal="rise">
              <strong><small>$</small>3.2<small>M+</small></strong>
              <p>Ad Spend Managed</p>
            </article>
            <article className={styles.metricCard} data-dash-reveal="rise" style={{ "--dash-delay": "90ms" } as React.CSSProperties}>
              <strong>5.4<small>x</small></strong>
              <p>Average ROAS on Paid Campaigns</p>
            </article>
            <article className={styles.metricCard} data-dash-reveal="rise" style={{ "--dash-delay": "180ms" } as React.CSSProperties}>
              <strong>120<small>+</small></strong>
              <p>Campaigns Launched</p>
            </article>
          </div>
        </div>
      </section>

      <ServiceFaqSection />
      <ServiceBlogSection />
    </div>
  );
}
