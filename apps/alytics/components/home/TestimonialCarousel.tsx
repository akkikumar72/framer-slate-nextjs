'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { animate, motion, useMotionValue, useTransform, type MotionValue, type PanInfo } from 'motion/react';
import { useLiveReducedMotion } from '../motion-preference';
import styles from './TestimonialCarousel.module.css';

const gap = 20;
const spring = { type: 'spring', stiffness: 200, damping: 40, mass: 1 } as const;

function Slide({ children, index, count, width, position, active }: { children: ReactNode; index: number; count: number; width: number; position: MotionValue<number>; active: boolean }) {
  const x = useTransform(position, value => {
    if (!width) return 0;
    const step = width + gap;
    const cycle = count * step;
    return ((index * step + value + step) % cycle + cycle) % cycle - step;
  });

  return <motion.div className={styles.slide} style={{ x, visibility: width || index === 0 ? 'visible' : 'hidden' }} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${count}`} aria-hidden={!active} inert={!active} data-active={active}>
    {children}
  </motion.div>;
}

export function TestimonialCarousel({ items }: { items: ReactNode[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const controls = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const current = useRef(0);
  const dragOrigin = useRef(0);
  const dragAxis = useRef<'x' | 'y' | null>(null);
  const animation = useRef<{ stop(): void } | null>(null);
  const position = useMotionValue(0);
  const reducedMotion = useLiveReducedMotion();

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const measure = () => {
      const nextWidth = element.getBoundingClientRect().width;
      if (!nextWidth) return;
      animation.current?.stop();
      position.set(-current.current * (nextWidth + gap));
      setWidth(nextWidth);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => { observer.disconnect(); animation.current?.stop(); };
  }, [position]);

  useEffect(() => {
    if (reducedMotion) {
      animation.current?.stop();
      position.set(-current.current * (width + gap));
    }
  }, [position, reducedMotion, width]);

  const move = (direction: number) => {
    if (items.length < 2 || !width) return;
    animation.current?.stop();
    current.current += direction;
    setActive(((current.current % items.length) + items.length) % items.length);
    const target = -current.current * (width + gap);
    if (reducedMotion) position.set(target);
    else animation.current = animate(position, target, spring);
  };

  const endPan = (_: PointerEvent, info: PanInfo) => {
    setDragging(false);
    if (dragAxis.current !== 'x') return;
    const distance = Math.round(Math.abs(info.offset.x) / width);
    const velocityDistance = Math.max(1, distance);
    if (info.velocity.x > 200) move(-velocityDistance);
    else if (info.velocity.x < -200) move(velocityDistance);
    else if (info.offset.x < -width / 2) move(distance);
    else if (info.offset.x > width / 2) move(-distance);
    // The source leaves a short, slow drag at its release position.
  };

  if (!items.length) return null;

  return <section className={styles.carousel} aria-label="Customer testimonials" aria-roledescription="carousel">
    <motion.div ref={viewport} className={styles.viewport} data-dragging={dragging} onPointerDownCapture={() => {
      // Motion 13's keyboard tap blur emits pointercancel. Flush it before
      // the native pointerdown listener creates the next pan session.
      const focused = document.activeElement;
      if (focused instanceof HTMLElement && controls.current?.contains(focused)) focused.blur();
    }} onPanStart={() => {
      animation.current?.stop();
      dragOrigin.current = position.get();
      dragAxis.current = null;
    }} onPan={(_, info) => {
      if (!dragAxis.current) dragAxis.current = Math.abs(info.offset.x) > Math.abs(info.offset.y) ? 'x' : 'y';
      if (dragAxis.current !== 'x' || items.length < 2) return;
      setDragging(true);
      position.set(dragOrigin.current + info.offset.x);
    }} onPanEnd={endPan}>
      {items.map((item, index) => <Slide key={index} index={index} count={items.length} width={width} position={position} active={index === active}>{item}</Slide>)}
    </motion.div>
    <div ref={controls} className={styles.controls} role="group" aria-label="Testimonial controls">
      <motion.button type="button" aria-label="Previous testimonial" disabled={items.length < 2} onClick={() => move(-1)} whileTap={reducedMotion ? undefined : { scale: 0.9 }} transition={{ duration: 0.15 }}><img src="/alytics/6tTbkXggWgQCAJ4DO2QEdXXmgM.svg" width="40" height="40" alt="" /></motion.button>
      <motion.button type="button" aria-label="Next testimonial" disabled={items.length < 2} onClick={() => move(1)} whileTap={reducedMotion ? undefined : { scale: 0.9 }} transition={{ duration: 0.15 }}><img src="/alytics/11KSGbIZoRSg4pjdnUoif6MKHI.svg" width="40" height="40" alt="" /></motion.button>
    </div>
  </section>;
}
