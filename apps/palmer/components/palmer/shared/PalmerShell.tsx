"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { palmerAsset } from "../assets";
import { footerImages } from "../data";
import styles from "./PalmerShell.module.css";

const nav = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" },
];

const faqs = [
  ["What services do you offer?", "Creative direction, brand identity, motion direction, and Framer websites."],
  ["What is your typical turnaround time?", "Most focused projects take five to nine weeks, depending on scope and feedback."],
  ["Do you only work in Framer?", "No. Framer is one part of a broader design and development practice."],
  ["Can you handle both design and build?", "Yes. Strategy, visual design, interaction, and production can live in one engagement."],
  ["Do you offer brand strategy too?", "Yes. Positioning and identity foundations can be included when the project needs them."],
  ["What’s your process like?", "A direct sequence of discovery, direction, design, build, refinement, and launch."],
];

export function PalmerRoot({ children }: { children: ReactNode }) {
  const cursor = useRef<HTMLSpanElement>(null);
  const cursorLabel = useRef<HTMLSpanElement>(null);
  const activeProject = useRef<Element | null>(null);
  const activeReel = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const resetReel = (reel: HTMLElement | null) => {
      reel?.removeAttribute("data-pointer-active");
      reel?.style.setProperty("--reel-rotate-x", "0deg");
      reel?.style.setProperty("--reel-rotate-y", "0deg");
    };

    const update = (event: PointerEvent) => {
      if (cursor.current) {
        const target = event.target instanceof Element ? event.target : null;
        const project = target?.closest("[data-palmer-project]") ?? null;
        const reel =
          target?.closest<HTMLElement>("[data-palmer-reel]") ?? null;
        const overProject = Boolean(project);
        const overReel = Boolean(reel);

        if (activeProject.current !== project) {
          activeProject.current?.removeAttribute("data-pointer-active");
          project?.setAttribute("data-pointer-active", "");
          activeProject.current = project;
        }

        if (activeReel.current !== reel) {
          resetReel(activeReel.current);
          reel?.setAttribute("data-pointer-active", "");
          activeReel.current = reel;
        }

        if (reel) {
          const rect = reel.getBoundingClientRect();
          const rotateX =
            ((rect.top + rect.height / 2 - event.clientY) /
              (rect.height / 2)) *
            6;
          const rotateY =
            ((event.clientX - (rect.left + rect.width / 2)) /
              (rect.width / 2)) *
            6;

          reel.style.setProperty(
            "--reel-rotate-x",
            `${Math.max(-6, Math.min(6, rotateX)).toFixed(3)}deg`,
          );
          reel.style.setProperty(
            "--reel-rotate-y",
            `${Math.max(-6, Math.min(6, rotateY)).toFixed(3)}deg`,
          );
        }

        const variant = overReel ? "reel" : overProject ? "view" : "dot";
        cursor.current.dataset.variant = variant;
        if (cursorLabel.current) {
          cursorLabel.current.textContent =
            variant === "reel" ? "PLAY REEL" : "VIEW";
        }
        cursor.current.style.translate =
          variant === "reel"
            ? `${event.clientX - 75.5}px ${event.clientY - 22}px`
            : variant === "view"
              ? `${event.clientX - 47}px ${event.clientY - 22}px`
              : `${event.clientX - 8}px ${event.clientY - 8}px`;
      }
    };
    const clear = () => {
      activeProject.current?.removeAttribute("data-pointer-active");
      activeProject.current = null;
      resetReel(activeReel.current);
      activeReel.current = null;
      if (cursor.current) {
        cursor.current.dataset.variant = "dot";
      }
    };

    window.addEventListener("pointermove", update, { passive: true });
    window.addEventListener("pointerleave", clear);
    return () => {
      window.removeEventListener("pointermove", update);
      window.removeEventListener("pointerleave", clear);
    };
  }, []);

  return (
    <div className={styles.root} id="palmer-top">
      <span
        aria-hidden="true"
        className={styles.cursor}
        data-variant="dot"
        ref={cursor}
      >
        <span ref={cursorLabel}>VIEW</span>
      </span>
      <PalmerHeader />
      <main className={styles.main}>{children}</main>
      <PalmerFaq />
      <PalmerFooter />
      <a
        aria-label="Palmer on X"
        className={styles.socialDock}
        href="https://x.com/"
        rel="noreferrer"
        target="_blank"
      >
        X
      </a>
    </div>
  );
}

