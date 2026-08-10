"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type CSSProperties,
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { dashfluenceAssets } from "./assets";
import {
  DASHFLUENCE_BASE,
  dashfluenceAllPages,
  dashfluenceNavigation,
} from "./routes";
import styles from "./DashfluenceShell.module.css";

export function DashfluenceRoot({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-dash-reveal]"),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => (item.dataset.dashRevealState = "visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = entry.target as HTMLElement;
          item.dataset.dashRevealState = "visible";
          observer.unobserve(item);
        });
      },
      { rootMargin: "0px 0px -7% 0px", threshold: 0.08 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className={styles.root} ref={rootRef}>
      <a className={styles.skipLink} href="#dashfluence-main">Skip to content</a>
      <DashfluenceHeader />
      <main id="dashfluence-main">{children}</main>
      <DashfluenceFooter />
    </div>
  );
}

export function DashfluenceHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pagesMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const isHome = pathname === DASHFLUENCE_BASE || pathname === `${DASHFLUENCE_BASE}/`;
  const isCurrent = (href: string) =>
    href === DASHFLUENCE_BASE
      ? isHome
      : pathname === href || pathname.startsWith(`${href}/`);
  const isExactCurrent = (href: string) =>
    href === DASHFLUENCE_BASE ? isHome : pathname === href;

  useEffect(() => {
    setOpen(false);
    setPagesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open && !pagesOpen) return;

    function onPointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      if (pagesOpen && !pagesMenuRef.current?.contains(target)) setPagesOpen(false);
      if (open && !navRef.current?.contains(target)) setOpen(false);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const mobileWasOpen = open;
      setOpen(false);
      setPagesOpen(false);
      if (mobileWasOpen) menuButtonRef.current?.focus();
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, pagesOpen]);

  return (
    <header className={`${styles.header} ${isHome ? styles.headerOverlay : styles.headerLight}`}>
      <nav aria-label="Dashfluence main navigation" className={styles.nav} ref={navRef}>
        <Link aria-label="Dashfluence home" className={styles.logo} href={DASHFLUENCE_BASE}>
          <img alt="Dashfluence" height="20" src={isHome ? dashfluenceAssets.logo : dashfluenceAssets.logoDark} width="173" />
        </Link>

        <div className={styles.desktopNav}>
          <div
            className={`${styles.pagesMenu} ${pagesOpen ? styles.pagesMenuOpen : ""}`}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setPagesOpen(false);
            }}
            onMouseEnter={() => setPagesOpen(true)}
            onMouseLeave={() => setPagesOpen(false)}
            ref={pagesMenuRef}
          >
            <button
              aria-controls="dashfluence-pages-panel"
              aria-expanded={pagesOpen}
              aria-haspopup="true"
              onClick={() => setPagesOpen(true)}
              onFocus={() => setPagesOpen(true)}
              type="button"
            >
              All Pages <span aria-hidden="true">⌄</span>
            </button>
            <div aria-hidden={!pagesOpen} className={styles.pagesPanel} id="dashfluence-pages-panel">
              {dashfluenceAllPages.map((item) => (
                <Link
                  aria-current={isExactCurrent(item.href) ? "page" : undefined}
                  href={item.href}
                  key={item.href}
                  onClick={() => setPagesOpen(false)}
                  tabIndex={pagesOpen ? 0 : -1}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link aria-current={isCurrent(`${DASHFLUENCE_BASE}/services`) ? "page" : undefined} href={`${DASHFLUENCE_BASE}/services`}>Services</Link>
          <Link aria-current={isCurrent(`${DASHFLUENCE_BASE}/work`) ? "page" : undefined} href={`${DASHFLUENCE_BASE}/work`}>Works</Link>
          <Link aria-current={isCurrent(`${DASHFLUENCE_BASE}/contact-us`) ? "page" : undefined} href={`${DASHFLUENCE_BASE}/contact-us`}>Contact us</Link>
        </div>

        <DashButton className={styles.auditButton} href={`${DASHFLUENCE_BASE}/contact-us#contact-form`} tone={isHome ? "light" : "dark"}>
          Get Your Free Audit
        </DashButton>

        <button
          aria-controls="dashfluence-mobile-menu"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className={styles.menuButton}
          onClick={() => setOpen((value) => !value)}
          ref={menuButtonRef}
          type="button"
        >
          <span /><span /><span />
        </button>

        <div
          aria-hidden={!open}
          className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
          id="dashfluence-mobile-menu"
        >
          {dashfluenceAllPages.map((item) => (
            <Link aria-current={isExactCurrent(item.href) ? "page" : undefined} href={item.href} key={item.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

type DashButtonProps = {
  children: ReactNode;
  className?: string;
  href: string;
  tone?: "light" | "dark" | "outline" | "outlineDark";
};

export function DashButton({ children, className = "", href, tone = "dark" }: DashButtonProps) {
  return (
    <Link className={`${styles.button} ${styles[`button${tone[0].toUpperCase()}${tone.slice(1)}`]} ${className}`} href={href}>
      <span>{children}</span>
    </Link>
  );
}

export function SectionEyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  return <p className={`${styles.eyebrow} ${tone === "light" ? styles.eyebrowLight : ""}`}><span aria-hidden="true">✦</span>{children}</p>;
}

function NewsletterForm() {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <form className={styles.newsletter} onSubmit={submit}>
      <label htmlFor="dashfluence-email">Want smarter growth tips in your inbox?</label>
      <p>Join our newsletter for strategies and case studies from the team.</p>
      <div className={styles.newsletterField}>
        <input id="dashfluence-email" name="Email" placeholder="Enter your email" required type="email" />
        <button disabled={sent} type="submit">{sent ? "Sent" : "Send"}</button>
      </div>
      <span aria-live="polite" className={styles.newsletterStatus}>{sent ? "Thanks. You’re on the list." : ""}</span>
    </form>
  );
}

export function DashfluenceFooter() {
  const pathname = usePathname();
  const year = 2025;
  const isCurrent = (href: string) =>
    href === DASHFLUENCE_BASE
      ? pathname === href || pathname === `${href}/`
      : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <footer className={styles.footer}>
      <section className={styles.footerCta}>
        <div data-dash-reveal="rise">
          <SectionEyebrow tone="light">Get Started</SectionEyebrow>
          <h2>Let’s Skyrocket Your<br />Digital Growth Together</h2>
        </div>
        <div className={styles.footerCtaSide} data-dash-reveal="rise" style={{ "--dash-delay": "100ms" } as CSSProperties}>
          <DashButton href={`${DASHFLUENCE_BASE}/contact-us`} tone="light">Book a Free call</DashButton>
          <p>Partner with Dashfluence and watch your brand dominate the digital space with strategies.</p>
        </div>
      </section>
      <div className={styles.footerDivider} />
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <img alt="Dashfluence" height="29" src={dashfluenceAssets.logo} width="126" />
          <p>Performance-obsessed digital marketing agency helping brands scale smarter with data-driven strategy, bold and creative.</p>
          <div className={styles.socials}><a href="https://instagram.com" aria-label="Instagram">ig</a><a href="https://linkedin.com" aria-label="LinkedIn">in</a><a href="https://x.com" aria-label="X">x</a></div>
        </div>
        <div className={styles.footerLinks}>
          <div><p>Quick Links</p>{dashfluenceNavigation.slice(0, 4).map((item) => <Link aria-current={isCurrent(item.href) ? "page" : undefined} href={item.href} key={item.href}>{item.label}</Link>)}</div>
          <div><p>Quick Links</p>{dashfluenceNavigation.slice(4, 7).map((item) => <Link aria-current={isCurrent(item.href) ? "page" : undefined} href={item.href} key={item.href}>{item.label}</Link>)}<Link aria-current={isCurrent(`${DASHFLUENCE_BASE}/404`) ? "page" : undefined} href={`${DASHFLUENCE_BASE}/404`}>404</Link></div>
        </div>
        <NewsletterForm />
      </div>
      <div className={styles.footerBottom}>
        <p>©Dashfluence {year}. All Rights Reserved</p>
        <div><Link aria-current={isCurrent(`${DASHFLUENCE_BASE}/legal/privacy-policy`) ? "page" : undefined} href={`${DASHFLUENCE_BASE}/legal/privacy-policy`}>Privacy Policy</Link><Link aria-current={isCurrent(`${DASHFLUENCE_BASE}/legal/terms-and-conditions`) ? "page" : undefined} href={`${DASHFLUENCE_BASE}/legal/terms-and-conditions`}>Terms &amp; Conditions</Link></div>
      </div>
    </footer>
  );
}
