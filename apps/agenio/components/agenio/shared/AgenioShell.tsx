"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useId,
  useState,
} from "react";
import styles from "./AgenioShell.module.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About us" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/#pricing-plan", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function AgenioRoot({ children }: { children: ReactNode }) {
  return <div className={styles.agenioRoot}>{children}</div>;
}

export function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`${styles.logoMark} ${compact ? styles.logoMarkCompact : ""}`}
    >
      <span />
      <span />
    </span>
  );
}

export function Wordmark({ large = false }: { large?: boolean }) {
  return (
    <span className={`${styles.wordmark} ${large ? styles.wordmarkLarge : ""}`}>
      {large && <LogoMark />}
      <span>agenio</span>
      <sup>TM</sup>
    </span>
  );
}

export function AgenioHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div className={styles.availability}>
        <span aria-hidden="true">⠳</span>
        <p>
          We are available for <b>December projects</b>
        </p>
        <span aria-hidden="true">⠳</span>
      </div>
      <header className={styles.header}>
        <Link aria-label="Agenio home" className={styles.headerLogo} href="/">
          <Wordmark />
        </Link>
        <nav aria-label="Agenio main navigation" className={styles.desktopNav}>
          {navItems.map((item) => {
            const active =
              item.href.includes("#")
                ? false
                : item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href.split("#")[0]);
            return (
              <Link
                aria-current={active ? "page" : undefined}
                className={active ? styles.activeNav : undefined}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link className={`${styles.shadowButton} ${styles.headerRequest}`} href="/#contact">
          Request
        </Link>
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
        <nav
          aria-hidden={!open}
          aria-label="Agenio mobile navigation"
          className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ""}`}
        >
          {navItems.map((item, index) => (
            <Link
              href={item.href}
              key={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              <span>0{index + 1}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}

export function CornerMarkers() {
  return (
    <>
      <i className={`${styles.corner} ${styles.cornerTl}`} />
      <i className={`${styles.corner} ${styles.cornerTr}`} />
      <i className={`${styles.corner} ${styles.cornerBl}`} />
      <i className={`${styles.corner} ${styles.cornerBr}`} />
    </>
  );
}

export function SectionLabel({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p className={`${styles.sectionLabel} ${dark ? styles.sectionLabelDark : ""}`}>
      <span />
      {children}
    </p>
  );
}

export function DarkButton({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Link className={styles.darkButton} href={href}>
      <span className={styles.buttonIcon} aria-hidden="true">
        ⠳
      </span>
      <span>{children}</span>
    </Link>
  );
}

export function LightButton({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Link className={styles.lightButton} href={href}>
      {children}
    </Link>
  );
}

export function PixelSteps({
  dark = false,
  flip = false,
}: {
  dark?: boolean;
  flip?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`${styles.pixelSteps} ${dark ? styles.pixelStepsDark : ""} ${
        flip ? styles.pixelStepsFlip : ""
      }`}
    >
      <i />
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export function BrandOrb({ small = false }: { small?: boolean }) {
  return (
    <span className={`${styles.brandOrb} ${small ? styles.brandOrbSmall : ""}`} aria-hidden="true">
      <LogoMark compact={small} />
    </span>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <section className={styles.pageIntro}>
      <CornerMarkers />
      <PixelSteps />
      <PixelSteps flip />
      <SectionLabel>{eyebrow}</SectionLabel>
      <h1>{title}</h1>
      {description && <p className={styles.pageIntroCopy}>{description}</p>}
    </section>
  );
}

export function ContactFooter({ compact = false }: { compact?: boolean }) {
  const fileId = useId();
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus(
      "Preview form validated. Connect your preferred form endpoint to send messages.",
    );
  }

  return (
    <>
      {!compact && (
        <section className={styles.contactBanner}>
          <CornerMarkers />
          <PixelSteps />
          <PixelSteps flip />
          <span className={styles.arrowDots}>⠳</span>
          <span className={`${styles.arrowDots} ${styles.arrowDotsRight}`}>⠳</span>
          <h2>Let’s start<br />your AI system</h2>
          <SectionLabel dark>Intelligent automation</SectionLabel>
          <SectionLabel dark>Global support</SectionLabel>
          <BrandOrb />
        </section>
      )}
      <section className={styles.contactPanel} id="contact">
        <div className={styles.contactInfo}>
          <div>
            <SectionLabel dark>Contact</SectionLabel>
            <a href="mailto:hello@agenio.com">hello@agenio.com</a>
            <a href="tel:+11234567890">(+1) 123 456-7890</a>
          </div>
          <div className={styles.officeGrid}>
            <SectionLabel dark>Offices</SectionLabel>
            <article>
              <h3>Montréal</h3>
              <p>4200 Saint Laurent Blvd,<br />Suite 305 Montreal, QC H2W<br />2R2 Canada</p>
            </article>
            <article>
              <h3>Texas</h3>
              <p>1920 McKinney Avenue, 7th<br />Floor Dallas, TX 75201<br />United States</p>
            </article>
          </div>
        </div>
        <form className={styles.contactForm} onSubmit={submitForm}>
          <label>
            <span>/Your name</span>
            <input autoComplete="name" name="name" placeholder="Enter your full name" required />
          </label>
          <label>
            <span>/Your e-mail</span>
            <input autoComplete="email" name="email" placeholder="Enter your e-mail" required type="email" />
          </label>
          <label>
            <span>/More about the project</span>
            <textarea name="message" placeholder="Leave us message" required />
          </label>
          <input
            className={styles.fileInput}
            id={fileId}
            name="attachment"
            onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
            type="file"
          />
          <label className={styles.fileLabel} htmlFor={fileId}>
            <span aria-hidden="true">⌁</span>
            {fileName || "Add an attachment"}
          </label>
          <button className={styles.submitButton} type="submit">Submit Message</button>
          <p aria-live="polite" className={styles.formStatus}>{status}</p>
        </form>
      </section>
      <footer className={styles.footer}>
        <CornerMarkers />
        <nav aria-label="Agenio footer navigation">
          <Link href="/about-us">About us</Link>
          <Link href="/services">Services</Link>
          <Link href="/projects">Project</Link>
          <Link href="/#pricing-plan">Pricing Plan</Link>
        </nav>
        <div className={styles.footerBrand}>
          <PixelSteps />
          <Wordmark large />
        </div>
        <div className={styles.footerMeta}>
          <p>© 2026 Agenio. All Rights Reserved</p>
          <div>
            <a href="https://www.instagram.com/accounts/login/?hl=en">Instagram</a>
            <a href="https://www.linkedin.com/login">Linkedin</a>
            <a href="https://dribbble.com/">Dribble</a>
            <a href="https://www.behance.net/">Behance</a>
          </div>
          <Link href="/#hero">Back to Home ↑</Link>
        </div>
      </footer>
      <a
        className={styles.framerBadge}
        href="https://www.framer.com"
        rel="noreferrer"
        target="_blank"
      >
        <b>F</b> Made in Framer
      </a>
    </>
  );
}

export { styles as agenioShellStyles };
