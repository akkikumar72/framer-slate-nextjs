"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function PaybleLogo() {
  return (
    <span className="payble-logo" aria-label="Payble">
      <span className="payble-logo__mark" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span>Payble</span>
    </span>
  );
}

const navigation = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === href;
  }
  return pathname.startsWith(href);
}

export default function PaybleShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="payble-root">
      <header className="payble-header">
        <div className="payble-header__inner">
          <Link href="/" className="payble-header__logo">
            <PaybleLogo />
          </Link>
          <nav className="payble-nav" aria-label="Payble primary navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            className="payble-button payble-button--small payble-header__cta"
            href="https://www.framer.com/marketplace/template/payble/"
            target="_blank"
            rel="noreferrer"
          >
            FREE Remix <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            className="payble-menu"
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
        <div className={`payble-mobile-nav${open ? " is-open" : ""}`}>
          <nav aria-label="Payble mobile navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            className="payble-button"
            href="https://www.framer.com/marketplace/template/payble/"
            target="_blank"
            rel="noreferrer"
          >
            FREE Remix <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>
      {children}
      <footer className="payble-footer">
        <div className="payble-container payble-footer__top">
          <Link href="/" className="payble-footer__brand">
            <PaybleLogo />
          </Link>
          <p>
            Take control of your money with smarter budgets, automated savings,
            and clear financial insights.
          </p>
          <div className="payble-footer__links">
            <div>
              <strong>Pages</strong>
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
            <div>
              <strong>Useful</strong>
              <Link href="/useful/privacy-policy">Privacy Policy</Link>
              <Link href="/useful/cookie-policy">Cookie Policy</Link>
              <Link href="/useful/terms-of-service">
                Terms of Service
              </Link>
              <Link href="/useful/refund-policy">Refund Policy</Link>
            </div>
            <div>
              <strong>Social</strong>
              <a href="https://x.com/" target="_blank" rel="noreferrer">
                X / Twitter
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="payble-container payble-footer__bottom">
          <span>© 2026 Payble. All rights reserved.</span>
          <span>
            Template by{" "}
            <a href="https://uihub.io/" target="_blank" rel="noreferrer">
              UIhub
            </a>{" "}
            · Built in{" "}
            <a href="https://www.framer.com/" target="_blank" rel="noreferrer">
              Framer
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
