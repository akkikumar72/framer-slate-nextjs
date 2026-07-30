"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import styles from "./SaazaiShell.module.css";

const navItems = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export function SaazaiFrame({ children }: { children: ReactNode }) {
  return (
    <div className={styles.root}>
      <SaazaiHeader />
      <main className={styles.main}>{children}</main>
      <SaazaiFooter />
    </div>
  );
}

export function LogoMark() {
  return (
    <span aria-hidden="true" className={styles.logoMark}>
      <span />
    </span>
  );
}

function SaazaiHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className={styles.header}>
      <Link aria-label="Saazai home" className={styles.brand} href="/">
        <LogoMark />
        <span>Saazai</span>
      </Link>
      <nav aria-label="Saazai main navigation" className={styles.desktopNav}>
        {navItems.map((item) => (
          <Link
            aria-current={pathname === item.href ? "page" : undefined}
            className={pathname === item.href ? styles.activeNav : undefined}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link className={styles.headerCta} href="/contact">
        Get Template <span aria-hidden="true">→</span>
      </Link>
      <button
        aria-expanded={open}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className={styles.menuButton}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <span />
        <span />
      </button>
      <nav
        aria-label="Saazai mobile navigation"
        className={`${styles.mobileNav} ${open ? styles.mobileNavOpen : ""}`}
      >
        <Link href="/">Home</Link>
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
        <Link href="/about">About us</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/career">Careers</Link>
      </nav>
    </header>
  );
}

function SaazaiFooter() {
  const [status, setStatus] = useState("");

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStatus("You’re on the list. Thanks for subscribing.");
    form.reset();
  }

  return (
    <footer className={styles.footer}>
      <div aria-hidden="true" className={styles.marquee}>
        <div>
          Omni·Agent · Omni·Agent · Omni·Agent · Omni·Agent · Omni·Agent
        </div>
      </div>
      <div className={styles.footerGrid}>
        <FooterColumn
          links={[
            ["/", "Home"],
            ["/about", "About us"],
            ["/pricing", "Pricing"],
          ]}
          title="Main Pages"
        />
        <FooterColumn
          links={[
            ["/blog", "Blog"],
            ["/career", "Careers"],
            ["/integration", "Integrations"],
          ]}
          title="Inner pages"
        />
        <FooterColumn
          links={[
            ["/changelog", "Changelog"],
            ["/contact", "Contact"],
            ["/privacy", "Privacy"],
          ]}
          title="Utility pages"
        />
        <div className={styles.footerColumn}>
          <h2>Connect</h2>
          <a href="https://x.com/" rel="noreferrer" target="_blank">
            Twitter
          </a>
          <a href="https://www.linkedin.com/" rel="noreferrer" target="_blank">
            LinkedIn
          </a>
          <a href="https://www.instagram.com/" rel="noreferrer" target="_blank">
            Instagram
          </a>
        </div>
        <div className={styles.newsletter}>
          <h2>Join Our Newsletter</h2>
          <form onSubmit={subscribe}>
            <label className={styles.srOnly} htmlFor="saazai-newsletter">
              Email address
            </label>
            <input
              autoComplete="email"
              id="saazai-newsletter"
              name="email"
              placeholder="Enter Your mail"
              required
              type="email"
            />
            <button aria-label="Subscribe" type="submit">
              →
            </button>
          </form>
          <p>
            * We’ll send you weekly updates for better business management.
          </p>
          <output aria-live="polite">{status}</output>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>© Copyright 2026 <span>Framerbite.</span> All rights reserved.</p>
        <Link href="/privacy">Privacy policy</Link>
      </div>
    </footer>
  );
}

function FooterColumn({
  links,
  title,
}: {
  links: Array<[string, string]>;
  title: string;
}) {
  return (
    <div className={styles.footerColumn}>
      <h2>{title}</h2>
      {links.map(([href, label]) => (
        <Link href={href} key={href}>
          {label}
        </Link>
      ))}
    </div>
  );
}
