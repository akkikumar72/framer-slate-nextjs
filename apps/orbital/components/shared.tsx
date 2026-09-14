"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { asset } from "@/lib/site";
import { routePaths } from "@/lib/routes";

export function Button({ href = "/orbital/contact", children, secondary = false, className = "" }: { href?: string; children: ReactNode; secondary?: boolean; className?: string }) {
  return <Link className={`orb-button ${secondary ? "orb-button-secondary" : ""} ${className}`} href={href}><span>{children}</span></Link>;
}

export function Divider() { return <div className="orb-divider" aria-hidden="true" />; }
export function SectionLabel({ number, label }: { number: string; label: string }) { return <div className="orb-section-label"><span>{number}</span><span>{label}</span></div>; }

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!element.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = element.current;
    if (node.getBoundingClientRect().top > innerHeight) node.classList.add("orb-will-reveal");
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { node.classList.remove("orb-will-reveal"); observer.disconnect(); } }, { threshold: 0.1 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={element} className={`orb-reveal ${className}`}>{children}</div>;
}

export function Counter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const span = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);
  useEffect(() => {
    if (!span.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (time: number) => {
        const progress = Math.min((time - start) / 1100, 1);
        setCurrent(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    observer.observe(span.current);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);
  return <span ref={span} aria-label={`${prefix}${value}${suffix}`}><span aria-hidden="true">{prefix}{current}{suffix}</span></span>;
}

const questions = [
  ['What exactly is an "agent" on Orbital?', "An agent is an AI-powered worker that can understand tasks, use tools, and take actions.You can configure agents to automate workflows and handle specific tasks."],
  ["Can I run it in my own cloud?", "Yes. Orbital AI can be deployed in your own cloud environment, giving you greater control over your infrastructure, data, and security."],
  ["How does MCP support work?", "Orbital AI supports MCP, connecting agents to external tools and data sources. It enables flexible integrations without complex custom setups."],
  ["How is usage priced?", "Usage is based on the number of API calls and queries you make, with each plan including a monthly usage limit."],
  ["What about security and compliance?", "Orbital AI is designed with strong security controls and privacy in mind, helping protect data and support compliance requirements."],
  ["Do you offer migration help?", "Yes, we provide migration guidance to help you move your existing workflows and data smoothly. Our support team can assist throughout the migration process."],
] as const;

export function FAQ({ number = "08" }: { number?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return <section id="faq" className="orb-container orb-faq"><Divider /><div className="orb-frame"><SectionLabel number={number} label="FAQ" /><div className="orb-faq-grid"><Reveal><h2>Questions, answered.</h2></Reveal><div className="orb-faq-items">{questions.map(([question, answer], i) => <div className="orb-faq-item" key={question}><h3><button type="button" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-controls={`faq-answer-${i}`}>{question}<span className={open === i ? "orb-open" : ""} aria-hidden="true">{open === i ? "−" : "+"}</span></button></h3><div id={`faq-answer-${i}`} className="orb-faq-answer" hidden={open !== i}><p>{answer}</p></div></div>)}</div></div></div></section>;
}

const links = [["About", "/orbital/about"], ["Use cases", "/orbital#use-case"], ["Blog", "/orbital/blog"], ["Contact", "/orbital/contact"]] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return <header className="orb-header"><nav className="orb-container orb-nav" aria-label="Main navigation"><Link href="/orbital" aria-label="Orbital AI home" className="orb-logo"><img src="/orbital/assets/orbital-logo.svg" alt="Orbital AI" width="170" height="44" /></Link><div className="orb-desktop-nav">{links.map(([label, href]) => <Link key={label} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}</div><div className="orb-nav-cta"><Button>Start Building</Button></div><button className="orb-menu-toggle" ref={toggle} onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="orb-mobile-nav"><span /><span /></button><div id="orb-mobile-nav" className="orb-mobile-nav" hidden={!open}>{links.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)}>{label}</Link>)}<Button>Start Building</Button></div></nav></header>;
}

export function CTA() { return <section className="orb-container orb-cta"><Divider /><div className="orb-frame"><div className="orb-cta-panel"><picture><source media="(max-width:809px)" srcSet={asset("ft5RfMW13psCWfD5K6ZbQThrNw")} /><img src={asset("bcXOsmTDGCvsUr3SnYm7EMKsM")} alt="" /></picture><Reveal><h2>Ship your first agent this week.</h2><p>Free to start. No credit card. Production-ready the moment you are.</p><div className="orb-actions"><Button>Start Building</Button><Button secondary>Book Demo</Button></div></Reveal></div></div></section>; }

export function Footer() { return <footer className="orb-container orb-footer"><Divider /><div className="orb-footer-main"><div><Link href="/orbital" aria-label="Orbital AI home"><img className="orb-footer-logo" src="/orbital/assets/orbital-logo.svg" alt="Orbital AI" width="170" height="44" /></Link><p>Production infrastructure for teams<br className="orb-desktop-break" /> shipping AI agents into the real world.</p><div className="orb-socials">{[["Facebook", "https://www.facebook.com", "/orbital/assets/social-0.svg"], ["LinkedIn", "https://www.linkedin.com", "/orbital/assets/social-1.svg"], ["Instagram", "https://www.instagram.com", "/orbital/assets/social-2.svg"], ["Telegram", "https://telegram.org", "/orbital/assets/social-3.svg"]].map(([label, href, icon]) => <a href={href} aria-label={label} key={label} target="_blank" rel="noreferrer"><img src={icon} alt="" width="16" height="16" /></a>)}</div></div><div className="orb-footer-links"><div><h3>Company</h3><Link href="/orbital/about">About</Link><Link href="/orbital/blog">Blog</Link><Link href="/orbital/contact">Contact</Link></div><div><h3>Reasource</h3><Link href="/orbital#pricing">Pricing</Link><Link href="/orbital/blog/why-ci-evaluations-matter#hero">Blog Details</Link><Link href="/orbital/404">404</Link></div></div></div><div className="orb-footer-bottom"><span>© 2026 Orbital AI, Inc.</span><div><Link href="/orbital/legal/privacy-policy">Privacy Policy</Link><Link href="/orbital/legal/terms-conditions">Terms &amp; Conditions</Link></div></div></footer>; }

export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <><Header />{children}{routePaths.includes(pathname) && <CTA />}<Footer /></>;
}
