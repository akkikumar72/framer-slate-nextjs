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
import { riveroRoutes } from "./routeData";
import styles from "./RiveroShell.module.css";

const primaryNavigation = [
  { href: "/rivero/feature", label: "Features" },
  { href: "/rivero/pricing-v1", label: "Pricing" },
  { href: "/rivero/contact-us", label: "Contact" },
];

export function RiveroRoot({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-rivero-reveal]"),
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach((item) => (item.dataset.riveroRevealState = "visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = entry.target as HTMLElement;
          item.dataset.riveroRevealState = "visible";
          observer.unobserve(item);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className={styles.root} ref={rootRef}>
      {children}
    </div>
  );
}

export function RiveroHeader({ solid = false }: { solid?: boolean }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const overlayPaths = new Set([
    "/rivero",
    "/rivero/pricing-v1",
    "/rivero/pricing-v2",
    "/rivero/feature",
  ]);
  const light = !solid && !overlayPaths.has(pathname);

  useEffect(() => {
    setMobileOpen(false);
    setPagesOpen(false);
  }, [pathname]);

  return (
    <header className={`${styles.header} ${solid ? styles.headerSolid : ""} ${light ? styles.headerLight : ""}`}>
      <nav aria-label="Rivero main navigation" className={styles.headerInner}>
        <Link aria-label="Rivero home" className={styles.logo} href="/rivero">
          <img alt="Rivero" height="42" src={light ? "/rivero/assets/eac89115f94d75a0.svg" : "/rivero/assets/e5fd9a7b4e8323de.svg"} width="164" />
        </Link>

        <div className={styles.desktopNav}>
          <button
            aria-expanded={pagesOpen}
            className={styles.allPagesButton}
            onClick={() => setPagesOpen((value) => !value)}
            type="button"
          >
            All Pages <span aria-hidden="true">⌄</span>
          </button>
          {primaryNavigation.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </div>

        <Link className={styles.headerCta} href="/rivero/contact-us">
          <span>Get started for free</span><i aria-hidden="true">↗</i>
        </Link>

        <button
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className={styles.menuButton}
          onClick={() => setMobileOpen((value) => !value)}
          type="button"
        >
          <span /><span /><span />
        </button>

        <div className={`${styles.pagesMenu} ${pagesOpen ? styles.pagesMenuOpen : ""}`}>
          {riveroRoutes.map((route, index) => (
            <Link
              href={route.href}
              key={route.href}
              style={{ "--rivero-menu-index": index } as CSSProperties}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>{route.label}
            </Link>
          ))}
        </div>

        <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ""}`}>
          {riveroRoutes.map((route) => (
            <Link href={route.href} key={route.href}>{route.label}</Link>
          ))}
          <Link className={styles.mobileCta} href="/rivero/contact-us">Get started for free</Link>
        </div>
      </nav>
    </header>
  );
}

export function RiveroButton({
  children,
  href,
  light = false,
}: {
  children: ReactNode;
  href: string;
  light?: boolean;
}) {
  return (
    <Link className={`${styles.button} ${light ? styles.buttonLight : ""}`} href={href}>
      <span>{children}</span><i aria-hidden="true">↗</i>
    </Link>
  );
}

type FooterIconName = "instagram" | "linkedin" | "mail" | "map" | "phone" | "x";

function FooterIcon({ name }: { name: FooterIconName }) {
  if (name === "mail") return <svg aria-hidden="true" fill="none" viewBox="0 0 24 24"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect height="16" rx="2" width="20" x="2" y="4"/></svg>;
  if (name === "phone") return <svg aria-hidden="true" fill="none" viewBox="0 0 24 24"><rect height="20" rx="2" width="14" x="5" y="2"/><path d="M12 18h.01"/></svg>;
  if (name === "map") return <svg aria-hidden="true" fill="none" viewBox="0 0 24 24"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>;
  if (name === "instagram") return <svg aria-hidden="true" fill="none" viewBox="0 0 24 24"><path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z"/><path d="M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0m7.5-4.5v.01"/></svg>;
  if (name === "x") return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z"/></svg>;
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M17 2a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm-9 8a1 1 0 0 0-1 1v5a1 1 0 0 0 2 0v-5a1 1 0 0 0-1-1m6 0a3 3 0 0 0-1.168.236l-.125.057A1 1 0 0 0 11 11v5a1 1 0 0 0 2 0v-3a1 1 0 0 1 2 0v3a1 1 0 0 0 2 0v-3a3 3 0 0 0-3-3M8 7a1 1 0 0 0-.993.883L7 8.01a1 1 0 0 0 1.993.117L9 8a1 1 0 0 0-1-1"/></svg>;
}

export function RiveroFooter() {
  const columns = [
    {
      title: "Quick Links",
      links: [
        ["Home", "/rivero"], ["Pricing", "/rivero/pricing-v1"],
        ["About", "/rivero/about"], ["Features", "/rivero/feature"],
      ],
    },
    {
      title: "Resources",
      links: [
        ["Blog", "/rivero/blog"], ["Reviews", "/rivero/reviews"],
        ["Contact", "/rivero/contact-us"], ["Integrations", "/rivero/integrations"],
      ],
    },
  ];

  return (
    <footer className={styles.footer}>
      <section className={styles.footerCta}>
        <div className={styles.pixelField} aria-hidden="true" />
        <div className={styles.footerCtaCopy}>
          <h2 data-rivero-reveal="hero">Start Managing Your Workforce Smarter Today</h2>
          <p data-rivero-reveal style={{ "--rivero-delay": "110ms" } as CSSProperties}>
            Take control of your HR processes with a single, intuitive platform. Automate attendance, payroll, and performance tracking while keeping.
          </p>
          <div className={styles.footerActions} data-rivero-reveal style={{ "--rivero-delay": "200ms" } as CSSProperties}>
            <RiveroButton href="/rivero/contact-us" light>Get Started for Free</RiveroButton>
            <Link className={styles.button} href="/rivero/appointment"><span>Book A Demo</span><i aria-hidden="true">→</i></Link>
          </div>
        </div>
      </section>

      <div className={styles.footerBody} data-rivero-reveal="card">
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Link href="/rivero"><img alt="Rivero" src="/rivero/assets/eac89115f94d75a0.svg" /></Link>
            <p>Simplifying your call scheduling, one meeting at a time.</p>
          </div>
          <div className={styles.footerLinks}>
            {columns.map((column) => (
              <div className={styles.footerColumn} key={column.title}>
                <h3>{column.title}</h3>
                {column.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}
              </div>
            ))}
            <div className={styles.footerContact}>
              <h3>Contact Us</h3>
              <a className={styles.footerContactLink} href="mailto:support@vidsync.com"><FooterIcon name="mail"/><span>support@vidsync.com</span></a>
              <a className={styles.footerContactLink} href="tel:+18001234567"><FooterIcon name="phone"/><span>+1-800-123-4567</span></a>
              <a className={styles.footerContactLink} href="https://maps.app.goo.gl/sGX5dHKEzV9C3Z8s8"><FooterIcon name="map"/><span>123 Scheduler St, Tech City, USA</span></a>
            </div>
          </div>
        </div>
        <div className={styles.footerCardBottom}>
          <RiveroButton href="/rivero/pricing-v1">Start Free Trial</RiveroButton>
          <div aria-label="Social links" className={styles.footerSocials}>
            <a aria-label="Instagram" href="https://www.instagram.com"><FooterIcon name="instagram"/></a>
            <a aria-label="X" href="https://www.x.com"><FooterIcon name="x"/></a>
            <a aria-label="LinkedIn" href="https://www.linkedin.com"><FooterIcon name="linkedin"/></a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom} data-rivero-reveal>
        <p>© 2026 Rivero. All rights reserved.</p>
        <div><Link href="/rivero/legal/privacy-policy">Privacy Policy</Link><Link href="/rivero/legal/terms-conditions">Terms of Service</Link></div>
      </div>
    </footer>
  );
}

export function RiveroPageFrame({ children, solidHeader = false }: { children: ReactNode; solidHeader?: boolean }) {
  return <><RiveroHeader solid={solidHeader} />{children}<RiveroFooter /></>;
}
