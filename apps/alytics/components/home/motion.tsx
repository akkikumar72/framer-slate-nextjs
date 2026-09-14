"use client";

import { useLiveReducedMotion as useReducedMotion } from '../motion-preference';
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useAnimationFrame, useInView, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { revealSpring } from '../motion-primitives';
import { useMirroredLoop } from '../NewsletterCTA';
import styles from './home.module.css';

export function LoadReveal({ children, y, delay }: { children: ReactNode; y: number; delay: number }) {
  const reduced = useReducedMotion();
  return <motion.div initial={{ opacity: 0, y }} animate={{ opacity: 1, y: 0 }} transition={reduced ? { duration: 0 } : { ...revealSpring, delay }} data-hero-reveal>{children}</motion.div>;
}

const marks = [
  { rotation: -8, to: 10, rotationDuration: 3.5, float: -15, floatDuration: 2.5, delay: 0.5 },
  { rotation: -8, to: -18, rotationDuration: 3, float: 25, floatDuration: 2, delay: 0.5 },
  { rotation: 8, to: -10, rotationDuration: 4, float: -22, floatDuration: 3, delay: 0.6 },
  { rotation: 8, to: 22, rotationDuration: 3.5, float: 25, floatDuration: 2.5, delay: 0.5 },
];
export function HeroMark({ name, index }: { name: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const mark = marks[index];
  const rotate = useMirroredLoop({ from: 0, to: mark.to - mark.rotation, duration: mark.rotationDuration, visible });
  const y = useMirroredLoop({ from: 0, to: mark.float, duration: mark.floatDuration, visible });
  return <motion.div ref={ref} className={styles[`float${index}`]} initial={{ opacity: 0, y: 20, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: mark.rotation }} transition={reduced ? { duration: 0 } : { ...revealSpring, delay: mark.delay }} data-hero-mark={index}>
    <motion.div style={{ rotate }}><motion.img style={{ y }} src={`/alytics/${name}`} alt="" width="80" height="80" draggable="false" /></motion.div>
  </motion.div>;
}

export function HeroDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const targetAngle = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const rotateX = useSpring(targetAngle, { stiffness: 1000, damping: 100, mass: 1 });
  return <div ref={ref} className={styles.dashboard}>
    <motion.div className={styles.dashboardMotion} data-dashboard-motion
      initial={{ opacity: 0, y: 150 }} animate={{ opacity: 1, y: 0 }}
      transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 80, mass: 2, delay: 0.6 }}
      style={{ rotateX: reduced ? 0 : rotateX, transformPerspective: 1200 }}>
      <img src="/alytics/ZQIj3Thxxza6gmZ33yEqfh0ew.png" width="2043" height="1328" alt="Business dashboard showing revenue, deals, customer list, growth chart, and new activity." fetchPriority="high" />
    </motion.div>
  </div>;
}

/** The source ticker moves right at 50 pixels/second, including while hovered. */
export function Ticker({ children, className, label }: { children: ReactNode[]; className: string; label: string }) {
  const group = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const width = useRef(0);
  const dragging = useRef(false);
  const visible = useInView(root);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const wrap = (value: number) => width.current ? ((value % width.current) + width.current) % width.current - width.current : 0;
  useEffect(() => {
    const element = group.current;
    if (!element) return;
    const measure = () => { width.current = element.getBoundingClientRect().width; x.set(reduced ? 0 : wrap(x.get())); };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [reduced, x]);
  useAnimationFrame((_, delta) => {
    if (!reduced && visible && !dragging.current) x.set(wrap(x.get() + Math.min(delta, 64) * 0.05));
  });
  return <motion.div ref={root} className={className} style={{ x, touchAction: 'pan-y', cursor: 'grab' }} data-ticker role="group" aria-label={label} tabIndex={0} aria-keyshortcuts="ArrowLeft ArrowRight Home End"
    onKeyDown={event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      x.set(event.key === 'Home' ? 0 : event.key === 'End' ? -width.current + 200 : wrap(x.get() + (event.key === 'ArrowLeft' ? 200 : -200)));
    }}
    onPanStart={() => { dragging.current = true; }}
    onPan={(_, info) => x.set(wrap(x.get() + info.delta.x))}
    onPanEnd={() => { dragging.current = false; }}>
    {[0, 1].map(copy => <div ref={copy === 0 ? group : undefined} key={copy} aria-hidden={copy === 1}>{children}</div>)}
  </motion.div>;
}

export function Price({ monthly, yearly, annual }: { monthly: number; yearly: number; annual: boolean }) {
  const reduced = useReducedMotion();
  const measure = useRef<HTMLElement>(null);
  const [width, setWidth] = useState<number>();
  const transition = reduced ? { duration: 0 } : revealSpring;
  useLayoutEffect(() => {
    if (measure.current) setWidth(measure.current.getBoundingClientRect().width);
  }, [annual]);
  useEffect(() => {
    const element = measure.current;
    if (!element) return;
    const observer = new ResizeObserver(() => setWidth(element.getBoundingClientRect().width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div className={styles.price}><motion.div className={styles.priceWindow} initial={false} animate={{width}} transition={transition}>
    <strong ref={measure} className={styles.priceMeasure} aria-hidden="true">${annual ? yearly : monthly}</strong>
    <motion.strong initial={false} animate={{ y: annual ? -50 : 0, opacity: annual ? 0 : 1 }} transition={transition} aria-hidden={annual}>${monthly}</motion.strong>
    <motion.strong initial={false} animate={{ y: annual ? 0 : 50, opacity: annual ? 1 : 0 }} transition={transition} aria-hidden={!annual}>${yearly}</motion.strong>
  </motion.div><span>/month</span></div>;
}

export function FAQItem({ question, answer, index, open, onToggle }: { question: string; answer: string; index: number; open: boolean; onToggle: () => void }) {
  const reduced = useReducedMotion();
  const transition = reduced ? { duration: 0 } : revealSpring;
  return <div className={styles.faq}><h3><button type="button" aria-expanded={open} aria-controls={`faq-answer-${index}`} onClick={onToggle}>
    {question}<span className={styles.faqPlus} aria-hidden="true"><motion.i initial={false} animate={{ rotate: open ? 270 : 0 }} transition={transition} /><motion.i initial={false} animate={{ rotate: open ? 270 : 90 }} transition={transition} /></span>
  </button></h3><motion.div id={`faq-answer-${index}`} aria-hidden={!open} initial={false} animate={{ height: open ? 'auto' : 0 }} transition={transition} className={styles.answerClip}><div className={styles.answer}><p>{answer}</p></div></motion.div></div>;
}
