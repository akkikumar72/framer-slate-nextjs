"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import { B2_PREFIX, asset, navLinks } from "@/lib/site-data";
import styles from "./SiteShell.module.css";

const footerNavLinks = [
  navLinks[0],
  navLinks[4],
  navLinks[1],
  navLinks[6],
  navLinks[2],
  { label: "Privacy Policy", href: `${B2_PREFIX}/legal-pages/privacy-policy` },
  { label: "Blog", href: `${B2_PREFIX}/blog` },
  { label: "Changelog", href: `${B2_PREFIX}/changelog` },
  { label: "Service", href: `${B2_PREFIX}/service` },
] as const;

const mobileNavLinks = [
  { label: "Home", href: B2_PREFIX },
  { label: "Home 2", href: `${B2_PREFIX}/home-2` },
  { label: "About", href: `${B2_PREFIX}/about` },
  { label: "Services", href: `${B2_PREFIX}/service` },
  { label: "Blog", href: `${B2_PREFIX}/blog` },
  { label: "Contact", href: `${B2_PREFIX}/contact` },
  { label: "Privacy Policy", href: `${B2_PREFIX}/legal-pages/privacy-policy` },
] as const;

export function ArrowLink({ children, href, light = false }: { children: ReactNode; href: string; light?: boolean }) {
  return (
    <Link className={`${styles.arrowLink} ${light ? styles.arrowLinkLight : ""}`} href={href}>
      <span>{children}</span><span aria-hidden="true">↗</span>
    </Link>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
    setPagesOpen(false);
  }, [pathname]);

  function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubscribed(true);
  }

  return (
    <div className={styles.siteRoot}>
      <header className={styles.header}>
        <nav aria-label="B2bizz main navigation" className={styles.headerInner}>
          <Link aria-label="B2bizz home" className={styles.logo} href={B2_PREFIX}>
            <img alt="B2bizz" src={asset("logo.svg")} />
          </Link>
          <div className={styles.desktopNav}>
            <Link className={pathname === B2_PREFIX ? styles.desktopNavActive : ""} href={B2_PREFIX}>Home</Link>
            <button aria-expanded={pagesOpen} onClick={() => setPagesOpen((value) => !value)} type="button">
              <span>Pages</span><img alt="" aria-hidden="true" src={asset("menu-arrow.svg")} />
            </button>
            <Link className={pathname === `${B2_PREFIX}/about` ? styles.desktopNavActive : ""} href={`${B2_PREFIX}/about`}>About</Link>
            <Link className={pathname.startsWith(`${B2_PREFIX}/service`) ? styles.desktopNavActive : ""} href={`${B2_PREFIX}/service`}>Services</Link>
          </div>
          <div className={styles.headerActions}>
            <Link className={styles.consultation} href={`${B2_PREFIX}/contact`}>Request a consultation</Link>
            <button aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} className={styles.menuButton} onClick={() => setMenuOpen((value) => !value)} type="button">
              <span /><span />
            </button>
          </div>
          <div className={`${styles.pagesMenu} ${pagesOpen ? styles.pagesMenuOpen : ""}`}>
            {navLinks.slice(1).map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          </div>
          <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
            {mobileNavLinks.map((item) => (
              <Link href={item.href} key={item.href}>{item.label}</Link>
            ))}
          </div>
        </nav>
      </header>

      {children}

      <footer className={styles.footer}>
        <div className={styles.footerFrame}>
          <div className={styles.footerGrid}>
            <div className={styles.pagesPanel}>
            <p className={styles.footerLabel}>Pages links</p>
            <div className={styles.footerLinks}>{footerNavLinks.map((item) => <Link href={item.href} key={`${item.href}-${item.label}`}>{item.label}</Link>)}</div>
            <div aria-label="Social links" className={styles.socials}>
              <a aria-label="Facebook" href="https://facebook.com"><img alt="" src={asset("vNI25VqTEOiglaWkaLdoLwpori8.svg")} /></a>
              <a aria-label="YouTube" href="https://youtube.com"><img alt="" src={asset("Hxh8VdM4hDeSwdX8yKTStA4ypM.svg")} /></a>
              <a aria-label="LinkedIn" href="https://linkedin.com"><img alt="" src={asset("wsV6nF8mTUUHsqKjv3gYGulKhck.svg")} /></a>
            </div>
            </div>
            <div className={styles.detailsPanel}>
              <div className={styles.footerContactGrid}>
                <div className={styles.contactColumn}>
                  <p className={styles.footerLabel}>Contact on</p>
                  <div className={styles.contactLinks}>
                    <a href="mailto:support@example.com">support@example.com</a>
                    <a href="tel:+1234567890">+123 456 7890</a>
                  </div>
                </div>
                <div className={styles.addressColumn}>
                  <p className={styles.footerLabel}>Address</p>
                  <a href="https://www.google.com/maps">Your B2B Consulting Co. 120<br />Business Avenue, NY 10001, USA</a>
                </div>
              </div>
              <div className={styles.newsletter}>
                <form onSubmit={subscribe}>
                  <label className={styles.srOnly} htmlFor="b2bizz-newsletter">Newsletter</label>
                  <div><input aria-label="Email address" id="b2bizz-newsletter" placeholder="Enter your email" required type="email" /><button type="submit">Subscribe</button></div>
                  <p aria-live="polite">{subscribed ? "Thanks. You’re on the list." : ""}</p>
                </form>
                <Link href={B2_PREFIX}><img alt="B2bizz" src={asset("logo.svg")} /></Link>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>Designed by <a href="https://webestica.com">Webestica</a>, Powered by <a href="https://framer.com">Framer</a></div>
        </div>
      </footer>

    </div>
  );
}
