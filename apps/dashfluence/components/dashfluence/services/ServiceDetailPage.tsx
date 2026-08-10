import Image from "next/image";

import { DashButton } from "@/components/dashfluence/shared/DashfluenceShell";
import { DASHFLUENCE_BASE } from "@/components/dashfluence/shared/routes";
import type { DashfluenceService } from "./service-data";
import { ServiceBlogSection, ServiceFaqSection } from "./ServiceSections";
import styles from "./Services.module.css";

const includedItems = [
  {
    title: "1. Brand Discovery & Research",
    text: "We start by understanding your vision, market, workshops and trend research. This ensures your brand stands out while staying relevant.",
  },
  {
    title: "2. Logo Design & Variations",
    text: "A strong, memorable logo forms the cornerstone of your identity. We provide concepts and variations optimized for every medium, print, web, and merchandise.",
  },
  {
    title: "3. Color Palette & Typography",
    text: "We curate colors and fonts that align with your brand’s tone and personality, ensuring visual harmony across all channels.",
  },
  {
    title: "4. Brand Guidelines Document",
    text: "Receive a comprehensive style guide outlining usage rules for your logo, colors, fonts, and other brand assets, keeping your identity consistent everywhere.",
  },
] as const;

const introduction =
  "Your brand is more than just a logo. It’s the story, emotion, and promise you deliver to your audience. With our Brand Identity & Visual Design service, we craft designs that connect deeply, inspire trust, and leave a lasting impression. From concept to creation, we ensure your brand visually communicates exactly who you are and what you stand for.";

export function ServiceDetailPage({ service }: { service: DashfluenceService }) {
  return (
    <div className={styles.detailPage}>
      <article className={styles.detailArticle}>
        <div className={styles.detailHeading}>
          <h1 data-dash-reveal="rise">{service.title}</h1>
          <p data-dash-reveal="rise" style={{ "--dash-delay": "70ms" } as React.CSSProperties}>
            Dashfluence helps brands turn clicks into customers through data-backed marketing built for today.
          </p>
        </div>

        <div className={styles.detailHeroImage} data-dash-reveal="rise">
          <Image
            alt={`${service.title} service`}
            fill
            priority
            sizes="(max-width: 767px) calc(100vw - 40px), calc(100vw - 60px)"
            src={service.image}
          />
        </div>

        <div className={styles.detailCopy} data-dash-reveal="rise">
          <h2>Introduction</h2>
          <p>{introduction}</p>
          <h2>What’s Included in This Service</h2>
          <p>
            From research and positioning to a complete visual system, every deliverable is built to make your brand clear, memorable, and consistent at every touchpoint.
          </p>
        </div>

        <div className={styles.includedGrid} data-dash-reveal="rise">
          {includedItems.map((item) => (
            <section className={styles.includedItem} key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </section>
          ))}
        </div>

        <div className={styles.detailCopy} data-dash-reveal="rise">
          <div className={styles.detailSecondaryImage}>
            <Image
              alt="Dashfluence service team at work"
              fill
              sizes="(max-width: 767px) calc(100vw - 40px), 1100px"
              src={service.detailImage}
            />
          </div>
          <h2>Why Choose This Service</h2>
          <p>{introduction}</p>
          <h2>Conclusion</h2>
          <p>
            From concept to creation, we make sure your brand creates a lasting impression and communicates exactly who you are.
          </p>
        </div>

        <div className={styles.backButton} data-dash-reveal="rise">
          <DashButton href={`${DASHFLUENCE_BASE}/services`}>Back To Service</DashButton>
        </div>
      </article>

      <ServiceFaqSection />
      <ServiceBlogSection />
    </div>
  );
}
