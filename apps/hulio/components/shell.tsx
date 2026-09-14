'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Arrow, Button } from './shared';
import { asset } from '@/lib/assets';
import { motion, useReducedMotion } from 'motion/react';
const navigation = [['Home', '/hulio'], ['About', '/hulio/about'], ['Blog', '/hulio/blog'], ['Pricing', '/hulio/pricing'], ['Contact', '/hulio/contact']];
const navSpring = { type: 'spring', stiffness: 500, damping: 60, mass: 1 } as const;

function NavigationLink({ label, href, current, canFlip, closeMenu }: {
  label: string;
  href: string;
  current: boolean;
  canFlip: boolean;
  closeMenu: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <Link
      href={href}
      aria-current={current ? 'page' : undefined}
      className="nav-link"
      onClick={closeMenu}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <span className="nav-label-window">
        <motion.span
          className="nav-label-stack"
          initial={false}
          animate={{ y: canFlip && (hovered || focused) ? -20 : 0 }}
          transition={navSpring}
        >
          <span className="nav-label">{label}</span>
          <span className="nav-label nav-label-copy" aria-hidden="true">{label}</span>
        </motion.span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [desktop, setDesktop] = useState(false);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (open) menuPanel.current?.querySelector('a')?.focus();
  }, [open]);
  useEffect(() => {
    const query = matchMedia('(min-width: 1200px)');
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return (
    <header className="site-header" onKeyDown={event => {
      if (event.key === 'Escape' && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    }}>
      <nav className="container navbar" aria-label="Main navigation">
        <Link href="/hulio" aria-label="Hulio home">
          <img src="/hulio/logo.svg" className="logo" alt="Hulio" width="144" height="28" />
        </Link>
        <div ref={menuPanel} className={`nav-panel ${open ? 'nav-open' : ''}`} id="main-navigation">
          {navigation.map(([label, href]) => (
            <NavigationLink
              key={href}
              label={label}
              href={href}
              current={pathname === href}
              canFlip={desktop && !reduceMotion}
              closeMenu={() => setOpen(false)}
            />
          ))}
        </div>
        <Button href="/hulio/contact" variant="outline" className="header-cta">Get In Touch</Button>
        <button
          ref={menuButton}
          type="button"
          className={`menu-toggle ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          <span /><span />
        </button>
      </nav>
    </header>
  );
}
export function Footer() { return <footer className="footer-wrap"><div className="footer-inner"><div className="container footer-content"><div className="footer-top"><div className="footer-about"><Link href="/hulio" aria-label="Hulio home"><img className="logo footer-logo" src="/hulio/logo-footer.svg" alt="Hulio" width="144" height="28"/></Link><h4>Do you like what you see?</h4><p>Let’s work together to turn your dream project into reality.</p><Link href="/hulio/contact" className="text-link">Let&apos;s Talk with Us <Arrow /></Link></div><div className="footer-column"><h5>Useful Links</h5>{[['Our Projects', 'project'], ['About Us', 'about'], ['News & Blogs', 'blog'], ['Our Team', 'team']].map(([label, href]) => <Link href={'/hulio/' + href} key={href}>{label}</Link>)}</div><div className="footer-column"><h5>Information</h5>{[['Contact Us', 'contact'], ['Privacy Policy', 'privacy-policy'], ['Error 404', '404']].map(([label, href]) => <Link href={'/hulio/' + href} key={href}>{label}</Link>)}</div><div className="footer-column footer-social"><h5>Get In Touch</h5><p>Connect with us via our socials</p><div>{[['LinkedIn', 'https://linkedin.com/', 'nEU3hd8IotNeOIxXfYQ4JM2svZU.svg'], ['X', 'https://x.com/', 'Cld64ooaDYzb2XDw0ATAQRwGdQw.svg'], ['Behance', 'https://behance.com/', 'DLSAlA55yIwRFGSYv4lBSdPyE.svg']].map(([label, url, icon]) => <a key={label} href={url} aria-label={label} target="_blank" rel="noreferrer"><img src={asset(icon)} alt="" width="24" height="24"/></a>)}</div></div></div><p className="footer-wordmark" aria-hidden="true">HULIO AGENCY</p><p className="copyright">© All Right Reserved by Hulio Agency - 2026</p></div></div></footer>; }
export function TemplateBadges() { return <aside className="template-badges" aria-label="Template attribution"><a className="template-promo" href="https://www.framer.com/marketplace/templates/olam/" target="_blank" rel="noreferrer"><img src={asset('bdUqTcRvVTX3IGWzAE6uKvbk.png')} alt="" width="54" height="41"/><span>Olam – Template<small>New Release</small></span></a><a className="use-template" href="https://framer.link/2q7PCZZ" target="_blank" rel="noreferrer">Use for Free <Arrow /></a></aside>; }
