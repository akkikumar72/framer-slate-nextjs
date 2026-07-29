"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./TrilloShell.module.css";

export const TRILLO_TEMPLATE_URL =
  "https://finestdevs.com/get-ultimate-free-bundle";

const navigation = [
  { href: "/Trillo#feature", label: "Features" },
  { href: "/Trillo#pricing", label: "Pricing" },
  { href: "/Trillo#review", label: "Reviews" },
];

const mobileNavigation = [
  { href: "/Trillo", label: "Homepage" },
  { href: "/Trillo#feature", label: "Features" },
  { href: "/Trillo#pricing", label: "Pricing" },
  { href: "/Trillo#review", label: "Reviews" },
  { href: "/Trillo/404", label: "404" },
];

export function TrilloRoot({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const revealItems = Array.from(
      root.querySelectorAll<HTMLElement>("[data-trillo-reveal]"),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealItems.forEach((item) => {
        item.dataset.trilloRevealState = "visible";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const item = entry.target as HTMLElement;
          item.dataset.trilloRevealState = "visible";
          observer.unobserve(item);
        });
      },
      {
        rootMargin: "0px 0px -7% 0px",
        threshold: 0.08,
      },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className={styles.trilloRoot} ref={rootRef}>
      {children}
    </div>
  );
}

export function TrilloHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <nav aria-label="Trillo main navigation" className={styles.headerInner}>
        <Link aria-label="Trillo home" className={styles.logoLink} href="/Trillo">
          <img alt="Trillo" height="42" src="/trillo/assets/logo.svg" width="142" />
        </Link>

        <div className={styles.desktopNav}>
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className={styles.headerActions}>
          <span className={styles.login}>Login</span>
        </div>

        <button
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className={styles.menuButton}
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <span />
          <span />
        </button>

        <div
          aria-hidden={!open}
          className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ""}`}
        >
          {mobileNavigation.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export function TrilloCta() {
  return (
    <section className={styles.ctaSection}>
      <img
        alt=""
        aria-hidden="true"
        className={styles.ctaBackground}
        src="/trillo/assets/cta-background.avif"
      />
      <div className={styles.ctaContent}>
        <h2 data-trillo-reveal="pop">
          Build website with no-code, within 48 hours or less
        </h2>
        <p
          data-trillo-reveal="soft"
          style={{ "--trillo-reveal-delay": "110ms" } as CSSProperties}
        >
          Stay ahead with the latest updates and smart sales tips delivered
          right to your inbox.
        </p>
        <a
          className={styles.lightButton}
          data-trillo-reveal="pop"
          href={TRILLO_TEMPLATE_URL}
          style={{ "--trillo-reveal-delay": "200ms" } as CSSProperties}
        >
          Get Template for Free
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

const footerColumns = [
  {
    title: "Company",
    links: [
      { href: "/Trillo#feature", label: "Features" },
      { href: "/Trillo#pricing", label: "Pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/Trillo#insights", label: "Insights" },
      { href: "/Trillo#review", label: "Review" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/Trillo#review", label: "Testimonials" },
      { href: "/Trillo/404", label: "404" },
    ],
  },
];

const socials = [
  {
    href: "https://www.facebook.com",
    icon: "/trillo/assets/facebook.svg",
    label: "Facebook",
  },
  {
    href: "https://www.linkedin.com",
    icon: "/trillo/assets/linkedin.svg",
    label: "LinkedIn",
  },
  {
    href: "https://www.instagram.com",
    icon: "/trillo/assets/instagram.svg",
    label: "Instagram",
  },
  {
    href: "https://web.telegram.org/k/",
    icon: "/trillo/assets/telegram.svg",
    label: "Telegram",
  },
];

export function TrilloFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerColumns}>
            {footerColumns.map((column, index) => (
              <div
                className={styles.footerColumn}
                data-trillo-reveal="soft"
                key={column.title}
                style={
                  {
                    "--trillo-reveal-delay": `${index * 70}ms`,
                  } as CSSProperties
                }
              >
                <p>{column.title}</p>
                {column.links.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div
            className={styles.socialColumn}
            data-trillo-reveal="soft"
            style={{ "--trillo-reveal-delay": "210ms" } as CSSProperties}
          >
            <p>Stay connected</p>
            <div className={styles.socials}>
              {socials.map((social) => (
                <a aria-label={social.label} href={social.href} key={social.href}>
                  <img alt="" height="16" src={social.icon} width="16" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          className={styles.footerBottom}
          data-trillo-reveal="soft"
          style={{ "--trillo-reveal-delay": "280ms" } as CSSProperties}
        >
          <Link aria-label="Trillo home" href="/Trillo">
            <img alt="Trillo" height="42" src="/trillo/assets/logo.svg" width="142" />
          </Link>
          <p>Trilo AI is designed to revolutionize how businesses operate.</p>
          <span>© 2025 Trilo, Inc. All rights reserved</span>
        </div>
      </div>
    </footer>
  );
}

export function TrilloPageFrame({ children }: { children: ReactNode }) {
  return (
    <>
      <TrilloHeader />
      {children}
      <TrilloCta />
      <TrilloFooter />
    </>
  );
}
