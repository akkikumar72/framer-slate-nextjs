"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useJaydenRevealMotion } from "./JaydenMotion";
import { jaydenAssets } from "./assets";
import styles from "./JaydenShell.module.css";

const navItems = [
  { href: "/#home", label: "Home", icon: "home", section: "home" },
  { href: "/work", label: "Works", icon: "work" },
  { href: "/service", label: "Services", icon: "service" },
  { href: "/about", label: "About", icon: "about" },
  {
    href: "/#testimonial",
    label: "Testimonial",
    icon: "testimonial",
    section: "testimonial",
  },
  { href: "/#pricing", label: "Pricing", icon: "pricing", section: "pricing" },
  { href: "/#faq", label: "FAQ", icon: "faq", section: "faq" },
  { href: "/contact", label: "Contact", icon: "contact" },
] as const;

type RailIconName = (typeof navItems)[number]["icon"];

function RailIcon({ name }: { name: RailIconName }) {
  const paths: Record<RailIconName, ReactNode> = {
    home: (
      <>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-7h6v7" />
      </>
    ),
    work: (
      <>
        <path d="M9 6h12M9 12h12M9 18h12" />
        <path d="m3 6 1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2" />
      </>
    ),
    service: (
      <>
        <path d="M4 5h11v5H4zM9 14h11v5H9z" />
        <path d="m15 7 4 4M9 17l-4-4" />
      </>
    ),
    about: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </>
    ),
    testimonial: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="1" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
    pricing: (
      <>
        <path d="M3 12 12 3l9 9-9 9z" />
        <circle cx="12" cy="12" r="1.5" />
      </>
    ),
    faq: (
      <>
        <path d="M4 5h16v12H8l-4 3z" />
        <path d="M9.5 9a2.5 2.5 0 1 1 3.6 2.25c-.7.38-1.1.72-1.1 1.75M12 15.8v.2" />
      </>
    ),
    contact: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
  };

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6">
        {paths[name]}
      </g>
    </svg>
  );
}

function isActive(
  pathname: string,
  activeSection: string,
  item: (typeof navItems)[number],
) {
  if ("section" in item) {
    return pathname === "/" && activeSection === item.section;
  }

  const target = item.href.split("#")[0];
  return pathname === target || pathname.startsWith(`${target}/`);
}

function JaydenCursor() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cursor.current;
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!element || !finePointer.matches) {
      return;
    }

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let animationFrame = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;
      element.style.transform = `translate3d(${currentX - 13}px, ${currentY - 13}px, 0)`;
      animationFrame = window.requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      element.dataset.visible = "true";
      element.dataset.railHover =
        event.target instanceof Element &&
        event.target.closest("[data-jayden-rail-item]") !== null
          ? "true"
          : "false";
    };

    const onPointerLeave = () => {
      element.dataset.visible = "false";
    };

    animationFrame = window.requestAnimationFrame(render);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <div aria-hidden="true" className={styles.cursor} ref={cursor} />;
}

