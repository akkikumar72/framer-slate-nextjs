"use client";
import { QuoteMark } from "./QuoteMark";
import { useCallback, useEffect, useRef, useState } from "react";
import { asset } from "../lib/assets";
import { AboutPanel, ResumePanel, ContactPanel } from "./ProfilePanels";
import { CaseStudy } from "./CaseStudy";
import styles from "./GridFolio.module.css";
type Panel = "about" | "resume" | "contact" | "chatai" | "startup";
const labels: Record<Panel, string> = { about: "Antonio Misk", resume: "My resume", contact: "Let's have a chat", chatai: "ChatAI", startup: "Startup AI" };
const tiles: ({
    image: string;
    alt: string;
    logo?: boolean;
    panel?: Panel;
} | {
    quote: string;
    author: string;
})[] = [
    { image: "lPNzIM1BZ0o7Meq6tn6iE61dWc.webp", alt: "Berlin logo", logo: true },
    { image: "ja6iY8F3nfvAbgT21ZbD0YXp37E.webp", alt: "ChatAI product design", panel: "chatai" },
    { image: "lvXQb670BEx0XwxmEpNJ1mMqio4.webp", alt: "Startup AI image generation platform", panel: "startup" },
    { image: "IGd8JVx1tfTh2KJTMry7DQFlWY.webp", alt: "Beam sharing interface" },
    { image: "fOrB5VkKdrbcEa3CaWcdC76AFbE.webp", alt: "Mobile wallet and activities design" },
    { image: "pEP7WFSb8Pz43cSmvnY04DpwpAw.webp", alt: "Gaza logo", logo: true },
    { quote: "Antonio turns complex problems into simple, elegant experiences with strong UX thinking, creativity, and attention to detail.", author: "Sarah Chen, Product Manager" },
    { image: "wWJZMBXu6UxaJg0BRQSjyplaexo.webp", alt: "Tokyo logo", logo: true },
    { image: "Y8nZlca9oFO7gsjypTPLqU7cIg.webp", alt: "Sleep tracking mobile app design" },
    { image: "jUTYq1Ldl6OARNnKPYia9wQ9ec.webp", alt: "Watchlist onboarding interface" },
    { image: "rsjBsECrRqqpMuqXoFb0vyDBmI.webp", alt: "Poly crypto and stocks app" },
    { quote: "Antonio combines strategy, creativity, and UX expertise to design thoughtful products that are intuitive, impactful, and user-focused.", author: "Daniel Wright, Founder & CEO" },
    { image: "lxepT7Fc4OMtcAlurBytmMkGQ.webp", alt: "Product dashboard design" },
    { image: "Fxl5o48Cwigjx85uii42XCa7MLs.webp", alt: "Brand identity project", logo: true },
    { image: "YZqAar9qApbyOE7eKrLy2drvqGs.webp", alt: "Brand logo design", logo: true },
    { quote: "Antonio creates meaningful digital experiences by blending product thinking, clean design, and a deep understanding of users.", author: "Maya Rodriguez, UX Researcher" },
    { image: "RBRb2jYTT3gfn9XnVZ2IW9Ixpew.webp", alt: "Digital product interface design" },
];
export default function GridFolio() {
    const [panel, setPanel] = useState<Panel | null>(null);
    const [menu, setMenu] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const dialog = useRef<HTMLDialogElement>(null);
    const returnFocus = useRef<HTMLElement | null>(null);
    const menuButton = useRef<HTMLButtonElement>(null);
    const menuContainer = useRef<HTMLDivElement>(null);
    const close = useCallback(() => setPanel(null), []);
    useEffect(() => {
        const desktop = window.matchMedia("(min-width: 810px)");
        // The reference begins its sticky-card dissolve at seven pixels of scroll.
        const update = () => setScrolled(desktop.matches && window.scrollY >= 7);
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("pageshow", update);
        desktop.addEventListener("change", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("pageshow", update);
            desktop.removeEventListener("change", update);
        };
    }, []);
    useEffect(() => {
        if (!panel)
            return;
        const node = dialog.current;
        if (!node)
            return;
        node.showModal();
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => { node.close(); document.body.style.overflow = previous; returnFocus.current?.focus({ preventScroll: true }); };
    }, [panel]);
    useEffect(() => {
        if (!menu) return;
        const container = menuContainer.current;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        container?.querySelector<HTMLElement>("nav button")?.focus();
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setMenu(false);
                menuButton.current?.focus();
            }
            if (event.key === "Tab") {
                const controls = container?.querySelectorAll<HTMLElement>('button:not([tabindex="-1"]), a[href]');
                if (!controls?.length) return;
                const first = controls[0];
                const last = controls[controls.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };
        const desktop = window.matchMedia("(min-width: 810px)");
        const closeOnDesktop = () => { if (desktop.matches) setMenu(false); };
        closeOnDesktop();
        desktop.addEventListener("change", closeOnDesktop);
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = previousOverflow;
            desktop.removeEventListener("change", closeOnDesktop);
            window.removeEventListener("keydown", onKey);
        };
    }, [menu]);
    function open(value: Panel) { returnFocus.current = menu ? menuButton.current : document.activeElement as HTMLElement; setMenu(false); setPanel(value); }
    const navigation = (mobile = false) => <nav aria-label={mobile ? "Mobile navigation" : "Main navigation"} className={mobile ? styles.mobileLinks : styles.navigation}>
    <button onClick={() => open("about")}>About</button><button onClick={() => open("resume")}>Resume</button><a href="mailto:hey@badich.io?subject=Hello%20from%20your%20website">Email</a><button className={styles.contactButton} onClick={() => open("contact")}>Contact</button>
  </nav>;
    const isCase = panel === "chatai" || panel === "startup";
    return <>
    <main className={styles.grid} aria-label="GridFolio portfolio" inert={menu}>
      <section className={`${styles.intro} ${scrolled ? styles.scrolled : ""}`} aria-label="About Antonio Misk">
        {navigation()}
        <div className={styles.introContent}><div className={styles.identity}><img src={asset("c9GykKRQ1LsTYFD8o2fnEEUFzU.png")} alt="Antonio Misk" width="56" height="56"/><div><h1>Antonio Misk</h1><p>Lead product designer</p></div></div><h2>Multidisciplinary maker specializing in the intersection of product, design and engineering. Making WordPress.</h2></div>
      </section>
      {tiles.map((tile, index) => "quote" in tile ? <figure key={tile.author} className={`${styles.tile} ${styles.testimonial}`}><QuoteMark width={20} height={15}/><blockquote>{tile.quote}</blockquote><figcaption>{tile.author}</figcaption></figure> : tile.panel ? <button key={tile.image} className={`${styles.tile} ${styles.project}`} onClick={() => open(tile.panel!)} aria-label={`View ${labels[tile.panel]} case study`}><span className={styles.caseLabel}>Case study</span><img src={asset(tile.image)} alt={tile.alt} width="1200" height="1200"/></button> : <div key={tile.image} className={`${styles.tile} ${tile.logo ? styles.logo : styles.project}`}><img src={asset(tile.image)} alt={tile.alt} width="1200" height="1200" loading={index > 5 ? "lazy" : "eager"}/></div>)}
    </main>
    <div className={styles.bottomBlur} aria-hidden="true">
      {Array.from({ length: 8 }, (_, index) => {
            const start = index * 12.5;
            const stops = [`transparent ${start}%`, `black ${start + 12.5}%`];
            if (index < 7)
                stops.push(`black ${start + 25}%`);
            if (index < 6)
                stops.push(`transparent ${start + 37.5}%`);
            return <span key={index} style={{ backdropFilter: `blur(${2 ** index / 16}px)`, maskImage: `linear-gradient(to bottom,${stops.join(",")})` }}/>;
        })}
    </div>
    <div ref={menuContainer} className={`${styles.mobileNavigation} ${menu ? styles.menuOpen : ""}`} role={menu ? "dialog" : undefined} aria-modal={menu || undefined} aria-label={menu ? "Mobile menu" : undefined}>
      {menu && <button tabIndex={-1} className={styles.menuBackdrop} aria-label="Close menu" onClick={() => setMenu(false)}/>}
      <button ref={menuButton} className={styles.menuButton} aria-expanded={menu} aria-controls="gridfolio-mobile-navigation" onClick={() => setMenu(!menu)}><svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d={menu ? "M6 6l12 12M18 6 6 18" : "M3 6h18M3 12h18M3 18h18"} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>Menu</button>
      {menu && <div id="gridfolio-mobile-navigation">{navigation(true)}</div>}
    </div>
    {panel && <dialog ref={dialog} className={`${styles.dialog} ${isCase ? styles.caseDialog : ""} ${panel === "chatai" ? styles.chataiDialog : ""}`} aria-label={labels[panel]} onCancel={close} onClick={e => { if (e.target === e.currentTarget) {
            const r = e.currentTarget.getBoundingClientRect();
            if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
                close();
        } }}>
      <button type="button" className={styles.close} onClick={close} aria-label="Close dialog" autoFocus><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg></button>
      <div className={styles.dialogScroll}>{panel === "about" ? <AboutPanel /> : panel === "resume" ? <ResumePanel /> : panel === "contact" ? <ContactPanel /> : <CaseStudy kind={panel}/>}</div>
    </dialog>}
  </>;
}
