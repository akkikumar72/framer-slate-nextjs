"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";
const navigation = [ ["Home", "", "home"], ["About", "/about", "about"], ["Projects", "/projects", "projects"], ["Stack", "/stack", "stack"], ["Contact", "/contact", "contact"], ["Licensing", "/licensing", "licensing"] ];
export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return <aside className={`roco-sidebar ${open ? "menu-open" : ""}`}>
    <div className="roco-profile"><Link href="/roco" aria-label="Patricia, home"><img src="/roco/assets/patricia-portrait.jpg" alt="Patricia" width="192" height="192" /></Link><div className="roco-available"><span /> <span className="availability-desktop">Available for Work</span><span className="availability-tablet">Available</span></div><button ref={toggle} className="roco-menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="roco-navigation" onClick={() => setOpen(!open)}><span /><span /></button></div>
    <div className="roco-navigation-wrap"><nav id="roco-navigation" aria-label="Main navigation">{navigation.map(([label, path, icon]) => { const active = path ? pathname.startsWith(`/roco${path}`) : pathname === "/roco"; return <Link key={label} href={`/roco${path}`} aria-label={label} title={label} aria-current={active ? "page" : undefined}><Icon name={icon} /><span>{label}</span></Link>; })}</nav><div className="roco-socials">{[["X (Twitter)","x","https://twitter.com/CristianMielu"],["Next.js","nextjs","https://nextjs.org/"],["Instagram","instagram","https://www.instagram.com/"],["Dribbble","dribbble","https://dribbble.com/"]].map(([label,icon,href])=><a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer"><Icon name={icon}/></a>)}</div></div>
  </aside>;
}
export function FooterCredits() {
  return <footer className="roco-footer"><p>© Copyright 2023. All rights Reserved.</p><p>Made by <a href="https://www.uihub.design/" target="_blank" rel="noreferrer">UIhub.design</a> with <a href="https://nextjs.org/" target="_blank" rel="noreferrer">Next.js</a></p><div><Link href="/roco/legal/privacy-policy">Privacy Policy</Link><Link href="/roco/legal/cookie-policy">Cookie Policy</Link></div></footer>;
}
export function Footer() {
  return <><section className="roco-connect"><Link href="/roco/contact" aria-label="Let's Connect!">{[[662, 96, "desktop"], [441, 64, "tablet"], [221, 32, "phone"]].map(([width, size, variant]) => <svg key={variant} className={`roco-connect-${variant}`} viewBox={`0 0 ${width} ${size}`} aria-hidden="true"><foreignObject width="100%" height="100%"><p style={{fontSize: Number(size), lineHeight: 1, fontWeight: 500, textAlign: "center"}}>Let&apos;s Connect!</p></foreignObject></svg>)}</Link></section><FooterCredits/></>;
}