export function JaydenShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [pendingRailIndex, setPendingRailIndex] = useState<number | null>(null);
  const [routePhase, setRoutePhase] = useState<"idle" | "leaving">("idle");
  const scrollTarget = useRef<string | null>(null);
  const scrollTargetTimer = useRef<number | null>(null);
  const routeTimer = useRef<number | null>(null);
  const previousPathname = useRef(pathname);

  useJaydenRevealMotion(pathname);

  useEffect(() => {
    setMobileMenuOpen(false);

    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;
    setPendingRailIndex(null);

    if (routeTimer.current !== null) {
      window.clearTimeout(routeTimer.current);
    }

    setRoutePhase("idle");
  }, [pathname]);

  useEffect(
    () => () => {
      if (routeTimer.current !== null) {
        window.clearTimeout(routeTimer.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sectionIds = ["home", "testimonial", "pricing", "faq"];
    let animationFrame = 0;

    const updateActiveSection = () => {
      if (scrollTarget.current) {
        setActiveSection(scrollTarget.current);
        return;
      }

      const marker = window.innerHeight * 0.38;
      let current = "home";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= marker) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    const hashSection = window.location.hash.slice(1);
    if (sectionIds.includes(hashSection)) {
      scrollTarget.current = hashSection;
      setActiveSection(hashSection);
      scrollTargetTimer.current = window.setTimeout(() => {
        scrollTarget.current = null;
      }, 1200);
    }

    const onScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveSection);
    };

    const onHashChange = () => {
      const nextSection = window.location.hash.slice(1);
      if (sectionIds.includes(nextSection)) {
        scrollTarget.current = nextSection;
        setActiveSection(nextSection);
        if (scrollTargetTimer.current !== null) {
          window.clearTimeout(scrollTargetTimer.current);
        }
        scrollTargetTimer.current = window.setTimeout(() => {
          scrollTarget.current = null;
        }, 1200);
      }
    };

    updateActiveSection();
    animationFrame = window.requestAnimationFrame(updateActiveSection);
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      if (scrollTargetTimer.current !== null) {
        window.clearTimeout(scrollTargetTimer.current);
      }
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const activeRailIndex = navItems.findIndex((item) =>
    isActive(pathname, activeSection, item),
  );
  const visualRailIndex =
    pendingRailIndex ?? (activeRailIndex >= 0 ? activeRailIndex : 0);

  const handleRailClick = (
    event: MouseEvent<HTMLAnchorElement>,
    item: (typeof navItems)[number],
    index: number,
  ) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.defaultPrevented
    ) {
      return;
    }

    if ("section" in item && pathname === "/") {
      const section = document.getElementById(item.section);
      if (!section) {
        return;
      }

      event.preventDefault();
      setActiveSection(item.section);
      scrollTarget.current = item.section;
      if (scrollTargetTimer.current !== null) {
        window.clearTimeout(scrollTargetTimer.current);
      }
      scrollTargetTimer.current = window.setTimeout(() => {
        scrollTarget.current = null;
      }, 1200);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.history.replaceState(null, "", item.href);
      section.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
      return;
    }

    const targetPath = item.href.split("#")[0];
    if (pathname === targetPath) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    setPendingRailIndex(index);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      router.push(item.href);
      return;
    }

    if (routeTimer.current !== null) {
      window.clearTimeout(routeTimer.current);
    }

    setRoutePhase("leaving");
    routeTimer.current = window.setTimeout(() => {
      router.push(item.href);
      routeTimer.current = null;
    }, 170);
  };

  return (
    <div className={styles.site}>
      <JaydenCursor />
      <header className={styles.header}>
        <div className={styles.headerGrid}>
          <Link className={styles.brand} href="/" aria-label="Jayden home">
            <span className={styles.brandMark} aria-hidden="true">
              <i />
            </span>
            <span>Jayden</span>
          </Link>
          <div className={styles.availability}>
            <span />
            Available for 3 projects
          </div>
          <p className={styles.location}>
            San Francisco, CA
            <br />
            USA
          </p>
        </div>
        <button
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
          className={`${styles.mobileMenuButton} ${mobileMenuOpen ? styles.mobileMenuButtonOpen : ""}`}
          onClick={() => setMobileMenuOpen((open) => !open)}
          type="button"
        >
          {mobileMenuOpen ? (
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          ) : (
            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
              <rect height="5" rx="0.5" width="5" x="4.5" y="4.5" />
              <rect height="5" rx="0.5" width="5" x="14.5" y="4.5" />
              <rect height="5" rx="0.5" width="5" x="4.5" y="14.5" />
              <rect height="5" rx="0.5" width="5" x="14.5" y="14.5" />
            </svg>
          )}
        </button>
      </header>

      <div
        aria-hidden={!mobileMenuOpen}
        className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <nav aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <Link href={item.href} key={item.label} onClick={() => setMobileMenuOpen(false)}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <span>{item.label}</span>
              <b aria-hidden="true">↗</b>
            </Link>
          ))}
        </nav>
      </div>

      <aside
        className={styles.sideRail}
        aria-label="Jayden site navigation"
        style={{ "--jayden-rail-index": visualRailIndex } as CSSProperties}
      >
        <span aria-hidden="true" className={styles.railActivePill} />
        {navItems.map((item, index) => (
          <Link
            aria-label={item.label}
            aria-current={isActive(pathname, activeSection, item) ? "location" : undefined}
            className={
              isActive(pathname, activeSection, item) ? styles.activeRailItem : undefined
            }
            data-jayden-rail-item
            href={item.href}
            key={item.label}
            onClick={(event) => handleRailClick(event, item, index)}
          >
            <RailIcon name={item.icon} />
            <span aria-hidden="true" className={styles.railTooltip}>
              {item.label}
            </span>
          </Link>
        ))}
      </aside>

      <a
        className={styles.templateBadge}
        href="https://www.framer.com/community/marketplace/templates/agencyai/"
        rel="noreferrer"
        target="_blank"
      >
        <span>NEW TEMPLATE</span>
      </a>

      <main className={styles.main}>
        <div
          className={`${styles.routeFrame} ${
            routePhase === "leaving" ? styles.routeLeaving : ""
          }`}
          key={pathname}
        >
          {children}
        </div>
      </main>
      <JaydenFooter />
    </div>
  );
}

export function JaydenFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerKicker}>Get In Touch</div>
        <div className={styles.footerProfile}>
          <div className={styles.footerAvatars}>
            {[0, 1, 2, 3].map((item) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt="" aria-hidden="true" key={item} src={jaydenAssets.footerPortrait} />
            ))}
          </div>
          <div>
            <strong>Jayden Jones</strong>
            <span>Ceo of Avade Inc</span>
          </div>
        </div>

        <Link className={styles.bookCall} href="/#contact">
          <span>Book A Call</span>
          <b aria-hidden="true">↗</b>
        </Link>

        <nav className={styles.footerNav} aria-label="Footer">
          {navItems.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.footerBottom}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="Jayden" src={jaydenAssets.mark} />
          <div className={styles.socials} aria-label="Social links">
            <a href="https://x.com/" rel="noreferrer" target="_blank">
              X
            </a>
            <a href="https://dribbble.com/" rel="noreferrer" target="_blank">
              Dr
            </a>
            <a href="https://instagram.com/" rel="noreferrer" target="_blank">
              In
            </a>
            <a href="https://pinterest.com/" rel="noreferrer" target="_blank">
              Pi
            </a>
          </div>
          <p>
            Copyright by <strong>Ridhwan Co.</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
