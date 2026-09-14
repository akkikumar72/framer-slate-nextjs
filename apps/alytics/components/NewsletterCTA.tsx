"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, type AnimationPlaybackControls } from "motion/react";
import { Button } from "./motion-primitives";
import { useLiveReducedMotion } from "./motion-preference";
import styles from "./NewsletterCTA.module.css";

const spring = { type: "spring" as const, stiffness: 500, damping: 60, mass: 1 };
const loopEase = [0.44, 0, 0.56, 1] as const;
const envelopeAsset = "/alytics/OXyYHX9MW2fCN7IDYfVvNCAqUX0.png";
const curveAsset = "/alytics/OmGZB6Q2bVw2OL3RXRH55t39LWg.png";

/** Mirror one leg at a time so leaving view finishes the leg, then restores the base. */
export function useMirroredLoop({ from, to, duration, visible }: {
  from: number; to: number; duration: number; visible: boolean;
}) {
  const value = useMotionValue(from);
  const reducedMotion = useLiveReducedMotion();
  const visibleRef = useRef(visible);
  const start = useRef<() => void>(() => {});

  useEffect(() => {
    visibleRef.current = visible;
    if (visible) start.current();
  }, [visible]);

  useEffect(() => {
    let cancelled = false;
    let running = false;
    let animation: AnimationPlaybackControls | undefined;
    value.set(from);
    if (reducedMotion) return;

    const play = async () => {
      if (running || !visibleRef.current) return;
      running = true;
      let forward = true;
      do {
        animation = animate(value, forward ? [from, to] : [to, from], { duration, ease: loopEase });
        await animation;
        if (cancelled) return;
        forward = !forward;
      } while (visibleRef.current);
      value.set(from);
      running = false;
    };
    start.current = () => { void play(); };
    start.current();
    return () => {
      cancelled = true;
      animation?.stop();
      start.current = () => {};
    };
  }, [duration, from, reducedMotion, to, value]);

  return value;
}

function Envelope({ side }: { side: "left" | "right" }) {
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root);
  const reducedMotion = useLiveReducedMotion();
  const baseRotation = side === "left" ? -19 : 9;
  // The source loop rotation is added to the envelope's static rotation.
  const rotation = useMirroredLoop({ from: baseRotation, to: side === "left" ? -3 : -6, duration: 3.5, visible: inView });
  const floatY = useMirroredLoop({ from: 0, to: -15, duration: 2.5, visible: inView });

  return <motion.div
    ref={root}
    className={`${styles.envelope} ${side === "left" ? styles.envelopeLeft : styles.envelopeRight}`}
    aria-hidden="true"
    initial={reducedMotion ? false : { opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ ...spring, delay: side === "left" ? 0.4 : 0.5 }}
    transformTemplate={side === "left" ? (_, transform) => `translateY(-50%) ${transform}` : undefined}
    data-newsletter-envelope={side}
  >
    <motion.div className={styles.rocking} style={{ rotate: rotation }}>
      <motion.img className={styles.envelopeImage} style={{ y: floatY }} src={envelopeAsset} width="148" height="101" alt="" draggable="false" />
    </motion.div>
  </motion.div>;
}

export function NewsletterCTA() {
  const reducedMotion = useLiveReducedMotion();
  return <section className={styles.section} aria-label="Alytics newsletter" data-newsletter-cta>
    <div className={styles.container}>
      <motion.div
        className={styles.panel}
        initial={reducedMotion ? false : { opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ ...spring, delay: 0.2 }}
      >
        <img className={`${styles.curve} ${styles.curveRight}`} src={curveAsset} width="442" height="306" alt="" aria-hidden="true" draggable="false" />
        <img className={`${styles.curve} ${styles.curveLeft}`} src={curveAsset} width="442" height="306" alt="" aria-hidden="true" draggable="false" />
        <Envelope side="left" />
        <Envelope side="right" />
        <div className={styles.content}>
          <div className={styles.headingText}>
            <motion.h2
              className={styles.heading}
              initial={reducedMotion ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ...spring, delay: 0.1 }}
            >Subscribe to the Alytics Newsletter!</motion.h2>
            <motion.p
              className={styles.description}
              initial={reducedMotion ? false : { opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ ...spring, delay: 0.2 }}
            >Get expert tips, updates, and smart analytics insights delivered straight to your inbox.</motion.p>
          </div>
          <motion.div
            className={styles.button}
            initial={reducedMotion ? false : { opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ ...spring, delay: 0.3 }}
          ><Button href="/alytics/newsletter">Subscribe Now</Button></motion.div>
        </div>
      </motion.div>
    </div>
  </section>;
}