export function PalmerHeader() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const nextScrollY = window.scrollY;
      const delta = nextScrollY - lastScrollY;

      if (nextScrollY <= 8) {
        setHidden(false);
      } else if (Math.abs(delta) >= 3) {
        setHidden(delta > 0);
      }

      lastScrollY = nextScrollY;
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <header
      className={`${styles.header} ${hidden ? styles.headerHidden : ""}`}
    >
      <div className={styles.headerNav}>
        <Link aria-label="Palmer home" className={styles.logo} href="/">
          Palmer®
        </Link>
        <div className={styles.headerItems}>
          <div className={styles.quickLinks}>
            <strong>Quick Links</strong>
            <nav aria-label="Palmer navigation" className={styles.nav}>
              {nav.map((item, index) => {
                const active =
                  item.href === "/"
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                const text =
                  index < nav.length - 1 ? `${item.label}, ` : item.label;
                return (
                  <Link
                    aria-label={item.label}
                    aria-current={active ? "page" : undefined}
                    className={styles.navLink}
                    href={item.href}
                    key={item.href}
                  >
                    <span aria-hidden="true" className={styles.rollingText}>
                      {Array.from(text).map((character, characterIndex) => (
                        <span
                          key={`${character}-${characterIndex}`}
                          style={{
                            transitionDelay: `${
                              (0.4 / text.length) * characterIndex * 0.55
                            }s`,
                          }}
                        >
                          {character === " " ? "\u00a0" : character}
                        </span>
                      ))}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className={styles.headerMeta}>
            <strong>Based in Tokyo 東京</strong>
            <span>Art Director + Framer Developer</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Eyebrow({
  index,
  children,
}: {
  index: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.eyebrow}>
      <span>({index})</span>
      <p>{children}</p>
    </div>
  );
}

export function PalmerFaq() {
  return (
    <section className={styles.faq}>
      <div className={styles.sectionMeta}>
        <p>
          © Help Center <span>ヘルプ</span>
        </p>
        <p>(WDX® — 11)</p>
        <p>Clarifications</p>
      </div>
      <div className={styles.faqLead}>
        <img
          alt=""
          className={styles.faqPortrait}
          loading="lazy"
          src={palmerAsset("kDDFdQi11eufzZl2QNW6DZQPHc.png")}
        />
        <h2 className={styles.faqDesktopTitle}>
          Clarifying Deliverable&apos;s Before They Begin with Real Process and
          Honest アンサー.
        </h2>
        <h2 className={styles.faqMobileTitle}>FAQ.</h2>
      </div>
      <div className={styles.faqList}>
        {faqs.map(([question, answer], index) => (
          <details className={styles.faqItem} key={question}>
            <summary>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{question}</strong>
              <i aria-hidden="true">+</i>
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function PalmerFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.sectionMeta}>
        <p>
          © Final Section <span>クロージング</span>
        </p>
        <p>(WDX® — 12)</p>
        <p>Studio Wrap</p>
      </div>
      <div aria-hidden="true" className={styles.footerRail}>
        {footerImages.map((src, index) => (
          <img alt="" key={`${src}-${index}`} loading="lazy" src={src} />
        ))}
      </div>
      <div className={styles.footerBand}>
        <span>Independent</span>
        <span>Overview</span>
        <span>Multidisciplinary</span>
        <span>Focused</span>
      </div>
      <div className={styles.footerStatement}>
        <p>
          I build expressive, performance-driven websites by blending clean
          design and native development inside Framer to help creative teams and
          modern brands stand out with intention.
        </p>
        <a href="#palmer-top">Back to Top ↑</a>
      </div>
      <div className={styles.footerLinks}>
        <div>
          <strong>Quick Links</strong>
          <nav aria-label="Palmer footer navigation">
            {nav.map((item, index) => (
              <Link href={item.href} key={item.href}>
                {item.label}
                {index < nav.length - 1 ? "," : ""}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <strong>Networks</strong>
          <nav aria-label="Palmer social links">
            <a href="https://instagram.com/" rel="noreferrer" target="_blank">Instagram,</a>
            <a href="https://dribbble.com/" rel="noreferrer" target="_blank">Dribbble,</a>
            <a href="https://www.framer.com/" rel="noreferrer" target="_blank">Framer,</a>
            <a href="https://x.com/" rel="noreferrer" target="_blank">Twitter</a>
          </nav>
        </div>
      </div>
      <p className={styles.copyright}>©2025</p>
      <p className={styles.attribution}>
        Palmer rebuild. Original template by{" "}
        <a href="https://palmer-template.framer.website/" rel="noreferrer" target="_blank">
          Akihiko
        </a>
      </p>
    </footer>
  );
}
