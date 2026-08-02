"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { DASHFLUENCE_BASE } from "@/components/dashfluence/shared/routes";
import { dashfluenceServices } from "./service-data";
import styles from "./Services.module.css";

export function ServiceExplorer() {
  const [activeSlug, setActiveSlug] = useState(dashfluenceServices[0].slug);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const activeService =
    dashfluenceServices.find((service) => service.slug === activeSlug) ??
    dashfluenceServices[0];

  return (
    <div className={styles.explorer}>
      <Link
        aria-label={`Explore ${activeService.title}`}
        className={styles.explorerVisual}
        href={`${DASHFLUENCE_BASE}/services/${activeService.slug}`}
      >
        <Image
          alt={`${activeService.title} service`}
          fill
          key={activeService.image}
          sizes="(max-width: 767px) calc(100vw - 40px), 250px"
          src={activeService.image}
        />
        <span className={styles.explorerVisualShade} />
        <span className={styles.explorerVisualText}>
          <strong>{activeService.title}</strong>
          <span>{activeService.subtitle}</span>
        </span>
      </Link>

      <div aria-label="Dashfluence services" className={styles.explorerList} role="list">
        {dashfluenceServices.map((service) => {
          const isActive = service.slug === activeSlug;
          return (
            <div className={styles.explorerRow} key={service.slug} role="listitem">
              <button
                aria-controls={`dashfluence-service-${service.slug}-details`}
                aria-expanded={isMobile || isActive}
                className={styles.explorerTrigger}
                onClick={() => setActiveSlug(service.slug)}
                onFocus={() => setActiveSlug(service.slug)}
                onMouseEnter={() => setActiveSlug(service.slug)}
                type="button"
              >
                <span>{service.title}</span>
                <span aria-hidden="true" className={styles.explorerArrow}>↗</span>
              </button>
              <div
                aria-hidden={!isMobile && !isActive}
                className={`${styles.explorerCopy} ${isActive ? styles.explorerCopyActive : ""}`}
                id={`dashfluence-service-${service.slug}-details`}
              >
                <div className={styles.explorerCopyInner}>
                  <p>{service.description}</p>
                  <strong>{service.win}</strong>
                  <Link
                    href={`${DASHFLUENCE_BASE}/services/${service.slug}`}
                    tabIndex={isMobile || isActive ? 0 : -1}
                  >
                    View service <span aria-hidden="true">↗</span>
                  </Link>
                </div>
              </div>
              <Link
                aria-label={`View ${service.title}`}
                aria-hidden={!isMobile && !isActive}
                className={`${styles.explorerMobileImage} ${isActive ? styles.explorerMobileImageActive : ""}`}
                href={`${DASHFLUENCE_BASE}/services/${service.slug}`}
                tabIndex={isMobile || isActive ? 0 : -1}
              >
                <Image
                  alt=""
                  fill
                  sizes="calc(100vw - 40px)"
                  src={service.image}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
