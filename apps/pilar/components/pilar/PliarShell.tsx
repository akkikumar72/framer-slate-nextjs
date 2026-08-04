"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./PliarShell.module.css";

const navigation = [
  { href: "/#benefits", label: "Benefits" },
  { href: "/#features", label: "Features" },
  { href: "/#Integrations", label: "Integrations" },
  { href: "/#Testimonials", label: "Testimonials" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

const themeOptions = [
  { label: "Blue", value: "blue" },
  { label: "Brown", value: "brown" },
  { label: "Violet", value: "violet" },
] as const;

type PliarTheme = (typeof themeOptions)[number]["value"];

function isPliarTheme(value: string | null): value is PliarTheme {
  return themeOptions.some((theme) => theme.value === value);
}

export function PliarRoot({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [theme, setTheme] = useState<PliarTheme>("blue");
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    const queryTheme = new URL(window.location.href).searchParams.get("theme");
    const savedTheme = window.localStorage.getItem("pliar-preview-theme");
    setTheme(
      isPliarTheme(queryTheme)
        ? queryTheme
        : isPliarTheme(savedTheme)
          ? savedTheme
          : "blue",
    );
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    window.localStorage.setItem("pliar-preview-theme", theme);
    const url = new URL(window.location.href);
    url.searchParams.set("theme", theme);
    window.history.replaceState(window.history.state, "", url);
  }, [theme, themeReady]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>("[data-pliar-reveal]"),
    );
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => {
        item.dataset.pliarRevealState = "visible";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = entry.target as HTMLElement;
          item.dataset.pliarRevealState = "visible";
          observer.unobserve(item);
        });
      },
      { rootMargin: "0px 0px -7% 0px", threshold: 0.08 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className={styles.pliarRoot} data-pliar-theme={theme} ref={rootRef}>
      {children}
      <aside aria-label="Pliar theme preview" className={styles.themeDock}>
        <span>Theme preview</span>
        <div aria-label="Choose a theme" role="group">
          {themeOptions.map((option) => (
            <button
              aria-pressed={theme === option.value}
              data-theme-option={option.value}
              key={option.value}
              onClick={() => setTheme(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </aside>
    </div>
  );
}

export function PliarBrand({ light = false }: { light?: boolean }) {
  return (
    <Link
      aria-label="Pliar home"
      className={`${styles.brand} ${light ? styles.brandLight : ""}`}
      href="/#hero"
    >
      <img
        alt=""
        data-pliar-brand
        height="26"
        src="/pilar/assets/brand-icon.avif"
        width="26"
      />
      <span>Pliar</span>
    </Link>
  );
}

export function PliarHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prior = document.body.style.overflow;
    const keepFocusInMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = [
        menuButtonRef.current,
        ...Array.from(
          mobilePanelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [],
        ),
      ].filter((item): item is HTMLElement => Boolean(item));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", keepFocusInMenu);
    return () => {
      document.body.style.overflow = prior;
      document.removeEventListener("keydown", keepFocusInMenu);
    };
  }, [open]);

  return (
    <header className={`${styles.header} ${open ? styles.headerOpen : ""}`}>
      <nav aria-label="Pliar main navigation" className={styles.headerInner}>
        <PliarBrand />

        <div className={styles.desktopNav}>
          {navigation.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </div>

        <Link className={styles.primaryButton} href="/#pricing">
          Start for free
        </Link>

        <button
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className={styles.menuButton}
          onClick={() => setOpen((current) => !current)}
          ref={menuButtonRef}
          type="button"
        >
          <span />
          <span />
        </button>

        <div
          aria-hidden={!open}
          className={styles.mobilePanel}
          inert={!open ? true : undefined}
          ref={mobilePanelRef}
        >
          <div className={styles.mobileLinks}>
            {navigation.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link
            className={styles.mobileCta}
            href="/#pricing"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
          >
            Start for free
          </Link>
        </div>
      </nav>
    </header>
  );
}

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Benefits", href: "/#benefits" },
      { label: "Features", href: "/#features" },
      { label: "Integrations", href: "/#Integrations" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "X (Twitter)", href: "https://x.com" },
      { label: "Facebook", href: "https://facebook.com" },
      { label: "Instagram", href: "https://instagram.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Usage Terms", href: "/terms" },
    ],
  },
];

export function PliarFooter() {
  const [message, setMessage] = useState("");

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    setMessage(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? "Thanks. Newsletter delivery is not connected in this demo."
        : "Enter a valid email address.",
    );
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerLead}>
          <PliarBrand light />
          <p>AI automation for SaaS teams that can&apos;t afford to slow down.</p>
          <form className={styles.newsletter} onSubmit={subscribe}>
            <label className={styles.srOnly} htmlFor="pliar-footer-email">
              Work email
            </label>
            <input
              id="pliar-footer-email"
              inputMode="email"
              name="email"
              placeholder="Enter your email"
              type="email"
            />
            <button type="submit">Submit</button>
          </form>
          <p aria-live="polite" className={styles.formMessage}>
            {message}
          </p>
        </div>

        <div className={styles.footerGroups}>
          {footerGroups.map((group) => (
            <div className={styles.footerGroup} key={group.title}>
              <p>{group.title}</p>
              {group.links.map((link) =>
                link.href.startsWith("http") ? (
                  <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} key={link.label}>
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          ))}
        </div>

        <div className={styles.footerBottom}>
          <span>Pliar © 2026. All rights reserved.</span>
        </div>
      </div>

      <img
        alt=""
        aria-hidden="true"
        className={styles.footerLandscape}
        data-pliar-landscape
        src="/pilar/assets/landscape-v3.webp"
      />
    </footer>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className={styles.eyebrow}>
      <span aria-hidden="true">✦</span>
      {children}
    </p>
  );
}
