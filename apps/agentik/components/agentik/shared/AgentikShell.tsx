"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./AgentikShell.module.css";

const navigation = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
];

function Mark() {
  return (
    <span aria-hidden="true" className={styles.mark}>
      <svg fill="none" viewBox="0 0 32 32">
        <path d="M16 4.2c.65 6.61 5.13 11.08 11.8 11.8-6.67.72-11.15 5.2-11.8 11.8C15.35 21.2 10.87 16.72 4.2 16 10.87 15.28 15.35 10.81 16 4.2Z" fill="currentColor" />
      </svg>
    </span>
  );
}

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link className={`${styles.brand} ${footer ? styles.footerBrandLink : ""}`} href="/">
      <Mark />
      <span>Agentik</span>
    </Link>
  );
}

export function AgentikRoot({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const elements = Array.from(
      root.querySelectorAll<HTMLElement>("[data-agentik-reveal]"),
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.dataset.agentikRevealState = "visible";
      });
      return;
    }

    const defaultElements = elements.filter(
      (element) => element.dataset.agentikRevealThreshold === undefined,
    );
    const preciseElements = elements.filter(
      (element) => element.dataset.agentikRevealThreshold !== undefined,
    );

    const observeOnce = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
      minimumRatio: number,
    ) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.intersectionRatio < minimumRatio) continue;
        const element = entry.target as HTMLElement;
        element.dataset.agentikRevealState = "visible";
        observer.unobserve(element);
      }
    };

    let defaultObserver: IntersectionObserver;
    defaultObserver = new IntersectionObserver(
      (entries) => observeOnce(entries, defaultObserver, 0.08),
      { rootMargin: "0px 0px -7% 0px", threshold: 0.08 },
    );
    defaultElements.forEach((element) => defaultObserver.observe(element));

    const preciseObservers = new Map<number, IntersectionObserver>();
    preciseElements.forEach((element) => {
      const requested = Number(element.dataset.agentikRevealThreshold);
      const threshold = Number.isFinite(requested)
        ? Math.min(1, Math.max(0, requested))
        : 0.5;
      let observer = preciseObservers.get(threshold);
      if (!observer) {
        observer = new IntersectionObserver(
          (entries, currentObserver) => observeOnce(entries, currentObserver, threshold),
          { rootMargin: "0px", threshold },
        );
        preciseObservers.set(threshold, observer);
      }
      observer.observe(element);
    });

    return () => {
      defaultObserver.disconnect();
      preciseObservers.forEach((observer) => observer.disconnect());
    };
  }, [pathname]);

  return (
    <div className={styles.root} ref={rootRef}>
      {children}
    </div>
  );
}

export function AgentikHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${open ? styles.headerOpen : ""}`}>
      <nav aria-label="Agentik main navigation" className={styles.headerInner}>
        <Brand />
        <div className={styles.desktopNav}>
          {navigation.map((item) => (
            <Link
              aria-current={pathname === item.href ? "page" : undefined}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <RollingLink className={styles.headerCta} href="/contact" variant="secondary">
          Contact
        </RollingLink>
        <button
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className={styles.menuButton}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          <span />
          <span />
        </button>
        <div aria-hidden={!open} className={styles.mobileMenu}>
          {navigation.map((item) => (
            <Link href={item.href} key={item.href} tabIndex={open ? 0 : -1}>
              {item.label}
            </Link>
          ))}
          <RollingLink href="/contact" tabIndex={open ? 0 : -1} variant="secondary">
            Contact
          </RollingLink>
        </div>
      </nav>
    </header>
  );
}

export function AgentikFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <Brand footer />
            <p>Built for teams that help businesses automate workflows, cut costs, and scale with AI.</p>
          </div>
          <nav aria-label="Agentik footer navigation" className={styles.footerLinks}>
            <div>
              <Link href="/about">About</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div>
              <a href="https://x.com/ramishdotdesign" rel="noreferrer" target="_blank">X (Twitter)</a>
              <a href="https://www.linkedin.com/" rel="noreferrer" target="_blank">LinkedIn</a>
            </div>
          </nav>
        </div>
        <div className={styles.footerBottom}>
          <p>
            © 2026 <a href="https://browser.supply/">browser.supply.</a>{" "}
            <a href="https://framer.link/ramishdesign">Framer</a> website templates
          </p>
          <div className={styles.creator}>
            <span>Created by</span>
            <img alt="Ramish Aziz" height="30" src="/agentik/assets/creator-ramish.avif" width="30" />
            <a href="https://x.com/ramishdotdesign">Ramish Aziz</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function AgentikShell({ children }: { children: ReactNode }) {
  return (
    <AgentikRoot>
      <AgentikHeader />
      <main className={styles.main}>{children}</main>
      <AgentikFooter />
    </AgentikRoot>
  );
}

export function RollingLink({
  children,
  className = "",
  href,
  leadingIcon,
  tabIndex,
  trailingIcon,
  variant = "primary",
}: {
  children: string;
  className?: string;
  href: string;
  leadingIcon?: ReactNode;
  tabIndex?: number;
  trailingIcon?: ReactNode;
  variant?: "primary" | "secondary" | "text";
}) {
  const classes = `${styles.rollingLink} ${styles[`rollingLink${variant[0].toUpperCase()}${variant.slice(1)}`]} ${className}`;
  const inner = (
    <>
      {leadingIcon}
      <span className={styles.labelRail}>
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {trailingIcon}
    </>
  );

  if (/^(https?:|mailto:)/.test(href)) {
    return (
      <a aria-label={children} className={classes} href={href} rel={href.startsWith("http") ? "noreferrer" : undefined} tabIndex={tabIndex} target={href.startsWith("http") ? "_blank" : undefined}>
        {inner}
      </a>
    );
  }
  return <Link aria-label={children} className={classes} href={href} tabIndex={tabIndex}>{inner}</Link>;
}

export function RollingButton({
  children,
  className = "",
  leadingIcon,
  onClick,
  trailingIcon,
  type = "button",
  variant = "primary",
}: {
  children: string;
  className?: string;
  leadingIcon?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  trailingIcon?: ReactNode;
  type?: "button" | "submit";
  variant?: "primary" | "secondary";
}) {
  return (
    <button aria-label={children} className={`${styles.rollingLink} ${styles[`rollingLink${variant[0].toUpperCase()}${variant.slice(1)}`]} ${className}`} onClick={onClick} type={type}>
      {leadingIcon}
      <span className={styles.labelRail}>
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {trailingIcon}
    </button>
  );
}

export function SectionEyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`${styles.eyebrow} ${className}`}>{children}</p>;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  threshold,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}) {
  return (
    <div
      className={className}
      data-agentik-reveal
      data-agentik-reveal-threshold={threshold}
      style={{ "--agentik-reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
