"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Button, Logo } from "./shared";
import { revealSpring } from "./motion-primitives";
import { useLiveReducedMotion } from "./motion-preference";
import styles from "./Header.module.css";

const links = ["Features", "Benefits", "Integrations", "Pricing", "FAQ", "Blogs"];
const MotionLink = motion.create(Link);

export function Header() {
  const [open, setOpen] = useState(false);
  const [viewport, setViewport] = useState({ compact: false, height: 0 });
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const reduced = useLiveReducedMotion();
  const transition = reduced ? { duration: 0 } : revealSpring;

  useEffect(() => {
    const update = () => {
      const compact = window.innerWidth < 1200;
      setViewport({ compact, height: window.innerHeight });
      if (!compact) setOpen(false);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const expanded = viewport.compact && open;
  return <motion.header className={styles.header} initial={false}
    animate={{ height: viewport.height ? (viewport.compact ? (expanded ? viewport.height : 58) : 68) : undefined }}
    transition={transition} data-menu-open={expanded}>
    <div className={styles.container}>
      <div className={styles.name}>
        <Link className={styles.logo} href="/alytics" aria-label="Alytics home" onClick={() => setOpen(false)}><Logo /></Link>
        <button ref={menuButton} className={styles.toggle} type="button" aria-label={expanded ? "Close menu" : "Open menu"}
          aria-expanded={expanded} aria-controls="main-navigation" onClick={() => setOpen(value => !value)}>
          <motion.span initial={false} animate={{ y: expanded ? 0 : -3.75, rotate: expanded ? 45 : 0 }} transition={transition} />
          <motion.span initial={false} animate={{ y: expanded ? 0 : 3.75, rotate: expanded ? -45 : 0 }} transition={transition} />
        </button>
      </div>
      {(!viewport.compact || expanded) && <>
        <nav className={styles.navigation} id="main-navigation" aria-label="Main navigation" data-open={expanded}>
          {links.map(label => <MotionLink key={label}
            href={label === "Blogs" ? "/alytics/blog" : `/alytics/#${label.toLowerCase()}`}
            className={styles.link} onClick={() => setOpen(false)}
            aria-current={label === "Blogs" && pathname.startsWith("/alytics/blog") ? "page" : undefined}
            initial={false} animate={{ boxShadow: "0px 0px 0px 0px #ebebeb", opacity: viewport.compact ? 0.5 : 1 }}
            whileHover={viewport.compact ? { opacity: 1 } : { boxShadow: "0px 0px 0px 2px #ebebeb" }}
            whileFocus={viewport.compact ? { opacity: 1 } : { boxShadow: "0px 0px 0px 2px #ebebeb" }}
            transition={transition}>{label}</MotionLink>)}
        </nav>
        <div className={styles.action} data-open={expanded}><Button>Join Newsletter</Button></div>
      </>}
    </div>
  </motion.header>;
}
