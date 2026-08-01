"use client";

import { useState } from "react";
import {
  Awards,
  ArrowLink,
  DotsDivider,
  FaqSection,
  GridSection,
  PricingSection,
} from "../shared/JaydenSections";
import { jaydenAsset } from "../shared/assets";
import { RouteIntro } from "./RouteIntro";
import styles from "./ServiceProfile.module.css";

const services = [
  {
    number: "01",
    title: "Brand Design",
    features: ["Typography & Color Systems", "Logo Design", "Brand Guidelines"],
  },
  {
    number: "02",
    title: "UI/UX Design",
    features: ["User Research & Strategy", "Wireframes & Prototypes", "Interface Design Systems"],
  },
  {
    number: "03",
    title: "Webflow Dev",
    features: ["Responsive Webflow Build", "CMS Setup & Integration", "Custom Interactions"],
  },
  {
    number: "04",
    title: "Framer Dev",
    features: ["Responsive Framer Build", "Components & CMS", "Motion & Interaction"],
  },
] as const;

export function ServiceProfile() {
  const [activeService, setActiveService] = useState(0);

  return (
    <>
      <RouteIntro
        eyebrow="Services"
        kicker="Crafting modern"
        tall
        title={["DIGITAL", "EXPERIENCES"]}
      />

      <GridSection className={styles.servicesSection}>
        <div className={styles.servicesPanel}>
          <div className={styles.serviceList}>
            {services.map((service, index) => {
              const active = activeService === index;

              return (
                <button
                  aria-expanded={active}
                  className={`${styles.serviceRow} ${active ? styles.serviceActive : ""}`}
                  key={service.title}
                  onClick={() => setActiveService(index)}
                  type="button"
                >
                  <span className={styles.serviceIcon} aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={jaydenAsset("cKpmrl3oq2A92nEocUYNb12FA8.svg")} alt="" />
                  </span>
                  <span className={styles.serviceCopy}>
                    <span className={styles.serviceTitleLine}>
                      <strong>{service.title}</strong>
                      <small>[{service.number}]</small>
                    </span>
                    <span className={styles.serviceFeatures}>
                      {service.features.map((feature) => (
                        <span key={feature}>{feature}</span>
                      ))}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className={styles.panelFooter}>
            <span>
              <b aria-hidden="true">◎</b>
              Available Worldwide
            </span>
            <ArrowLink href="/contact" light>
              Contact me
            </ArrowLink>
          </div>
        </div>
        <DotsDivider />
      </GridSection>

      <Awards />
      <PricingSection initialPlan="standard" />
      <FaqSection className={styles.serviceFaqSection} />
    </>
  );
}
