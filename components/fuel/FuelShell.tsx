"use client";

import { useState } from "react";

import styles from "../FuelPage.module.css";

export const fuelNavItems = [
  { label: "Home", number: "01", href: "/fuel" },
  { label: "Portfolio", number: "02", href: "/fuel/work/portfolio" },
  { label: "About", number: "03", href: "/fuel/about" },
  { label: "Contact", number: "04", href: "/fuel/contact" },
] as const;

export const fuelPageClassName = styles.page;

export function FuelLogo({ dark = false }: { dark?: boolean }) {
  return (
    <a aria-label="Fuel home" className={styles.logo} href="/fuel">
      <img
        alt=""
        className={dark ? styles.logoDark : undefined}
        src="/fuel/1b0923ff9a73ca76.avif"
      />
    </a>
  );
}

export function FuelChiefCard({ wide = false }: { wide?: boolean }) {
  return (
    <a
      className={`${styles.chiefCard} ${wide ? styles.chiefCardWide : ""}`}
      href="/fuel/contact"
    >
      <img alt="Lousiana KD6" src="/fuel/a1b7f8592494a9a7.avif" />
      <span className={styles.chiefCopy}>
        <strong>Meet the CEO</strong>
        <span>Lousiana KD6</span>
        <span>CEO</span>
      </span>
      <span aria-hidden="true" className={styles.pixelArrow}>
        <i />
        <i />
      </span>
    </a>
  );
}

export function FuelHeader({
  mobileHidden = false,
}: {
  mobileHidden?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className={styles.header}
        data-mobile-hidden={mobileHidden ? "true" : undefined}
      >
        <FuelLogo />
        <nav aria-label="Primary navigation" className={styles.desktopNav}>
          {fuelNavItems.map((item) => (
            <a href={item.href} key={item.label}>
              <span>{item.label}</span>
              <sup>{item.number}</sup>
            </a>
          ))}
        </nav>
        <FuelChiefCard />
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          className={`${styles.menuButton} ${
            menuOpen ? styles.menuButtonOpen : ""
          }`}
          onClick={() => setMenuOpen((value) => !value)}
          type="button"
        >
          <span />
          <span />
        </button>
      </header>
      <div
        aria-hidden={!menuOpen}
        className={`${styles.mobileMenu} ${
          menuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <div className={styles.mobileMenuTop}>
          <FuelLogo />
          <button
            aria-label="Close navigation"
            className={`${styles.menuButton} ${styles.menuButtonOpen}`}
            onClick={() => setMenuOpen(false)}
            type="button"
          >
            <span />
            <span />
          </button>
        </div>
        <nav aria-label="Mobile navigation" className={styles.mobileNav}>
          {fuelNavItems.map((item) => (
            <a
              href={item.href}
              key={item.label}
              onClick={() => setMenuOpen(false)}
            >
              <span>{item.label}</span>
              <sup>{item.number}</sup>
            </a>
          ))}
        </nav>
        <FuelChiefCard wide />
      </div>
    </>
  );
}

export function FuelSectionLabel({
  number,
  title,
  dark = false,
}: {
  number: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div className={`${styles.sectionLabel} ${dark ? styles.labelDark : ""}`}>
      <span>◆ ({number})</span>
      <span>({title})</span>
      <span>© 2025</span>
    </div>
  );
}

export function FuelArrowLink({
  children,
  href = "/fuel/contact",
  dark = false,
}: {
  children: React.ReactNode;
  href?: string;
  dark?: boolean;
}) {
  return (
    <a
      className={`${styles.arrowLink} ${dark ? styles.arrowLinkDark : ""}`}
      href={href}
    >
      <span>{children}</span>
      <span aria-hidden="true">⌝</span>
    </a>
  );
}

export function FuelPlus({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`${styles.plus} ${className}`} />;
}

export function FuelFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div data-fuel-reveal data-fuel-visible="true">
          <h2>Let’s work together</h2>
          <a href="mailto:dummy@mail.com">
            sayhi@fuelstudio.c<wbr />
            om
          </a>
          <FuelArrowLink dark href="/fuel/contact">
            Contact Now
          </FuelArrowLink>
        </div>
        <nav aria-label="Footer navigation">
          {fuelNavItems.map((item) => (
            <a href={item.href} key={item.label}>
              <span>{item.label}</span>
              <sup>{item.number}</sup>
            </a>
          ))}
        </nav>
      </div>
      <div className={styles.footerMarks}>
        <FuelPlus />
        <FuelPlus />
        <FuelPlus />
      </div>
      <div className={styles.footerLogo}>
        <img alt="Fuel" src="/fuel/446af23d6ed09340.avif" />
        <span>© 2025</span>
        <span>19&apos;</span>
      </div>
    </footer>
  );
}
